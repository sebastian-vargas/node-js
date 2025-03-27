const path = require("node:path");
console.log("indica que barra usa el SO", path.sep);

const filePath = path.join('./content', "subfolder", "text.txt");
console.log("Unir rutas con Path",filePath);

const base = path.basename('/tmp/secret-file/password.txt')
console.log("Nombre del fichero", base);

const filename = path.basename('/tmp/secret-file/password.txt', ".txt")
console.log("Nombre del fichero sin la extension", filename);

const extension = path.extname("image.jpg")
console.log("extension del fichero",extension)