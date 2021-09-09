const express = require('express');
const router = express.Router();
const User = require('../Controller/User-controller');
const VerifyToken = require('../Helper/verifytoken')
const validateRole = require('../Helper/validaterole');

router.post('/register-new-user', User.RegisterUser);
router.post('/login-new-user',User.LoginUser);
router.get('/get-all-user', User.GetAll);
// if you provide token of admin then and then it display all user details
router.get('/get-all-user-by-using-role',validateRole.validateRole, User.GetAllUserDetails);
router.get('/get-perticular-user/:userid', User.GetPerticularUser);
router.get('/get-perticular-user-by-using-token',VerifyToken, User.GetPerticularUserByUsingToken)
router.get('/get-all-admins-by-using-role',validateRole.validateRole, User.GetAllAdminDetalis)

module.exports= router;