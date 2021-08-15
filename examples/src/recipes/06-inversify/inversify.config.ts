import 'reflect-metadata';
import {Container} from 'inversify';
import {HttpConfiguration} from './config';
import {HttpServer} from './server';

const container = new Container();

container
	.bind<HttpConfiguration>(HttpConfiguration)
	.toSelf()
	.inSingletonScope();
container.bind<HttpServer>(HttpServer).toSelf().inSingletonScope();

export {container};
