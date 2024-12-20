// import the mysql2 library
var mysql = require('mysql2');
// Create the connection to the database
var connection = mysql.createConnection({
    host:'localhost', // IP of database server
    port: '3306', // port of database server
    user:'root', // user of database server
    password:'adev', // password of database server
    database: 'e-commerce' // database
});

//Test Connection
connection.connect(err => { // test out connection and if there is error console.log the error
    if (err) throw err;
        console.log('Connected To DB');
});
    // Export the connection so that it can be used
    // by others script
module.exports = connection;