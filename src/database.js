const mongoose=require('mongoose');

//then = una ves se conecte muestra el mensaje de consola
//catch = en caso error mostrarlo por consola
mongoose.connect('mongodb://localhost/angular-auth',{
}).then(db=>console.log('database is connected'))
  .catch(err=>console.log(err))