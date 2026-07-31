import { container } from "../di/container"
import { SERVICE_TYPES } from "../di/service.types"
import { Bootstrap } from "./bootstrap"

export class Application {
	static async run() {
		const bootstrap = container.get<Bootstrap>(SERVICE_TYPES.Bootstrap)

		await bootstrap.start()
	}
}
