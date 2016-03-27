
var bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({ extended: false });
var jsonParser = bodyParser.json();

module.exports = function (app) {

  app.get('/', function (req, res) {
    res.render('index'); // res will detect html
  });

  app.get('/html', function (req, res) { // res express object automatically picks up on html and generates proper response headers
    res.send('<html><head><link href="assets/style.css" type="text/css" rel="stylesheet" /></head><body><h1>Hello World!</h1></body></html>');
  });

  app.get('/person/:id', function (req, res) { // id is a variable and can be anything
    res.render('person', { ID: req.params.id, Qstr: req.query.qstr }); // ID can be used in the EJS templating logic
  });

  app.get('/api', function (req, res) {
    res.json({ firstname: 'John', lastname: 'Doe' }); // send JS objects directly
  });

  // pass urlencodedParser to perform middleware before receiving req and res here
  app.post('/person', urlencodedParser, function (req, res) {
    res.send('Thank you!');
    console.log(req.body.firstname);
    console.log(req.body.lastname);
  });

  app.post('/personjson', jsonParser, function (req, res) {
    res.send('Thank you for the JSON data!');
    console.log(req.body.firstname);
    console.log(req.body.lastname);
  });

};

