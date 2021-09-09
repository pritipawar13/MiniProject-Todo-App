const express = require('express');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Userprofile = new Schema ({
    Firstname:{
        type:String,
        required :true,
    },
    Lastname:{
        type:String,
        required :true,
    },
    Email:{
        type: String,
        required :true,

    },
    PhoneNumber :{
        type : Number,
        required : false
    },
    Bio :{
        type :String,
        required : false
    },
    Image: String,
    createdAt: {
        type: Date,
        default: new Date(),
      },
})

const userprofile = mongoose.model('UserProfile',Userprofile);
module.exports = userprofile ;