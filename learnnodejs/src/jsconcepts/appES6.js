
var name = 'John Doe';
var greet = `Hello ${ name }`; // template literal in ES6

console.log(greet);

var obj = {
  name: 'John Doe',
  greet: function () {
    console.log(`Hello ${ this.name }`);
  }
};

obj.greet();
obj.greet.call({name: 'Jane Doe'});
obj.greet.apply({name: 'Johnny Doe'}); // don't need to pass an array of args here

