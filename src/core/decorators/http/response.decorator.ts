import { METADATA_KEYS } from "../../metadata/metadata.keys"

/**
 * Bir entity/domain nesnesini API response şekline çeviren sınıf sözleşmesi.
 * `UserResponseBuilder` gibi static metotlu builder'lar bu şekli sağlar.
 */
export interface ResponseMapper<TEntity = any, TResponse = any> {
	fromEntity(entity: TEntity): TResponse
	fromEntities?(entities: TEntity[]): TResponse[]
}

/**
 * Controller metodunun döndürdüğü entity/domain veriyi, route çalışırken
 * otomatik olarak verilen mapper üzerinden response DTO'ya çevirir.
 *
 * @example
 * ```ts
 * @Post("/")
 * @Response(UserResponseBuilder)
 * async create(@Body() body: CreateUserDto) {
 *   return this.userService.create(body) // UserDocument döner, mapping otomatik yapılır
 * }
 * ```
 */
export function Response(mapper: ResponseMapper): MethodDecorator {
	return (target, propertyKey) => {
		Reflect.defineMetadata(METADATA_KEYS.RESPONSE_MAPPER, mapper, target.constructor, propertyKey)
	}
}
