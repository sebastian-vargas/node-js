import { Router } from 'express';
import { MovieController } from '../controllers/movies.js';

//Funcion en la que se devuelve la creacion del router para ser invocada desde el punto de entrada de la app.js
export const createMovieRouter = ({ movieModel }) => {
    const moviesRouter = Router() //Export nombrado
    const movieController = new MovieController({ movieModel })

    moviesRouter.get('/', movieController.getAll);
    moviesRouter.get('/:id', movieController.getById);

    moviesRouter.post('/', movieController.create);
    moviesRouter.delete('/:id', movieController.delete);
    moviesRouter.patch('/:id', movieController.update);

    return moviesRouter //Export por defecto
}