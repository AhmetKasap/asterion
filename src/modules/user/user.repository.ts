import { injectable } from "inversify"

import { BaseRepository } from "@/core/database/repository/base.repository"

import { UserDocument, UserModel } from "./schemas/user.schema"

@injectable()
export class UserRepository extends BaseRepository<UserDocument> {
	constructor() {
		super(UserModel)
	}

	async findByEmail(email: string) {
		return UserModel.findOne({
			email
		}).exec()
	}
}
