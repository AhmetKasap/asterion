export interface PaginationMeta {
	page: number
	limit: number
	total: number
	totalPages: number
}

/**
 * Tüm HTTP response'ların ortak zarfı (envelope). RouterRegister tarafından
 * her route için otomatik uygulanır; controller/service bunu bilmek zorunda değildir.
 */
export interface ApiResponse<T = unknown> {
	success: boolean
	message: string
	result: T | null
	pagination?: PaginationMeta
	errors?: Record<string, string[]>
}
