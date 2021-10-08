import {SchemaObj, ValidateOptions} from 'convict'
import cloneDeepWith from 'lodash.clonedeepwith'
import {libraryConfiguration} from './configuration'
import {
  ConfigurableSchema,
  ConfigurationSchema,
  ConfigurableSchemaWithDefault,
  ConfigurationSchemaWithDefaults,
  NestedConfigurationSchema,
  nestedSchema,
} from './schema'
import {resolveValues, resolveEnv} from './resolution'

export const optionsKey = Symbol('options')
export const configurationSchema = Symbol('configurationSchema')
export const loadedValues = Symbol('loadedValues')

export interface ConfigurationOptions {
  pathPrefix?: string
  envPrefix?: string
}

const defaultConfigurationOptions: ConfigurationOptions = {}

export interface FinalizedConfigurationOptions
  extends Required<ConfigurationOptions> {
  name: string
}

export interface DecoratedPrototype {
  [optionsKey]: FinalizedConfigurationOptions
  [configurationSchema]: ConfigurationSchema
}

export interface DecoratedConstructor {
  prototype: DecoratedPrototype
  new (): any
}

export type LoadedTarget = {
  [loadedValues]: Record<string, unknown>
}

/**
 * Marks a class as a configuration class. Configuration classes
 * shall adhere to the following requirements:
 *
 *   * have a default or no argument constructor.
 *
 * @returns The actual decorator applied to the class.
 */
export function Configuration(
  options: Partial<ConfigurationOptions> = defaultConfigurationOptions,
) {
  return function <T>(constructor: new () => T): new () => T {
    const actualOptions: FinalizedConfigurationOptions = {
      ...defaultConfigurationOptions,
      pathPrefix: libraryConfiguration.fileKeyDerivationStrategy(
        constructor.name,
      ),
      envPrefix: libraryConfiguration.envKeyDerivationStrategy.deriveKey(
        constructor.name,
      ),
      ...options,
      name: constructor.name,
    }

    const decoratedConstructor = constructor as DecoratedConstructor

    decoratedConstructor.prototype[optionsKey] = actualOptions

    const parent: unknown = Object.getPrototypeOf(decoratedConstructor.prototype)
    const parentSchema = extractSchemaFromPrototype(parent)
    const currentSchema = extractSchemaFromPrototype(
      decoratedConstructor.prototype,
    )
    for (const propertyKey of Object.keys(parentSchema)) {
      currentSchema[propertyKey] = cloneDeepWith(parentSchema[propertyKey])
    }

    // eslint-disable-next-line new-cap,@typescript-eslint/no-unsafe-assignment
    const instance = new decoratedConstructor()

    const newClass = class extends (decoratedConstructor as any) {
      constructor() {
        // eslint-disable-next-line  @typescript-eslint/no-unsafe-call,constructor-super
        super()
        for (const propertyKey of Object.keys(currentSchema)) {
          // @ts-expect-error The type checker (rightly) thinks this will always be false.
          if (currentSchema[propertyKey] === 'nested') {
            // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
            currentSchema[propertyKey] = nestedSchemaOf(instance[propertyKey])
          } else if (
            !Object.prototype.hasOwnProperty.call(
              currentSchema[propertyKey],
              'default',
            )
          ) {
            const withDefault = currentSchema[
              propertyKey
            ] as ConfigurableSchemaWithDefault

            // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
            withDefault.default = instance[propertyKey]
          }

          Object.defineProperty(this, propertyKey, {
            enumerable: true,
            get() {
              return retrieveValue(decoratedConstructor.prototype, propertyKey)
            },
          })
        }
      }
    }

    ;(newClass.prototype as DecoratedPrototype)[configurationSchema] =
      currentSchema

    return newClass as new () => T
  }
}

/**
 * Marks a field on a configuration class configurable (loadable with convict). Configurable
 * fields shall adhere to the following requirements:
 *
 *   * have a default value.
 *
 * @param propertySchema The convict schema used to load, validate and transform the configuration value.
 * @returns The actual decorator applied to the field.
 */
export function Configurable<T = any>(
  propertySchema: ConfigurableSchema<T> = {},
) {
  return function (target: any, propertyKey: string) {
    const schema = extractSchemaFromPrototype(target)

    schema[propertyKey] = propertySchema
  }
}

/**
 * Marks a field on a configuration class as nested configuration. Nested configuration
 * fields shall adhere to the following requirements:
 *
 *   * have a configuration class as their default value.
 *
 * @returns The actual decorator applied to the field.
 */
export function Nested() {
  return function (target: any, propertyKey: string) {
    const schema = extractSchemaFromPrototype(target)

    // @ts-expect-error Using a placeholder here just to mark it as nested.
    schema[propertyKey] = 'nested'
  }
}

export function nestedSchemaOf(target: any) {
  const clonedSchema = cloneDeepWith(
    extractSchemaFromPrototype(Object.getPrototypeOf(target)),
    (value) => {
      if (typeof value === 'function') {
        return value as unknown
      }

      return undefined
    },
  ) as ConfigurationSchema

  return Object.assign(clonedSchema, {
    [nestedSchema]: true,
  }) as NestedConfigurationSchema
}

function retrieveValue(target: any, key: string): unknown {
  if (!Object.prototype.hasOwnProperty.call(target, loadedValues)) {
    loadConfigurationOf(target)
  }

  return (target as LoadedTarget)[loadedValues][key]
}

export function isDecoratedPrototype(
  target: any,
): target is DecoratedPrototype {
  return Object.prototype.hasOwnProperty.call(target, configurationSchema)
}

export function extractSchemaFromPrototype(target: any): ConfigurationSchema {
  if (isDecoratedPrototype(target)) {
    return target[configurationSchema]
  }

  const schema = Object.create(null) as ConfigurationSchema

  // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
  target[configurationSchema] = schema

  return schema
}

function loadConfigurationOf(target: any) {
  const schema = extractSchemaFromPrototype(
    target,
  ) as ConfigurationSchemaWithDefaults

  resolveEnv(schema, (target as DecoratedPrototype)[optionsKey].envPrefix)

  libraryConfiguration.onSchemaAssembledHook(
    schema,
    (target as DecoratedPrototype)[optionsKey].name,
  )

  const convictSchema = Object.create(null) as SchemaObj

  for (const key of Object.keys(schema)) {
    convictSchema[key] = schema[key]
  }

  let config
  if ((target as DecoratedPrototype)[optionsKey].pathPrefix === '') {
    config = libraryConfiguration.convict(convictSchema)
  } else {
    config = libraryConfiguration.convict({
      [(target as DecoratedPrototype)[optionsKey].pathPrefix]: convictSchema,
    })
  }

  config.loadFile(libraryConfiguration.sources)

  // The type definition of convict does not list the output property,
  // thus, we had to get creative.
  config.validate({
    allowed: 'warn',
    output() {
      // No-op.
    },
  } as ValidateOptions)

  libraryConfiguration.onConfigLoadedHook(
    schema,
    config,
    (target as DecoratedPrototype)[optionsKey].name,
  )

  const values = Object.create(null) as Record<string, unknown>

  resolveValues(
    values,
    schema,
    config,
    (target as DecoratedPrototype)[optionsKey].pathPrefix,
  )
  ;(target as LoadedTarget)[loadedValues] = values
}
