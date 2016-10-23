'use strict'
var mysql      = require('mysql');
var creds = {
  host     : 'localhost',
  user     : 'root',
  password : 'myrootpw',
  database : 'calendar'
};

var Promise = require('promise');

module.exports = {
  saveUser: function(fName, lName, email, number, password) {
    return new Promise(function(resolve, reject) {
          // todo save here
      var connection = mysql.createConnection(creds);
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
      var connection = mysql.createConnection(creds);
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
  },

  updateToken: function(email, token) {
    return new Promise(function(resolve, reject) {
      var connection = mysql.createConnection(creds);
      connection.connect(function(err) {
        if (err) {
          console.error('-- error connecting: ' + err.stack);
          return;
        }

        console.log('-- connected as id ' + connection.threadId);
        });
      var sql = "UPDATE `users` SET token='" + token +"' WHERE email='" + email + "' LIMIT 1";
      connection.query(sql, function(err, rows) {
        console.log(rows);
        if (err) {
          reject(err);
        }
        resolve(rows);
      });
      connection.end();
    })
  }

}