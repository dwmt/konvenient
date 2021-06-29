import {Configuration, Configurable} from 'konvenient'

@Configuration()
class HttpConfiguration {
	@Configurable({
		doc: 'The port on which the server listens.',
		format: 'port',
		env: 'PORT'
	})
	port = 8080
}

const config = new HttpConfiguration()

console.log(config.port)
