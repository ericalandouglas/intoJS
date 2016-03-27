
var bodyParser = require('body-parser');
var jsonParser = bodyParser.json();

module.exports = function (app) {

  app.get('/api/person/:id', function (req, res) {
    // get data from the database
    res.json({ firstname: 'John', lastname: 'Doe' });
  });

  app.post('/api/person/:id', jsonParser, function (req, res) {
    // save data to the database
  });

  app.delete('/api/person/:id', function (req, res) {
    // delete data from the database
  });

};

