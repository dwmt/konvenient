import {configuration, configurable, configurator, nested} from 'konvenient'

configurator.withSources([`${__dirname}/${process.env['NODE_ENV']}.json`])

export enum Environments {
    Development = 'dev',
    Production = 'prod'
}

@configuration()
export class GreetingConfiguration {
    @configurable({
        doc: 'The greeting message returned on requests.',
        format: String
    })
    message = 'CHANGEME'
}

@configuration({
    pathPrefix: ''
})
export class ApplicationConfiguration {
    @configurable({
        doc: 'The current environment the application is running in.',
        format: Object.values(Environments),
        env: 'NODE_ENV'
    })
    env = Environments.Production

    isProd(): boolean {
        return this.env == Environments.Production
    }

	@configurable({
		doc: 'The port on which the server listens.',
		format: 'port',
		env: 'PORT'
	})
	port = 8080

    @nested()
    greeting = new GreetingConfiguration()
}

export const config = new ApplicationConfiguration()
