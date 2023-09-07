const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const router = require('./Routes/routes')
// const find = require('find-process')
const hostname = "localhost";

const port = "3000";

const app = express();
app.use(bodyParser.json());
//CORS
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PUT,PATCH,DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type,Authorization')
    next();
})
app.use('/', router);
app.listen(port, hostname);
mongoose.connect('mongodb://127.0.0.1:27017/zomato', { useNewUrlParser: true, useUnifiedTopology: true }).then(client => {
    app.listen(port, hostname, () => {
        console.log(`Server is running on http://${hostname}:${port}`);
    });
}).catch(err => {
    console.log(err);
})
// find('port',port)
// .then((list)=>{
//     console.log(`port "${port}" is blocked.Killing blocking applications...`)
//     const processIds = list.map((item)=>item.pid)
//     processIds.forEach((pid)=>process.kill(pid,10))
// })
