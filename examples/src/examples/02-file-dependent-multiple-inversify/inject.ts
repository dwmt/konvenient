import {inject as injectConfig} from './config/inject'
import {inject as injectMovies} from './movies/inject'
import {inject as injectIntrospection} from './introspection/inject'
import {Container} from "inversify";

export function inject(): Container {
  const container = new Container()

  injectConfig(container)
  injectMovies(container)
  injectIntrospection(container)

  return container
}
