import { NextFunction, Request, Response } from "express"

import { HttpException } from "../exceptions/http.exception"
import { ResponseBuilder } from "../http/response/response-builder"

export function errorHandler(error: unknown, _req: Request, res: Response, _next: NextFunction) {
	if (error instanceof HttpException) {
		res.status(error.statusCode).json(ResponseBuilder.error(error.message))

		return
	}

	console.error(error)

	res.status(500).json(ResponseBuilder.error("Internal server error"))
}
