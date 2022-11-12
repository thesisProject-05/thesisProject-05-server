const conn = require('.././index.js');
const dotenv = require("dotenv");
const { registerValidation, loginValidation } = require('../../utils/isValidOwner.js');
const owner = require('../models/homeOwnerModel.js');
const bcrypt = require('bcrypt');
const { validationResult } = require('express-validator')
const jwt = require('jsonwebtoken')


module.exports = {
    //    addHomeOwner : (text) => {
    //     return new Promise((resolve, reject) => {
    //      let sql = `INSERT INTO homeOwner (fullName, email,password, dateofBirth, phoneNumber, city, CIN)
    //       VALUES('${text.fullName}', '${text.email}', '${text.password}', '${text.dateofBirth}', '${text.phoneNumber},'${text.city}','${text.CIN}');`
    //     conn.query(sql, (err, result) => {
    //         err ? reject(err) : resolve(result);
    //     })
    //     })
    // },

    register: (req, res, next) => {
        conn.query(
            `SELECT * FROM homeOwner WHERE LOWER(email) = LOWER(${conn.escape(req.body.email)});`, (error, results) => {
                if (results.length) {
                    return res.status(409).send({
                        message: 'email already in use; please choose a different email'
                    });
                } else {
                    bcrypt.hash(req.body.password, 10, (error, hash) => {
                        if (error) {
                            return res.status(500).send({
                                message: error
                            });
                        } else {
                            conn.query(
                                `INSERT INTO homeOwner (fullName, email,password, dateofBirth, phoneNumber, city, CIN) VALUES ('${req.body.fullName}', 
                            ${conn.escape(req.body.email)},${conn.escape(hash)},'${req.body.dateofBirth}','${req.body.phoneNumber}','${req.body.city}','${req.body.CIN}');`, (error, results) => {
                                if (error) {
                                    return res.status(400).send(error)
                                }
                                return res.status(201).send({
                                    message: `welcome to our platform ${req.body.fullName} `
                                });
                            })
                        };
                    })
                }
            }
        )
    },
    login: (req, res, next) => {
        conn.query(
            `SELECT * FROM homeOwner WHERE email = ${conn.escape(req.body.email)};`,
            (err, result) => {
                if (err) {
                    return res.status(400).send({
                        message: err
                    })
                } if (!result.length) {
                    return res.status(401).send({
                        message: 'email or password are invalid'
                    })
                }
                bcrypt.compare(
                    req.body.password,
                    result[0]['password'],
                    (errB, resultB) => {
                        if (resultB) {
                            console.log(resultB)
                            const token = jwt.sign({ idhomeOwner: result[0].idhomeOwner }, 'abcdefghijklmnopqrstuvwxyABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789', { expiresIn: '24h' });
                            res.cookie('amToken', token, { httpOnly: false, maxAge: 24 * 60 * 60 * 1000 })
                            return res.status(200).send(token);
                        }
                        return res.status(401).send({
                            message: 'email or password are invalid'
                        })
                    }
                )
            }
        )
    },
    // getHomeOwner: (req,res,next) => {
    //     if(
    //         !req.headers.authorization ||
    //         !req.headers.authorization.startsWith('Bearer') ||
    //         !req.headers.authorization.split(' ')[1]
    //     ){
    //    return res.status(401).json({
    //     message: 'please provide the token'
    //    });
    //     }
    //     const amToken = req.headers.authorization.split(' ')[1];
    //     const decoded = jwt.verify(amToken, 'abcdefghijklmnopqrstuvwxyABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789');
    //     console.log( decoded, "decoded password: ");
    //     conn.query(`select * from homeOwner where idhomeOwner= ? ` , decoded.idhomeOwner, (error, results, fields)=>{
    //         if (error) throw error;
    //         return res.send({data:{fullName:results[0].fullName,id: results[0].idhomeOwner,email: results[0].email}});
    //     });
    // },


    getOneOwnerByPhoneNumber:(req,res)=>{
        owner.getOneOwnerByPhoneNumber((err,results)=>{
            err ?  res.json(err.message) : res.json(results);
        },[req.body.phoneNumber])
    },

    getOwnerByEmail:(req,res)=>{
        owner.getOwnerByEmail((err,results)=>{
            err ?  res.json(err.message) : res.json(results);
        },[req.body.email])
    },
    getHomeOwnerById:(req,res)=>{
        owner.getHomeOwnerById((err,results)=>{
            err ?  res.json(err.message) : res.json(results);
        },req.params.id)
    },
    
    getOwnerByCity:(req,res)=>{
        owner.getOwnerByCity((err,results)=>{
            err ?  res.json(err.message) : res.json(results);
        },[req.body.city])
    },

    getAllOwners: (req, res)=>{
        owner.getAllOwners((err,results)=>{
            err ?  res.status(500).send(err.message) : res.status(200).json(results);
        })
    },

    deleteHomeOwner:(req,res)=>{
        owner.deleteHomeOwner((err,results)=>{
            err ?  res.json(err.message) : res.json("homeOwner deleted");
        },req.params.id)
    },


    logout:(req,res)=>{
        res.clearCookie('amToken')
        return res.sendStatus(200)
    }


}
