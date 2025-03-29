import mysql from 'mysql2/promise';

//Usé DBngin para conectar al puerto 3306 en local y workBench para generar el squema
const config = {
    host: 'localhost',
    user: 'root',
    port: 3306,
    password: '',
    database: 'moviesdb',
}

const connection = await mysql.createConnection(config);

export class MovieModel {
    static async getAll({ genre }) {


        if (genre) {
            const lowerCaseGenre = genre.toLowerCase()

            //get genred ids from database table using genre names
            const [genres] = await connection.query(
                'SELECT id, name FROM genre WHERE LOWER(name) = ?;', [lowerCaseGenre]
            )

            //no genre found
            if (genres.lenght === 0) return []

            //get the id from the first genre result
            const [{ id }] = genres

            const [movies_genre] = await connection.query(
                `SELECT 
                    BIN_TO_UUID(m.id) AS movie_id, 
                    m.title, 
                    m.year, 
                    m.director, 
                    m.duration, 
                    m.poster, 
                    m.rate
                FROM movie m
                JOIN movie_genres mg ON m.id = mg.movie_id
                WHERE mg.genre_id = ?;`,
                [id]
            );

            return movies_genre;
        }

        const [movies, table] = await connection.query(
            'SELECT title, year, director, duration, poster, rate, BIN_TO_UUID(id) id FROM movie;'
        );

        return movies;
    }

    static async getById({ id }) {
        const [movies] = await connection.query(
            `SELECT title, year, director,duration,poster,rate, BIN_TO_UUID(id) id 
            FROM movie WHERE id = UUID_TO_BIN(?);`,
            [id]
        );

        if (movies.length === 0) return null
        return movies[0];
    }

    static async create({ input }) {

        const {
            title,
            year,
            director,
            duration,
            poster,
            rate,
            genre //Este lo almaceno en la tabla movie_genres ya que es un array y se asocia N generos a el id de la pelicula creada
        } = input


        const [uuidResult] = await connection.query('SELECT UUID() AS uuid;') //Obtener id unico
        const [{ uuid }] = uuidResult

        //Transacciones: atómico (o todo se guarda o nada)
        try {
            await connection.query(
                `INSERT INTO movie (id, title, year, director, duration, poster, rate) 
                VALUES (UUID_TO_BIN(?), ?,?,?,?,?,?)`,
                [uuid, title, year, director, duration, poster, rate]
            )

            // Si hay géneros, insertarlos
            if (genre.length > 0) {
                // Usar Promise.all para manejar las inserciones en paralelo
                await Promise.all(genre.map(async (g) => {
                    const [genreRows] = await connection.query(
                        'SELECT id FROM genre WHERE name = ? LIMIT 1;',
                        [g]
                    );

                    if (genreRows.length > 0) {
                        await connection.query(
                            `INSERT INTO movie_genres (movie_id, genre_id) 
                            VALUES ((SELECT id FROM movie WHERE id = UUID_TO_BIN(?)), ?);`,
                            [uuid, genreRows[0].id]
                        );
                    }
                }));
            }

        } catch (e) {
            // e => Puede enviarle informacion sensible al usuario, tener cuidado
            //console.error("Error inserting movie")
            //return { status: 500, message: "Error interno del servidor." };
            throw new Error("Error inserting movie");
            //Enviar traza a un servicio interno
            //sendLog(e)
        }

        const [movies] = await connection.query(
            `SELECT title, year, director, duration, poster, rate, BIN_TO_UUID(id) id
            FROM movie WHERE id = UUID_TO_BIN(?);`,
            [uuid]
        )

        return movies[0];

    }

    static async delete({ id }) {

        // Primero, elimina las relaciones en movie_genres , Se podría en CASCADE si lo tuviera con FK, pero para este proyecto pequeño no lo hice
        await connection.query(
            `DELETE FROM movie_genres WHERE movie_id = UUID_TO_BIN(?);`,
            [id]
        );

        const [result] = await connection.query(
            `DELETE FROM movie WHERE id = UUID_TO_BIN(?);`,
            [id]
        );

        if (result.affectedRows === 0) return {
            status: 404, message: "Película no encontrada"
        };

        return { status: 200, message: "Movie deleted successfully" };
    }

    static async update({ id, input }) {
        try {
            // Construir la consulta dinámicamente ya que puede llegar title, year, etc opcionales
            const fields = Object.keys(input).map(key => `${key} = ?`).join(", ");
            const values = Object.values(input);

            // Agregar el `id` al final del array de valores
            values.push(id);

            // Ejecutar la consulta
            const [resultUpdate] = await connection.query(
                `UPDATE movie SET ${fields} WHERE id = UUID_TO_BIN(?);`,
                values
            );

            if (resultUpdate.affectedRows === 0) return {
                status: 404, message: "Película no encontrada o sin cambios."
            };

            return { status: 200, message: "Película actualizada correctamente." };

        } catch (error) {
            console.error("Error al actualizar película:", error.message);
            return { status: 500, message: "Error interno del servidor." };
        }

    }
}