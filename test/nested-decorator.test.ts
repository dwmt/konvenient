import {
  Configurable as configurable,
  Configuration as configuration,
  configurationSchema,
  DecoratedPrototype,
  Nested as nested,
  nestedSchemaOf,
  optionsKey,
} from '../src/decorator'
import {
  ConfigurableSchema,
  NestedConfigurationSchema,
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
        // [optionsKey]: {
        //   envPrefix: 'FOO',
        //   name: 'FooConfig',
        //   pathPrefix: 'foo',
        // },
        [nestedSchema]: true,
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

    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const target: NestedConfigurationSchema = Object.create(proto)
    const expected = {
      ...proto[configurationSchema],
      [nestedSchema]: true,
    }

    expect(nestedSchemaOf(target)).toEqual(expected)
  })
})
