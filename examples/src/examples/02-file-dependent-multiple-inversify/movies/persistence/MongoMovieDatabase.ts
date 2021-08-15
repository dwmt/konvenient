import {injectable, inject} from 'inversify';
import {DatabaseConfiguration} from '../../config';
import {Movie} from './Movie';
import {MovieDatabase} from './MovieDatabase';

@injectable()
export class MongoMovieDatabase implements MovieDatabase {
	private config: DatabaseConfiguration;

	constructor(@inject(DatabaseConfiguration) config: DatabaseConfiguration) {
		this.config = config;
	}

	getMovies(): Movie[] {
		console.log(`Retrieved from ${this.config.connectionString}`);

		return [
			{
				id: '0001',
				title: 'Torrente, el brazo tonto de la ley',
			},
		];
	}
}
