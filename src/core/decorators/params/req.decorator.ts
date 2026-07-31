import { createParamDecorator } from "./param.decorator"

export function Req(): ParameterDecorator {
	return createParamDecorator("req")
}
