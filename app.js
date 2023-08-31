const express=require('express');
const bodyParser=require('body-parser');
const mongoose =require('mongoose');
const router=require('../Routes/routes')

const hostname="localhost";

const port="8055";

const app=express();
app.use(bodyParser.json());
//CORS
app.use((req,res,next)=>{
    res.setHeader('Access-Control-Allow-Origin','*');
    res.setHeader('Access-Control-Allow-Methods','GET,POST,PUT,PATCH,DELETE');
    res.setHeader('Access-Control-Allow-Headers','Content-Type,Authorization')
    next();
})
app.listen('/',router);
app.listen(port,hostname)
mongoose.connect('mongodb://127.0.0.1:27017/',{useNewUrlParser:true,useUnifiedTopology:true}).then(client=>{app.listen(port,hostname,()=>{
    console.log(`Server is running on http://${hostname}:${port}`);
});
}).catch(err=>{
    console.log(err);
})
