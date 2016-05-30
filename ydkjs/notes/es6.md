ES6 and Beyond
==============

Ch. 1
-----

1. Versioning
    - ES versioning now uses both an ordinal and year i.e. ES7 = ES2016
    - future of JS versioning may be more by feature than an arbitrary colleciton of features
    - to provide support for older browsers ES6+ code is transpiled (transformation compiled) into ES5 which is well supported by all browsers

2. Transpiling
    - transpilers usually perform transformations as a build step similar to testing, linting, bundling, etc.
    - also have the option to polyfill/shim newer features into odler environments (usually by way of APIs written inside your modules) i.e. Object.is(..) (=== operator) can be shimmed
    - NaN === NaN = false, 1 / -0 = -Infinity in JS
    - a good colleciton of ES6 shims exist at https://github.com/paulmillr/es6-shim/
    - the best way to keep up with the rapid release of JS features is to use polyfill shims and a transpiler in your workflow

Ch. 2
-----

1. Block-Scoped Declarations
    - to play around and view ES6 transpilation there is an ES6 REPL at http://babeljs.io/repl
    - in ES5 the fundamental unit of variable scope is the function, therefore IIFEs were used to get block like scoping semantics
    - ES6 introduces the concept of block scoping (classical lexical scoping) where a new pair of curly braces \{ \} creates a new scope
    - instead of using the var keyword which binds variables to the enclosing function use the let keyword inside a block to bind it to the block
    - create block-scoped variables with a dedicated \{ \} block, making sure to let declare variables (as one let expression) at the top of this block after
    - let scoping is naturally implicit, use the let-block scope syntactic form to be explicit about your block scoping usage, this feature is still a proposal and not adopted in ES6
    - let bound variables are not initialized in the block until they appear (var declarations hoist AND initialize), be careful as to not use an uninitialized variable reference in let blocks
    - a let declared reference error is considered a temporal dead zone (TDZ), variable has been declared but not yet initialized
    - let b; is a valid variable declaration and initialization, JS implicitly assigns b to undefined
    - gotcha: using typeof on a TDZ variable (not yet initialized) will throw a reference error, where as using typeof on a variable never declared returns undefined
    - it is imperative to declare all let bounded variables at the very beginning of a block to be as clear and explicit as possible
    - using let in a for loop block (for instance with a variable named i) redeclares i each time the for loop is executed, preserving the individual i values for each iteration
    - using var in a for loop only creates one variable, (at the enclosing function scope level) instead of a new variable for each iteration to close over
    - the const keyword can also be used as a block-scoped declaration, this creates constants i.e. variables that can not be changed once initially assigned to
    - const variables require an explicit initialization since they can only be set once, to get an undefined const you must do const x = undefined;
    - a const variable value is not frozen, only the assignment (the reference) to the const variable is locked, if the variable is an array the array can still be modified
    - assigning an array or object to a const expression will restrict the array/object from being garbage collected, the referenced value can never be unset

2. Spread/Rest
    - ES6 introduces a new ... operator called the spread/rest operator
    - when the ... operator is used in front of any iterable, it spreads the iterable elements out into individual values
    - a common application of the ... operator is to spread out an array as a set of function parameters, helps avoid the need for apply
    - can also use the ... operator in array declarations to avoid the need for concat and allows more concise array literals
    - the ... operator is considered the Rest (gather) operator when used with a functions final param to collect all remaining passed args into an array
    - if only a ...param is used when declaring a function then all passed args are collected into an array variable named param
    - the ... operator used in a rest/gather context helps avoid the need for sending arguments through the Array.slice method to create a real arguments array

3. Default Parameter Values
    - the old wya to default function values in JS was to do something like var x = x || 1; where x is a named function parameter
    - using || is fragile when say x is 0 (0 passed in for x), a falsy value is seen and the default will be used for x instead of 0
    - can workaround || default usage by doing (x !== undefined) ? x : 1; this assumes whenever a variable is undefined it was not passed in
    - use (0 in arguments) ? x : 1; to be able to also pass undefined around (assuming x is the first function parameter) and default correctly
    - in ES5 it is only possible to omit variables on the end (the right hand side) of a function, omitting in the middle or beginning is not possible
    - a general principle in JS is that when a varibale is undefined it is considered missing, this is not the case when an array holds empty slots
    - to explicitly omit function parameters in ES6 pass undefined as the parameter value, null coerces to 0
    - default function values can be more than just an atomic value, they can be any valid expression (like a function call or IIFE), default value expressions are lazy and run as needed
    - the formal parameters in a function declaration live inside their own scope
    - when default value expressions are being evaluated the variables in the expression are first looked for in the funciton parameter scope before continuing outward to the next enclosing scope
    - it may be useful to default parameters to (empty/no-op) function expression when working in the context of asynchronous code using callbacks
    - in JS Function.prototype can be used as a no-op funciton value equivelant to function () \{\};

4. Destructuring
    - 


Overview of features
--------------------
- let & const block scoped
- ... spread (function application) and rest operator (function definition)
- template strings with `${ }`
- default parameters (not just function parameters)
- array and object destrcuturing assignment
- fat arrow lexically scoped functions
- classes with get and set, inheritance, static methods
- function names can be dynamic and derived at run time
- modules including default and named exports
- built in support for async/promises
- iterators with for...of (next protocol satisfied)
- generators with function* and yield (subtype of iterator)
- full list: https://github.com/lukehoban/es6features


