import { ICreateUserDto, IUser } from "../user.dto"

export interface IUserService {
	create(user: ICreateUserDto): Promise<IUser>
}