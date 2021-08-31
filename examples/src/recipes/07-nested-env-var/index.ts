import {Configuration, Configurable, Nested} from 'konvenient'

@Configuration()
class AuthConfiguration {
  // When accessed on HttpConfiguration.auth, then
  //   File key: http.auth.secret
  //   Env name: HTTP_AUTH_SECRET
  @Configurable({
    doc: 'Super-duper secret token used for authentication.',
    format: String,
  })
  secret = 'CHANGEME'

  get secretLongEnough() {
    return this.secret.length > 3
  }
}

@Configuration()
class HttpConfiguration {
  // File key: http.port
  // Env name: HTTP_PORT
  @Configurable<number>({
    doc: 'The port on which the server listens.',
    format: 'port',
    result(value: number) {
      return value + 1
    },
  })
  port = 8080

  @Nested()
  auth = new AuthConfiguration()
}

const http = new HttpConfiguration()

console.log(http.port)
console.log(http.auth.secretLongEnough)
