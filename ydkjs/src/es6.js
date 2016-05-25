'use strict';

const es5BlockScope = function () {
  var a = 2;
  console.log(c); // c is initialized but remains undefined until assigned below

  (function myIIFE () { // can also use fat arrow here, fat arrow IIFE's are ANONYMOUS i.e. () => { ... } has no name
    var a = 3;
    console.log(a); // 3
  })();

  console.log(a); // 2
  var c = 666; // if use let instead of var, console.log(c) above throws a reference error as c is not initialized until this line, an ES6 TDZ
};

const es6BlockScope = function () {
  var a = 2;

  { let a = 3, b = 5; // let decl8re all block-scoped vars at the very beginning of the block to be more explicit
    console.log(a + b); // 8
  }

  /*
  ** let-block example (ES6 lacks support for this feature)
  let (a = 3, b = 5) {
    console.log(a + b); // 8
  }
  */

  let b;
  console.log(b); // b is declared and initialized at this point, JS has assigned undefined to it, 

  console.log(a); // 2
};

const es6LetForScope = function () {
  var xs = [], a = 2; // var acts the same as let here because this is the beginning of a function, a could also be a const assignment

  for (let i = a, j = a*2; i <= a*2; i++) { // j always 4, only i increments
    console.log(i + j); // 2 + 4, 3 + 4, 4 + 4
    xs[i - a] = function () { return i + j; }; // let bounded variables preserve value and correct refence to i and j
  }
  console.log(xs[0](), xs[1](), xs[2]()); // 6, 7, 8 (if var used for i and j in above loop then 9, 9, 9 is printed)

  var ys = [];
  for (var y = 0; y < 3; y++) {
    (function () {
      var z = y;
      ys.push(function () {
        return z + 1;
      });
    })();
  }
  console.log(ys[0](), ys[1](), ys[2]()); // 1, 2, 3, an IIFE was needed to accomplish per iteration closure when using var with for

};

const es6ConstUsage = function () {
  const xs = [1, 2];
  xs.push(3); // valid operation, only new assignment to xs is prohibited, xs value can be modified
  // xs = [1]; // throws TypeError because of const reassignment
  console.log(xs);
};

const es6SpreadOperator = function () {
  var foo = function (x, y, z) {
    console.log(z, y, x);
  };

  var xs = [1, 2, 3];
  foo(...xs); // ... operator spreads array elements over the arg elements in order, x = 1, y = 2, z = 3
  foo.apply(null, xs); // without ... operator it is required to use the apply method

  var ys = [0, ...xs, 4]; // ... operator can also be used inside array declarations, same as [0].concat(xs, [4])
  console.log(ys); // [0, 1, 2, 3, 4]

  /*
  ** ES6 ... rest operator example (... used before a function's final param collects all the remaining args passed into the final variable as an array
  var foo = function (x, y, ...z) {
    console.log(x, y, z);
  };
  foo(1, 2, 3, 4, 5); // 1, 2, [3, 4, 5]

  const es6Args = function (...args) { // ...args used in a gathering context
    args.shift(); // args is an array containing all the function params
    console.log(...args); // ...args used in a spread context
  };

  const es5Args = function () {
    args = Array.prototype.slice(arguments); // have to be a little hacky to create a real args array
    es6Args.apply(null, args); // could have done es6Args(...args) but this is an ES5 example
  };
  */

};

const esDefaultParameters = function () {
  const es5Defaults = function (x, y) {
    var x = x || 11; // ES5 way to default x to 11
    var y = y || 34; // ES5 way to default y to 34
    console.log(x + y);
  };
  es5Defaults(); // 45
  es5Defaults(1); // 35
  es5Defaults(1, 2); // 3
  es5Defaults(0, 4); // 15 NOT 4 because 0 is falsy, ES5 defaulting idiom is fragile for this reason

  const es5DefaultWorkArounds = function (x) {
    var x1 = (x !== undefined) ? x : 1; // assumes x should be defaulted when undefined (even if passed in as undefined and not omitted)
    var x2 = (0 in arguments) ? x : 1; // can be used to allow undefined to be passed in as x and not get default overwritten
    console.log(x1, x2);
  };
  es5DefaultWorkArounds(); // 1, 1
  es5DefaultWorkArounds(undefined); // 1, undefined

  /*
  ** ES6 default parameter example
  const es6Defaults = function (x = 11, y = 14) {
    console.log(x + y);
  };
  es6Defaults(); // 25
  es6Defaults(1); // 15
  es6Defaults(undefined, 29); // 40
  es6Defaults(null, 5); // 5, null coereces to 0

  ** ES6 default value expression example
  const y = 2;
  const foo = function (param = 5) { return param * 2; };
  const es6DefaultValueExpression = function (x = y - 1, z = foo()) {
    console.log(x + z);
  };
  es6DefaultValueExpression(); // 11
  es6DefaultValueExpression(10); // 20
  es6DefaultValueExpression(undefined, 50); // 51

  ** ES6 default value expression TDZ example
  const w = 1, z = 2;
  var defaultValueTDZ = function (x = w + 1, y = x + 1, z = z + 1) { // x finds w in enclosing scope, y finds x in parameter scope, z is a TDZ reference error because engine things it is an unitialized variable in the parameter scope
    console.log(x, y, z);
  };
  */

};

esDefaultParameters();

