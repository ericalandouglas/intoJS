
var EventEmitter = require('events');
var util = require('util');
var eventConfig = require('./config.js').events;

var Greetr = function () {
  EventEmitter.call(this); // just want to extend the this instance, don't need new which will create a new object
  this.greeting = 'Hello world!';
};

// any new object created with Greetr has access to EventEmitter properties now
util.inherits(Greetr, EventEmitter);

Greetr.prototype.greet = function (data) {
  console.log(this.greeting + ': ' + data);
  this.emit(eventConfig.GREET, data); // Node supports passing function parameters along
};

var greeter1 = new Greetr();

greeter1.on(eventConfig.GREET, function (data) { // event listener can take parameters
  console.log('Someone greeted!: ' + data);
});

greeter1.greet('Eric');

