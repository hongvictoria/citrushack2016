'use strict';

var loggedIn = false;

module.exports = {
  auth: function(req, res, next) {
    loggedIn = false;
    if (req.cookies.loggedIn) {
      loggedIn = true;
    }

    console.log(req.cookies.hello);

    console.log("logged in ? : " , loggedIn);
    next();
  },
  isLoggedIn: function() {
    return loggedIn;
  }

}