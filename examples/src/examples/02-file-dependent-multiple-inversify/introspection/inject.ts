import {Container} from 'inversify';
import {Controller, TYPE as ControllerType} from '../web/Controller';
import {IntrospectionController} from './web/IntrospectionController';

export function inject(container: Container) {
	container
		.bind<Controller>(ControllerType)
		.to(IntrospectionController)
		.inSingletonScope();
}
