You Don't Know JS: Scope and Closures
=====================================

Chapter 1: What Is Scope?
-------------------------
- ability to store value in variables and pull them out for later use gives program state
- scope: a well defined set of rules for the location of where variables are stored, and for finding those variables at a later time
- traditional compiling includes the following 3 steps:
    1. lexing/tokenizing i.e. var a = 2; breaks into tokens var,a,=,2, and ; (lexing invokes stateful parsing)
    2. parsing: taking a stream of tokens and creating tree of nested elements representing grammatical structure of program (AST)
    3. code generation: converting the AST into executable code
- JS and other language compilers may perform performance optimizations and various additional steps on top of the above 3
- JS compiles code before it is executed, often times right before it executes
- engine: responsible for start to finish compilation and execution of JS programs
- compiler: handles parsing and code-generation for engine
- scope: aids engine by collects and maintains a look up listof all declared identifiers (vars), enforces rules about the accessability of these variables to current executing code
- var a = 2; 1. compiler declares new var a in current scope if necessary 2. engine looks up variable in scope and assigns to it if found
- two types of lookups performed by engine in scope: LHS (left hand side) and RHS (right hand side) of the assignment operation (var a above is a LHS lookup)
- LHS trys to find the variable container while RHS is a simple value look up i.e. console.log(a), a is RHS look up vs. a = 2, a is LHS container assignment lookup
- LHS => who's the target of assignment, RHS => who's the source of the assignment
- parameters passed to function calls have implicit LHS lookups performed to properly initialize parameters for RHS lookup
- just as blocks and functions can be nested, scopes can enst as well, engine looks up variables in outer scopes if can't find variable lookup in current scope (JS terminates searching at the global scope)
- think of scopes (global and lexical) as a tall building (current scpope is 1st floor, global scope is top floor), engine searches on floor 1, then floor 2, etc. until it finds or hits the top floor for LHS/RHS lookups
- if RHS lookup fails a ReferenceError is thrown by the engine
- if LHS lookup fails to find variable all the way up to the global scope it creates a new variable in global scope
- strict mode in ES5 does not allow LHS lookup to perform assignment/lookup on global scope
- ReferenceError implies scope resolution failed, where as TypeError is an illegal operation but scope resolution was successful

Chapter 2: Lexical Scope
------------------------
- JS like many other programming languages employs lexical scope model
- lexical scope is scope that is defined at lex-time, based on where variables and blocks of scope are authored, set by time lexer processes
- each new function creates a new "bubble" of scope, function scopes can be contained by other function scopes
- scope look up stops once it finds the first match, inner scope over writes outer scope i.e. "shadowing"
- lexical lookup process only applies to first class identifiers such as foo, accessing foo.bar first finds foo with lexical lookup but then object property access rules are used to find bar
- cheating lexical scope leads to poor performance in JS i.e. eval can modify authored lexical scope at runtime (can be avoided in strict mode)
- dynamically generating code has performance degradations that make them unfavorable and uncapable
- engine can't know at lexing time contents of dynamic eval expressions and can't perform compiler optimizations

Chapter 3: Function Versus Block Scope
--------------------------------------
- JS has function-based scope, each function creates a new "bubble" scope
- function scopes make all variables declared throughout a function available to the whole function and any nested scopes
- wrap arbitrary chunk of code in a function declaration to "hide" the code by wrapping it in a new "bubble", containing all variable declarations in a new scope
- wrapping code in functions and hiding information encourages the least exposure principle which is often what APIs follow as well as the module pattern
- enclosing variables and functions in their own scopes helps avoid collisions (collisions most likely in global scope)
- libraries often create a single object with unique name to link the module to the global namespace
- modules and an explicit import system help avoid global collisions by creating scope containing only the imported modules/values
- create function expressions (not declarations) by enclosing function in parentheses i.e. (func foo () {..})()
- function declarations add function identifier to global namespace, function expressions make function identifier available only to the new function's scope and does not pollute global namespace
- callback parameters are function expressions, often asynchronous but can have drawbacks when anonymous:
    1. anonymous functions are not named making stack tracing/debugging more difficult/less contextual
    2. self-refernce for recursion is not easy with anonymous functions
    3. anonymous functions may be harder to understand/read as they are less self documenting
- best to give your functions names whenever possible, whether they are inline expressions or declarations
- IIFE: immediately invoked function expression i.e. (function foo () {..})();, good to name these even though they can be anonymous sometimes
- (function foo () {..}()) is the same as (function foo () {..})() is the same as function foo () {..}()
- JS does not support block scope i.e. a new bubble is not created in for, while, if blocks
- block scope allows variables to remain very local and live as close to their computations as possible, avoid confusing/unmaintainable use of variables
- try/catch blocks in JS have the catch block using the try block "bubble" scope as its scope i.e. error passed to catch block is not available to the outside scope enclosing the try/catch block
- ES6 syntax introduces new let keyword for block scope binding (good practice to enclose let declarations in their own block to be explicit and clear on scope)
- declarations made with let do not hoist to the entire enclosing function scope, let variables only observable after their declaration in the current block and nested blocks
- let bindings and block scope help with efficient garbage collection, for loop per-iteration binding
- ES6 also introduces const keyword which acts like let but makes variable immutable after initial declaration/definition
- it is good to use both function scope and block scope techniques where respectively appropriate to produce good/maintainable code

Chapter 4: Hoisting
-------------------
- both function and block scope adhere to the rule that ny variable declared within a scope is attatched (bound) to that scope
- JS will compile code before it interprets it, part of compilation finds and associates all declarations with their appropriate scope (the heart of lexical scope)
- all declarations, both variables and functions, are processed before any part of the code is executed
- var a = 2; first statement, the declaration, is processed at compile time, the second statement, the assignment, is left in place for execution phase
- JS moves declarations to the top of their scope i.e. hoists them
- var foo = function bar () {..}; hoists the declaration var foo; to the top of the scope, a call to foo() before the assignment will result in a type error, foo is in scope because of hoisting but JS has not assigned a function to it yet so it does not have the function type
- functions are hoisted first/before variables

Chapter 5: Scope closures
-------------------------
- closures are employed automatically in JS because of its reliance on lexical scope
- Closure: a function that is able to remember and access its lexical scope even when the function is executed outside its lexical scope
- closures let functions access the lexical scope they were defined in at author time
- whatever facility is used to transport n inner function outside of its lexical scope, it will maintain a scope reference to where it was originally declared
- closures appear in timers, event handlers, Ajax requests, cross-window messaging, web workers, asynchronous tasks, callback functions
- to capture each iteration value (i) in the body of a loop, an IIFE can be used with an inner declaration and assignment to the current iteration value (var j = i; in the body of the IIFE) to close over and capture the iterating variable, can also use let declarations in head of for loop
- most common form of module pattern is revealing module, return object is essentially the API for the module
- two requirements of module pattern:
    1. must be an outer enclosing function, and must be invoked at least once (invoking creates module instance)
    2. enclosing function must return back atleast one inner function that enjoys access over the private scope and access private state
- to enforce the singleton pattern on module objects, create a single module instance with an IIFE
- ES6 adds first-class syntax upport for concept of modules, ES6 modules are static, semantics considered before runtime, functions ina  module are enclosed in a scope closure

Appendix A: Dynamic Scope
-------------------------
- dynamic scope uses the call stack to resolve vriable references unlike lexical scoping
- dynamic scope cares about where a function was called from, lexical scope cares about where a function was declared

Appendix B: Polyfilling Block Scope
-----------------------
- the ES6 let keyword gives fullblock scoping capabilty to code
- try/catch can achieve block scope by throwing values into the catch block, the values won't be visible to the try/catch block's enclosing lexical scope
- can use a code transpiler to migrate ES6 code into valid ES5 code as coffeescript can be transpiled into JS
- Google maintains a Traceur project with is tasked with transpiling ES6 JS code into pre ES6 code
- the let statement explicitly sets up a block and has all variables scoped to the block declared at the head (like how hoisitng moves all declarations to the top of the enclosing function's scope)
- use let-er to gain transpiler support for the let statement which is not a feature of ES6
- while IIFEs may (currently) outperform try/catch, introducing a new function expression changes meaning of certain keywords like this, return etc.

Appendix C: Lexical This
------------------------
- to salvage specific this instances in nested functions, a variable self can be employed to capture a specific this (i.e. an object/module)
- fat arrow syntax => (shorthand for functions) in ES6 allow the this variable to bind to the value of the function's enclosing lexical scope
- try to stick to one idiom for a given piece of code i.e. don't mix fat arrow => with normal functions i.e. lexical scope
- can use the bind function method to preserve the value of this as well and allow functions to "inherit" this
