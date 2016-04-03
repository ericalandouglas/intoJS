
var app = angular.module('TestApp', []);

app.controller('MainController', ctrlFunc);

function ctrlFunc () {
  this.message = 'Hello';

  this.people = clientPeople; // example to illustrate how data moves from node server to client's browser
}

