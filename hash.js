'use strict';

var sha512 = require('sha512');
var key = "super secret";
var hasher = sha512.hmac(key);

module.exports = function(pw) {
  return hasher.finalize(psw).toString('hex');
}