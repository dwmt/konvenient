import {configuration, configurable} from 'konvenient'

@configuration()
class HttpConfiguration {
	@configurable({
		doc: 'The port on which the server listens.',
		format: 'port',
		env: 'PORT'
	})
	port = 8080
}

const config = new HttpConfiguration()

console.log(config.port)
