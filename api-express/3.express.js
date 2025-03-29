const express = require("express")
const ditto = require('./pokemon/ditto.json')
const PORT = process.env.PORT ?? 1234

const app = express()
app.disable('x-powered-by') //Se quita de la cabecera por temas de seguridad

/*app.use((req, res, next) => {
    console.log("mi primer middleware")

    if (req.method !== 'POST') return next()
    if (res.headers['content-type'] !== 'application/json') return next()

    //Solo llegan request que son POST  y que tienen el header content-type:application/json
    let body = ''
    req.on("data", chunk => {
        body += chunk.toString()
    })
    req.on("end", () => {
        const data = JSON.parse(body)
        data.timestamp = Date.now()
        //Mutar la request y meter la informacion en el req.body
        req.body = data
        next()
    })
})*/

app.use(express.json())  //Este es el MIDDLEWARE que hace lo que está arriba comentado pero en una linea

//Cuando la app recibe un get en esta ruta ejecuta esto
app.get('/', (req, res) => {
    res.json(ditto)
})

app.get('/', (req, res) => {
    res.send('<h1>Mi página</h1>')
})

app.post('/pokemon', (req, res) => {
    //req.body deberiamos guardar en base de datos
    res.status(201).json(req.body) //esto se va hacia el middleware
})

//Para todas las acciones pasa por aqui
app.use((req, res) => {
    res.status(404).send('<h1>404 Not Found</h1>')
})

app.listen(PORT, () => {
    console.log(`server listening on port http://localhost:${PORT}`)
})