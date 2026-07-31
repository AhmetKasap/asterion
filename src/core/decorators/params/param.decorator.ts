import { METADATA_KEYS } from "../../metadata/metadata.keys"

export type ParamSource = "body" | "param" | "query" | "req" | "res"

export interface ParamMetadata {
	index: number
	source: ParamSource
	key?: string
}

export function createParamDecorator(source: ParamSource, key?: string): ParameterDecorator {
	return (target, propertyKey, index) => {
		if (propertyKey === undefined) {
			return
		}

		const existing: ParamMetadata[] =
			Reflect.getMetadata(METADATA_KEYS.PARAMS, target.constructor, propertyKey) || []

		existing.push({
			index,

			source,

			...(key !== undefined ? { key } : {})
		})

		Reflect.defineMetadata(METADATA_KEYS.PARAMS, existing, target.constructor, propertyKey)
	}
}
