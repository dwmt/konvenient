import convict from 'convict'

export {KonvenientConfigurator, configurator} from './configuration'
export {configuration, configurable, nested} from './decorator'
export {OnConfigLoadedHook, OnSchemaAssembledHook} from './hook'
export {
	ConfigurableSchemaWithDefault,
	ConfigurationSchemaWithDefaults,
	NestedConfigurationSchemaWithDefaults,
	isNestedSchemaWithDefaults,
	isConfigurableSchemaWithDefaults,
	SchemaResult
} from './schema'
export {convict}
