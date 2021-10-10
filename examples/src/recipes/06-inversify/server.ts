import {HttpConfiguration} from './config'
import {injectable} from "inversify";

@injectable()
export class HttpServer {
  private readonly config: HttpConfiguration

  constructor(config: HttpConfiguration) {
    this.config = config
  }

  getPort() {
    return this.config.port
  }

  getStaticFileDirectory() {
    return this.config.staticFileDirectory
  }
}
