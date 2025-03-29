// IMPORTANTE!  Estoy usando dos modelos, uno en local con un archivo JSON y otro con SQL
// import { MovieModel } from "./models/local-file-system/movie.js"; //Modelo Local sin BD solo llamando al movies.json
//import { MovieModel } from "./models/mysql/movie.js" //Modelo con SQL usando mysql2

import express, { json } from 'express';
import { corsMiddleware } from './middlewares/cors.js';
import { createMovieRouter } from './routes/movies.js';

//Create App es invocado en server-with-mysql.js y server-with-local.js  (tengo un script para cada uno en el package.json)
export const createApp = ({ movieModel }) => {
    const app = express();
    app.disable('x-powered-by');//Se quita por temas de seguridad ya que muestra que el back es de express (powered by)
    app.use(corsMiddleware());
    app.use(json());

    //Modelo a usar en el punto de entrada, puedo pasarle diferentes modelos
    //vienen de server-with-mysql.js o server-with-local.js
    //los scripts de package.json, hay dos para iniciar el back. uno con sql y otro con local
    //npm run dev-local y npm run dev-sql
    //Tener en cuenta que el de sql necesita tener la base de datos y el puerto levantado
    app.use('/movies', createMovieRouter({ movieModel }));

    const PORT = process.env.PORT ?? 1234

    app.listen(PORT, () => {
        console.log(`server listening on port http://localhost:${PORT}`)
    })
}