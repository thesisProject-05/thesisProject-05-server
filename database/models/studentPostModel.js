const connection=require('../index')
module.exports={
    getAll:(callBack)=>{
        let query=`select * from studentsPosts`
        connection.query(query,(error,results)=>{
            callBack(error,results)
        })
    },
    getOnePost:(id,callBack)=>{
        let query=`select * from studentsPosts where idposts=?`
        connection.query(query,[id],(error,results)=>{
            callBack(error,results)
        })
    },
    addPost:(body,callBack)=>{
        let query=`insert into studentsPosts set userName=?,content=? `
        connection.query(query,[[body.userName],[body.content]],(error,results)=>{
            callBack(error,results)
        })
    },
    deletePost:(id,callBack)=>{
        let query=`delete from studentsPosts where idposts=?`
        connection.query(query,[id],(error,results)=>{
            callBack(error,results)
        })
    },
    updatePost:(id,callBack)=>{
        let query=`update studentsPosts set content=? where studentsPosts=?`
        connection.query(query,[id],(error,results)=>{
            callBack(error,results)
        })
    }
     
}