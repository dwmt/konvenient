/* eslint-disable */
import {libraryConfiguration} from './configuration'
import {
  ConfigurationSchema,
  ConfigurationSchemaWithDefaults,
  isNestedSchema,
  SchemaResult,
} from './schema'

const defaultResultTransformer = (value: unknown) => value

export function resolveEnv(schema: ConfigurationSchema, envPrefix: string) {
  for (const key of Object.keys(schema)) {
    const envKey =
      envPrefix === ''
        ? libraryConfiguration.envKeyDerivationStrategy.deriveKey(key)
        : `${envPrefix}${
            libraryConfiguration.envKeyDerivationStrategy.separator
          }${libraryConfiguration.envKeyDerivationStrategy.deriveKey(key)}`

    if (isNestedSchema(schema[key])) {
      resolveEnv(schema[key], envKey)
    } else {
      if (schema[key].neverLoadFromEnv || schema[key].env) {
        continue
      }

      schema[key].env = envKey
    }
  }
}

export function resolveValues(
  target: Record<string, unknown>,
  schema: ConfigurationSchemaWithDefaults,
  source: any,
  path: string,
) {
  for (const key of Object.keys(schema)) {
    const concatPath = path === '' ? key : `${path}.${key}`

    if (isNestedSchema(schema[key])) {
      target[key] = Object.create(null)

      resolveValues(
        target[key] as Record<string, unknown>,
        schema[key],
        source,
        concatPath,
      )
    } else {
      const actualPath = schema[key].path ?? concatPath

      let value
      if (!source.has(actualPath)) {
        value = undefined
      } else {
        value = source.get(actualPath)
      }

      const transformer =
        (schema[key].result as SchemaResult<any>) ?? defaultResultTransformer

      target[key] = transformer(value)
    }
  }
}
