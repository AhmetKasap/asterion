import { createParamDecorator } from "./param.decorator"

export function Param(key: string): ParameterDecorator {
	return createParamDecorator("param", key)
}
