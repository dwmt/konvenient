import {container} from './inversify.config'
import {HttpServer} from './server'

const server = container.get<HttpServer>(HttpServer)

console.log(server.getPort())
