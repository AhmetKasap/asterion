import { injectable } from "inversify"
import express, { Express } from "express"
import cors from "cors"

@injectable()
export class ExpressFactory {
	create(): Express {
		const app = express()

		app.use(cors())

		app.use(express.json())

		app.use(
			express.urlencoded({
				extended: true
			})
		)

		return app
	}
}
