import convict from 'convict'
import {ConfigurationSchema} from './schema'

/**
 *
 */
export type OnSchemaAssembledHook = (schema: ConfigurationSchema) => void

/**
 *
 */
export type OnConfigLoadedHook = (
	schema: ConfigurationSchema,
	config: convict.Config<unknown>
) => void
