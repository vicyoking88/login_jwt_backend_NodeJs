//modulo express y lo guardo en una constante que le puse el mismo nombre
const express = require('express')
//ejecutamos modulo express que me devuelve un objeto que lo guardo en app
const app= express();


app.listen(3000);
console.log('server on port', 3000);