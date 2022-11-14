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
        let query=`select * from students where house_id=?`
        connection.query(query,[id],
            (error,results)=>{
                callback(error,results)
            })
    },
    getStudentById:(id,callback)=>{
        let query='select * from students where idstudents =? '
        connection.query(query,[id],
            (error,results)=>{
                callback(error,results)
            })
    },
    
    register: (callback,body)=>{
        let query=`insert into students SET fullName=?,dataofBirth=?,email=?,password=?,gender=?,phonenumber=?,
            lookingFor=?,city=?,rentPeriode=?,photo=?,maxbudget=?,blocked=?`
            connection.query(query,[[body.fullName],[body.dataofBirth],[body.email],[body.password],[body.gender],[body.phonenumber],
                [body.lookingFor],[body.city],[body.rentPeriode],[body.photo],[body.maxbudget],[body.blocked]],
                (error,results)=>{
                    callback(error,results)
                    
                })    
    },
    login:(callback,body)=>{
        let query =`select idstudents from students where email=? AND password =?`
        connection.query(query,[[body.email],[body.password]],(error,results)=>{
            callback(error,results)
        })
    },
    deleteStudent:(id,callback)=>{
        let query=`delete from students where idstudents =?`
        connection.query(query,[id],(error,results)=>{
            callback(error,results)
        })

    },
    updateStudent:(body,id,callback)=>{
        let query=`update students set fullName=?,dataofBirth=?,email=?,password=?,gender=?,phonenumber=?,
        lookingFor=?,city=?,rentPeriode=?,photo=?,maxbudget=?,blocked=? where idstudents=?  `
        connection.query(query,[[body.fullName],[body.dataofBirth],[body.email],[body.password],[body.gender],[body.phonenumber],
            [body.lookingFor],[body.city],[body.rentPeriode],[body.photo],[body.maxbudget],[body.blocked],[id]],
            (error,results)=>{
            callback(error,results)
        })

    }
    }
