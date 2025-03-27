//Obtener lo directorios
const fs = require("node:fs");
fs.readdir(".", (err, files) => {
    if(err){
        console.log("error leyendo el directorio", err)
        return;
    }
    files.forEach(file => {
        console.log(file)
    })
})