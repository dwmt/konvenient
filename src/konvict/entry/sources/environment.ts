import { FlatConfigurable } from "../../schema";
import { ValueSource } from "../common";

export class EnvironmentValueSource implements ValueSource {
    private entries: Map<string, string>

    constructor(private readonly env: NodeJS.ProcessEnv = process.env) {
        this.entries = new Map<string, string>()
    }

    loadEntries() {
        this.entries = this.entriesFromEnv(this.env)
    }

    getValueFor(configurable: FlatConfigurable) {
        return configurable.env
            ? this.entries.get(configurable.env)
            : undefined
    }

    private entriesFromEnv(env: NodeJS.ProcessEnv): Map<string, string> {
        const result = new Map<string, string>()

        for (const key of Object.keys(env)) {
            result.set(key, env[key]!)
        }

        return result
    }
}
