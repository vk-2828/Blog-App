const exp=require('express')
const app=exp()
require('dotenv').config()
const port=process.env.PORT || 4000;
///import mongoose
const mongoose=require('mongoose');

//importing apis
const userApp=require("./APIs/UserApi")
const adminApp=require('./APIs/adminApi')
const authorApp=require('./APIs/authorApi')

const cors=require('cors')
app.use(cors())

//data base connection
mongoose.connect(process.env.DBURL)
.then(()=>{
    app.listen(port,()=>console.log(`server listening on port ${port}..`))
    console.log("DB connection success")
})
.catch(err=>console.log("Error in data base connection ",err))

//body parser middleware
app.use(exp.json())
//connect api routes
app.use('/user-api',userApp)
app.use('/author-api',authorApp)
app.use('/admin-api',adminApp)

//error handler
app.use((err,req,res,next)=>{
    console.log("err object in express error handler:",err)
    res.send({message:err.message})
})