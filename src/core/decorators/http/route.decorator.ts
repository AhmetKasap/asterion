import { METADATA_KEYS } from "../../metadata/metadata.keys"

export function Route(method: string, path: string): MethodDecorator {
	return (target, propertyKey) => {
		const routes =
			Reflect.getMetadata(METADATA_KEYS.ROUTES, target.constructor) || []

		routes.push({
			method,

			path,

			handler: propertyKey
		})

		Reflect.defineMetadata(METADATA_KEYS.ROUTES, routes, target.constructor)
	}
}
