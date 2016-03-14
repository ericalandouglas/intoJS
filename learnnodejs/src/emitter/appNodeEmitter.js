
// all the same as custom event emitter app we just change the module we import
var Emitter = require('events'); // native node event emitter
var eventConfig = require('./config.js').events;

var emtr = new Emitter();

emtr.on(eventConfig.GREET, function () {
  console.log('Somewhere, someone said hello.');
});

emtr.on(eventConfig.GREET, function () {
  console.log('A greeting occurred!');
});

console.log('Hello!');
emtr.emit(eventConfig.GREET);

