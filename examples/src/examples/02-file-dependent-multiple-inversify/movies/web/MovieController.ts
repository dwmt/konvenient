import { RouteOptions } from 'fastify'
import { inject, injectable } from 'inversify'
import { Controller } from '../../web/Controller'
import { MovieDatabase, TYPE as MovieDatabaseType } from '../persistence/MovieDatabase'

@injectable()
export class MovieController implements Controller {
    private database: MovieDatabase

    constructor(@inject(MovieDatabaseType) database: MovieDatabase) {
        this.database = database
    }

    routes(): RouteOptions[] {
        return [
            {
                method: 'GET',
                url: '/movies',
                handler: this.retrieveMovies.bind(this)
            }
        ]
    }

    private async retrieveMovies() {
        return {
            results: this.database.getMovies()
        }
    }
}
