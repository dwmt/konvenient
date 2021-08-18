import { FlatConfigurable } from "../schema";

export interface ValueSource {
    loadEntries(): void;

    getValueFor(configurable: FlatConfigurable): any
}
