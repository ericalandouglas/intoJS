
'use strict'; // pickier JS engine, should be used in production

class Person {

  constructor(firstname, lastname) {
    this.firstname = firstname;
    this.lastname = lastname;
  }

  greet () {
    console.log('Hello, ' + this.firstname + ' ' + this.lastname);
  }

}

var john = new Person('John', 'Doe');
john.greet();

var jane = new Person('Jane', 'Doe');
jane.greet();

console.log(john.__proto__ === jane.__proto__);

