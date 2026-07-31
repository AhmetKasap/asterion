import { ICreateUserDto, IUser } from "../user.dto";

export interface IUserController {
    create(user: ICreateUserDto): Promise<IUser>
}
