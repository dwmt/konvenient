import convict from 'convict'
import {OnConfigLoadedHook, OnSchemaAssembledHook} from './hook'
import {
  defaultEnvKeyDerivationStrategy,
  defaultFileKeyDerivationStrategy,
  FileKeyDerivationStrategy,
  EnvKeyDerivationStrategy,
} from './key-derivation'

export interface LibraryConfiguration {
  convict: convict
  sources: string[]
  fileKeyDerivationStrategy: FileKeyDerivationStrategy
  envKeyDerivationStrategy: EnvKeyDerivationStrategy
  onSchemaAssembledHook: OnSchemaAssembledHook
  onConfigLoadedHook: OnConfigLoadedHook
}

export const libraryConfiguration: LibraryConfiguration = {
  convict,
  sources: [],
  fileKeyDerivationStrategy: defaultFileKeyDerivationStrategy,
  envKeyDerivationStrategy: defaultEnvKeyDerivationStrategy,
  onSchemaAssembledHook() {
    // Do nothing.
  },
  onConfigLoadedHook() {
    // Do nothing.
  },
}

export class KonvenientConfigurator {
  /**
   * Gets the convict instance used by Konvenient.
   * @returns the used convict instance
   */
  convict(): convict {
    return libraryConfiguration.convict
  }

  /**
   * Sets the convict instance to be used by Konvenient.
   * @param value the convict instance to be used
   * @returns the configurator
   */
  withConvict(value: convict): this {
    libraryConfiguration.convict = value

    return this
  }

  sources(): string[] {
    return libraryConfiguration.sources
  }

  withSources(value: string[]): this {
    libraryConfiguration.sources = value

    return this
  }

  withFileKeyDerivationStrategy(value: FileKeyDerivationStrategy): this {
    libraryConfiguration.fileKeyDerivationStrategy = value

    return this
  }

  fileKeyDerivationStrategy(): FileKeyDerivationStrategy {
    return libraryConfiguration.fileKeyDerivationStrategy
  }

  withEnvKeyDerivationStrategy(value: EnvKeyDerivationStrategy): this {
    libraryConfiguration.envKeyDerivationStrategy = value

    return this
  }

  envKeyDerivationStrategy(): EnvKeyDerivationStrategy {
    return libraryConfiguration.envKeyDerivationStrategy
  }

  /**
   * Gets the `onSchemaAssembledHook` used by Konvenient.
   * @returns the used hook
   */
  onSchemaAssembledHook(): OnSchemaAssembledHook {
    return libraryConfiguration.onSchemaAssembledHook
  }

  /**
   * Sets the `onSchemaAssembledHook` to be used by Konvenient.
   * @param value the hook to be used
   * @returns the configurator
   */
  withOnSchemaAssembledHook(value: OnSchemaAssembledHook): this {
    libraryConfiguration.onSchemaAssembledHook = value

    return this
  }

  /**
   * Gets the `onConfigLoadedHook` used by Konvenient.
   * @returns the used hook
   */
  onConfigLoadedHook(): OnConfigLoadedHook {
    return libraryConfiguration.onConfigLoadedHook
  }

  /**
   * Sets the `onConfigLoadedHook` to be used by Konvenient.
   * @param value the hook to be used
   * @returns the configurator
   */
  withOnConfigLoadedHook(value: OnConfigLoadedHook): this {
    libraryConfiguration.onConfigLoadedHook = value

    return this
  }
}

/**
 * Configuration object used to set library level options
 * of Konvenient.
 */
export const configurator = new KonvenientConfigurator()
