const {Router}=require('express');
const router=Router();
//cargamos el modelo user
const user = require('../models/User');

//cargamos el modulo para el token
const jwt=require('jsonwebtoken');

router.get('/',(req, res)=>res.send('Hello World'))

router.post('/signup', async (req, res)=>{
    //vemos el cuerpo: body de la peticion: req quest
    console.log(req.body)
    //cargo en una constante las dos partes del json 
    //su propiedad email y su propiedas password
    const{email, password}=req.body;
    console.log(email, password);

    //creamos un nuevo usuario usando el modelo usuario
    //y guardamos en una constante
    const newUser=new user({email:email, password:password});
    console.log(newUser);
    
    //guardamos en mongodb
    /**await y async para seguir trabajando mientras se ejecuta el proceso asincrono en este caso el .save() */
    await newUser.save();
    //usamos el metodo sign del modulo
    //guardamos en una constante el token
    const token=jwt.sign({_id:newUser._id}, 'secretKey')
    //devuelvo el token al cliente
    res.status(200).json({token:token})
})

module.exports=router;