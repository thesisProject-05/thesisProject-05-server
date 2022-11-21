const students=require('../models/studentModel')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt');
const db=require('../index')
module.exports={
    register:(req,res,next)=>{
        db.query(`SELECT * FROM STUDENTS WHERE LOWER(email)=LOWER(${db.escape(req.body.email)})`,(error,results)=>{
            if(results.length){
                return res.status(400).send({
                    message:'email is already in use please choose another one '
                })
            }else{
                bcrypt.hash(req.body.password,10,(error,hash)=>{
                    if(error){
                        return res.status(500).send({
                            message:error
                        })
                    }else {
                        db.query(`INSERT INTO STUDENTS (fullName,dateOfBirth,email,password,gender,phoneNumber,CIN,lookingFor,city,rentePeriode,photo,maxBudget,blocked,cookie,activationCode) VALUES('${req.body.fullName}','${req.body.dateOfBirth}',${db.escape(req.body.email)},${db.escape(hash)},'${req.body.gender}',
                        '${req.body.phoneNumber}','${req.body.cin}','${req.body.lookingFor}','${req.body.city}','${req.body.rentePeriode}','${req.body.photo}','${req.body.maxBudget}','${req.body.blocked}''${req.body.cookie}','${req.body.activationCode}')`,(error,results)=>{
                            if(error){
                                return res.status(500).send(error)
                            }
                            return res.status(201).send({

                                message:`Welcome to our plateform ${req.body.fullName}`
                            })
                        })
                    }
                })
            }
        })
    },
    login:(req,res,next)=>{
        db.query(`SELECT * FROM STUDENTS WHERE email=${db.escape(req.body.email)}`,
        (err,result)=>{
            if(err){
                return res.status(400).send({
                    message:err
                })
            } if(!result.length){
                return res.status(401).send({
                    message:'invalid credentials please check your email or your password'
                })
            }
            bcrypt.compare(
                req.body.password,
                result[0]['password'],
                (errB,resultB)=>{
                    if(resultB){
                        const token=jwt.sign({idstudents:result[0].idstudents},'abcdefghijklmnopqrstuvwxyABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789',{expiresIn:'24h'})
                    res.cookie('amToken',token,{httpOnly:false,maxAge:24*60*60*1000})
                    return res.status(200).send(token)
                    }
                    return res.status(401).send({
                        message:'invalid credentials please check your email or your password'
                    })
                }
            )
        })
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