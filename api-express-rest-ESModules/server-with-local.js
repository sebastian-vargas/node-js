import { createApp } from './app.js';
import { MovieModel } from './models/local-file-system/movie.js';
//Modelo Local sin base de datos, invoca a movie.json
createApp({ movieModel: MovieModel });