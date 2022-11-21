const express=require('express');
const router=express.Router();
const {addPost, getOne,getOwnerPosts,getAllPosts,
    deletePost,updatePost}= require("../controllers/ownerPostController.js");

    
 router.get('/',getAllPosts) 
 router.get('/:id',getOne)
 router.get('/owner/:id',getOwnerPosts)
 router.post('/add', addPost)
 router.delete('/:id',deletePost)
 router.put('/:id',updatePost)  
 
 
 module.exports=router