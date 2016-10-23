var express = require('express');
var app = express();
var bodyParser = require('body-parser')

var mustacheExpress = require('mustache-express');

var month = require ("./date");

app.use(express.static('public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
var cookieParser = require('cookie-parser');
var mustacheExpress = require('mustache-express');

var auth = require('./auth');
var google = require('./google');
var mysql = require('./mysql');
var hash = require('./hash');

app.use(cookieParser());
app.use(auth.auth);

// Register '.mustache' extension with The Mustache Express
app.engine('mustache', mustacheExpress());

app.set('view engine', 'mustache');
app.set('views', __dirname + '/views');

app.get('/', function (req, res) {
  
  // check if logged in, else we need auth
  if (auth.isLoggedIn()) {

    res.send('Hello World!');
  } else {
    res.redirect(google.generateURL());
  }
});

app.get('/callback', function(req, res) {
  if (!req.query || !req.query.code) {
    console.log(req.query);
    res.send('uh oh, code not found');
    return;
  }

  res.cookie('token', req.query.code);
  var email = req.cookies.email;

  if (! email) {
    return res.send('error, no email found');
  }

  mysql.updateToken(email, req.query.code);
  // auth request


  res.send(req.query);
});

app.get('/month', function (req, res) {
	var month = ('calendar').fullcalendar(getDate());
	res.render(month);
 // res.render('month',{month:month.getMonth(3, 2012), year: 2012,name: month.getNameMonth(3)});
  // res.send('Hello World!');
});

app.get('/login', function (req, res) {
  res.render('login',{});
  // res.send('Hello World!');
});

app.post('/login', function(req, res) {
  var email = req.body.email || '';

  var hashedPassword = hash(req.body.psw);

  mysql.checkUser(email, hashedPassword)
  .then(function(response) {
    // success
    // set cookie
    res.cookie('email', email);
    res.cookie('token', response.token);
    res.cookie('loggedIn', true);
    res.render('success');
  })
  .catch(function(err) {
    //error
    res.send(err);
  })
});

app.get('/register', function (req, res) {
	res.render('register', {});
});

app.get('/import', function(req, res) {
  res.redirect(google.generateURL());
});

app.post('/register', function (req, res) {
	console.log(req.body);

	var fName  = req.body.fname;

	var lName = req.body.lname;

	var email = req.body.email;

	var number = req.body.number;
	number = number.replace(/\D/g,'');

	if (number.length != 10) {
		res.render('register', {error: "Must be 10 digits"});
    return;
	} 

  var hashedPassword = hash(req.body.psw);

  // order ('firstname', 'lastname', 'email@email.com', '1235551234', 'hashed(password)')
  mysql.saveUser(fName, lName, email, number, hashedPassword)
  .then(function() {
    //saved
    res.render('success');
  })
  .catch(function(err) {
    console.log(err);
    res.render('register', {error: "uh oh something went wrong"});
  })
});

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});