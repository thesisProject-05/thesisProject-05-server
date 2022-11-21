const express=require('express');
const router=express.Router();
const {getAll, getOnePost, addPost,
    deletePost,updatePost}= require("../controllers/studentPostController.js");

    
 router.get('/:id',getAll) 
 router.get('/one/:id',getOnePost)
 router.post('/add', addPost)
 router.delete('/:id',deletePost)
 router.put('/:id',updatePost)  

 module.exports=router