const db = require('../index');


module.exports = {
    addHouse: (body, cb) => {
        let sql = `INSERT INTO house SET photo=?, description=?, price=?, latiude=?,longitude=?, adress=?, city=?,rate=?, homeOwner_idhomeOwner=? ;`;
        db.query(sql,[[body.photo],[body.description],[body.price],[body.latiude],[body.longitude],[body.adress],[body.city],[body.homeOwner_idhomeOwner]], (error, results) => {
            cb(error, results);
        })
    },
    getOneHouse: (id, cb) => {
        let sql = `SELECT * FROM house WHERE idhouse=?`;
        db.query(sql, [id], (error, results) => {
            cb(error, results);
        })
    },
    getOwnerHouses: (id, cb) => {
        let sql = `SELECT * FROM house WHERE homeOwner_idhomeOwner=?;`;
        db.query(sql, [id], (error, results) => {
            cb(error, results);
        })
    },

    deleteHouse: (id, cb) => {
        let sql = `DELETE FROM house WHERE idhouse=?;`;
        db.query(sql, [id], (error, results) => {
            cb(error, results);
        })
    },
    getAllHouses: (cb) => {
        let sql = `SELECT * FROM house ;`;
        db.query(sql, (error, results) => {
             cb(error, results);
        })
    },
    updateHouse: (body,id,cb) => {
        let sql = `UPDATE house SET photo=?, description=?, price=?, adress=?, city=?,rate=? WHERE idhouse=? ;`;
        db.query(sql,[[body.photo],[body.description],[body.price],[body.location],[body.adress],[body.city],[body.rate],[id]], (error, results) => {
            cb(error, results);
        })
    },


}
