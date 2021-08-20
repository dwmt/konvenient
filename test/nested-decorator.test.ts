import {
	Configurable as configurable,
	Configuration as configuration,
	configurationSchema,
	DecoratedPrototype,
	LoadedTarget,
	loadedValues,
	Nested as nested,
	nestedSchemaOf,
	optionsKey,
} from '../src/decorator'
import {
	ConfigurableSchema,
	NestedConfigurationSchema,
	nestedPrototype,
	nestedSchema,
} from '../src/schema'

@configuration()
export class FooConfig {
	@configurable({
		env: 'BAR',
		doc: 'Foobar',
		format: String,
	})
	bar = 'bar'
}

@configuration()
export class TestConfig {
	@nested()
	foo = new FooConfig()
}

describe('Nested Configuration: property decorator for a Configuration type', () => {
	it('should setup the nested configuration on the object', () => {
		const target = new TestConfig()
		const expectedPrototype = target.foo as unknown as DecoratedPrototype
		expectedPrototype[configurationSchema] = {
			bar: {
				default: 'bar',
				doc: 'Foobar',
				env: 'BAR',
				format: String,
			},
		}
		;(expectedPrototype as unknown as LoadedTarget)[loadedValues] = {
			bar: 'bar',
		}

		expectedPrototype[optionsKey] = {
			envPrefix: 'TEST',
			name: 'TestConfig',
			pathPrefix: 'test',
		}

		expect(
			(target as unknown as DecoratedPrototype)[configurationSchema],
		).toEqual({
			foo: {
				bar: {
					env: 'BAR',
					doc: 'Foobar',
					format: String,
					default: 'bar',
				},
				[nestedSchema]: true,
				[nestedPrototype]: expectedPrototype,
			},
		})
	})
})

describe('nestedSchemaOf', () => {
	it('creates the nestedSchema for a configuration instance', () => {
		const storesSchema: ConfigurableSchema = {
			mongodbUrl: {
				env: 'MONGODB_CONNECTION_URL',
				doc: 'Mongodb connection url',
				default: 'mongodb://localhost:27017/reddit-data',
				format: String,
			},
			redisUrl: {
				env: 'REDIS_CONNECTION_URL',
				doc: 'Redis connection url',
				default: 'redis://localhost:6379',
				format: String,
			},
		}

		const proto: DecoratedPrototype = {
			[optionsKey]: {
				name: 'StoreConfig',
				pathPrefix: './store',
				envPrefix: 'STORE',
			},
			[configurationSchema]: storesSchema,
		}

		const target: NestedConfigurationSchema = Object.create(proto)
		const expected: NestedConfigurationSchema = {
			...proto[configurationSchema],
			[nestedSchema]: true,
			[nestedPrototype]: proto,
		}

		expect(nestedSchemaOf(target)).toEqual(expected)
	})
})
