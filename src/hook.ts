import convict from 'convict'
import {ConfigurationSchemaWithDefaults} from './schema'

/**
 * Hook executed for each configuration class, after Konvenient
 * inspected all configurable fields of the class. Provides an
 * opportunity for client code to alter the
 */
export type OnSchemaAssembledHook = (
  schema: ConfigurationSchemaWithDefaults,
  name: string,
) => void

/**
 * Hook executed for each configuration class, after the
 * actual configuration values were loaded with convict.
 */
export type OnConfigLoadedHook = (
  schema: ConfigurationSchemaWithDefaults,
  config: convict.Config<any>,
  name: string,
) => void
