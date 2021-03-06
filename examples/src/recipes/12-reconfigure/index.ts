import {
	Configuration,
	Configurable,
    reconfigure,
} from 'konvenient';

enum LogLevel {
	Debug = 'debug',
	Info = 'info',
	Warn = 'warn',
}

@Configuration()
class LogConfiguration {
	// File key: log.level
	// Env name: LOG_LEVEL
	@Configurable({
		format: [LogLevel.Debug, LogLevel.Info, LogLevel.Warn],
	})
	level: LogLevel = LogLevel.Info;

	get debug() {
		return this.level === LogLevel.Debug;
	}
}

// LOG_LEVEL becomes ASD_LOG_LEVEL
reconfigure((options) => {
    options.envPrefix = `ASD_${options.envPrefix}`
}, LogConfiguration)

const config = new LogConfiguration();

console.log(config.level);
console.log(config.debug);
