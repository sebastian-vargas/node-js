//Modulo OS para oobtener data del sistema operativo
const os = require('node:os')
console.log("Informacion Sitema Operativo");
console.log("Nombre Sistema Operativo", os.platform());
console.log("Version Sistema Operativo", os.release());
console.log("Arquitectura", os.arch());
console.log("CPUs", os.cpus());
console.log("Memoria Libre", os.freemem()/1024/1024);
console.log("Memoria Total", os.totalmem()/1024/1024);
console.log("Uptime, dias encendido ordenador", os.uptime()/60/60)