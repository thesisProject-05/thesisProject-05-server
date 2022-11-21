const connection=require('../index.js');

module.exports={
    getAll:(callBack)=>{
        let query=`select * from comments `
        connection.query(query,(error,results)=>{ 
            callBack(error,results)
        })
    },
    addComment:(body,callBack)=>{
        let query=`insert into comments SET content=?,userName=? `
        connection.query(query,[[body.content],[body.username]],(error,results)=>{
            callBack(error,results)
        })
    },
    getOneComment:(id,callBack)=>{
        let query=`select * from comments where idcomments=? `
        connection.query(query,[id],(error,results)=>{
            callBack(error,results)
        })
    },
    deleteComment:(id,callBack)=>{
        let query=`delete from comments where idcomments=?`
        connection.query(query,[id],(error,results)=>{
            callBack(error,results)
        })
    },
    updateComment:(body,id,callback)=>{
        let query=`update comments set content=? where idcomments=?`
        connection.query(query,[body.content,[id]],(error,results)=>{
            callback(error,results)
        })
    }

}