//Obtener lo directorios de la carpeta actual
const fs = require("node:fs/promises");
const path = require("node:path");
const folder = process.argv[2] ?? "."  //Los nombres de los archivos del proyecto
const pc = require("picocolors")

async function ls(folder) {
    let files
    try {
        files = await fs.readdir(folder) //Leer los archivos del directorio o fichero
    } catch (error) {
        console.error(pc.red(`X No se pudo leer el directorio ${folder}`));
        process.exit(1)
    }

    const filesPromises = files.map(async file => {//obtiene cada directorio o fichero  (carpetas, archivos)
        const filePath = path.join(folder, file)//obtenemos el path de cada directorio o fichero (carpeta o archivos)
        let stats
        try {
            stats = await fs.stat(filePath) //Stat da la informacion del archivo (si es un directorio, carpeta, archivo, etc)
        } catch (error) {
            console.error(`no se pudo leer el archivo ${filePath}`)
            process.exit(1)
        }

        const isDirectory = stats.isDirectory()
        const fileType = isDirectory ? "d" : "f" //Si es un directorio o si es un fichero
        const fileSize = stats.size;
        const fileModified = stats.mtime.toLocaleString();

        //padEnd ocupa 20 espacios, padStart separa 10 espacios   (pc es una libreria para pintar colores en consola, es un tema estetico)
        return `${fileType} ${pc.blue(file.padEnd(20))} ${pc.green(fileSize.toString().padStart(10))} ${fileModified}`
    })

    const filesInfo = await Promise.all(filesPromises);
    filesInfo.forEach(fileInfo => console.log(fileInfo))
}

ls(folder);