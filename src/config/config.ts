import { injectable } from "inversify"
import { env } from "./env"

@injectable()
export class Config {
	get port(): number {
		return env.PORT
	}

	get environment(): string {
		return env.NODE_ENV
	}

	get mongo() {
		return {
			uri: env.MONGO_URI
		}
	}
}
