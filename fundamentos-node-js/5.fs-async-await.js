//Sistema de archivos o File System ReadFile  Async
const fs = require('node:fs/promises')
//IIFE - Inmediatly Invoked Function Expression
    /*;(
        async () => {
            console.log("Leyendo primer archivo...")
            const text = await fs.readFile("./archivo.txt", "utf-8")
            console.log("Text", text)

            console.log("Hacer cosas mientras lee el archivo")
            
            console.log("Leyendo segundo archivo...")
            const secodText = await fs.readFile("./archivo2.txt", "utf-8")
            console.log("Second Text", secodText)
        }
    )()*/

async function init(){
    console.log("Leyendo primer archivo...")
    const text = await fs.readFile("./archivo.txt", "utf-8")
    console.log("Text", text)

    console.log("Hacer cosas mientras lee el archivo")
    
    console.log("Leyendo segundo archivo...")
    const secodText = await fs.readFile("./archivo2.txt", "utf-8")
    console.log("Second Text", secodText)
}
init();
