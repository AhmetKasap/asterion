import { ClassConstructor } from "class-transformer"

import { createParamDecorator } from "./param.decorator"

/**
 * @Body() request body'yi olduğu gibi verir.
 * @Body(CreateUserDto) verilirse, route çalışmadan önce body class-validator
 * ile doğrulanır; hatalıysa UnprocessableEntityException fırlatılır.
 */
export function Body(dtoClass?: ClassConstructor<unknown>): ParameterDecorator {
	return createParamDecorator("body", undefined, dtoClass)
}
