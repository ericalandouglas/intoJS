Advanced JavaScript
===================

Intro
-----
- http 2.0 is socket based, 1 handshake and open connection between client and server
- logicless template engines leave brittle tie between view and controller (have to massage data in exact view form inside controller)
- JS style guide: https://github.com/rwaldron/idiomatic.js (pretty good style used)
- JS language spec: http://ecma-international.org/ecma-262/5.1/
- mozilla resources: https://developer.mozilla.org/en-US/docs/Web/JavaScript
- ECMAScript proposals: http://wiki.ecmascript.org/doku.php?id=harmony:proposals

Scope
-----
- JS uses lexical scope, create new scope with function, try/catch, let keyword in ES6
- undeclared = variable not found in current scope, undefined = variable declared in scope but has no real assignment value

Closure
-------
- closure is when a function remembers its lexical scope even when the function is executed outside that lexical scope
- create by transporting an inner function out of an enclosing function and execute in a new environment
- use IIFE in a C style for loop to bind enumerating i each time, can use for (let i =...) in ES6 to get same behavior without the need of an IIFE
- hidden scope objects representing a unctions lexical scope get garbage collected when no more funcitons/closures references the lexical scope object
- module pattern (good for hiding/encapsulating):
    1. has to be an outer wrapping function
    2. return one or more inner functions that have a closer over the wrapping functions lexcial scope
- module IIFE pattern works well becauase in practice you really only ever need one or two instances of a module you create (singleton pattern)

Object Orienting
----------------
- an objects internal [[Prototype]] chain is a series of references/links to other objects/functions and not copies like in classical inheritance
- behavior delegation happens when an object looks up its prototype chain to find behavior/attributes on an object higher in the chain
- delegation is a dynamic linkage that work with objects that dynamically change at run time vs classic OO creating snapshots and more static instances

Async Patterns
--------------
- attempt to make asynchronous code look synchronous
- implicit trust issues with callbacks as a continuation style (trusting that success and fail aren't both called in the same context, etc.)
- generators: new type of funciton that can pause in along the way of its computations
- generator functions execute until a yield statement is hit when called and then relinquishes control
- generator is exhausted when no more yield statements are hit and the function runs all code
- 

