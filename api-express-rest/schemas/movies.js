const z = require('zod')
const movieSchema = z.object({
    title: z.string({
        invalid_type_error: 'Movie title must be a string',
        required_error: 'Movie title is required'
    }),
    year: z.number().int().positive().min(1895).max(2025),
    director: z.string(),
    duration: z.number().int().positive(),
    poster: z.string().url({
        message: 'Poster must be a valid URL'
    }),
    genre: z.array(
        z.enum(['Action', 'Adventure', 'Comedy', 'Drama', 'Fantasy', 'Horror', 'Thriller', 'Sci-Fi']),
        {
            required_error: 'Movie genre is required',
            invalid_type_error: 'Movie genre must be an array of enum Genre'
        }
    ),
    rate: z.number().min(0).max(10),
})

function validateMovie(object) {
    return movieSchema.safeParse(object)  //safeParse devuelve un objeto resolve que dice si hay un error o si hay datos
}

function validatePartialMovie(object) {
    return movieSchema.partial().safeParse(object) //Partial hace opcionales las propiedades del schema
}

module.exports = {
    validateMovie,
    validatePartialMovie
}