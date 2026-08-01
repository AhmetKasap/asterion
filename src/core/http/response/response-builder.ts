import { ApiResponse, PaginationMeta } from "./api-response"

/**
 * Proje genelinde tüm response'ların { success, message, result, pagination }
 * formatında tek tip basılmasını sağlayan builder. RouterRegister başarılı her
 * response'u, errorHandler ise her hatayı bunun üzerinden üretir.
 */
export class ResponseBuilder {
	static success<T>(result: T, message = "İşlem başarılı", pagination?: PaginationMeta): ApiResponse<T> {
		return {
			success: true,
			message,
			result,
			...(pagination !== undefined ? { pagination } : {})
		}
	}

	static paginated<T>(result: T[], pagination: PaginationMeta, message = "İşlem başarılı"): ApiResponse<T[]> {
		return ResponseBuilder.success(result, message, pagination)
	}

	static error(message: string): ApiResponse<null> {
		return {
			success: false,
			message,
			result: null
		}
	}
}
