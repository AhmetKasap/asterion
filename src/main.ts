import { Application } from "./core/application/application"

Application.run().catch((error) => {
	console.error("Application failed", error)

	process.exit(1)
})
