
var express = require('express');
var mysql = require('mysql');
var mongoose = require('mongoose');
var apiController = require('./controllers/apiController.js');
var htmlController = require('./controllers/htmlController.js');

var mongoMiddleware = function () {
  mongoose.connect('mongodb://test:test@...mongolab.com:47030.addressbook');

  // create the schema you want to work with in Mongo
  var Schema = mongoose.Schema;
  var personSchema = new Schema({
    firstname: String,
    lastname: String,
    address: String
  });

  // create a model and record
  var Person = mongoose.model('Person', personSchema);
  var john = Person({ // no new keyword used here
    firstname: 'John',
    lastname: 'Doe',
    address: '555 Main St'
  });

  // save a record
  john.save(function (err) {
    if (err) {
      throw err;
    }
  });

  // get all users i.e. instances of the Person model
  Person.find({}, function (err, users) {
    if (err) {
        throw err;
    }
    console.log(users);
  });
};

var mysqlMiddleware = function () {
  var conn = mysql.createConnection({
    host: 'localhost',
    user: 'test',
    password: 'test',
    database: 'addressbook'
  });

  conn.query('SELECT * FROM People;', function (err, rows) {
    if (err) {
      throw err;
    }
    console.log(rows);
  });
};

var app = express();

app.set('view engine', 'ejs');

// Node uses middleware to handle local request to assets/style.css
app.use('/assets', express.static(__dirname + '/public')); // tells express to use middleware when it sees a url of /assets/<some resource>, and look for the file in the public directory`

app.use('/', function (req, res, next) { // app.use can receive custom functions as well
  console.log('Request URL: ' + req.url);
  //mysqlMiddleware(); // connect to db when navigating to a route and perform a query
  //mongoMiddleware(); // connect to a mongodb when navigating to a route and perform a save and find query
  next(); // call next to continue to the next middleware, as this middleware is used on all requests
});

apiController(app); // mix api routes into express app (pass by reference)
htmlController(app); // mix html routes into express app (pass by reference)

var port = process.env.PORT || 3000; // if PORT property is undefined i.e. not set in env, 3000 is used

app.listen(port);

