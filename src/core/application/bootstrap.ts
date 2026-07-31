import { Container, inject, injectable } from "inversify"

import { SERVICE_TYPES } from "../di/service.types"
import { ExpressFactory } from "../http/express.factory"
import { ServerFactory } from "../http/server.factory"
import { errorHandler } from "../middlewares/error-handler.middleware"
import { RouterExplorer } from "../router/router.explorer"
import { CONTROLLERS } from "../router/router.module"
import { RouterRegister } from "../router/router.register"
import { Config } from "@/config/config"
import { MongoConnection } from "@/infrastructure/database/mongo/mongo.connection"

@injectable()
export class Bootstrap {
	constructor(
		@inject(SERVICE_TYPES.ExpressFactory)
		private readonly expressFactory: ExpressFactory,

		@inject(SERVICE_TYPES.ServerFactory)
		private readonly serverFactory: ServerFactory,
		@inject(SERVICE_TYPES.Config)
		private readonly config: Config,
		@inject(SERVICE_TYPES.MongoConnection)
		private readonly mongoConnection: MongoConnection,

		@inject(SERVICE_TYPES.RouterExplorer)
		private readonly routerExplorer: RouterExplorer,

		@inject(SERVICE_TYPES.RouterRegister)
		private readonly routerRegister: RouterRegister,

		@inject(SERVICE_TYPES.Container)
		private readonly container: Container
	) {}

	async start() {
		await this.mongoConnection.connect()

		const app = this.expressFactory.create()

		CONTROLLERS.forEach((controller) => {
			const explored = this.routerExplorer.explore(this.container, controller)

			this.routerRegister.register(app, explored)
		})

		app.use(errorHandler)

		const server = this.serverFactory.create(app)

		await new Promise<void>((resolve, reject) => {
			server.once("error", reject)

			server.listen(this.config.port, () => {
				console.log(`Server running ${this.config.port}`)

				resolve()
			})
		})
	}
}
