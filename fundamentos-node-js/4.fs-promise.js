//Sistema de archivos o File System ReadFile  Asincronos con Promesas
const fs = require('node:fs/promises')

console.log("Leyendo primer archivo...")
fs.readFile("./archivo.txt", "utf-8")
    .then(text => {
        console.log("Primer texto", text)
    })

console.log("Hacer cosas mientras lee el archivo")

console.log("Leyendo segundo archivo...")
fs.readFile("./archivo2.txt", "utf-8")
    .then(text => {
        console.log("Segundo texto", text)
    })