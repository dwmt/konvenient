import convict from 'convict'

export {KonvenientConfigurator, configurator} from './configuration'
export {
  KONVENIENT_CONFIGURATION_CLASS,
  Configuration,
  Configurable,
  Nested,
  ConfigurationOptions,
} from './decorator'
export {OnConfigLoadedHook, OnSchemaAssembledHook} from './hook'
export {
  FileKeyDerivationStrategy,
  EnvKeyDerivationStrategy,
} from './key-derivation'
export {reconfigure} from './reconfigure'
export {
  ConfigurableSchema,
  ConfigurableSchemaWithDefault,
  ConfigurationSchemaWithDefaults,
  NestedConfigurationSchemaWithDefaults,
  isNestedSchemaWithDefaults,
  isConfigurableSchemaWithDefaults,
  SchemaResult,
} from './schema'
export {convict}

export {PredefinedFormat} from 'convict'
