const db = require('.././database/index')

module.exports = {
   //add homeOwner
    register: (value,cb)=>{
        let sql= `INSERT INTO homeOwner SET fullName=?, email=?, password=? dateofBirth=? phoneNumber=? 
        city=?, CIN= ?`;
        db.query(sql,value,(error,results)=>{
            cb(error,results);
        })
    },

    login: (cb, value)=>{
        let sql='SELECT idhomeOwner FROM homeOwner WHERE email=? AND password=?';
          db.query(sql,value,(error,results)=>{
            cb(error,results);
          })
    },

    // get homeOwner by phoneNumber
    getOneOwner: (num)=>{
      let sql= `SELECT fullname FROM homeOwner WHERE phoneNumber= ${phoneNumber}`;
      db.query(sql,(error,results)=>{
        cb(error,results);
      }) 
    },
}