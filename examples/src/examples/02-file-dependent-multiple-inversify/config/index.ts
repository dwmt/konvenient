import {configuration, configurable, configurator} from 'konvenient'

configurator.withSources([`${__dirname}/${process.env['NODE_ENV']}.json`])

export enum Environments {
    Development = 'dev',
    Production = 'prod'
}

@configuration({
    pathPrefix: ''
})
export class GlobalConfiguration {
    @configurable({
        doc: 'The current environment the application is running in.',
        format: Object.values(Environments),
        env: 'NODE_ENV'
    })
    env = Environments.Production

    isProd(): boolean {
        return this.env == Environments.Production
    }
}

@configuration()
export class DatabaseConfiguration {
    @configurable({
        doc: 'The greeting message returned on requests.',
        format: String
    })
    connectionString = 'mongo://localhost:27017'
}

@configuration()
export class HttpConfiguration {
	@configurable({
		doc: 'The port on which the server listens.',
		format: 'port',
		env: 'PORT'
	})
	port = 8080
}
