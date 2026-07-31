import { ParamMetadata } from "../decorators/params/param.decorator"

export interface RouteDefinition {
	method: "get" | "post" | "put" | "delete" | "patch"
	path: string
	handler: string | symbol
	params: ParamMetadata[]
}

export interface ExploredController {
	instance: Record<string, (...args: unknown[]) => unknown>
	basePath: string
	routes: RouteDefinition[]
}
