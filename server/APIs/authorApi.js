const exp=require('express')
const authorApp=exp.Router();
const Article=require('../models/articleModel')
const expressAsyncHandler=require("express-async-handler")
const createUserOrAuthor=require('./createUserOrAuthor')
const {requireAuth,clerkMiddleware}=require('@clerk/express')
authorApp.use(clerkMiddleware())
require('dotenv').config()
//api
authorApp.get("/",(req,res)=>{
    res.send({message:"Get connection from authorApi"})
})


//create new author
authorApp.post('/author',expressAsyncHandler(expressAsyncHandler(createUserOrAuthor)))

//create new article
authorApp.post("/article",expressAsyncHandler(async(req,res)=>{
    //get new article
    const newArticleObj=req.body
    const newArticle=new Article(newArticleObj)
    const articleObj=await newArticle.save();
    res.status(201).send({message:"article published",payload:articleObj})
}))

//read all articles
authorApp.get('/articles',requireAuth({signInUrl:"unauthorized"}),expressAsyncHandler(async(req,res)=>{
    const articlesList= await Article.find({isArticleActive:true});
    res.status(201).send({message:"Articles",payload:articlesList})
}))

authorApp.get('/unauthorized',(req,res)=>{
    res.send({message:"unauthorized request... plz login to get the data"})
})


//modify the article by article id 
authorApp.put('/article/:articleId', requireAuth({ signInUrl: "unauthorized" }), expressAsyncHandler(async (req, res) => {
    const articleId = req.params.articleId; // Get articleId from URL
    const modifiedArticle = req.body;
  
    // Find and update by `articleId`, not `_id`
    const dbRes = await Article.findOneAndUpdate(
      { articleId: articleId }, // Query based on articleId
      { ...modifiedArticle },
      { returnOriginal: false, new: true } // Ensure the updated article is returned
    );
  
    if (!dbRes) {
      return res.status(404).send({ message: "Article not found" });
    }
  
    res.status(200).send({ message: "Article modified", payload: dbRes });
  }));
  

//delete (soft delete ) an article by article id
authorApp.put('/articles/:articleId',expressAsyncHandler(async(req,res)=>{
    //get modified article
     const modifiedArticle=req.body
     //update the article by article id 
     const latestArticle=await Article.findByIdAndUpdate(modifiedArticle._id,
         {...modifiedArticle},
         {returnOriginal:false})
     res.status(200).send({message:"Article deleted or restored",payload:latestArticle})
 }))


//exports
module.exports=authorApp;