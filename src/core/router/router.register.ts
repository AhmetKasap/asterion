import { Express, NextFunction, Request, Response as ExpressResponse } from "express"

import { injectable } from "inversify"
import { ExploredController } from "./router.types"
import { ResponseMapper } from "../decorators/http/response.decorator"
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
					res.json(this.buildResponse(raw, route.responseMapper))
				}
			} catch (error) {
				next(error)
			}
		}
	}

	private buildResponse(raw: unknown, mapper: ResponseMapper | undefined) {
		if (raw instanceof ApiResult) {
			return ResponseBuilder.success(this.applyMapper(raw.result, mapper), raw.message, raw.pagination)
		}

		return ResponseBuilder.success(this.applyMapper(raw, mapper))
	}

	private applyMapper(data: unknown, mapper: ResponseMapper | undefined) {
		if (!mapper || data === undefined || data === null) {
			return data ?? null
		}

		if (Array.isArray(data)) {
			return mapper.fromEntities ? mapper.fromEntities(data) : data.map((item) => mapper.fromEntity(item))
		}

		return mapper.fromEntity(data)
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
