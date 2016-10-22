'use strict'
var mysql      = require('mysql');
var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : 'secret',
  database : 'calendar'
});

module.exports = {
  saveUser: function(fName, lName, email, phone, password) {
    // todo save here
    connection.connect();
    sql = "INSERT INTO `users` (`fName`, `lName`, `email`, `phone`, `password`) VALUES ";
    sql += "'" + fName + "'";
    // ..
    // 
    // 
    
    connection.query(sql);
  },

}