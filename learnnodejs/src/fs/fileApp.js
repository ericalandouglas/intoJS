
var fs = require('fs');

var greet = fs.readFileSync(__dirname + '/greet.txt', 'utf-8'); // __dirname available from Node, default encoding = utf-8
console.log(greet);

var greet = fs.readFile(__dirname + '/greet.txt', 'utf-8', function (err, data) { // readFile reads asynchronously
  console.log(data);
});

console.log('Done!'); // V8 continues running after the asynchronous file call, Done! logs before asynchronous file loading completes, asynchronous work handled by C++ Node engine

