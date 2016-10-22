var express = require('express');
var app = express();

var mustacheExpress = require('mustache-express');

app.use(express.static('public'));

// Register '.mustache' extension with The Mustache Express
app.engine('mustache', mustacheExpress());

app.set('view engine', 'mustache');
app.set('views', __dirname + '/views');

app.get('/', function (req, res) {
  res.render('test',{});
  // res.send('Hello World!');
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

app.get('/week', function (req, res) {
  res.render('week',{});
  // res.send('Hello World!');
});

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});