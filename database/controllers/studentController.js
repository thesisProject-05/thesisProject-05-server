const students=require('../models/studentModel')
module.exports={
    register:(req,res)=>{
        students.register((error,results)=>{
            error? res.status(500).send(error):res.status(200).json(results)
        },req.body)
    },
    getAll:(req,res)=>{
        students.getAll((error,results)=>{
            error? res.status(500).send(error):res.status(200).json(results)
        })
    },
    getAllByResidence:(req,res)=>{
        students.getAllByResidence(req.params.id),(error,results)=>{
            error ? res.status(500).send(err):res.status(200).json(results)
        }
    },
    getAllByUniversity:(req,res)=>{
        students.getAllByResidence(req.params.id),(error,results)=>{
            error ? res.status(500).send(err):res.status(200).json(results)
        }
    },
    getAllByHomeOwner:(req,res)=>{
        students.getAllByResidence(req.params.id),(error,results)=>{
            error ? res.status(500).send(err):res.status(200).json(results)
        }
    },
    getAllByHouse:(req,res)=>{
        students.getAllByResidence(req.params.id),(error,results)=>{
            error ? res.status(500).send(err):res.status(200).json(results)
        }

    }
}