const mongoose =require('mongoose')

//author shcme 
const authorDataSchema=new mongoose.Schema({
    nameOfAuthor:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    profileImageUrl:{
        type:String,
        required:true
    }
},{"strict":"throw"})


//user comment schema
const userCommentSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    comment:{
        type:String,
        required:true
    }
})

//article schema
const articleSchema=new mongoose.Schema({
    authorData:{
        type:authorDataSchema,
        required:true
    },
    articleId:{
        type:String,
        required:true
    },
    title:{
        type:String,
        required:true
    },
    category:{
        type:String,
        required:true
    },
    content:{
        type:String,
        required:true
    },
    dateOfCreation:{
        type:String,
        required:true
    },
    dateOfModification:{
        type:String,
        required:true
    },
    comments:{
        type:[userCommentSchema],
        required:true
    },
    isArticleActive:{
        type:Boolean,
        required:true,
        //default:true
    }


},{"strict":"throw"})

//constructor
const Article = mongoose.model('article',articleSchema)
module.exports=Article;