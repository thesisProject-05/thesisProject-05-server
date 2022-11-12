const express = require('express');
const app= express()
const cors = require('cors')
const connection = require('./database/index')

app.use(express.json())
app.use(cors())





const port = process.env.PORT || 3001;
app.listen(port,(err)=>{
    if(err){
        console.log(err);
    }
console.log(`server is listening on port ${port}`);
})