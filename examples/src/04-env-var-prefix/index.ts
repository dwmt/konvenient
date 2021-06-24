import {configuration, configurable, configurator} from 'konvenient'

const PREFIX = 'EXAMPLE'

configurator.withOnSchemaAssemlbedHook(schema => {
    for (const configurableSchema of Object.values(schema)) {
        if (configurableSchema.env) {
            configurableSchema.env = `${PREFIX}_${configurableSchema.env}`
        }
    }
})

enum LogLevel {
    Debug = 'debug',
    Info = 'info',
    Warn = 'warn'
}

@configuration()
class LogConfiguration {
	@configurable({
		format: [LogLevel.Debug, LogLevel.Info, LogLevel.Warn],
		env: 'LOG_LEVEL'
	})
	level: LogLevel = LogLevel.Info

    get debug() {
        return this.level === LogLevel.Debug
    }
}

const config = new LogConfiguration()

console.log(config.level)
console.log(config.debug)
