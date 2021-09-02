require('dotenv').config()
const express=require('express')
const router=express.Router()
const bodyParser=require('body-parser');
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const jwt_decode = require('jwt-decode');
const connection=require('../Helper/db.js')
const TodoUser=require('../Model/User')
const {RegisterValidation} = require('../Helper/validation')

function generateAccessToken(user){
    return jwt.sign(user,process.env.ACCESS_TOKEN_SECRET,{ expiresIn:'1h'});
}
function hashPassword(password){
    const salt = bcrypt.genSaltSync(10);
    return bcrypt.hashSync(password, salt);   
}

const RegisterUser = async (req, res, next)=>{
    //const result = await RegisterValidation.validateAsync(req.body);
   const Password =hashPassword(req.body.password)
    const exist = await TodoUser.findOne({ Email: req.body.email })
    if(exist) {
        res.status(200).json({
            message:` ${req.body.email} already Found `
        })
    }
    const user = new TodoUser({
        Firstname:req.body.firstname,
        Lastname:req.body.lastname,
        Email:req.body.email,
        Usertype:req.body.type,
        Password:Password
    })
    const saveuser=await user.save()
        res.status(201).json({
            status:201,
            success : true,
            message:`${req.body.email} Added Sucessfully into Todo App`
        })
    
};

const LoginUser = async (req,res,next)=>{
   const email=req.body.email
   const Password =hashPassword(req.body.password)
   const isemail=await TodoUser.findOne({Email:email});
   if(!isemail){
       res.status(400).json({
           meassage:`${email} not Registered`
       })
    }
       const ispassword= await bcrypt.compare(req.body.password, Password);
       if(!ispassword){
           res.status(400).json({
               message:"Not valid Password"
           })
        }
    userauth={ Email: email,Password:Password}
    const accessToken=generateAccessToken(userauth)
    console.log(accessToken)
    res.status(200).json({
      status :200,
      sucess:true,
      AccessToken : accessToken
    })   
}


const GetAllUserDetails= async (req,res,next)=>{
  await TodoUser.find({}).exec((err,data) =>{
      res.status(200).json({
          status:200,
          success :true,
          data :data
      })
  })
}

const GetPerticularUser= async (req,res,next) =>{
   await TodoUser.findById({ _id : req.params.userid}).exec((err,data) =>{
        res.status(200).json({
            status:200,
            success:true,
            Data :data
        })
    })
}

const GetPerticularUserByUsingToken= async (req,res,next) =>{
    var authHeader = req.headers.authorization.split(' ')[1];
    var token = jwt_decode(authHeader);
    await TodoUser.find({ Email :token.Email}).exec((err,data) =>{
         res.status(200).json({
             status:200,
             success:true,
             Data :data
         })
     })
 }

module.exports={
    RegisterUser,
    LoginUser,
    GetAllUserDetails,
    GetPerticularUser,
    GetPerticularUserByUsingToken
}