//aki creamos el modelo de datos para ser usado desde cualquier lado
const{Schema, model}=require('mongoose');

const userSchema=new Schema({
    email:String,
    password:String
})

module.exports=model('User', userSchema);