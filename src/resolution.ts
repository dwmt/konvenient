/* eslint-disable */
import { libraryConfiguration } from './configuration'
import {isNestedSchema, nestedPrototype, SchemaResult} from './schema'

const defaultResultTransformer = (value: unknown) => value

export function resolveEnv(schema: any, envPath: any) {
	for (const key of Object.keys(schema)) {
		const envKey = envPath === ''
			? libraryConfiguration.envKeyDerivationStrategy.deriveKey(key)
			: `${envPath}${libraryConfiguration.envKeyDerivationStrategy.separator}${libraryConfiguration.envKeyDerivationStrategy.deriveKey(key)}`

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
	target: any,
	schema: any,
	source: any,
    path: string
) {
	for (const key of Object.keys(schema)) {
        const concatPath = path === ''
			? key
			: `${path}.${key}`

		if (isNestedSchema(schema[key])) {
			target[key] = Object.create(null)

			resolveValues(
				target[key],
				schema[key],
				source,
                concatPath
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

export function resolveNestedPrototypes(target: any, schema: any) {
	for (const key of Object.keys(schema)) {
		if (isNestedSchema(schema[key])) {
			resolveNestedPrototypes(target[key], schema[key])

			Object.setPrototypeOf(target[key], schema[key][nestedPrototype as any])
		}
	}
}
