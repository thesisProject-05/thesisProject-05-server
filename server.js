const express = require('express');
const app= express()
const cors = require('cors')
const connection = require('./database/index')



const studentsRoute=require('./database/routes/studentRoute')

app.use(express.json())
app.use(cors())
app.use(express.urlencoded({extended: true}));

app.use('/student',studentsRoute)


const port = process.env.PORT || 3001;
app.listen(port,(err)=>{
    if(err){
        console.log(err);
    }
console.log(`server is listening on port ${port}`);
})