const {Router}=require('express');
const router=Router();
//cargamos el modelo user
const user = require('../models/User');

//cargamos el modulo para el token
const jwt=require('jsonwebtoken');

router.get('/',(req, res)=>res.send('Hello World'))

//ruta creacion usuario y devolucion token
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

//ruta iniciar sesion usuario ya creado
router.post('/signin', async (req, res)=>{
    //sacamos el email y el password de la peticion
    const{email, password}=req.body;
    //buscamos un elemento en el modelo
    //si lo encuentra lo guarda en una constante llamada user
    const User= await user.findOne({email:email})

    if(!User) return res.status(401).send("the email doesn't exists");
    if(User.password !== password) return res.status(401).send("Wrong Password");

    const token=jwt.sign({_id: user._id}, 'secretKey');

    return res.status(200).json({token});
})

/**RUTA EJEMPLO PARA SOLICITAR INFORMACION DATOS PUBLICOS SIN AUTENTICACION*/
router.get('/tasks', (req, res)=>{
    res.json([
        {
            _id:1,
            name: 'task one',
            description: 'test token',
            date:'2021-12-12T16:03:21.548Z'
        },
        {
            _id:2,
            name: 'task two',
            description: 'test token',
            date:'2021-12-12T16:03:21.548Z'
        },
        {
            _id:3,
            name: 'task three',
            description: 'test token',
            date:'2021-12-12T16:03:21.548Z'
        }
    ])
})

module.exports=router;