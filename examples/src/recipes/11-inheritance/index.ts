import {Configuration, Configurable, configurator} from 'konvenient';

configurator.withSources([`${__dirname}/config.json`]);

@Configuration()
class GrandparentConfiguration {
	// File key: grandparent.port
	@Configurable({
		doc: 'The port on which the server listens.',
		format: 'port',
		neverLoadFromEnv: true,
	})
	port = 8080;
}

@Configuration()
class ParentConfiguration extends GrandparentConfiguration {
	// For the inherited port property, this class has
	// File key: parent.port
}

@Configuration()
class ChildConfiguration extends ParentConfiguration {
	// For the inherited port property, this class has
	// File key: child.port
}

const grandParentConfig = new GrandparentConfiguration()
const parentConfig = new ParentConfiguration()
const childConfig = new ChildConfiguration()

console.log(grandParentConfig.port);
console.log(parentConfig.port);
console.log(childConfig.port);
