const mongoose=require('mongoose')

//schema for user or author
const userauthorSchema=new mongoose.Schema({
    role:{
        type:String,
        required:true
    },
    firstName:{
        type:String,
        required:true
    },
    lastName:{
        type:String
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    profileImageUrl:{
        type:String
    },
    isActive:{
        type:Boolean,
        default:true
    },
},{"strict":"throw"})


//create model for user author schema 
const UserAuthor=mongoose.model('userauthor',userauthorSchema)

//exports
module.exports=UserAuthor