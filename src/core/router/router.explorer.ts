import { Container, injectable } from "inversify"

import { METADATA_KEYS } from "../metadata/metadata.keys"
import { ParamMetadata } from "../decorators/params/param.decorator"
import { ResponseMapper } from "../decorators/http/response.decorator"
import { ExploredController, RouteDefinition } from "./router.types"

@injectable()
export class RouterExplorer {
	explore(
		container: Container,
		controller: new (...args: any[]) => object
	): ExploredController {
		const instance = container.get(controller) as Record<
			string,
			(...args: unknown[]) => unknown
		>

		const basePath: string = Reflect.getMetadata(METADATA_KEYS.BASE_PATH, controller) || ""

		const rawRoutes: Array<Omit<RouteDefinition, "params">> =
			Reflect.getMetadata(METADATA_KEYS.ROUTES, controller) || []

		const routes: RouteDefinition[] = rawRoutes.map((route) => {
			const params: ParamMetadata[] =
				Reflect.getMetadata(METADATA_KEYS.PARAMS, controller, route.handler) || []

			const responseMapper: ResponseMapper | undefined =
				Reflect.getMetadata(METADATA_KEYS.RESPONSE_MAPPER, controller, route.handler)

			return {
				...route,

				params,

				...(responseMapper !== undefined ? { responseMapper } : {})
			}
		})

		return {
			instance,

			basePath,

			routes
		}
	}
}
