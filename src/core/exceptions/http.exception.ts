export class HttpException extends Error {
	constructor(
		public readonly statusCode: number,
		message: string
	) {
		super(message)

		this.name = "HttpException"
	}
}

export class NotFoundException extends HttpException {
	constructor(message = "Resource not found") {
		super(404, message)

		this.name = "NotFoundException"
	}
}

export class BadRequestException extends HttpException {
	constructor(message = "Bad request") {
		super(400, message)

		this.name = "BadRequestException"
	}
}
