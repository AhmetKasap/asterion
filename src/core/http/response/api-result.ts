import { PaginationMeta } from "./api-response"

/**
 * Controller, varsayılan mesaj/pagination'ı yeterli bulmadığında bunun yerine
 * ApiResult döndürebilir. RouterRegister bunu tanır ve ResponseBuilder'a
 * uygun şekilde iletir. Normal durumda (çoğu endpoint) buna hiç gerek yoktur;
 * entity/DTO'yu doğrudan return etmek yeterlidir.
 *
 * @example
 * return ApiResult.of(user, "Kullanıcı oluşturuldu")
 * return ApiResult.paginated(users, { page, limit, total, totalPages })
 */
export class ApiResult<T = unknown> {
	private constructor(
		public readonly result: T,
		public readonly message: string | undefined = undefined,
		public readonly pagination: PaginationMeta | undefined = undefined
	) {}

	static of<T>(result: T, message?: string): ApiResult<T> {
		return new ApiResult(result, message)
	}

	static paginated<T>(result: T[], pagination: PaginationMeta, message?: string): ApiResult<T[]> {
		return new ApiResult(result, message, pagination)
	}
}
