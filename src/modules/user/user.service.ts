import { inject, injectable } from "inversify"

import { SERVICE_TYPES } from "@/core/di/service.types"
import { NotFoundException } from "@/core/exceptions/http.exception"


import { UserRepository } from "./user.repository"

@injectable()
export class UserService {
	constructor(
		@inject(SERVICE_TYPES.UserRepository)
		private readonly userRepository: UserRepository
	) {}

	async findAll() {
		return this.userRepository.findAll()
	}

	async findOne(id: string) {
		const user = await this.userRepository.findById(id)

		if (!user) {
			throw new NotFoundException(`User with id "${id}" not found`)
		}

		return user
	}

	async create(data: CreateUserDto) {
		return this.userRepository.create(data)
	}

	async update(id: string, data: UpdateUserDto) {
		const user = await this.userRepository.update(id, data)

		if (!user) {
			throw new NotFoundException(`User with id "${id}" not found`)
		}

		return user
	}

	async remove(id: string) {
		await this.findOne(id)

		await this.userRepository.delete(id)
	}
}
