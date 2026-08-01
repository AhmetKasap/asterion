import { inject, injectable } from "inversify"

import { Controller, Post, Response } from "@/core/decorators/http"
import { Body } from "@/core/decorators/params"
import { SERVICE_TYPES } from "@/core/di/service.types"

import { UserService } from "./user.service"
import { CreateUserDto } from "./dto/user.dto"
import { UserResponseDto } from "./dto/user.response.dto"

@injectable()
@Controller("/api/v1/users")
export class UserController {
	constructor(
		@inject(SERVICE_TYPES.UserService)
		private readonly userService: UserService
	) {}

	@Post("/")
	@Response(UserResponseDto)
	async create(@Body(CreateUserDto) body: CreateUserDto) {
		return this.userService.create(body)
	}
}
