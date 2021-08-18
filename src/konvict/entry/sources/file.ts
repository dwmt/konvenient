import { readFileSync } from "fs";
import { FlatConfigurable } from "../../schema";
import { ValueSource } from "../common";

export interface FileParser {
    (text: string): any
}

export interface FileReader {
    (path: string): string
}

export const DefaultFileReader: FileReader = (path) => {
    return readFileSync(path, 'utf8')
}

export class FileValueSource implements ValueSource {
    private contents: any

    constructor(private readonly path: string,
                private readonly parser: FileParser = JSON.parse,
                private readonly reader: FileReader = DefaultFileReader) {}
    
    loadEntries() {
        const fileContents = this.reader(this.path)

        this.contents = this.parser(fileContents)
    }

    getValueFor(configurable: FlatConfigurable) {
        let result = this.contents
        for (const segment of configurable.key) {
            result = result[segment]

            if (!result) {
                return undefined
            }
        }

        return result
    }
}
