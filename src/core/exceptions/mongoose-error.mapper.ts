import mongoose from "mongoose"

import { BadRequestException, ConflictException, HttpException, UnprocessableEntityException } from "./http.exception"

/**
 * Ham Mongoose/MongoDB sürücü hatalarını proje içindeki HttpException
 * hiyerarşisine çevirir. errorHandler her hatayı buradan geçirir; zaten
 * bir HttpException ise (NotFoundException, ConflictException, ...)
 * dokunmadan geri döner.
 */
export function normalizeMongooseError(error: unknown): unknown {
	if (error instanceof HttpException) {
		return error
	}

	if (error instanceof mongoose.Error.ValidationError) {
		const errors: Record<string, string[]> = {}

		for (const [field, fieldError] of Object.entries(error.errors)) {
			errors[field] = [fieldError.message]
		}

		return new UnprocessableEntityException("Validation failed", errors)
	}

	if (error instanceof mongoose.Error.CastError) {
		return new BadRequestException(`Invalid value for field "${error.path}"`)
	}

	if (error instanceof mongoose.mongo.MongoServerError && error.code === 11000) {
		const field = Object.keys(error.keyPattern ?? {})[0] ?? "field"

		return new ConflictException(`"${field}" already in use`)
	}

	return error
}
