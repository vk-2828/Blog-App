const UserAuthor=require("../models/userauthorModel")

async function createUserOrAuthor(req,res){
    //logic to create user or author
    const newUserAuthor=req.body;
    //find the user by email id 
    const userInDb=await UserAuthor.findOne({email:newUserAuthor.email})
    //if user or author existed
    if(userInDb!==null){
            //check the role 
            if(newUserAuthor.role===userInDb.role){
                res.status(200).send({message:newUserAuthor.role,payload:userInDb})

            }else{
                res.status(200).send({messgae:"Invalid role"})
            }
    }else{
        let newUser=new UserAuthor(newUserAuthor);
        let newUserOrAuthorDoc=await newUser.save();
        res.status(201).send({message:newUserOrAuthorDoc.role , payload:newUserOrAuthorDoc})
    }

}

module.exports=createUserOrAuthor