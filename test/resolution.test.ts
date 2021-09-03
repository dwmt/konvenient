import {describe, it, expect} from '@jest/globals'
import {resolveEnv} from '../src/resolution'
import {ConfigurationSchema} from '../src/schema'

describe('resolveEnv', () => {
  it('resolves values from environment variables', () => {
    // Given
    const schema: ConfigurationSchema = {
      foo: {
        doc: 'Foo',
        format: String,
      },
    }

    // When
    resolveEnv(schema, 'TEST')

    // Then
    expect(schema.foo.env).toEqual('TEST_FOO')
  })

  it('does not update a schema with an env property', () => {
    // Given
    const schema: ConfigurationSchema = {
      foo: {
        doc: 'Foo',
        env: 'FOO',
        format: String,
      },
    }

    // When
    resolveEnv(schema, 'TEST')

    // Then
    expect(schema).toEqual(schema)
  })

  it('does not update a schema with a neverLoadFromEnv property', () => {
    // Given
    const schema: ConfigurationSchema = {
      foo: {
        doc: 'Foo',
        neverLoadFromEnv: true,
        format: String,
      },
    }

    // When
    resolveEnv(schema, 'TEST')

    // Then
    expect(schema).toEqual(schema)
  })
})
