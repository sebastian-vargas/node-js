//Sistema de archivos o File System ReadFile  Asincronos con Callback
const fs = require('node:fs')

console.log("Leyendo primer archivo...")
fs.readFile("./archivo.txt", "utf-8", (err, text) => { //Callback
    console.log("Primer texto",text)
});

console.log("Hacer cosas mientras lee el archivo")

console.log("Leyendo segundo archivo...")
fs.readFile("./archivo2.txt", "utf-8", (err, text) => { //Callback
    console.log("Segundo texto",text)
});