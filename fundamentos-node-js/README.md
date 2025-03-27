Clase tomada de midulive, en la cual se aprenden las bases fundamentales de node.js

globalThis
Variables Globales => obtiene las variables globales de globalThis (ej: console.log, fetch, Promise, Math, etc)

Patron de diseño Modulo para separar el código en diferentes ficheros, para reutilización de código   
.js o .cjs -> commonjs uso antiguo para modules (module.exports) y require(‘./pathdelmodulo’) 
.mjs -> para ES modules -> imports y exports   (ECMAScripts Modules)

Módulos nativos de node.js
  se usa require(‘node: modulo_a_usar’)
Modulo OS para acceder a data del sistema operativo
 

Modulo File System  MonoHilo Basado en Eventos Async o Sync
Utiliza la arquitectura de eventos para leer información, con los callStack
StatSync
 
CallBacks  con Async  
Función que se ejecuta cuando una tarea asíncrona ha terminado (callStack)
 
Promesas en lugar de callback  / Hoy en día se usa Promesas en la mayoria de ocasiones
 
Async con Await  | otro modo es con IIFE (Inmediatly Invoked Function Expression) 
  SECUENCIAL => espera a terminar un await para seguir con el otro (dependen del anterior)
  PARALELO => lee los dos a la vez  (es mas rapido)  
 
Modulo PATH  (construir nuevas rutas, extensiones, rutas absolutas, etc)
 
OBJETO GLOBAL PROCESS
objeto global que proporciona información y control sobre el proceso actual de ejecución (propiedades y métodos que permiten interactuar con el proceso actual (argumentos de entrada a la hora de ejecutar un proceso))
Process.argv,  process.exit,
 
NPM Node package Manager 
npm init => para iniciar la descripción del proyecto, version, nombre, testing, etc  devuelve el package.json
  dependencias => librerías que se necesitan en producción
  dependenciasDev => solo en desarrollo   npm install  nombre_libreria -D  (la D le indica que solo es de desarrollo)
