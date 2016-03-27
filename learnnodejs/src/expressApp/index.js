
var express = require('express');
var apiController = require('./controllers/apiController.js');
var htmlController = require('./controllers/htmlController.js');

var app = express();

app.set('view engine', 'ejs');

// Node uses middleware to handle local request to assets/style.css
app.use('/assets', express.static(__dirname + '/public')); // tells express to use middleware when it sees a url of /assets/<some resource>, and look for the file in the public directory`

app.use('/', function (req, res, next) { // app.use can receive custom functions as well
  console.log('Request URL: ' + req.url);
  next(); // call next to continue to the next middleware, as this middleware is used on all requests
});

apiController(app); // mix api routes into express app (pass by reference)
htmlController(app); // mix html routes into express app (pass by reference)

var port = process.env.PORT || 3000; // if PORT property is undefined i.e. not set in env, 3000 is used

app.listen(port);

