import { validateMovie, validatePartialMovie, validateUUID } from "../schemas/movies.js"

//Implemento patron de diseño por inyeccion (funcion flecha para poder usar THIS y constructor) de dependencias para poder usar el modelo que quiera
//const movieController = new MovieController({}) desde afuera se le pasa el modelo a usar en rutas que a su vez se invoca en app.js que será donde se enviará el modelo a usar
export class MovieController {
    constructor({ movieModel }) {
        this.movieModel = movieModel;
    }

    getAll = async (req, res) => {
        const { genre } = req.query
        const movies = await this.movieModel.getAll({ genre })
        res.json(movies)
    }

    getById = async (req, res) => {
        const { id } = req.params
        const movie = await this.movieModel.getById({ id })

        if (movie) return res.json(movie)

        res.status(404).json({ message: 'Movie not found' })
    }

    create = async (req, res) => {
        const result = validateMovie(req.body)
        if (result.error) return res.status(400).json({ error: JSON.parse(result.error.message) }) //422

        const newMovie = await this.movieModel.create({ input: result.data })
        res.status(201).json(newMovie)
    }

    delete = async (req, res) => {
        const { id } = req.params
        const resultId = validateUUID(id);
        if (resultId.error) return res.status(400).json({ error: JSON.parse(resultId.error.message) })

        const result = await this.movieModel.delete({ id })

        return res.status(result.status).json({ message: result.message })

    }

    update = async (req, res) => {
        const result = validatePartialMovie(req.body)
        if (result.error) return res.status(400).json({ error: JSON.parse(result.error.message) })

        const { id } = req.params
        const resultId = validateUUID(id);
        if (resultId.error) return res.status(400).json({ error: JSON.parse(resultId.error.message) })

        const updatedMovie = await this.movieModel.update({ id, input: result.data })

        return res.status(updatedMovie.status).json({ message: updatedMovie.message })

    }
}