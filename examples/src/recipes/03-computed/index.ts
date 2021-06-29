import {configuration, configurable} from 'konvenient'

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
	level = LogLevel.Info

    get debug() {
        return this.level === LogLevel.Debug
    }
}

const config = new LogConfiguration()

console.log(config.level)
console.log(config.debug)
