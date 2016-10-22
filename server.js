var express = require('express');
var app = express();
var bodyParser = require('body-parser')

var mustacheExpress = require('mustache-express');

app.use(express.static('public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
var cookieParser = require('cookie-parser')
var mustacheExpress = require('mustache-express');

var auth = require('./auth');
var google = require('./google');

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
  res.send(req.query);
});

app.get('/month', function (req, res) {
  res.render('month',{});
  // res.send('Hello World!');
});

app.get('/login', function (req, res) {
  res.render('login',{});
  // res.send('Hello World!');
});

app.get('/register', function (req, res) {
	res.render('register', {});
});

app.post('/register', function (req, res) {
	console.log(req.body);
	res.json(req.body);
});

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});