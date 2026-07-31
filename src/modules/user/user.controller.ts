import { inject, injectable } from "inversify"

import { Controller, Delete, Get, Post, Put } from "@/core/decorators/http"
import { Body, Param } from "@/core/decorators/params"
import { SERVICE_TYPES } from "@/core/di/service.types"


import { UserService } from "./user.service"
import { IUserController } from "./interfaces/user.controller.interface"
import { ICreateUserDto, IUser } from "./user.dto"

@injectable()
@Controller("/users")
export class UserController implements IUserController {
	constructor(
		@inject(SERVICE_TYPES.UserService)
		private readonly userService: UserService
	) {}

	

	@Post("/")
	async create(@Body() body: ICreateUserDto) : Promise<IUser> {
		return await this.userService.create(body)
	}

}
