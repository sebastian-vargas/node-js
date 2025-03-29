/*import { createRequire } from 'node:module'
const require = createRequire(import.meta.url)
export const readJSON = (path) => require(path)*
NO ME FUNCIONÓ DE ESTE MODO
*/

//como leer un json en ESModule con FS  recibo el path como parametro
import fs from 'node:fs'
export const readJSON = (path) => JSON.parse(fs.readFileSync(path, 'utf-8'))