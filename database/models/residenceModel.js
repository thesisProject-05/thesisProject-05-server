const db = require("../index");


module.exports = {
    getAll: (cb) => {
      let syntax = `SELECT * FROM residence;`;
      db.query(syntax, (err, results) => {
        err ? cb(err, null) : cb(null, results);
      });
    },

    addResidence: (values,cb) => {
        let syntax = `INSERT INTO residence SET photo=?, name=? , adresse=? , phoneNumber=? ,longitude=?,latidue=? , description=?,city=?;`; 
        db.query(syntax,[[values.photo],[values.name],[values.adresse],[values.phoneNumber],[values.longitude],[values.latidue],[values.description],[values.city]], (err, results) => {
          err ? cb(err, null) : cb(null, results);
        });
      }, 

      deleteResidence: ( cb,id) => {

        let syntax = `DELETE FROM residence WHERE idresidence = ?`;
        db.query(syntax,[id],(err, results) => {
            err ? cb(err, null) : cb(null, results);
          }) 

      },

      updateResidence : (cb,values,id) => {

        let syntax = `UPDATE residence set photo = ?,name=?,phoneNumber=?,description =? WHERE idresidence = ?`;
        db.query(syntax,[values,id],(err, results) => {
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
      getOneByCity : (cb,adress)=>{
        let syntax = `SELECT *  FROM residence  WHERE city = ?`;
        db.query(syntax,adress,(err, results) => {
            err ? cb(err, null) : cb(null, results);
          }) 
      },






}