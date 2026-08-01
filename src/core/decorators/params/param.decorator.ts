import { ClassConstructor } from "class-transformer"

import { METADATA_KEYS } from "../../metadata/metadata.keys"

export type ParamSource = "body" | "param" | "query" | "req" | "res"

export interface ParamMetadata {
	index: number
	source: ParamSource
	key?: string
	dtoClass?: ClassConstructor<unknown>
}

export function createParamDecorator(
	source: ParamSource,
	key?: string,
	dtoClass?: ClassConstructor<unknown>
): ParameterDecorator {
	return (target, propertyKey, index) => {
		if (propertyKey === undefined) {
			return
		}

		const existing: ParamMetadata[] =
			Reflect.getMetadata(METADATA_KEYS.PARAMS, target.constructor, propertyKey) || []

		existing.push({
			index,

			source,

			...(key !== undefined ? { key } : {}),

			...(dtoClass !== undefined ? { dtoClass } : {})
		})

		Reflect.defineMetadata(METADATA_KEYS.PARAMS, existing, target.constructor, propertyKey)
	}
}
