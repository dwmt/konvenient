import {Configuration, Configurable, configurator} from 'konvenient';

configurator.withSources([`${__dirname}/${process.env['NODE_ENV']}.json`]);

export enum Environments {
	Development = 'dev',
	Production = 'prod',
}

@Configuration({
	pathPrefix: '',
})
export class GlobalConfiguration {
	// File key: env
	// Env name: NODE_ENV
	@Configurable({
		doc: 'The current environment the application is running in.',
		format: Object.values(Environments),
		env: 'NODE_ENV',
	})
	env = Environments.Production;

	isProd(): boolean {
		return this.env == Environments.Production;
	}
}

@Configuration()
export class DatabaseConfiguration {
	// File key: database.connectionString
	// Env name: DATABASE_CONNECTION_STRING
	@Configurable({
		doc: 'The greeting message returned on requests.',
		format: String,
	})
	connectionString = 'mongo://localhost:27017';
}

@Configuration()
export class HttpConfiguration {
	// File key: http.port
	// Env name: PORT
	@Configurable({
		doc: 'The port on which the server listens.',
		format: 'port',
		env: 'PORT',
	})
	port = 8080;
}
