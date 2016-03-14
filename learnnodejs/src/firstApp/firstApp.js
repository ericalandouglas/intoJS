
var greet = require('./greetModule.js');
var greet2 = require('./greetModule2.js');
var greet3 = require('./greetModule3.js').greet;
var greet4 = require('./greetModule4.js');

greet();
greet2();
greet3();

greet4.greet();
greet4.greeting = 'Changed hello world!'

var greet4b = require('./greetModule4.js');
greet4b.greet(); // greetModule4 returns an object so changes made to object persist when importing

var Greetr = require('./greetModule5.js');
var greet5 = new Greetr();
greet5.greet()

var greet6 = require('./greetModule6.js').greet;
greet6();

var createGreetr = require('./greetModule7.js');
var greet7 = createGreetr({
    greeting: 'Bon journooo'
});
greet7.greet();

