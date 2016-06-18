
var bodyParser = require('body-parser');
var Todos = require('../models/todoModel.js');

module.exports = function (app) {

  app.use(bodyParser.json()); // JSON parsing middleware for our routes
  app.use(bodyParser.urlencoded({ extended: true })); // url encoding middleware for our routes

  app.get('/api/todos/:uname', function (req, res) {
    Todos.find({ username: req.params.uname }, function (err, todos) {
      if (err) throw err;

      res.send(todos);
    });
  });

  app.get('/api/todo/:id', function (req, res) {
    Todos.findById({ _id: req.params.id }, function (err, todo) {
      if (err) throw err;

      res.send(todo);
    });
  });

  app.post('/api/todos', function (req, res) { // serve as create and update

    if (req.body.id) { // assume this is an update since an id exists
      Todos.findByIdAndUpdate(req.body.id, {
        todo: req.body.todo,
        isDone: req.body.isDone,
        hasAttachment: req.body.hasAttachment
      }, function (err, todo) {
        if (err) throw err;

        res.send('Success');
      });

    } else {

      var newTodo = new Todos({
        username: 'test',
        todo: req.body.todo,
        isDone: req.body.isDone,
        hasAttachment: req.body.hasAttachment
      });

      newTodo.save(function (err) {
        if (err) throw err;

        res.send('Success');
      });
    }
  });

  app.delete('/api/todos', function (req, res) {
    Todos.findByIdAndRemove(req.body.id, function (err) {
      if (err) throw err;

      res.send('Success');
    });
  });

};

