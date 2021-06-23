import {PredefinedFormat} from 'convict'

export const configLoadedMarker = Symbol('configLoadedMarker')

/**
 *
 */
export type SchemaResult<T> = (value: any) => T

/**
 *
 */
export interface ConfigurableSchema<T = any> {
	[key: string]: any

	/**
	 * Documentation.
	 */
	doc?: string

	/**
	 *
	 */
	format?:
		| PredefinedFormat
		| any[]
		| ((value: any) => asserts value is T)
		| ((value: any) => void)

	/**
	 *
	 */
	env?: string

	/**
	 *
	 */
	arg?: string

	/**
	 *
	 */
	sensitive?: boolean

	/**
	 *
	 */
	nullable?: boolean

	/**
	 *
	 */
	result?: SchemaResult<T>
}

export interface ConfigurableSchemaWithValue extends ConfigurableSchema {
	value: unknown
}

export interface ConfigurableSchemaWithDefault extends ConfigurableSchema {
	default: unknown
}

export type DryConfigurationSchema = Record<string, ConfigurableSchema>

export interface ConfigurationSchema extends DryConfigurationSchema {
	[configLoadedMarker]: boolean | undefined
}
