import { NextFunction, Request, Response } from 'express';
const {Router}=require('express');
const router=Router();
//cargamos el modelo user
const user = require('../models/User');

//cargamos el modulo para el token
const jwt=require('jsonwebtoken');

router.get('/',(req:Request, res:Response)=>res.send('Hello World'))

//crete user y return token
router.post('/signup', async (req:Request, res:Response)=>{
    const{email, password}=req.body;
    const newUser=new user({email:email, password:password});
    await newUser.save();
    const token=jwt.sign({_id:newUser._id}, 'secretKey')
    res.status(200).json({token:token})
})

//signin and return token 
router.post('/signin', async (req:Request, res:Response)=>{
    const{email, password}=req.body;
    const User= await user.findOne({email:email})
    if(!User) return res.status(401).send("the email doesn't exists");
    if(User.password !== password) return res.status(401).send("Wrong Password");
    const token=jwt.sign({_id: User._id}, 'secretKey');
    return res.status(200).json({token});
})

/**public data*/
router.get('/tasks', (req:Request, res:Response)=>{
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
        },
        {
            _id:4,
            name: 'task four',
            description: 'test token',
            date:'2021-12-12T16:03:21.548Z'
        }
    ])
})

/**RUTA PRIVADA PARA PROBAR TOKEN */

router.get('/private-tasks', verifyToken, (req:Request, res:Response)=>{
    res.json([
        {
            _id:4,
            name: 'task four',
            description: 'test token',
            date:'2021-12-12T16:03:21.548Z'
        },
        {
            _id:5,
            name: 'task five',
            description: 'test token',
            date:'2021-12-12T16:03:21.548Z'
        },
        {
            _id:6,
            name: 'task six',
            description: 'test token',
            date:'2021-12-12T16:03:21.548Z'
        }
    ])
})

interface ReqModel extends Request{
    userId:string;
}

router.get ('/profile', verifyToken,(req:ReqModel, res:Response)=>{
    res.send(req.userId);
})

module.exports=router;


function verifyToken(req:ReqModel, res:Response, next:NextFunction ){
    if(!req.headers.authorization){
        return res.status(401).send('anUthorize Reqeust');
    }
    const token=req.headers.authorization.split(" ")[1]
    if(token=='null'){
        return res.status(401).send('anUthorize Reqeust');
    }
    const payload=jwt.verify(token, 'secretKey');
    req.userId=payload._id;
    next();
    
}