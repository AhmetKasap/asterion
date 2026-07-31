import { createParamDecorator } from "./param.decorator"

export function Body(): ParameterDecorator {
	return createParamDecorator("body")
}
