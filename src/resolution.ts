/* eslint-disable */
import {isNestedSchema, nestedPrototype, SchemaResult} from './schema'

const defaultResultTransformer = (value: unknown) => value

export function resolveValues(
	target: any,
	schema: any,
	source: any,
    path: string
) {
	for (const key of Object.keys(schema)) {
        const concatPath = path === '' ? key : `${path}.${key}`

		if (isNestedSchema(schema[key])) {
			target[key] = Object.create(null)

			resolveValues(
				target[key],
				schema[key],
				source,
                concatPath
			)
		} else {
            let value
            if (!source.has(concatPath)) {
                value = undefined
            } else {
                value = source.get(concatPath)
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
