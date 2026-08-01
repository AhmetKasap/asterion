import { NextFunction, Request, Response } from "express"

import { HttpException, UnprocessableEntityException } from "../exceptions/http.exception"
import { normalizeMongooseError } from "../exceptions/mongoose-error.mapper"
import { ResponseBuilder } from "../http/response/response-builder"

export function errorHandler(error: unknown, _req: Request, res: Response, _next: NextFunction) {
	const normalized = normalizeMongooseError(error)

	if (normalized instanceof UnprocessableEntityException) {
		res.status(normalized.statusCode).json(ResponseBuilder.error(normalized.message, normalized.errors))

		return
	}

	if (normalized instanceof HttpException) {
		res.status(normalized.statusCode).json(ResponseBuilder.error(normalized.message))

		return
	}

	console.error(error)

	res.status(500).json(ResponseBuilder.error("Internal server error"))
}
