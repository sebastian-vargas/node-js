const http = require('node:http')
const desiredPort = process.env.PORT ?? 1234

//EJEMPLO con node.js puro SIN EXPRESS
const processRequest = (req, res) => {

    res.setHeader('Content-Type', 'text/html; charset=utf-8')

    if (req.url === '/') {
        res.end('<h1>Bienvenido a mi página de inicio</h1>')
    } else if (req.url === '/contacto') {
        res.end('<h1>Contacto</h1>')
    } else if (req.url === '/contacto') {
        res.end('<h1>Contacto</h1>')
    }
    else {
        res.statusCode = 404
        res.end('<h1>Not Found</h1>')
    }
}

const server = http.createServer(processRequest)

server.listen(desiredPort, () => {
    console.log(`Server listening on port http://localhost:${desiredPort}`)
})
