const {Router}=require('express');
const router=Router();

const user = require('../models/User');

router.get('/',(req, res)=>res.send('Hello World'))

router.post('/signup', (req, res)=>{
    //vemos el cuerpo: body de la peticion: req quest
    console.log(req.body)
    res.send('Testing Signup')
})

module.exports=router;