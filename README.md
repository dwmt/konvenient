<h1 align="center">
  Konvenient
</h1>

<h3 align="center">
  :wrench: :boat:
<h3>

<h3 align="center">
  TypeScript configuration, as konvenient as possible. | Decorator-driven configuration library for TypeScript, based on <a href="https://github.com/mozilla/node-convict">convict</a>.
</h3>

<p align="center">
  <a href="https://github.com/dwmt/konvenient/blob/master/LICENSE">
    <img src="https://img.shields.io/github/license/dwmt/konvenient" alt="konvenient uses the MIT License.">
  </a>
  <a href="https://www.npmjs.com/package/konvenient">
    <img src="https://img.shields.io/npm/v/konvenient" alt="Current npm package version.">
  </a>
  <a href="https://github.com/dwmt/konvenient/actions/workflows/continuous-integration.yml">
    <img src="https://github.com/dwmt/konvenient/actions/workflows/continuous-integration.yml/badge.svg" alt="Continuous Integration status.">
  </a>
</p>

To get started, simply install konvenient using your package manager of choice:

~~~~
npm i konvenient
~~~~

## Quickstart

Example for konvenient configuration:

~~~~TypeScript
import {Configuration, Configurable} from 'konvenient'

@Configuration()
class HttpConfiguration {
	@Configurable({
		doc: 'The port on which the server listens.',
		format: 'port',
		env: 'PORT'
	})
	port = 8080
}

const config = new HttpConfiguration()

console.log(config.port)
~~~~

For more examples and recipes, please head over to [examples](examples#konvenient-examples-and-recipes).

## Features

  * **Everything from Convict and more.** Internally, konvenient wraps [convict](https://github.com/mozilla/node-convict), and exposes all of its functionality: loading configuration values from files, command line args and environment variables, format checking with support for custom formats, default values and so on!
  * **Decorator-driven.** Konvenient embraces TypeScript classes and turns them into configuration objects via decorators. You can even nest configuration classes into each other!
  * **Computed Properties.** Define functions and getters on configuration classes just as you would do on any other class. For an example, please refer to [examples/src/recipes/03-computed](examples/src/recipes/03-computed/index.ts).
  * **Inheritance Support.** Configuration classes can extend each other, inheriting configurable properties.
  * **Env Var and File Key Derivation.** Environment variables and config file keys are automatically derived from class and property names. Of course, both the derivation method and the derived values can be overridden.

## License

Licensed under the [MIT License](LICENSE).

