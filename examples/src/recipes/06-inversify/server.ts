import {injectable} from 'inversify';
import {HttpConfiguration} from './config';

@injectable()
export class HttpServer {
	private readonly config: HttpConfiguration;

	constructor(config: HttpConfiguration) {
		this.config = config;
	}

	getPort() {
		return this.config.port;
	}

	getStaticFileDirectory() {
		return this.config.staticFileDirectory;
	}
}
