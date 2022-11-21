const connection=require('../index')
module.exports={
    getAll:(callBack,id)=>{
        let query=`select * from studentsPosts where students_idstudents=?;`
        connection.query(query,[id],(error,results)=>{
            callBack(error,results)
        })
    },
    getOnePost:(callBack,id)=>{
        let query=`select * from studentsPosts where idposts=?;`
        connection.query(query,[id],(error,results)=>{
            callBack(error,results)
        })
    },
    addPost:(callBack,body)=>{
        let query=`insert into studentsPosts set userName=?,content=? where students_idstudents =?;`
        connection.query(query,[[body.userName],[body.content]],(error,results)=>{
            callBack(error,results)
        })
    },
    deletePost:(callBack,id)=>{
        let query=`delete from studentsPosts where idposts=?`
        connection.query(query,[id],(error,results)=>{
            callBack(error,results)
        })
    },
    updatePost:(callBack,id)=>{
        let query=`update studentsPosts set content=? where idPosts=? AND students_idstudents=?;`
        connection.query(query,[id],(error,results)=>{
            callBack(error,results)
        })
    }
     
}