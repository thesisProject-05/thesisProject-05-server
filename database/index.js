const mysql=require('mysql2')

const config={
    host:"localhost",
    user:"root",
    password:"12345",
    database:'roostIt',

}

const connection= mysql.createConnection(config)
connection.connect((err)=>{
    if(err){
        console.log(err)
    }
    console.log('database connected ');
})

module.exports= connection;