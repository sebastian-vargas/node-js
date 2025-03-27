const http = require("node:http")

const { findAvailablePort } = require("./12.free-port.js")

const server = http.createServer((req, res) => {
    console.log("request received");
    res.end("Hola mundo")
})

//Creamos una funcion que si el puerto està ocupado, ensaya con otro
findAvailablePort(3000).then(port => {
    server.listen(port, () => {
        console.log(`Server listening on port http://localhost:${port}`)
    })
})