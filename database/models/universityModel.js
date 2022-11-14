  const db = require("../database/index.js");

  module.exports = {
      getAll: (cb) => {
        let syntax = `SELECT * FROM university`;
        db.query(syntax, (err, results) => {
          err ? cb(err, null) : cb(null, results);
        });
      },
  
      addUniversity: (cb, values) => {
          let syntax = `INSERT INTO university SET universityname=?, location=? , adresse=?`  ; 
          db.query(syntax, values, (err, results) => {
            err ? cb(err, null) : cb(null, results);
          });
        }, 
  
  
        deleteUniversity: ( cb,id) => {
  
          let syntax = `DELETE FROM university WHERE iduniversity = ?`;
          db.query(syntax,[id],(err, results) => {
              err ? cb(err, null) : cb(null, results);
            }) 
  
        },
  
  
        updateUniversity : (cb,values) => {
  
          let syntax = `UPDATE university set universityname = ? WHERE iduniversity = ?`;
          db.query(syntax,values,(err, results) => {
              err ? cb(err, null) : cb(null, results);
            }) 
  
        },
  
        getOne : (cb,id)=>{
          let syntax = `SELECT *  FROM university  WHERE iduniversity = ?`;
          db.query(syntax,id,(err, results) => {
              err ? cb(err, null) : cb(null, results);
            }) 
        },
//need to review it 

        getOneByAdress : (cb,id)=>{
          let syntax = `SELECT *  FROM university  WHERE adress = ?`;
          db.query(syntax,id,(err, results) => {
              err ? cb(err, null) : cb(null, results);
            }) 
        },
  
  
  }