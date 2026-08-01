import { Express, NextFunction, Request, Response as ExpressResponse } from "express"

import { injectable } from "inversify"
import { ClassConstructor, plainToInstance } from "class-transformer"
import { ExploredController } from "./router.types"
import { ApiResult } from "../http/response/api-result"
import { ResponseBuilder } from "../http/response/response-builder"

@injectable()
export class RouterRegister {
	register(app: Express, controller: ExploredController) {
		controller.routes.forEach((route) => {
			const fullPath = controller.basePath + route.path

			app[route.method](fullPath, this.createHandler(controller, route))
		})
	}

	private createHandler(controller: ExploredController, route: ExploredController["routes"][number]) {
		return async (req: Request, res: ExpressResponse, next: NextFunction) => {
			try {
				const args = this.resolveArgs(route, req, res)

				const raw = await controller.instance[route.handler as string]?.(...args)

				if (!res.headersSent) {
					res.json(this.buildResponse(raw, route.responseDto))
				}
			} catch (error) {
				next(error)
			}
		}
	}

	private buildResponse(raw: unknown, dto: ClassConstructor<unknown> | undefined) {
		if (raw instanceof ApiResult) {
			return ResponseBuilder.success(this.applyDto(raw.result, dto), raw.message, raw.pagination)
		}

		return ResponseBuilder.success(this.applyDto(raw, dto))
	}

	/**
	 * Entity/domain veriyi response DTO'ya dönüştürür. `excludeExtraneousValues`
	 * sayesinde DTO'da `@Expose()` ile işaretlenmeyen her alan (password, __v, vb.)
	 * otomatik olarak elenir; modül başına elle mapping/builder yazmaya gerek kalmaz.
	 */
	private applyDto(data: unknown, dto: ClassConstructor<unknown> | undefined) {
		if (!dto || data === undefined || data === null) {
			return data ?? null
		}

		return plainToInstance(dto, this.toPlain(data), {
			excludeExtraneousValues: true
		})
	}

	private toPlain(value: unknown): unknown {
		if (Array.isArray(value)) {
			return value.map((item) => this.toPlain(item))
		}

		if (value && typeof value === "object" && typeof (value as { toObject?: unknown }).toObject === "function") {
			return (value as { toObject: (options?: object) => unknown }).toObject({ virtuals: true })
		}

		return value
	}

	private resolveArgs(route: ExploredController["routes"][number], req: Request, res: ExpressResponse) {
		const args: unknown[] = []

		route.params
			.sort((a, b) => a.index - b.index)
			.forEach((param) => {
				switch (param.source) {
					case "body":
						args[param.index] = req.body
						break
					case "param":
						args[param.index] = param.key ? req.params[param.key] : req.params
						break
					case "query":
						args[param.index] = param.key ? req.query[param.key] : req.query
						break
					case "req":
						args[param.index] = req
						break
					case "res":
						args[param.index] = res
						break
				}
			})

		return args
	}
}
