//aki creamos el modelo de datos para ser usado desde cualquier lado
import { Schema, model } from 'mongoose';

const userSchema=new Schema({
    email:String,
    password:String
},{
    timestamps:true/**esto carga la hora de creacion */
})

/**export model */
module.exports=model('User', userSchema);