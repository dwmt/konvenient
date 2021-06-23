import convict from 'convict'

const configMap = new Map()

const configMetadata = Symbol()
const constructorName = Symbol()

export function config(constructor: any) {
	configMap.set(constructor.prototype, {})

	new constructor()

	constructor.prototype[constructorName] = constructor.name

	configMap.set(constructor.prototype, constructor.prototype[configMetadata])
}

export function configurable(convictConfig: unknown) {
	return function configurableApp(target: any, propertyKey: string) {
		if (!target[configMetadata]) {
			target[configMetadata] = Object.create(null)
		}

		target[configMetadata][propertyKey] = convictConfig

		Object.defineProperty(target, propertyKey, {
			enumerable: true,
			get() {
				return target[configMetadata][propertyKey].value
			},
			set(value) {
				if (
					!Object.prototype.hasOwnProperty.call(
						target[configMetadata][propertyKey],
						'default'
					)
				) {
					target[configMetadata][propertyKey].default = value
				}
			}
		})
	}
}

export function loadConfiguration() {
	const schema = Object.create(null)

	for (const metadata of configMap) {
		const m = metadata[0]

		for (const key of Object.keys(m[configMetadata])) {
			const schemaKey = `${m[constructorName]}#${key}`

			schema[schemaKey] = m[configMetadata][key]
		}
	}

	const config = convict(schema)
	config.validate({allowed: 'strict'})

	for (const metadata of configMap) {
		const m = metadata[0]

		for (const key of Object.keys(m[configMetadata])) {
			const schemaKey = `${m[constructorName]}#${key}`

			m[configMetadata][key].value = config.get(schemaKey as any)
		}
	}
}
