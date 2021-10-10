import 'reflect-metadata'
import {HttpConfiguration} from './config'
import {HttpServer} from './server'
import {Container} from "inversify";

const container = new Container()

container.bind<HttpConfiguration>(HttpConfiguration).toSelf().inSingletonScope()
container.bind<HttpServer>(HttpServer).toSelf().inSingletonScope()

export {container}
