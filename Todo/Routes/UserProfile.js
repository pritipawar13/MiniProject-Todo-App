const router = require('express').Router();
const UserProfileController = require('../Controller/Userprofile-Controller');


router.post('/add-details-in-profile/:userid' ,UserProfileController.upload , UserProfileController.AddUserProfile );


module.exports = router;
