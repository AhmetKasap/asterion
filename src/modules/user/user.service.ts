import { inject, injectable } from "inversify"

import { SERVICE_TYPES } from "@/core/di/service.types"

import { UserRepository } from "./user.repository"
import { CreateUserDto } from "./dto/user.dto"
import { IUserService } from "./interfaces/user.service.interface"
import { UserDocument } from "./schemas/user.schema"

@injectable()
export class UserService implements IUserService {
	constructor(
		@inject(SERVICE_TYPES.UserRepository)
		private readonly userRepository: UserRepository
	) {}

	async create(data: CreateUserDto): Promise<UserDocument> {
		return this.userRepository.create({
			name: data.name,
			email: data.email,
			password: data.password,
			role: "user"
		})
	}
}
