
'use strict';

var EventEmitter = require('events');
var eventConfig = require('./config.js').events;

// export using an ES6 class expression
module.exports = class Greetr extends EventEmitter { // this class inherits from native EventEmitter

  constructor () {
    super(); // syntactic sugar for EventEmitter.call(this);
    this.greeting = 'Hello world!';
  }

  greet (data) {
    console.log(this.greeting + ': ' + data);
    this.emit(eventConfig.GREET, data);
  }

}

