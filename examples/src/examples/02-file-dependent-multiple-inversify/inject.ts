import {Container} from 'inversify'
import {inject as injectConfig} from './config/inject'
import {inject as injectMovies} from './movies/inject'
import {inject as injectIntrospection} from './introspection/inject'

export function inject(): Container {
  const container = new Container()

  injectConfig(container)
  injectMovies(container)
  injectIntrospection(container)

  return container
}
