const mysql = require('mysql');
require('dotenv').config();

var connection = mysql.createConnection({
    port : process.env.dbport,
    host : process.env.dbhost,
    user : process.env.dbuser,
    password : process.env.dbpass,
    database : process.env.dbname
});

connection.connect((err) => {
    if(!err){
        console.log("mysql conneccted on port 3306")
    }
    else{
        console.log(err)
    }
});

module.exports = connection;