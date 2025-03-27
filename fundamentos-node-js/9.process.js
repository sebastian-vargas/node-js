//Argumentos de entrada
console.log(process.argv)

//Controlar el proceso y su salida
//process.exit(1)

//Controlar eventos del proceso
process.on("exit", () => {
    //Limpiar recursos
})
//Current Working Directory,  se ejecuta desde otro sitio el fichero
console.log(process.cwd())

//Platform
console.log(process.env.PEPITO)