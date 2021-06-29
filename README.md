<h1 align="center">
  Konvenient
</h1>

<h3 align="center">
  :wrench: :boat:
<h3>

<h3 align="center">
  TypeScript configuration, as konvenient as possible | Decorator-driven configuration library for TypeScript, based on <a href="https://github.com/mozilla/node-convict">convict</a>.
</h3>

<p align="center">
  <a href="https://github.com/battila7/konvenient/blob/master/LICENSE">
    <img src="https://img.shields.io/github/license/battila7/konvenient" alt="konvenient uses the MIT License.">
  </a>
  <a href="https://www.npmjs.com/package/konvenient">
    <img src="https://img.shields.io/npm/v/konvenient" alt="Current npm package version.">
  </a>
  <a href="https://github.com/battila7/konvenient/actions/workflows/continuous-integration.yml">
    <img src="https://github.com/battila7/konvenient/actions/workflows/continuous-integration.yml/badge.svg" alt="Continuous Integration status.">
  </a>
</p>

Just install konvenient using your package manager of choice:

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

For more detailed examples and recipes, please check [examples](examples).

## Features

  * **Everything from Convict and more** Internally, konvenient wraps [convict](https://github.com/mozilla/node-convict) and exposes all of its functionality: loading configuration from files, command line args, environment variables, format checking (with custom formats), default values and so on!
  * **Decorator-driven** Konvenient embraces TypeScript classes and turns them into configuration objects via decorators. You can even nest configuration classes in each other!
  * **Computed Properties** Define functions and getters on configuration classes just as you would do on any other class. Refer to [examples/src/recipes/03-computed](examples/src/recipes/03-computed/index.ts).
  * **Env Var and File Key Derivation** Environment variable names and file property names are automatically derived from class and property names. Of course, both the derivation method, both the derived values can be overridden.
  * **Inversify Support** Konvenient comes with [inversify](https://inversify.io/) support baked in: if inversify is available, then konvenient decorates all configuration classes with `@injectable()`.

## License

Licensed under the [MIT](LICENSE).

