const router = require('express').Router();
const TodoUser = require('../Model/User');

const CheckUser = async (UserData) => {
    var data = await TodoUser.findOne({ Email :UserData.email})
    return data
}

const GetAll = async () => {
  return await TodoUser.find({});
}

const GetAllUser = async () => {
     return await TodoUser.find({role:'student'});
}

const GetPerticularUserDetails = async (userid) => {
  console.log(userid)
  var data = await TodoUser.findById({ '_id' : userid.userid });
  console.log(data)
  return data
}

const GetUserByUsingToken = async(token) => {
    return await TodoUser.find({ Email :token.Email})
}

const GetAllAdminDetalis = async () => {
  return await TodoUser.find({role:'admin'})

}

module.exports={
    GetAllUser,
    CheckUser,
    GetPerticularUserDetails,
    GetUserByUsingToken,
    GetAllAdminDetalis,
    GetAll
}