import {configuration, configurable} from 'konvenient'

@configuration()
class HttpConfiguration {
	@configurable<number>({
		doc: 'The port on which the server listens.',
		format: 'port',
		env: 'PORT',
        result(value: number) {
            return value + 1
        }
	})
	port = 8080
}

const config = new HttpConfiguration()

console.log(config.port)
