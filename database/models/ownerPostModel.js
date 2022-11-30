const db = require('../index');

module.exports = {
    addPost: (body,id,cb)=>{
        let sql = `INSERT INTO homeOwnerPosts SET userName=?, content=?, homeOwner_idhomeOwner=? ;`;
     db.query(sql,[body.userName,body.content,id],(error,results)=>{
    cb(error,results);
    })
     },
     getOne: (id, cb) => {
        let sql = `SELECT * FROM homeOwnerPosts WHERE idhomeOwnerPosts=?;`;
        db.query(sql, [id], (error, results) => {
            cb(error, results);
        })
    },
    getOwnerPosts: (id, cb) => {
        let sql = `SELECT * FROM homeOwnerPosts WHERE homeOwner_idhomeOwner=?;`;
        db.query(sql, [id], (error, results) => {
            cb(error, results);
        })
    },
    deletePost: (id, cb) => {
        let sql = `DELETE FROM homeOwnerPosts WHERE idhomeOwnerPosts=?;`;
        db.query(sql, [id], (error, results) => {
            cb(error, results);
        })
    },
    getAllPosts: (cb) => {
        let sql = `SELECT * FROM homeOwnerPosts;`;
        db.query(sql, (error, results) => {
             cb(error, results);
        })
    },
    updatePost: (body,id,cb) => {
        let sql = `UPDATE homeOwnerPosts SET userName=?,content=? WHERE idhomeOwnerPosts=?;`;
        db.query(sql,[body.userName,body.content,id], (error, results) => {
            cb(error, results);
        })
    },


}