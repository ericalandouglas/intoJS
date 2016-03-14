
var greet = function () {
    console.log("hi!");
};

greet();

var logGreeting = function (fn) {
    fn();
};

logGreeting(greet); // can pass function as param like any other type

var greetMe = function () { // function expression
    console.log("Hi Eric");
};

greetMe();
logGreeting(greetMe);

logGreeting(function () { // function on the fly
    console.log("Hi Eric!");
});

