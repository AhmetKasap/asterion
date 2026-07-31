import { inject, injectable } from "inversify"
import mongoose from "mongoose"
import { Config } from "../../../config/config"
import { SERVICE_TYPES } from "../../../core/di/service.types"

@injectable()
export class MongoConnection {
	constructor(
		@inject(SERVICE_TYPES.Config)
		private readonly config: Config
	) {}

	async connect(): Promise<void> {
		await mongoose.connect(this.config.mongo.uri!)

		console.log("MongoDB connected")
	}

	async disconnect() {
		await mongoose.disconnect()

		console.log("MongoDB disconnected")
	}
}
