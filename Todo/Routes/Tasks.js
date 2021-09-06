const router = require('express').Router();

const Task=require('../Controller/Task-Controller')
router.post('/add-new-task/:userid', Task.AddTask);
router.get('/task-of-user/:username',Task.ShowTask);
router.put('/mark-completed-task/:taskid',Task.MarkCompleted);
router.get('/all-completed-task',Task.ShowAllCompletedTask);
router.delete('/remove-all-completed-task',Task.RemoveAllCompletedTask);
router.get('/user-info-and-task/:userid',Task.UserAndTask);
router.get('/all-uncompleted-task',Task.ShowUncompletedTask);



module.exports=router