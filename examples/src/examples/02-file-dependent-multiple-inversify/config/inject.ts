import {DatabaseConfiguration, GlobalConfiguration, HttpConfiguration} from '.'
import {Container} from "inversify";

export function inject(container: Container) {
  container
    .bind<GlobalConfiguration>(GlobalConfiguration)
    .toSelf()
    .inSingletonScope()
  container
    .bind<HttpConfiguration>(HttpConfiguration)
    .toSelf()
    .inSingletonScope()
  container
    .bind<DatabaseConfiguration>(DatabaseConfiguration)
    .toSelf()
    .inSingletonScope()
}
