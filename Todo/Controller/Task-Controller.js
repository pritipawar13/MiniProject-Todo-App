const router = require('express').Router();
const UserTask = require('../Model/Tasks');
const TaskRepository = require('../Repository/Task-Repository')

const AddTask =async (req,res,next) =>{
    try{
          if(req.body.Completed === false){
            const newtask= new UserTask({
            userid: req.params.userid,
            Username : req.body.username,
            TaskName : req.body.taskname,
            Completed : req.body.Completed
            })
         newtask.save();
         res.status(201).json({
           status :201,
           success :true,
           message : `${req.body.username} Created Newly task`
          })
          }
         if(req.body.Completed === true){
           res.status(400).json({
            status :400,
            success :false,
            message : `${req.body.username} Firstly You Have to Created New task`
            }) 
           }
        }catch(er){
          console.log(er)
      }
}
// get all task which are created by perticular username.
const ShowTask = async(req,res,next) =>{
    try{
          let response = await TaskRepository.ShowAllTasks(req.query)
           res.status(200).json({
            status :200,
            success :true,
            Data : response
        })
    }catch(err){
        console.log(err)
    }
        
}

const MarkCompleted = async(req,res,next) =>{
    try{
          if(req.body.completed !== true || !req.body.completed){
              res.status(200).json({
              status :200,
              success :false,
              message : ` ${req.params.taskid} Not Completed There Task ...`
             }) 
          }
          await TaskRepository.MarkCompletedTask(req.params , req.body)
          res.status(200).json({
          status :200,
          success :true,
          message : ` ${req.params.taskid} Completed Task ...`
         }) 
    }catch(err){
        console.log(err)
    }
}

const ShowAllCompletedTask = async(req,res,next) => {
    try{
          let response = await TaskRepository.ShowAllCompletedTask()
          res.status(200).json({
           status :200,
           success :true,
           message :'All Completed Task ... ' ,
           Data : response
          })
        }catch(err){
          console.log(err)
         }  
}

const ShowUncompletedTask = async(req,res,next) => {
    try{
          const response = await TaskRepository.ShowUncompletedTask()
          res.status(200).json({
            status:200,
            success : true,
            Message :' All Uncompleted Task..',
            Data : response
           }) 
       }catch(err){
        console.log(err)
        }
}

const RemoveAllCompletedTask = async(req,res,next) => {
    try{
          await TaskRepository.RemoveAllCompletedTask()
          res.status(200).json({
          status :200,
          success :true,
          message : ' Successfully Completed Task '
         })
    }catch(err){
    console.log(err)
    }
}

const UserAndTask = async(req,res,next) => {
    try{
          let response = await TaskRepository.UserAndTask(req.params);
          res.status(200).json({
          status :200,
          success :true,
          data : response
         })
    }catch(err){
        console.log(error)
    }
}



module.exports={
    AddTask,
   ShowTask,
   MarkCompleted,
   ShowAllCompletedTask,
   ShowUncompletedTask,
   RemoveAllCompletedTask,
   UserAndTask
}
