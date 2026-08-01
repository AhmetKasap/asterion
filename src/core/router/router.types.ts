import { ParamMetadata } from "../decorators/params/param.decorator"
import { ResponseMapper } from "../decorators/http/response.decorator"

export interface RouteDefinition {
	method: "get" | "post" | "put" | "delete" | "patch"
	path: string
	handler: string | symbol
	params: ParamMetadata[]
	responseMapper?: ResponseMapper
}

export interface ExploredController {
	instance: Record<string, (...args: unknown[]) => unknown>
	basePath: string
	routes: RouteDefinition[]
}
