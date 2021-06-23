import {PredefinedFormat} from 'convict'

export const configLoadedMarker = Symbol('configLoadedMarker')

/**
 * Transforms the loaded configurable field value into a new value/type.
 */
export type SchemaResult<T> = (value: any) => T

export interface ConfigurableSchema<T = any> {
	[key: string]: any

	/**
	 * Human-readable description of the configurable field.
	 */
	doc?: string

	/**
	 * A format name or a validation function used to check the loaded value.
	 *
	 * From the convict documentation, format can be a:
	 *
	 *   * predefined type,
	 *   * an array of enumerated values, e.g. ["production", "development", "testing"]
	 *   * built-in JavaScript type, i.e. Object, Array, String, Number, Boolean
	 *   * function that performs validation and throws an Error on failure
	 *
	 * If omitted, format will be set to the value of Object.prototype.toString.call
	 * for the default value
	 */
	format?:
		| PredefinedFormat
		| any[]
		| ((value: any) => asserts value is T)
		| ((value: any) => void)

	/**
	 * An optional environment variable name, the value is loaded from.
	 */
	env?: string

	/**
	 * An optional command-line argument name, the value is loaded from.
	 */
	arg?: string

	/**
	 * Whether the loaded value contains sensitive information. Sensitive values
	 * are not displayed when printing.
	 */
	sensitive?: boolean

	/**
	 * Whether the field is omittable.
	 */
	nullable?: boolean

	/**
	 * An optional transformer function, mapping the loaded value to some new value/type.
	 */
	result?: SchemaResult<T>
}

export interface ConfigurableSchemaWithValue extends ConfigurableSchema {
	/**
	 * The loaded and, optionally, transformed value of the configurable field.
	 */
	value: unknown
}

/**
 * Metadata attached to configurable fields, describing the purpose,
 * format, origin and such of the field value.
 */
export interface ConfigurableSchemaWithDefault extends ConfigurableSchema {
	/**
	 * The default value assigned to the configurable field.
	 */
	default: unknown
}

export interface ConfigurationSchema {
	[key: string]: ConfigurableSchema
	[configLoadedMarker]: boolean | undefined
}

/**
 * Metadata attached to the configurable fields of a given configuration class. Each
 * enumerable key represents a configurable field of the original class.
 */
export interface ConfigurationSchemaWithDefaults {
	[key: string]: ConfigurableSchemaWithDefault
	[configLoadedMarker]: boolean | undefined
}
