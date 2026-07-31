import { Model, Document } from "mongoose"

import { IRepository } from "./repository.interface"

export abstract class BaseRepository<
	T extends Document
> implements IRepository<T> {
	constructor(protected readonly model: Model<T>) {}

	async findById(id: string) {
		return this.model.findById(id).exec()
	}

	async findAll() {
		return this.model.find().exec()
	}

	async create(data: Partial<T>) {
		return this.model.create(data)
	}

	async update(id: string, data: Partial<T>) {
		return this.model
			.findByIdAndUpdate(id, data, {
				new: true
			})
			.exec()
	}

	async delete(id: string) {
		await this.model.findByIdAndDelete(id).exec()
	}
}
