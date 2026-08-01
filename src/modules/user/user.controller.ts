import { inject, injectable } from "inversify"

import { Controller, Post } from "@/core/decorators/http"
import { Body,  } from "@/core/decorators/params"
import { SERVICE_TYPES } from "@/core/di/service.types"


import { UserService } from "./user.service"
import { CreateUserDto } from "./dto/user.dto"
import { IUserResponse } from "./dto/user.response.dto"

@injectable()
@Controller("/users")
export class UserController {
	constructor(
		@inject(SERVICE_TYPES.UserService)
		private readonly userService: UserService
	) {}

	@Post("/")
	async create(@Body() body: CreateUserDto) : Promise<IUserResponse> {
		const user = await this.userService.create(body)
		return {
			id: user._id.toString(),
			name: user.name,
			email: user.email,
			role: user.role,
			createdAt: user.createdAt ?? new Date(),
			updatedAt: user.updatedAt ?? new Date()
		}
	}

}
