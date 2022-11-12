const mysql=require('mysql2')

const config={
    host:"mysql-95365-0.cloudclusters.net",
    user:"admin",
    password:"NvsRYnD4",
    database:'ThesisProject',
    port:10015

}

const connection= mysql.createConnection(config)
connection.connect((err)=>{
    if(err){
        console.log(err)
    }
    console.log('database connected ');
})

module.exports= connection;