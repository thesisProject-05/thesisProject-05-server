const db = require('../index')

module.exports = {
   // get homeOwner by phoneNumber
    getOneOwnerByPhoneNumber: (cb,value)=>{
      let sql= `SELECT * FROM homeOwner WHERE phoneNumber= ?;`;
      db.query(sql,value,(error,results)=>{
        cb(error,results);
      }) 
    },
     // get homeOwner by email
     getOwnerByEmail: (cb,value)=>{
      let sql= `SELECT * FROM homeOwner WHERE email=?;`;
      db.query(sql,[value.email],(error,results) => {
         cb(error,results);
      }) 
    },
  
    // get homeOwner by city 
    getOwnerByCity: (cb,value)=>{
      let sql= `SELECT * FROM homeOwner WHERE city= ?;`;
      db.query(sql,value,(error,results)=>{
        cb(error,results);
      }) 
    },

    getAllOwners: (cb)=>{
      let sql = `SELECT * FROM homeOwner;`
      db.query(sql,(error,results)=>{
      cb(error,results);
      })
    },
    getHomeOwnerById: (cb,id)=>{
      let sql = `SELECT * FROM homeOwner WHERE idhomeOwner= ?;`
      db.query(sql,[id],(error,results)=>{
        cb(error,results)
      })
    },



    deleteHomeOwner: (cb,id)=>{
     let sql = `DELETE FROM homeOwner WHERE idhomeOwner=?;`;
      db.query(sql,[id],(error, results) => {
          cb(error,results);
    }) 
    }
}