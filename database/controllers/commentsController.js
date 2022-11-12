const comments = require('../models/commentsModel')
module.exports={
    getAll:(req,res)=>{
        comments.getAll((error,results)=>{
            error? res.status(500).send(error):res.status(200).json(results)
        })
    },
    getOneComment:(req,res)=>{
        comments.getOneComment(req.params.id,(error,results)=>{
            error? res.status(500).send(error):res.status(200).json(results)
        })

    },
    addComment:(req,res)=>{
        comments.addComment(req.body,(error,results)=>{
            error? res.status(500).send(error):res.status(200).json(results)
        })
    },
    deleteComment:(req,res)=>{
        comments.deleteComment(req.params.id,(error,results)=>{
            
            error? res.status(500).send(error):res.status(200).json(results)
        })
    },
    updateComment:(req,res)=>{
        comments.updateComment(req.body,req.params.id,(error,results)=>{
            error? res.status(500).send(error):res.status(200).json(results)
        })
    }
}


