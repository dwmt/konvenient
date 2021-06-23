import convict from 'convict'
import {OnConfigLoadedHook, OnSchemaAssembledHook} from './hook'

export interface LibraryConfiguration {
	convict: convict
	onSchemaAssembledHook: OnSchemaAssembledHook
	onConfigLoadedHook: OnConfigLoadedHook
}

export const libraryConfiguration: LibraryConfiguration = {
	convict,
	onSchemaAssembledHook() {
		// Do nothing.
	},
	onConfigLoadedHook() {
		// Do nothing.
	}
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
	withOnSchemaAssemlbedHook(value: OnSchemaAssembledHook): this {
		libraryConfiguration.onSchemaAssembledHook = value

		return this
	}

	/**
	 * Gets the `onConfigLoadedHook` OnConfigLoadedHook {
` used by Konvenient.
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
