import { createApp } from './app.js';
import { MovieModel } from './models/mysql/movie.js';
//SERVIDOR DE SQL / Usé DBngin para conectar al puerto 3306 en local y workBench para generar el squema
//Inyectando el modelo desde lo mas externo usando patron de diseño de inyeccion de dependencias
createApp({ movieModel: MovieModel });