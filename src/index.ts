import convict from 'convict'

export {KonvenientConfigurator, configurator} from './configuration'
export {Configuration, Configurable, Nested} from './decorator'
export {OnConfigLoadedHook, OnSchemaAssembledHook} from './hook'
export {
	FileKeyDerivationStrategy,
	EnvKeyDerivationStrategy
} from './key-derivation'
export {
	ConfigurableSchemaWithDefault,
	ConfigurationSchemaWithDefaults,
	NestedConfigurationSchemaWithDefaults,
	isNestedSchemaWithDefaults,
	isConfigurableSchemaWithDefaults,
	SchemaResult
} from './schema'
export {convict}
