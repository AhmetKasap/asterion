import { Expose } from "class-transformer"

//!class olmak zorunda çünkü response decorator için kullanılır
export class UserResponseDto {
	@Expose()
	id!: string

	@Expose()
	name!: string

	@Expose()
	email!: string

	@Expose()
	role!: string

	@Expose()
	createdAt!: Date

	@Expose()
	updatedAt!: Date
}
