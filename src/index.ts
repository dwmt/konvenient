import { config, configurable, loadConfiguration } from "./convenient"

@config
class HttpConfiguration {
	@configurable({
		doc: 'The port on which the server listens.',
		format: 'port',
		env: 'PORT'
	})
	port = 8080

	@configurable({
		doc: 'The folder from which static files will be served.',
		format: String,
		env: 'STATIC_FILE_DIRECTORY'
	})
	staticFileDirectory = './static'
}

loadConfiguration()

const httpConfig = new HttpConfiguration()

console.log(`Listening on port: ${httpConfig.port}`)
console.log(`Serving static files from: ${httpConfig.staticFileDirectory}`)
