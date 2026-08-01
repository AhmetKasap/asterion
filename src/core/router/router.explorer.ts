import { Container, injectable } from "inversify"
import { ClassConstructor } from "class-transformer"

import { METADATA_KEYS } from "../metadata/metadata.keys"
import { ParamMetadata } from "../decorators/params/param.decorator"
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

			const responseDto: ClassConstructor<unknown> | undefined =
				Reflect.getMetadata(METADATA_KEYS.RESPONSE_MAPPER, controller, route.handler)

			return {
				...route,

				params,

				...(responseDto !== undefined ? { responseDto } : {})
			}
		})

		return {
			instance,

			basePath,

			routes
		}
	}
}
