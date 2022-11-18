const students=require('../models/studentModel')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt');

module.exports={
    register:(req,res)=>{
        students.register((error,results)=>{
            error? res.status(500).send(error):res.status(200).json(results)
        },req.body)
    },
    login:(req,res)=>{
        students.login((error,results)=>{
            error?res.status(500).send(error): res.status(200).json(results)
        },req.body)
    },
    getAll:(req,res)=>{
        students.getAll((error,results)=>{
            error? res.status(500).send(error):res.status(200).json(results)
        })
    },
    getAllByResidence:(req,res)=>{
        students.getAllByResidence(req.params.id,(error,results)=>{
            error ? res.status(500).send(err):res.status(200).json(results)
        })
    },
    getAllByUniversity:(req,res)=>{
        students.getAllByResidence(req.params.id,(error,results)=>{
            error ? res.status(500).send(err):res.status(200).json(results)
        })
    },
    getAllByHomeOwner:(req,res)=>{
        students.getAllByResidence(req.params.id,(error,results)=>{
            error ? res.status(500).send(err):res.status(200).json(results)
        })
    },
    getAllByHouse:(req,res)=>{
        students.getAllByResidence(req.params.id,(error,results)=>{
            error ? res.status(500).send(err):res.status(200).json(results)
        })

    },
    getStudentById:(req,res)=>{
        students.getStudentById(req.params.id,(error,results)=>{
            error ? res.status(500).send(err):res.status(200).json(results)
        })

    },
    deleteStudent:(req,res)=>{
        students.deleteStudent(req.params.id,(error,results)=>{
            error ? res.status(500).send(err):res.status(200).json(results)
        })
    },
    updateStudent:(req,res)=>{
        students.updateStudent(req.body,req.params.id,(error,results)=>{
            error ? res.status(500).send(error):res.status(200).json(results)
        })
    }

}