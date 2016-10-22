'use strict'
var mysql      = require('mysql');
var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : 'myrootpw',
  database : 'calendar'
});

var Promise = require('promise');

module.exports = {
  saveUser: function(fName, lName, email, number, password) {
    return new Promise(function(resolve, reject) {
          // todo save here
      connection.connect();
      var sql = "INSERT INTO `users` (`fName`, `lName`, `email`, `number`, `password`) VALUES ('";
      sql += [fName, lName, email, number, password].join("','");
      sql += "')";
      console.log(sql);
      connection.query(sql, function(err, rows) {
        if (err) {
          console.log(" ERR", err);
          reject(err);
        }
        console.log("RW, ", rows);
        resolve(rows);
      });
      connection.end();
    });
  },

  checkUser: function(email, password) {
    return new Promise(function(resolve, reject) {
      connection.connect();
      var sql = "SELECT * FROM `users` WHERE email='" + email + "' AND password='" + password + "' LIMIT 1";
      connection.query(sql, function(err, rows) {
        console.log(rows);
        if (err) {
          reject(err);
        }
        resolve(rows[0]);
      });
      connection.end();
    });
  }

}