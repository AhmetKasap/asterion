import { ClassConstructor } from "class-transformer"

import { METADATA_KEYS } from "../../metadata/metadata.keys"

/**
 * Controller metodunun döndürdüğü entity/domain veriyi, route çalışırken
 * verilen response DTO sınıfına göre OTOMATİK dönüştürür (class-transformer).
 * DTO'da `@Expose()` ile işaretlenmeyen her alan (password, __v, vb.)
 * otomatik olarak elenir; ekstra bir mapping/builder kodu yazmaya gerek yoktur.
 *
 * @example
 * ```ts
 * export class UserResponseDto {
 *   @Expose() id!: string
 *   @Expose() name!: string
 * }
 *
 * @Post("/")
 * @Response(UserResponseDto)
 * async create(@Body() body: CreateUserDto) {
 *   return this.userService.create(body) // UserDocument döner, dönüşüm otomatik
 * }
 * ```
 */
export function Response<T>(dto: ClassConstructor<T>): MethodDecorator {
	return (target, propertyKey) => {
		Reflect.defineMetadata(METADATA_KEYS.RESPONSE_MAPPER, dto, target.constructor, propertyKey)
	}
}
