movies = require('./movies.json')

const express = require('express') //require -> commonJS
const crypto = require('node:crypto') //Ids Unicos de la base de node.js no viene de una libreria externa
const { validateMovie, validatePartialMovie } = require('./schemas/movies')
const cors = require('cors')

const app = express()
app.disable('x-powered-by') //Se quita por temas de seguridad ya que muestra que el back es de express
app.use(cors({
    origin: (origin, callback) => {
        const ACCEPTED_ORIGINS = [
            'http://localhost:1234',
            'http://localhost:8080', //npx servor ./web
        ]

        if (ACCEPTED_ORIGINS.includes(origin)) {
            return callback(null, true)
        }
        if (!origin) {
            return callback(null, true)
        }

        return callback(new Error('Not allowed by CORS'))
    }
}))
app.use(express.json());

app.get('/', (req, res) => {
    res.json({ message: "Hola mundo" })
})

//Todos los recursos que sean MOVIES se identifican con /movies
app.get('/movies', (req, res) => {
    const { genre } = req.query
    if (genre) {
        const filteredMovies = movies.filter(
            movie => movie.genre.some(g => g.toLowerCase() === genre.toLowerCase())
        )
        return res.json(filteredMovies)
    }
    res.json(movies)
})

app.post('/movies', (req, res) => {
    const result = validateMovie(req.body)
    if (result.error) return res.status(400).json({ error: JSON.parse(result.error.message) }) //422

    //Esto no seria REST, porque estamos guardando
    //El estado de la aplicacion en memoria
    const newMovie = {
        id: crypto.randomUUID(), //uuid v4
        ...result.data
    }

    movies.push(newMovie)
    res.status(201).json(newMovie)
})

app.get('/movies/:id', (req, res) => { //path-to-regexp
    const { id } = req.params
    const movie = movies.find(movie => movie.id === id)
    if (movie) return res.json(movie)

    res.status(404).json({ message: 'Movie not found' })
})

app.delete('/movies/:id', (req, res) => {
    const { id } = req.params
    const movieIndex = movies.findIndex(movie => movie.id === id)

    if (movieIndex === -1) {
        return res.status(404).json({ message: 'Movie not found' })
    }
    movies.splice(movieIndex, 1)

    return res.json({ message: 'Movie deleted' })
})

app.patch('/movies/:id', (req, res) => {
    const { id } = req.params
    const result = validatePartialMovie(req.body)

    if (result.error) return res.status(400).json({ error: JSON.parse(result.error.message) })

    const movieIndex = movies.findIndex(movie => movie.id === id)

    if (movieIndex === -1) {
        return res.status(404).json({ message: 'Movie not found' })
    }

    const updateMovie = {
        ...movies[movieIndex],
        ...result.data
    }

    movies[movieIndex] = updateMovie;

    return res.json(updateMovie)
})

const PORT = process.env.PORT ?? 1234

app.listen(PORT, () => {
    console.log(`server listening on port http://localhost:${PORT}`)
})