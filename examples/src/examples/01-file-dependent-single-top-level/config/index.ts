import {Configuration, Configurable, configurator, Nested} from 'konvenient'

configurator.withSources([`${__dirname}/${process.env['NODE_ENV']}.json`])

export enum Environments {
    Development = 'dev',
    Production = 'prod'
}

@Configuration()
export class GreetingConfiguration {
    @Configurable({
        doc: 'The greeting message returned on requests.',
        format: String
    })
    message = 'CHANGEME'
}

@Configuration({
    pathPrefix: ''
})
export class ApplicationConfiguration {
    @Configurable({
        doc: 'The current environment the application is running in.',
        format: Object.values(Environments),
        env: 'NODE_ENV'
    })
    env = Environments.Production

    isProd(): boolean {
        return this.env == Environments.Production
    }

	@Configurable({
		doc: 'The port on which the server listens.',
		format: 'port',
		env: 'PORT'
	})
	port = 8080

    @Nested()
    greeting = new GreetingConfiguration()
}

export const config = new ApplicationConfiguration()
