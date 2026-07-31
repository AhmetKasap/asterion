import { Container } from "inversify"

import { SERVICE_TYPES } from "./service.types"

import { Bootstrap } from "../application/bootstrap"
import { ExpressFactory } from "../http/express.factory"
import { ServerFactory } from "../http/server.factory"
import { RouterExplorer } from "../router/router.explorer"
import { RouterRegister } from "../router/router.register"
import { Config } from "@/config/config"
import { MongoConnection } from "@/infrastructure/database/mongo/mongo.connection"
import { UserController } from "@/modules/user/user.controller"
import { UserRepository } from "@/modules/user/user.repository"
import { UserService } from "@/modules/user/user.service"

const container = new Container()

container.bind(SERVICE_TYPES.Bootstrap).to(Bootstrap)

container.bind(SERVICE_TYPES.ExpressFactory).to(ExpressFactory)

container.bind(SERVICE_TYPES.ServerFactory).to(ServerFactory)

container.bind(SERVICE_TYPES.Config).to(Config)

container.bind(SERVICE_TYPES.MongoConnection).to(MongoConnection)

container.bind(SERVICE_TYPES.RouterExplorer).to(RouterExplorer)

container.bind(SERVICE_TYPES.RouterRegister).to(RouterRegister)

container.bind(SERVICE_TYPES.UserRepository).to(UserRepository)

container.bind(SERVICE_TYPES.UserService).to(UserService)

container.bind(UserController).toSelf()

container.bind(SERVICE_TYPES.Container).toConstantValue(container)

export { container }
