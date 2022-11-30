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
    addPost:(body,id,callBack)=>{
        let query=`INSERT INTO studentsPosts SET userName=?,content=?,students_idstudents =?;`
        connection.query(query,[body.userName,body.content,id],(error,results)=>{
            callBack(error,results)
        })
    },
    deletePost:(callBack,id)=>{
        let query=`DELETE FROM   studentsPosts where idposts=?`
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