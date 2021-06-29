import {Configuration, Configurable, configurator} from 'konvenient'

configurator.withSources([`${__dirname}/config.json`])

@Configuration()
class HttpConfiguration {
	// File key: http.port
	// Env name: PORT
	@Configurable({
		doc: 'The port on which the server listens.',
		format: 'port',
		neverLoadFromEnv: true
	})
	port = 8080
}

const config = new HttpConfiguration()

console.log(config.port)
