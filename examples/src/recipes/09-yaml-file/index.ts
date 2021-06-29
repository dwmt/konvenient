import yaml from 'js-yaml'
import {configuration, configurable, configurator, convict} from 'konvenient'

convict.addParser({ extension: ['yml', 'yaml'], parse: yaml.load });

configurator.withSources([`${__dirname}/config.yml`])

@configuration()
class HttpConfiguration {
	@configurable({
		doc: 'The port on which the server listens.',
		format: 'port',
		neverLoadFromEnv: true
	})
	port = 8080
}

const config = new HttpConfiguration()

console.log(config.port)
