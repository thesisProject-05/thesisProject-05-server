const db = require("../database/index.js");


module.exports = {
    getAll: (cb) => {
      let syntax = `SELECT * FROM residence`;
      db.query(syntax, (err, results) => {
        err ? cb(err, null) : cb(null, results);
      });
    },

    addResidence: (cb,values) => {
        let syntax = `INSERT INTO residence SET photo=?, name=? , adresse=? , phonenumber=? , location=? , description=?`; 
        db.query(syntax,[[values.photo],[values.name],[values.adresse],[values.phonenumber],[values.location],[values.description]], (err, results) => {
          err ? cb(err, null) : cb(null, results);
        });
      }, 

      deleteResidence: ( cb,id) => {

        let syntax = `DELETE FROM residence WHERE idresidence = ?`;
        db.query(syntax,[id],(err, results) => {
            err ? cb(err, null) : cb(null, results);
          }) 

      },

      updateResidence : (cb,values) => {

        let syntax = `UPDATE residence set photo = ?, phonenumber=? WHERE idresidence = ?`;
        db.query(syntax,values,(err, results) => {
            err ? cb(err, null) : cb(null, results);
          }) 

      },


      getOne : (cb,id)=>{
        let syntax = `SELECT *  FROM residence  WHERE idresidence = ?`;
        db.query(syntax,id,(err, results) => {
            err ? cb(err, null) : cb(null, results);
          }) 
      },
      getOneByAdress : (cb,adress)=>{
        let syntax = `SELECT *  FROM residence  WHERE adress = ?`;
        db.query(syntax,adress,(err, results) => {
            err ? cb(err, null) : cb(null, results);
          }) 
      },






}