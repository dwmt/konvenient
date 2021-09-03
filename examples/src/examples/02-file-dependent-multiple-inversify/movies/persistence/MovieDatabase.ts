import {Movie} from './Movie'

export interface MovieDatabase {
  getMovies(): Movie[]
}

export const TYPE = Symbol('MovieDatabase')
