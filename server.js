const express = require('express');
const app= express();
const cors = require('cors');
const cookieParser = require('cookie-parser');
require("dotenv").config();
const connection = require('./database/index');



const studentsRoute=require('./database/routes/studentRoutes.js');
const CommentRoutes=require('./database/routes/commentsRoutes.js');
const ownerRoute = require('./database/routes/homeOwnerRoute.js');
const uniRoute = require('./database/routes/universityroute.js');
const residenceRoute = require('./database/routes/residenceRoute.js');
const houseRoute = require("./database/routes/houseRoute.js");
const studPosts = require("./database/routes/studPostRoute.js");
const ownerPosts = require("./database/routes/ownerPostsRoutes.js");

app.use(express.json())
app.use(cors({
        origin:true,
        credentials: true,
      }))
app.use(express.urlencoded({extended: true}));
app.use(cookieParser())


app.use('/student',studentsRoute)
app.use('/comment',CommentRoutes)
app.use('/owner', ownerRoute)
app.use('/uni',uniRoute)
app.use('/res',residenceRoute)
app.use('/house',houseRoute)
app.use('/student/post',studPosts)
app.use('/owner/post',ownerPosts)

const PORT = process.env.PORT || 3600;

app.listen(PORT, (err) => {
    if (err) {
        console.log(err);
    }
    console.log(`server is listening on port ${PORT}`);
})

