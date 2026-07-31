import { injectable } from "inversify"
import { createServer } from "http"
import { Express } from "express"

@injectable()
export class ServerFactory {
	create(app: Express) {
		return createServer(app)
	}
}
