import {Container} from 'inversify'
import {Controller, TYPE as ControllerType} from '../web/Controller'
import {MongoMovieDatabase} from './persistence/MongoMovieDatabase'
import {
  MovieDatabase,
  TYPE as MovieDatabaseType,
} from './persistence/MovieDatabase'
import {MovieController} from './web/MovieController'

export function inject(container: Container) {
  container
    .bind<MovieDatabase>(MovieDatabaseType)
    .to(MongoMovieDatabase)
    .inSingletonScope()
  container
    .bind<Controller>(ControllerType)
    .to(MovieController)
    .inSingletonScope()
}
