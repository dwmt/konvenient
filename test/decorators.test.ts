import {describe, it} from '@jest/globals'
import {
	Configurable as configurable,
	Configuration as configuration,
	ConfigurationOptions,
	configurationSchema,
	DecoratedPrototype,
	extractSchemaFromPrototype,
	FinalizedConfigurationOptions,
	isDecoratedPrototype,
	optionsKey
} from '../src/decorator'
import {ConfigurationSchema} from '../src/schema'

describe('Configuration: class decorator', () => {
	it('decorates a class with no options', () => {
		// Given
		const TestConfig = class TestConfig {}
		const decorator = configuration({} as ConfigurationOptions)

		// When
		decorator(TestConfig)
		const instance = new TestConfig()

		// Then
		expect((instance as DecoratedPrototype)[optionsKey]).toEqual({
			pathPrefix: 'test',
			envPrefix: 'TEST',
			name: 'TestConfig'
		})
	})

	it('decorates a class with an env prefix', () => {
		// Given
		const decorator = configuration({
			envPrefix: 'FOO'
		})
		const TestConfig = class TestConfig {}

		// When
		decorator(TestConfig)
		const instance = new TestConfig()

		// Then
		expect((instance as DecoratedPrototype)[optionsKey]).toEqual({
			name: 'TestConfig',
			envPrefix: 'FOO',
			pathPrefix: 'test'
		})
	})

	it('decorates a class with a path prefix', () => {
		// Given
		const TestConfig = class TestConfig {}
		const decorator = configuration({pathPrefix: 'foo'})

		// When
		decorator(TestConfig)
		const instance = new TestConfig()

		// Then
		expect((instance as DecoratedPrototype)[optionsKey]).toEqual({
			name: 'TestConfig',
			envPrefix: 'TEST',
			pathPrefix: 'foo'
		})
	})

	it('decorates a class with env and path prefixes', () => {
		// Given
		const decorator = configuration({pathPrefix: 'meh', envPrefix: 'AHEM'})
		const TestConfig = class TestConfig {}

		// When
		decorator(TestConfig)
		const instance = new TestConfig()

		// Then
		expect((instance as DecoratedPrototype)[optionsKey]).toEqual({
			name: 'TestConfig',
			envPrefix: 'AHEM',
			pathPrefix: 'meh'
		})
	})
})

describe('Configurable: Property Decorator', () => {
	it('decorates a  property', () => {
		// Given
		const schema = {
			format: String,
			doc: 'Favourite mario kart character',
			env: 'FAVOURITE_CHARACTER'
		}

		const options: FinalizedConfigurationOptions = {
			name: 'TestConfig',
			envPrefix: 'TEST',
			pathPrefix: 'test'
		}

		const target = Object.create({
			[optionsKey]: options
		}) as DecoratedPrototype

		// When
		const decorator = configurable(schema)
		decorator(target, 'property')

		// Then
		expect(target[configurationSchema]).toEqual({
			property: schema
		})
	})

	it('adds a new property on an existing object', () => {
		// Given
		const options = {
			name: 'TestConfig',
			envPrefix: 'TEST',
			pathPrefix: 'test'
		}

		const existingSchema = {
			marvel: {
				format: String,
				doc: 'Favourite mario kart character',
				env: 'FAVOURITE_MARVEL_CHARACTER'
			}
		}

		const schema = {
			doc: 'Favorite DC comics character',
			env: 'FAVOURITE_DC_CHARACTER',
			format: String
		}

		const target = Object.create(null) as DecoratedPrototype
		target[optionsKey] = options
		target[configurationSchema] = existingSchema

		// When
		const decorator = configurable(schema)
		decorator(target, 'dc')

		// Then
		expect(target[configurationSchema]).toEqual({
			...existingSchema,
			dc: schema
		})
	})
})

describe('extractSchemaFromPrototype', () => {
	it('extracts schema from a class', () => {
		// Given
		const schema = {
			foo: {
				env: 'FOO',
				doc: 'Foo',
				format: String
			},
			bar: {
				env: 'BAR',
				doc: 'Bar',
				format: String
			}
		}

		const target = Object.create(null) as DecoratedPrototype
		target[configurationSchema] = schema

		// Expect
		expect(extractSchemaFromPrototype(target)).toEqual(schema)
	})

	it('creates schema if it does not exist', () => {
		// Given
		const target = Object.create(null) as DecoratedPrototype
		const schema: ConfigurationSchema = {}

		// Expect
		expect(extractSchemaFromPrototype(target)).toEqual(schema)
	})
})

describe('isDecoratedPrototype', () => {
	it('returns false for a regular object', () => {
		// Given
		const target = Object.create(null) as DecoratedPrototype

		// Expect
		expect(isDecoratedPrototype(target)).toBe(false)
	})

	it('returns true for an object containing [configurationSchema]', () => {
		// Given
		const target = Object.create(null) as DecoratedPrototype
		const schema: ConfigurationSchema = {
			foo: {
				env: 'FOO',
				format: String
			}
		}

		target[configurationSchema] = schema

		// Expect
		expect(isDecoratedPrototype(target)).toBe(true)
	})
})
