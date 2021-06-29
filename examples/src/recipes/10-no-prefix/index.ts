import {Configuration, Configurable, configurator} from 'konvenient'

configurator.withSources([`${__dirname}/config.json`])

@Configuration({
    pathPrefix: ''
})
class HttpConfiguration {
	@Configurable({
		doc: 'The port on which the server listens.',
		format: 'port',
		neverLoadFromEnv: true
	})
	port = 8080
}

const config = new HttpConfiguration()

console.log(config.port)
