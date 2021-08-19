# konvenient Examples and Recipes

Configuration is best if it's as konvenient as possible. Here you find a few examples and recipes to get you started as quickly as possible.

## Recipes

Smaller scale code snippets, showcasing a single feature of the library.

Run any of them with npm from the this directory, for example, `npm run example:01` (pro tip: make sure to run `npm install` in this directory as beforehand).

  * [01 Simple Usage](src/recipes/01-simple-usage/index.ts)
    * The Quickstart code of the main README. Nothing fancy, just loading a value.
  * [02 Result](src/recipes/02-result/index.ts)
    * Transforming the loaded value using the `result` function.
  * [03 Computed](src/recipes/03-computed/index.ts)
    * Define functions/getters on configuration classes to compute new values from what is loaded.
  * [04 Env Var Prefix](src/recipes/04-env-var-prefix/index.ts)
    * Specify a common, application-specific prefix for every environment variable.
  * [05 Nested](src/recipes/05-nested/index.ts)
    * Configuration classes as fields.
  * [06 Inversify](src/recipes/06-inversify/index.ts)
    * konvenient-inversify interoperability: put configuration classes into inversify containers and inject them.
  * [07 Nested Env Var](src/recipes/07-nested-env-var/index.ts)
    * Environment variable name derivation.
  * [08 Simple File](src/recipes/08-simple-file/index.ts)
    * Load configuration values from JSON files.
  * [09 YAML File](src/recipes/09-yaml-file/index.ts)
    * Load configuration values using a custom parser, from YAML files.
  * [10 No Prefix](src/recipes/10-no-prefix/index.ts)
    * Load configuration values as top level properties.
  * [11 Inheritance](src/recipes/10-inheritance/index.ts)
    * Inherit configurable properties from other configuration classes.

## Examples

Somewhat larger modules, exercising multiple parts of konvenient.

Run any of them with npm from the this directory, for example, `npm run recipe:01` (pro tip: make sure to run `npm install` in this directory as beforehand).

  * [01 File Dependent, Single, Top-Level](src/examples/01-file-dependent-single-top-level)
    * Loading configuration values from a file.
    * Configuration is stored in a single TypeScript class.
    * The properties in the configuration class are top-level ones in the configuration files.
  * [02 File Dependent, Multiple, Inversify](src/examples/02-file-dependent-multiple-inversify)
    * Loading configuration values from a file.
    * Configuration is stored in muiltiple TypeScript classes.
    * Configuration classes are managed by inversify.
