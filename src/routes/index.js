const {Router}=require('express');
const router=Router();

const user = require('../models/User');

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

    res.send('Testing Signup')
})

module.exports=router;