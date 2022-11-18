const connection=require('../index')
module.exports={
    getAll:(callback)=>{
        let query=`select * from students`
        connection.query(query,(error,results)=>{
            callback(error,results)
        })
    },
    getAllByResidence:(id,callback)=>{
        let query=`select * from students where residence_idresidence=?`
        connection.query(query,[id],
            (error,results)=>{
                callback(error,results)
            })
    },
    getAllByuniversity:(id,callback)=>{
        let query=`select * from students where university_iduniversity=?`
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
        let query=`select * from students where  house_idhouse=?`
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
        let query=`insert into students SET fullName=?,dateOfBirth=?,email=?,password=?,gender=?,phoneNumber=?,CIN=?
            lookingFor=?,city=?,rentePeriode=?,photo=?,maxBudget=?,blocked=?,status=? ,activationCode=?,cookie=?`
            connection.query(query,[[body.fullName],[body.dateOfBirth],[body.email],[body.password],[body.gender],[body.phoneNumber],[body.CIN],
                [body.lookingFor],[body.city],[body.rentePeriode],[body.photo],[body.maxBudget],[body.blocked],[body.status],[body.activationCode],[body.cookie]],
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
        let query=`update students set fullName=?,dateOfBirth=?,email=?,password=?,gender=?,phoneNumber=?,CIN=?
        lookingFor=?,city=?,rentePeriode=?,photo=?,maxBudget=?,blocked=? where idstudents=?  `
        connection.query(query,[[body.fullName],[body.dateOfBirth],[body.email],[body.password],[body.gender],[body.phoneNumber],[body.CIN],
            [body.lookingFor],[body.city],[body.rentePeriode],[body.photo],[body.maxBudget],[body.blocked],[id]],
            (error,results)=>{
            callback(error,results)
        })

    }
    }
