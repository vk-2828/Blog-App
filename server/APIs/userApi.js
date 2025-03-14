const exp=require('express')
const userApp=exp.Router();
const UserAuthor=require('../models/userauthorModel')
const expressAsyncHandler=require("express-async-handler")
const createUserOrAuthor=require('./createUserOrAuthor')
const Article=require('../models/articleModel')
//api
userApp.get("/users",async(req,res)=>{
    //get user
    let userList=await UserAuthor.find();
    res.send({message:"users",payload:userList})
})

//create new user
userApp.post('/user',expressAsyncHandler(createUserOrAuthor))

//add comment 
userApp.put('/comment/:articleId',expressAsyncHandler(async(req,res)=>{
    //get comment obj
    const commentObj=req.body;
    //add commentoBj to comments array of article
    const articleWithComments= await Article.findOneAndUpdate(
        {articleId:req.params.articleId},
        {$push:{comments:commentObj}},
        {returnOriginal:false}
    )
    res.status(201).send({message:"Comment added",payload:articleWithComments})

}))

//exports
module.exports=userApp;