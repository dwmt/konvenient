import {configuration, configurable} from 'konvenient'

@configuration()
class AuthConfiguration {
    @configurable({
		doc: 'Super-duper secret token used for authentication.',
		format: String,
		env: 'SUPER_DUPER_SECRET'
	})
	secret = 'CHANGEME'
}

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

    auth = new AuthConfiguration()
}

const config = new HttpConfiguration()

console.log(`The secret token is: ${config.auth.secret}`)
