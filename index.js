var appPath = "/public/www-data/";
var viewPath = "/public/www-data/view"
var express = require('express');
var app = express();
var path  = require('path');
var fs = require('fs');

//set up underscore + html rendering
var cons = require('consolidate');
app.engine('html', cons.underscore);
app.set('view engine', 'html');
app.set('views', path.join(__dirname, viewPath));

//var dbURL = "postgres://rpfdcadokaxnvb:B7AFleOzmHR3dRLa4qWV0n4XjA@ec2-54-163-227-94.compute-1.amazonaws.com:5432/d8t4juohs69msb?ssl=true";
app.set('port', (process.env.PORT || 5000));

//parsing
//app.use(bodyParser.json());
//app.use(bodyParser.urlencoded({
//  extended: true
//}));

//static
app.use('/static', express.static(__dirname + appPath + 'static'));

/** default landing **/
app.get('/', function(req, res) {
	//res.send('hello')
  res.render('index');
});

//profile page
app.get('/profile', function(req, res) {
	res.render('index');
});

//learn
app.get('/learn', function(req,res) {
	res.render('learn');
});


app.listen(app.get('port'), function() {
  console.log("Node app is running at localhost:" + app.get('port'));
});




