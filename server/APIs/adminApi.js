const exp=require('express')
const adminApp=exp.Router();
const createUserOrAuthor=require('./createUserOrAuthor')
const expressAsyncHandler=require("express-async-handler")
const UserAuthor=require('../models/userauthorModel')
//api
adminApp.get("/",(req,res)=>{
    res.send({message:"Get connection from adminApi"})
})
//create new admin
adminApp.post('/admin',expressAsyncHandler(expressAsyncHandler(createUserOrAuthor)))

//read all users and authors 
adminApp.get('/userauthors',expressAsyncHandler(async(req,res)=>{
    const userList = await UserAuthor.find({
        role: { $in: ['author', 'user'] }, 
        isActive: true
      });
      
    res.status(201).send({message:"All user and authors",payload:userList})
}))

//update the users data  by email
adminApp.put('/usersupdate/:email',expressAsyncHandler(async(req,res)=>{
    const email=req.params.email;
    const modifieduser=req.body;
    const dbRes=await UserAuthor.findOneAndUpdate({email:email},
        {...modifieduser},
        { returnOriginal: false, new: true });
        if (!dbRes) {
            return res.status(404).send({ message: "User or Article not found" });
          }
        
          res.status(200).send({ message: "User or Author modified", payload: dbRes });

}))
//exports
module.exports=adminApp;