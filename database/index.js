const mysql=require('mysql2')

const config={
    host:"mysql-99069-0.cloudclusters.net",
    user:"admin",
    password:"jiYX2FYO",
    database:'tapHouse',
    port: 19144

}

const connection= mysql.createConnection(config)
connection.connect((err)=>{
    if(err){
        console.log(err)
    }
    console.log('database connected ');
})

module.exports= connection; 