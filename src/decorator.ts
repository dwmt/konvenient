import {SchemaObj} from 'convict'
import {libraryConfiguration} from './configuration'
import {
	ConfigurableSchema,
	ConfigurationSchema,
	configLoadedMarker,
	ConfigurableSchemaWithValue,
	ConfigurableSchemaWithDefault
} from './schema'
import {injectable} from './peer/inversify'

/**
 * Asd
 */
export function configuration() {
	return function (constructor: new () => any) {
		const wrappedConstructor = injectable
			? (injectable()(constructor) as new () => any)
			: constructor

		// eslint-disable-next-line new-cap, no-new
		new wrappedConstructor()
	}
}

/**
 *
 * @param propertySchema
 * @returns
 */
export function configurable<T = any>(propertySchema: ConfigurableSchema<T>) {
	return function (target: any, propertyKey: string) {
		const schema = extractSchemaFromPrototype(target)

		schema[propertyKey] = propertySchema

		Object.defineProperty(target, propertyKey, {
			enumerable: true,
			get() {
				if (!schema[configLoadedMarker]) {
					loadConfigurationOf(schema)

					schema[configLoadedMarker] = true
				}

				return (schema[propertyKey] as ConfigurableSchemaWithValue).value
			},
			set(value) {
				if (
					!Object.prototype.hasOwnProperty.call(schema[propertyKey], 'default')
				) {
					;(schema[propertyKey] as ConfigurableSchemaWithDefault).default =
						value
				}
			}
		})
	}
}

const configurationSchema = Symbol('configurationSchema')

const defaultResultTransformer = (value: unknown) => value

interface DecoratedPrototype {
	[configurationSchema]: ConfigurationSchema
}

function isDecoratedPrototype(target: any): target is DecoratedPrototype {
	return Object.prototype.hasOwnProperty.call(target, configurationSchema)
}

function extractSchemaFromPrototype(target: any): ConfigurationSchema {
	if (isDecoratedPrototype(target)) {
		return target[configurationSchema]
	}

	const schema = Object.create(null) as ConfigurationSchema

	// eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
	target[configurationSchema] = schema

	return schema
}

function loadConfigurationOf(schema: ConfigurationSchema) {
	const convictSchema = Object.create(null) as SchemaObj

	for (const key of Object.keys(schema)) {
		convictSchema[key] = schema[key]
	}

	libraryConfiguration.onSchemaAssembledHook(schema)

	const config = libraryConfiguration.convict(convictSchema)
	config.validate({
		allowed: 'strict'
	})

	libraryConfiguration.onConfigLoadedHook(schema, config)

	for (const key of Object.keys(schema)) {
		const transformer = schema[key].result ?? defaultResultTransformer
		schema[key].value = transformer(config.get(key))
	}
}
