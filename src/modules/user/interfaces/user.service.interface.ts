import { UserDocument } from "../schemas/user.schema"
import { CreateUserDto } from "../dto/user.dto"

export interface IUserService {
	create(user: CreateUserDto): Promise<UserDocument>
}