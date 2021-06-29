import {Configuration, Configurable, Nested} from 'konvenient'

@Configuration()
class AuthConfiguration {
    @Configurable({
		doc: 'Super-duper secret token used for authentication.',
		format: String,
		env: 'SUPER_DUPER_SECRET'
	})
	secret = 'CHANGEME'

	get secretLongEnough() {
		return this.secret.length > 3
	}
}

@Configuration()
class HttpConfiguration {
	@Configurable<number>({
		doc: 'The port on which the server listens.',
		format: 'port',
		env: 'PORT',
        result(value: number) {
            return value + 1
        }
	})
	port = 8080

	@Nested()
    auth = new AuthConfiguration()
}

const http = new HttpConfiguration()

console.log(http.port)
console.log(http.auth.secretLongEnough)

