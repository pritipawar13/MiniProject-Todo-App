const express=require('express');
const app=express()
const port=process.env.PORT ||3005;
app.use(express.json())

const addUser=require('./Routes/User')
const tasks=require('./Routes/Tasks')
const userProfile = require('./Routes/UserProfile');


app.use(addUser)
app.use(tasks);
app.use(userProfile)


app.listen(port,function(){
    console.log(`Server is Running on ${port}`)
})