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

export class ConvenientConfigurator {
	convict(): convict {
		return libraryConfiguration.convict
	}

	withConvict(value: convict): this {
		libraryConfiguration.convict = value

		return this
	}

	onSchemaAssembledHook(): OnSchemaAssembledHook {
		return libraryConfiguration.onSchemaAssembledHook
	}

	withOnSchemaAssemlbedHook(value: OnSchemaAssembledHook): this {
		libraryConfiguration.onSchemaAssembledHook = value

		return this
	}

	onConfigLoadedHook(): OnConfigLoadedHook {
		return libraryConfiguration.onConfigLoadedHook
	}

	withOnConfigLoadedHook(value: OnConfigLoadedHook): this {
		libraryConfiguration.onConfigLoadedHook = value

		return this
	}
}

export const configurator = new ConvenientConfigurator()
