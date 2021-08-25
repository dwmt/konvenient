import {ConfigurationOptions, optionsKey} from './decorator'

export function reconfigure(
  reconfigurator: (options: ConfigurationOptions) => void,
  constructor: new () => any,
) {
  // eslint-disable-next-line
	const originalOptions = constructor.prototype[optionsKey]

  reconfigurator(originalOptions)
}
