import {configuration, configurable, nested} from 'konvenient'

@configuration()
class AuthConfiguration {
    @configurable({
		doc: 'Super-duper secret token used for authentication.',
		format: String,
		env: 'SUPER_DUPER_SECRET'
	})
	secret = 'CHANGEME'

	get secretLongEnough() {
		return this.secret.length > 3
	}
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

	@nested()
    auth = new AuthConfiguration()
}

const http = new HttpConfiguration()

console.log(http.port)
console.log(http.auth.secretLongEnough)

