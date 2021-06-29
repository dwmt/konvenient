import { RouteOptions } from "fastify";
import { injectable } from "inversify";
import { Controller } from "../../web/Controller";

@injectable()
export class IntrospectionController implements Controller {
    routes(): RouteOptions[] {
        return [
            {
                method: 'GET',
                url: '/healthcheck',
                handler: this.getHealthcheck.bind(this)
            }
        ]
    }

    async getHealthcheck() {
        return 'ok'
    }
}