import {describe, expect, it} from '@jest/globals'
import {configurationSchema, DecoratedPrototype} from '../src/decorator'
import {
	ConfigurableSchema,
	isNestedSchema,
	NestedConfigurationSchema,
	NestedConfigurationSchemaWithDefaults,
	nestedSchema
} from '../src/schema'

describe('isNestedSchema', () => {
	it('returns true if it has NestedSchema', () => {
		// Given
		const target: NestedConfigurationSchema = Object.create(
			null
		) as NestedConfigurationSchema
		target[nestedSchema] = true

		// Expect
		expect(isNestedSchema(target)).toBe(true)
	})

	it('returns false if it does not have NestedSchema', () => {
		// Given
		const target = Object.create(null) as DecoratedPrototype

		const schema: ConfigurableSchema = {
			foo: 'bar'
		}

		target[configurationSchema] = schema

		// Expect
		expect(isNestedSchema(target)).toBe(false)
	})
})

describe('isNestedSchemaWithDefauts', () => {
	it('returns true if it has nestedSchema and default', () => {
		// Given
		const target: NestedConfigurationSchemaWithDefaults = Object.create(
			null
		) as NestedConfigurationSchemaWithDefaults
		target[nestedSchema] = true

		// Expect
		expect(isNestedSchema(target)).toBe(true)
	})

	it('returns false if it does not have NestedSchema', () => {
		// Given
		const target = Object.create(null) as DecoratedPrototype
		const schema: ConfigurableSchema = {
			foo: 'bar'
		}

		target[configurationSchema] = schema

		// Expect
		expect(isNestedSchema(target)).toBe(false)
	})
})
