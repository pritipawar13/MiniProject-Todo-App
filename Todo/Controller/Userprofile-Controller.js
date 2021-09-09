const express = require('express')
const multer = require('multer')
const path = require('path');
const UserRepository = require('../Repository/User-Repository');
const UserProfile = require('../Model/UserProfile');
const maxfilesize = 1024 * 1024;

// storage engine
const storage = multer.diskStorage({
    destination: './public/images/',
    filename: (req, file, cb) => cb(null, `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`),
  });
  
  const upload = multer({
    storage,
    limits: { fileSize: maxfilesize },
    fileFilter(req, file, cb) {
      var filetypes = /jpeg|jpg|png/;
      var mimetype = filetypes.test(file.mimetype);
      var extname = filetypes.test(path.extname(
        file.originalname,
      ).toLowerCase());
      if (mimetype && extname) {
        return cb(null, true);
      }
  
      cb(`${'Error: File upload only supports the '
                  + 'following filetypes - '}${filetypes}`);
    },
  
  }).single('image');

const AddUserProfile = async (req, res) => {
    const data = await UserRepository.GetPerticularUserDetails(req.params);
    const userprofile = await new UserProfile({
        Firstname : data.Firstname,
        Lastname : data.Lastname ,
        Email : data.Email ,
        Image : req.file.filename,
    })
   await userprofile.save()
    res.status(201).json({
       status : 201,
        sucess : true,
        message : `Sucessfully created ${data.Email} Profile`,
        data :data
    });
}

module.exports = {
    AddUserProfile,
    upload
}