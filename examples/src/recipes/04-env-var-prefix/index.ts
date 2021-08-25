import {
  Configuration,
  Configurable,
  configurator,
  isConfigurableSchemaWithDefaults,
} from 'konvenient'

const PREFIX = 'EXAMPLE'

configurator.withOnSchemaAssembledHook((schema) => {
  for (const configurableSchema of Object.values(schema)) {
    if (isConfigurableSchemaWithDefaults(configurableSchema)) {
      configurableSchema.env = `${PREFIX}_${configurableSchema.env}`
    }
  }
})

enum LogLevel {
  Debug = 'debug',
  Info = 'info',
  Warn = 'warn',
}

@Configuration()
class LogConfiguration {
  // File key: log.level
  // Env name: EXAMPLE_LOG_LEVEL
  @Configurable({
    format: [LogLevel.Debug, LogLevel.Info, LogLevel.Warn],
    env: 'LOG_LEVEL',
  })
  level: LogLevel = LogLevel.Info

  get debug() {
    return this.level === LogLevel.Debug
  }
}

const config = new LogConfiguration()

console.log(config.level)
console.log(config.debug)
