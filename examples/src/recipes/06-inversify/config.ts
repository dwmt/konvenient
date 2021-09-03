import {Configuration, Configurable} from 'konvenient'

@Configuration()
export class HttpConfiguration {
  // File key: http.port
  // Env name: PORT
  @Configurable({
    doc: 'The port on which the server listens.',
    format: 'port',
    env: 'PORT',
  })
  port = 8080

  // File key: http.staticFileDirectory
  // Env name: STATIC_FILE_DIRECTORY
  @Configurable<string>({
    doc: 'The folder from which static files will be served.',
    format: String,
    env: 'STATIC_FILE_DIRECTORY',
    result(value: string) {
      return value.toLowerCase()
    },
  })
  staticFileDirectory = './STATIC'
}
