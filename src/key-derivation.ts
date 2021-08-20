import snakeCase from 'lodash.snakecase'

export type FileKeyDerivationStrategy = (name: string) => string

export interface EnvKeyDerivationStrategy {
  separator: string
  deriveKey(name: string): string
}

export const defaultEnvKeyDerivationStrategy: EnvKeyDerivationStrategy = {
  separator: '_',
  deriveKey(name) {
    const nameWithoutConfig = removeConfiguration(name)

    return snakeCase(nameWithoutConfig).toUpperCase()
  },
}

export function defaultFileKeyDerivationStrategy(name: string): string {
  const nameWithoutConfig = removeConfiguration(name)

  return `${nameWithoutConfig.charAt(0).toLowerCase()}${nameWithoutConfig.slice(
    1,
  )}`
}

export function removeConfiguration(name: string): string {
  if (name.endsWith('Configuration')) {
    return name.split('Configuration')[0]
  }

  if (name.endsWith('Config')) {
    return name.split('Config')[0]
  }

  return name
}
