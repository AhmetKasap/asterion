import { IsString, IsEmail, IsNotEmpty } from "class-validator"
export interface IUser{
    name: string
    email: string
    password: string
    role: string

}

export interface ICreateUserDto extends Omit<IUser, "role"> { }

export class CreateUserDto implements ICreateUserDto {
    @IsString()
    @IsNotEmpty()
    name!: string

    @IsEmail()
    @IsNotEmpty()
    email!: string

    @IsString()
    @IsNotEmpty()
    password!: string
    
}