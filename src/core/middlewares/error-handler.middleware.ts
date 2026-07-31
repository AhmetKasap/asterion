import { NextFunction, Request, Response } from "express"

import { HttpException } from "../exceptions/http.exception"

export function errorHandler(error: unknown, _req: Request, res: Response, _next: NextFunction) {
	if (error instanceof HttpException) {
		res.status(error.statusCode).json({
			message: error.message
		})

		return
	}

	console.error(error)

	res.status(500).json({
		message: "Internal server error"
	})
}
