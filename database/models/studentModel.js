const connection=require('../index')
module.exports={
    getAll:(callback)=>{
        let query=`select * from students`
        connection.query(query,(error,results)=>{
            callback(error,results)
        })
    },
    getAllByResidence:(id,callback)=>{
        let query=`select * from students where residence_id=?`
        connection.query(query,[id],
            (error,results)=>{
                callback(error,results)
            })
    },
    getAllByuniversity:(id,callback)=>{
        let query=`select * from students where university_id=?`
        connection.query(query,[id],
            (error,results)=>{
                callback(error,results)
            })
    },
    getAllByHomeOwner:(id,callback)=>{
        let query=`select * from students where house_homeOwner_id=?`
        connection.query(query,[id],
            (error,results)=>{
                callback(error,results)
            })
    },
    getAllByHouse:(id,callback)=>{
        let query=`select * from students house_id=?`
        connection.query(query,[id],
            (error,results)=>{
                callback(error,results)
            })
    },
    register: function(callback,body){
        let query=`insert into students SET fullName=?,dataofBirth=?,email=?,password=?,gender=?,phonenumber=?,
            lookingFor=?,city=?,rentPeriode=?,photo=?,maxbudget=?,blocked=?`
            connection.query(query,[[body.fullName],[body.dataofBirth],[body.email],[body.password],[body.gender],[body.phonenumber],
                [body.lookingFor],[body.city],[body.rentPeriode],[body.photo],[body.maxbudget],[body.blocked]],
                function(error,results){
                    callback(error,results)
                    console.log(body);
                })    }
    }
