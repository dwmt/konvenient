import parseArgv from 'yargs-parser'
import { FlatConfigurable } from '../../schema';
import { ValueSource } from "../common";

export interface ArgumentParser {
    (argv: string[]): Record<string, unknown>
}

export const DefaultArgumentParser: ArgumentParser = (argv) => {
    return parseArgv(argv.slice(2), {
        configuration: {
            'dot-notation': false
        }
    })
}

export class ArgumentValueSource implements ValueSource {
    private entries: Map<string, any>

    constructor(private readonly argv: string[] = process.argv, private readonly parser: ArgumentParser = DefaultArgumentParser) {
        this.entries = new Map<string, any>()
    }

    loadEntries() {
        this.entries = this.entriesFromArgv(this.argv)
    }

    getValueFor(configurable: FlatConfigurable) {
        return configurable.arg
            ? this.entries.get(configurable.arg)
            : undefined
    }

    private entriesFromArgv(argv: string[]): Map<string, any> {
        const parsed = this.parser(argv)

        const result = new Map<string, any>()

        for (const key of Object.keys(parsed)) {
            if (key in ['_', '--', '$0']) {
                continue
            }

            result.set(key, parsed[key])
        }

        return result
    }
}
