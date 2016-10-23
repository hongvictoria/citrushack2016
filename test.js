var mysql = require('./mysql');

// mysql.saveUser('john', 'ko', 'email@email.com', '1234', 'password')
// .then(function(response) {
//   console.log("response!", response)
// })
// .catch(function(err) {
//   console.log("errored!", err);
// });

for (var i = 0; i < 20; i++) {
mysql.checkUser('email@email.com', 'password')
.then(function(response) {
  console.log("response:", response);
})
.catch(function(err) {
  console.log("errored!", err);
})
}

mysql.updateToken('email@email.com', 'asdf')
.then(function(response) {
  console.log(response);
})
.catch(function(err) {
  console.log(err);
})