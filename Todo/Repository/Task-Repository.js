const express = require('express');
const UserTask = require('../Model/Tasks');

const ShowAllTasks = async (Username) => {
    return UserTask.where('UserName','==','Username.username')
}
const MarkCompletedTask = async (id,TaskData) => {
   return await UserTask.findByIdAndUpdate({ _id : id.taskid },{ $set :{ Completed :TaskData.completed , CompletedTime: new Date()}})
}

const ShowAllCompletedTask = async () =>{
   return await UserTask.find({ Completed :true})
}

const ShowUncompletedTask = async () => {
    return await UserTask.find({Completed :false})
}

const RemoveAllCompletedTask = async () => {
   return await UserTask.findOneAndDelete({ Completed:true})
}

const UserAndTask = async (id) =>{
    return await UserTask.find({userid: id.userid}).populate({ path: 'User', select: 'Firstname Lastname Email Type' })
}
module.exports = {
    ShowAllTasks,
    MarkCompletedTask,
    ShowAllCompletedTask,
    ShowUncompletedTask,
    RemoveAllCompletedTask,
    UserAndTask
}