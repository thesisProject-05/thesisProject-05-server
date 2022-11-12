const university = require('../models/universityModel.js')
  module.exports = {
    // getAll University
    getAll : (req,res)=> {
        university.getAll((err,results)=>{
           err ?  res.status(500).send(err.message) : res.status(200).json(results);
        })

    },
    // add University
    addUniversity:(req,res)=> {
 
        university.addUniversity ((err,results)=>{

            err ?  res.status(500).send(err) : res.status(201).json("created");
        },[req.body.universityname,req.body.location,req.body.adresse])
        // depend on the model
    },


    deleteUniversity : (req,res)=> {

        university.deleteUniversity((err,results)=>{
            err ?  res.json(err) : res.json("deleted");
         },req.params.id)
    },

    updateUniversity: (req,res)=> {

        university.updateUniversity((err,results)=>{
            err ?  res.send(err) : res.json(results);
         },[req.body,req.params.id])
    },

    //update University 


    getOne : (req,res)=> {

        university.getOne((err,results)=>{
            err ?  res.send(err) : res.json(results);
         },[req.params.id])
    },






}