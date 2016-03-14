
var change = function (x) {
    x = 2;
};

var a = 1;
change(a); // pass by value
console.log(a);

var changeObj = function (obj) {
    obj.prop1 = function () {};
    obj.prop2 = {};
};

var c = {};
c.prop1 = {};
changeObj(c); // pass by reference
console.log(c);

