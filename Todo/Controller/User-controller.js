require('dotenv').config()
const express=require('express')
const router=express.Router()
const bodyParser=require('body-parser');
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const jwt_decode = require('jwt-decode');
const connection=require('../Helper/db.js')
const TodoUser = require('../Model/User')
const {RegisterValidation} = require('../Helper/validation')
const UserRepository = require('../Repository/User-Repository')
const redisConnection = require('../Helper/redisconnection')

function generateAccessToken(user){
    return jwt.sign(user,process.env.ACCESS_TOKEN_SECRET);
    //,{ expiresIn:'1h'});
}
function hashPassword(password){
    const salt = bcrypt.genSaltSync(10);
    return bcrypt.hashSync(password, salt);   
}

const RegisterUser = async (req, res, next) => {
    try {
           const Password = hashPassword(req.body.password)
           const exist = await UserRepository.CheckUser(req.body);
           if(exist) {
             res.status(200).json({
             message:` ${req.body.email} already Found `
              })
            }
           const user = await new TodoUser({
           Firstname: req.body.firstname,
           Lastname: req.body.lastname,
           Email: req.body.email,
           Usertype: req.body.type,
           Password: Password
           })
          await user.save()
          res.status(201).json({
            status: 201,
            success : true,
            message:`${req.body.email} Added Sucessfully into Todo App`
           })
        }catch(error){
          console.log(error)
         }
   };

const LoginUser = async (req,res,next)=>{
    try {
   const email = req.body.email
   const Password = hashPassword(req.body.password)
   const isemail = await UserRepository.CheckUser(req.body);
   if(!isemail) {
       res.status(400).json({
           meassage:`${email} not Registered`
       })
    }
    const ispassword = await bcrypt.compare(req.body.password, Password);
    if(!ispassword) {
        res.status(400).json({
            message:"Not valid Password"
        })
    }
    userauth = { Email: email, Password:Password}
    const accessToken = await generateAccessToken(userauth)
    redisConnection.set("AccessToken",accessToken)
    redisConnection.expire("AccessToken",3600)
    console.log(accessToken)
    res.status(200).json({
      status : 200,
      sucess: true,
      AccessToken : accessToken
    }) 
}catch(error){
    console.log(error)
}  
}


const GetAllUserDetails = async (req,res,next) => {
    try {
          let response = await UserRepository.GetAllUser()
          res.status(200).json({
            status: 200,
            success : true,
            data : response
            })
        }catch(error){
            console.log(error)
        }
}

const GetPerticularUser = async (req,res,next) => {
    try{
          let response = await UserRepository.GetPerticularUserDetails(req.query)
          res.status(200).json({
             status: 200,
             success: true,
             Data : response
            })
        }catch(error){
           console.log(error)
          }
}

const GetPerticularUserByUsingToken= async (req,res,next) =>{
    try{
          var authHeader = req.headers.authorization.split(' ')[1];
          var token = jwt_decode(authHeader);
          console.log(token)
          const response = await  UserRepository.GetUserByUsingToken(token)
          res.status(200).json({
            status: 200,
            success: true,
            Data : response
            })
        }catch(error){
           console.log(error)
          }
 }

module.exports={
    RegisterUser,
    LoginUser,
    GetAllUserDetails,
    GetPerticularUser,
    GetPerticularUserByUsingToken
}