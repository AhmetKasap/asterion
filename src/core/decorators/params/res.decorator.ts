import { createParamDecorator } from "./param.decorator"

export function Res(): ParameterDecorator {
	return createParamDecorator("res")
}
