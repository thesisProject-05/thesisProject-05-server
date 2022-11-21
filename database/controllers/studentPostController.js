const studPost= require("../models/studentPostModel.js");

module.exports = {
    getAll: (req,res)=>{
        studPost.getAll((err,result)=>{
            err ? res.status(409).send(err) : res.status(200).send(result)
        },req.params.id)
    },
    getOnePost: (req,res)=>{
        studPost.getOnePost((err,result)=>{
            err ? res.status(409).send(err) : res.status(200).send(result)
        }, req.params.id)
    },
    addPost: (req,res)=>{
        studPost. addPost((err,result)=>{
            err ? res.status(409).send(err) : res.status(200).send(result)
        }, req.body)
    },
    deletePost: (req,res)=>{
        studPost. deletePost((err,result)=>{
            err ? res.status(409).send(err) : res.status(200).send(result)
        }, req.params.id)
    },
    updatePost: (req,res)=>{
        studPost. updatePost((err,result)=>{
            err ? res.status(409).send(err) : res.status(200).send(result)
        }, req.params.id)
    }
    
   
}