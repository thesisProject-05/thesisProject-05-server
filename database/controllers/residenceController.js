const residence = require('../database/models/residenceModel.js')
module.exports = {
        // getAll Residence
        getAll : (req,res)=> {
            residence.getAll((err,results)=>{
               err ?  res.status(500).send(err.message) : res.status(200).json(results);
            })

        },

        addResidence:(req,res)=> {
 
            residence.addResidence ((err,results)=>{

                err ?  res.status(500).send(err) : res.status(201).json("created");
            },req.body)
            // depend on the model
        },

        deleteResidence : (req,res)=> {

            residence.deleteResidence((err,results)=>{
                err ?  res.json(err) : res.json("deleted");
             },req.params.id)
        },

        //update Residence

        updateResidence : (req,res)=> {

            residence.updateResidence ((err,results)=>{
                err ?  res.send(err) : res.json(results);
             },[req.body.phase,req.params.id])
        },





    getOne : (req,res)=> {

        residence.getOne((err,results)=>{
            err ?  res.send(err) : res.json(results);
         },[req.params.id])
    },


}