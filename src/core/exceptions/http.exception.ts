export class HttpException extends Error {
	constructor(
		public readonly statusCode: number,
		message: string
	) {
		super(message)

		this.name = "HttpException"
	}
}

export class BadRequestException extends HttpException {
	constructor(message = "Bad request") {
		super(400, message)

		this.name = "BadRequestException"
	}
}

export class UnauthorizedException extends HttpException {
	constructor(message = "Unauthorized") {
		super(401, message)

		this.name = "UnauthorizedException"
	}
}

export class ForbiddenException extends HttpException {
	constructor(message = "Forbidden") {
		super(403, message)

		this.name = "ForbiddenException"
	}
}

export class NotFoundException extends HttpException {
	constructor(message = "Resource not found") {
		super(404, message)

		this.name = "NotFoundException"
	}
}

export class ConflictException extends HttpException {
	constructor(message = "Resource already exists") {
		super(409, message)

		this.name = "ConflictException"
	}
}

/**
 * Alan bazlı doğrulama hataları için (class-validator ya da Mongoose
 * ValidationError'dan normalize edilerek üretilir). `errors`, her alanın
 * hangi kurallarda başarısız olduğunu taşır: { email: ["email geçerli değil"] }
 */
export class UnprocessableEntityException extends HttpException {
	constructor(
		message = "Validation failed",
		public readonly errors: Record<string, string[]> | undefined = undefined
	) {
		super(422, message)

		this.name = "UnprocessableEntityException"
	}
}
