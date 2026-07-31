import { Express, NextFunction, Request, Response } from "express"

import { injectable } from "inversify"
import { ExploredController } from "./router.types"

@injectable()
export class RouterRegister {
	register(app: Express, controller: ExploredController) {
		controller.routes.forEach((route) => {
			const fullPath = controller.basePath + route.path

			app[route.method](fullPath, this.createHandler(controller, route))
		})
	}

	private createHandler(controller: ExploredController, route: ExploredController["routes"][number]) {
		return async (req: Request, res: Response, next: NextFunction) => {
			try {
				const args = this.resolveArgs(route, req, res)

				const result = await controller.instance[route.handler as string]?.(...args)

				if (!res.headersSent) {
					res.json((result as unknown as object) ?? {})
				}
			} catch (error) {
				next(error)
			}
		}
	}

	private resolveArgs(route: ExploredController["routes"][number], req: Request, res: Response) {
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
