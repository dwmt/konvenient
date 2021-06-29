import fastify from 'fastify'
import { inject } from './inject';
import { HttpConfiguration } from './config';
import { Controller, TYPE as ControllerType } from './web/Controller';

const container = inject()

const server = fastify()

container.getAll<Controller>(ControllerType)
    .map(c => c.routes())
    .flat()
    .forEach(route => server.route(route as any))

const httpConfig = container.get<HttpConfiguration>(HttpConfiguration)
    
server.listen(httpConfig.port, (err, address) => {
    if (err) {
      console.error(err)

      process.exit(1)
    }

    console.log(`Server listening at ${address}`)
})
