// this code will be run on the client side in the browser and not by Node

var app = angular.module('TestApp', []);

app.controller('MainController', ctrlFunc);

function ctrlFunc () {
  this.message = 'Hello';

  this.people = clientPeople; // example to illustrate how data moves from node server to client's browser
}

