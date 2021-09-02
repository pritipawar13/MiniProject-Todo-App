const express = require('express');
const router = express.Router();
const Task = require('../Controller/User-controller');
const VerifyToken = require('../Helper/verifytoken')


router.post('/register-new-user', Task.RegisterUser);
router.post('/login-new-user',Task.LoginUser);
router.get('/get-all-user',Task.GetAllUserDetails);
router.get('/get-perticular-user/:userid', Task.GetPerticularUser);
router.get('/get-perticular-user-by-using-token',VerifyToken,Task.GetPerticularUserByUsingToken)


module.exports= router;