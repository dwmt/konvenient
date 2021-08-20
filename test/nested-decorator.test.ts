import {
	Configurable as configurable,
	Configuration as configuration,
	configurationSchema,
	DecoratedPrototype,
	LoadedTarget,
	loadedValues,
	Nested as nested,
	optionsKey,
} from '../src/decorator'
import {nestedPrototype, nestedSchema} from '../src/schema'

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
