import {describe, expect, it} from '@jest/globals'
import {configurationSchema, DecoratedPrototype} from '../src/decorator'
import {
	ConfigurableSchema,
	isNestedSchema,
	NestedConfigurationSchema,
	NestedConfigurationSchemaWithDefaults,
	nestedSchema,
} from '../src/schema'

describe('isNestedSchema', () => {
	it('returns true if it has NestedSchema', () => {
		const target: NestedConfigurationSchema = Object.create(
			null,
		) as NestedConfigurationSchema
		target[nestedSchema] = true

		expect(isNestedSchema(target)).toBe(true)
	})

	it('returns false if it does not have NestedSchema', () => {
		const target = Object.create(null) as DecoratedPrototype

		const schema: ConfigurableSchema = {
			foo: 'bar',
		}

		target[configurationSchema] = schema

		expect(isNestedSchema(target)).toBe(false)
	})
})

describe('isNestedSchemaWithDefauts', () => {
	it('returns true if it has nestedSchema and default', () => {
		const target: NestedConfigurationSchemaWithDefaults = Object.create(
			null,
		) as NestedConfigurationSchemaWithDefaults
		target[nestedSchema] = true

		expect(isNestedSchema(target)).toBe(true)
	})

	it('returns false if it does not have NestedSchema', () => {
		const target = Object.create(null) as DecoratedPrototype
		const schema: ConfigurableSchema = {
			foo: 'bar',
		}

		target[configurationSchema] = schema

		expect(isNestedSchema(target)).toBe(false)
	})
})
