//modulo express y lo guardo en una constante que le puse el mismo nombre
const express = require('express')
//ejecutamos modulo express que me devuelve un objeto que lo guardo en app
const app= express();
//usar de express el metodo json para que interprete todos los json
app.use(express.json());

//conexion a la base de datos
require('./src/database');

//todas las rutas se les antepone /api
app.use('/api',require('./src/routes/index'))

app.listen(3000);
console.log('server on port', 3000);