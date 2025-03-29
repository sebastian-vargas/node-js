/**
 * ESTE MODELO ACCEDE AL ARCHIVO JSON DE FORMA LOCAL SIN BASE DE DATOS
 */

import { randomUUID } from 'node:crypto'
import { readJSON } from '../../utils.js'

const movies = readJSON('./movies.json')

export class MovieModel {
    static async getAll({ genre }) {
        if (genre) {
            const filteredMovies = movies.filter(
                movie => movie.genre.some(g => g.toLowerCase() === genre.toLowerCase())
            )
            return filteredMovies
        }
        return movies
    }

    static async getById({ id }) {
        const movie = movies.find(movie => movie.id === id)
        return movie;
    }

    static async create({ input }) {
        //Esto no seria REST, porque estamos guardando
        //El estado de la aplicacion en memoria
        const newMovie = {
            id: randomUUID(), //uuid v4
            ...input
        }

        movies.push(newMovie)
        return newMovie;
    }

    static async delete({ id }) { //Se utilizan objetos para extender a futuro, escalabilidad
        const movieIndex = movies.findIndex(movie => movie.id === id)
        if (movieIndex === -1) return false;
        movies.splice(movieIndex, 1)
        return true;
    }

    static async update({ id, input }) { //Se utilizan objetos para extender a futuro, escalabilidad
        const movieIndex = movies.findIndex(movie => movie.id === id)
        if (movieIndex === -1) return false;

        movies[movieIndex] = {
            ...movies[movieIndex],
            ...input
        }
        return movies[movieIndex];
    }
}