const {readFile} = require('node:fs/promises')
//Paralelo
Promise.all([
    readFile("./archivo.txt", "utf-8"),
    readFile("./archivo2.txt", "utf-8")
]).then(([text, secondText]) => {
    console.log("Text", text)
    console.log("Second Text", secondText)
});
