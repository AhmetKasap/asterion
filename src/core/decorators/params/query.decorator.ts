import { createParamDecorator } from "./param.decorator"

export function Query(key?: string): ParameterDecorator {
	return createParamDecorator("query", key)
}
