import { UserDocument } from "../schemas/user.schema"
import { IUserResponse } from "../dto/user.response.dto"

/**
 * UserDocument (entity) -> IUserResponse (API sözleşmesi) dönüşümü.
 * @Response(UserResponseBuilder) ile route seviyesinde otomatik uygulanır;
 * controller'ın bu dönüşümü elle yapmasına gerek kalmaz.
 */
export class UserResponseBuilder {
	static fromEntity(user: UserDocument): IUserResponse {
		return {
			id: user._id.toString(),
			name: user.name,
			email: user.email,
			role: user.role,
			createdAt: user.createdAt,
			updatedAt: user.updatedAt
		}
	}

	static fromEntities(users: UserDocument[]): IUserResponse[] {
		return users.map((user) => UserResponseBuilder.fromEntity(user))
	}
}
