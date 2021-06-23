import {configuration, configurable} from '../../src'

@configuration()
export class HttpConfiguration {
	@configurable({
		doc: 'The port on which the server listens.',
		format: 'port',
		env: 'PORT'
	})
	port = 8080

	@configurable<string>({
		doc: 'The folder from which static files will be served.',
		format: String,
		env: 'STATIC_FILE_DIRECTORY',
		result(value: string) {
			return value.toLowerCase()
		}
	})
	staticFileDirectory = './static'
}
