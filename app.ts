const express = require('express')
const app= express();
app.use(express.json());
require('./src/database');
app.use('/api/v1',require('./src/routes/index'))
app.listen(3000);
console.log('server on port', 3000);