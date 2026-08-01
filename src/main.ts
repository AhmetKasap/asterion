import { Application } from "./core/application/application"

process.on("unhandledRejection", (reason) => {
	console.error("Unhandled Rejection:", reason)
})

process.on("uncaughtException", (error) => {
	console.error("Uncaught Exception:", error)

	process.exit(1)
})

Application.run().catch((error) => {
	console.error("Application failed", error)

	process.exit(1)
})
