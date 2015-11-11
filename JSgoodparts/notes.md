Javascript: The Good Parts
==========================

Good Parts
----------
- Good ideas: functions, loose typing, dynamic objects, expressive object literal notation
- Bad ideas: programming model based on global variables, depends on global variables for linkage
- Functions: first class, mostly lexical scope, lambda support, lisp in C’s clothing
- Javascript has prototypal inheritance, class-free object system
- Use JSLint tool to parse and analyze code

Grammar
-------
- Comments: 1 line = //..., multi-line = /*…*/
- Name: letter followed by optional letters, numbers, underscores for variable, statements, operators, etc.
- JS uses single number type, Number (64-bit floating point)
- 100 = 1e2, NaN is result of operation that can’t compute normally, check with isNaN(number), Infinity > 1.7977e308
- Numbers have methods, JS has Math object for methods that act on numbers
- String: ‘..’ or “..”, \ is escape char, chars are 16 bits, no explicit char type, string only
- Strings are immutable once instantiated, create new strings with concat operator +, come with built in methods like toUpper
- Compilation unit: set of executable statements
- Var statement: var name; or var name = expression;
- switch, while, do, and for can be labelled to interact with break
- Block: set of statements wrapped in {…}, block does not create new scope, only functions do, define variables at the top of functions
- False values: false, null, undefined, ‘’, 0, NaN
- For loops: 2 forms, 1 is conventional (init, condition, increment), and 2 is object enumeration (for var x in xs)
- Use obj.hasOwnProperty(prop) to test if obj owns prop or if prop lives on prototype chain
- Void functions return undefined
- Expressions can assign values to vars, invoke methods, delete object properties
- typeof produces values ’number’, ’string’, ‘boolean’, ‘undefined’, ‘function’, or ‘object’
- Refinement: access object proper with. or index an array with [ ]
- object notation: { name: value, name2: value2, …}, array notation: [1, 2, 3, …]
- function syntax: var add = function (x, y) { return x + y; }

Objects
-------
- Simple types: number, boolean, string, null, undefined, every other value is an object
- Numbers, strings, booleans are immutable objects with methods, objects are mutable keyed collections
- Functions, arrays, regular expressions, and key collection objects are all of object type
- Object is a container of properties, a property has a name and value (key-value store)
- Objects can contain other objects, useful for collecting and organizing data, prototype linkage feature as inheritance mechanism
- Object literals: var emptyObj = { }; var bar = {“xs”: [1, 2, 3], “name”: “myList” };
- Quotes around property names are optional for valid strings (my_prop, etc.), quotes required for “my-prop”
- Retrieval: obj[“first-name”], obj.first_name, dot notation preferred because it is more concise, if member is not defined undefined is returned: obj.not_existent = undefined
- Use || to fill default values: obj[“my-list”] || [1, 2], obj.name || “”, accessing a property on undefined throws TypeError, guard with && i.e. obj.my_list[1] => throws error vs. obj.my_list && obj.my_list[1] => returns undefined
- Updates: if property name exists value is replaced, otherwise object is augmented and gains the new property
- Every JS object is linked to a prototype object from which it can inherit properties, object literals linked to Object.prototype
- JS attempts to retrieve an object’s desired property by starting at the object’s property list and then moving down the object’s prototype chain, searching each successive prototype for the property until it bottoms out at object.prototype, this is known as delegation
- Prototype properties are dynamic, adding properties to prototype immediately propagates new property down to objects using the prototype
- typeof operator can help with reflecting (looking at and searching for) properties of an object, when reflecting be aware some values are functions and not just data, hasOwnProperty does not search the prototype chain
- for in statements loop over all properties of an object including functions and prototype properties
- for in statements don’t preserve an ordering, instantiate a list of property names to loop over (for ;,;,;) to maintain a specific order
- delete is used to remove a property from an object if it is present, it does not touch properties in the prototype chain, deleting properties can let prototype chain methods shine through (erase their overridden nature)
- Mitigate global name space creation by having all objects, functions, etc. live in one global facing object i.e. var MYAPP { … };

Functions
---------
- Functions are used for code reuse, information hiding, composition, specific the behavior of objects, fundamental modular unit
- Functions are objects, objects are name value pairs having a hidden link to a prototype object
- Function objects link to Function.prototype which itself links to Object.prototype, 2 hidden function parameters are function’s context and function’s code
- Every function object has a prototype property, prototype value is an object with a constructor property whose value is the function
- Functions are first class citizens like other objects, they can have methods, and function objects can be invoked
- Functions can optionally be given a name, for things like reference in recursion, functions without a name are anonymous
- Inner functions defined in an outer function can access the variables and namespace of the enclosing outer scope to support closures
- When a function is invoked it receives its parameter list, plus 2 additional parameters, this and arguments
- this is very important for OOP and its value is determined by the invocation pattern
- 4 invocation patterns: 1. method invocation pattern, 2. function invocation parameter, 3. constructor invocation pattern, 4. apply invocation pattern, each initializes the this parameter differently
- Extra arguments exceeding the amount of variables in the parameter list are ignored, undefined is substituted when too few arguments are passed
- method: property of an object that is a function, the this is bounded to the object for each of its methods at invocation time, public methods get the object context from the this
- Function invocation like add(3, 4) binds this to the global object, inner functions don’t bind this to the outer function they bind to the global object, workaround: var that = this; in outer, use that var in inner function
- JS is a prototypal inheritance language, objects inherit properties from other objects directly, class-free language
- function invoked with new prefix creates an object with a hidden link to the value of the function’s prototype, this is bound to the new object, changes behavior of return statement
- functions used with the new prefix are called constructors, it is bad to call constructors without the new keyword (use capitalization convention to mitigate this)
- apply method invocation allows an array of parameters to be passed to a function along with a value to bind to this, i.e. add.apply(null, [1, 2, 4]) = 7, null is bound to this (1st argument), apply is a method on functions, functions are objects
- arguments parameter is always initialized as an array containing all parameters passed to invoked functions including excess parameters (to allow for functions that take a variable amount of parameters)
- arguments is not actually an array, it has a length property but no other array like properties
- functions implicitly return undefined hen no return specified, new constructors implicitly return this (the new object created)
- throw exceptions with the throw keyword, passing along an exception object containing name and message properties
- Exception handler catch block can examine the name property of the exception object to check the type of error thrown
- Augment basic types by providing new methods to prototype, methods with prototype in their chain can access the newly defined method, Function.prototype.method = function () {…};
- Recursion is not tail call optimized, can refer to x or y as the recursive function in body when writing var x = function y () {…};
- JS has function scope (not block scope) so its best practice to declare variables at the beginning of your functions
- Closures enjoy access to variables declared in their enclosing scope including when the enclosing scope goes out of context
- Avoid creating helper functions in loops, use helper functions defined outside the loop to bind variables like the iterator i
- Use call back functions to be executed by asynchronous requests, avoid synchronous requests
- Module: function or object that presents an interface but hides its state and implementation, use modules to mitigate use of global variables  
- Module is a function that defines private variables and functions, and creates privlaged functions that can access the private members, priivalged function is stored or accessible
- Use the module pattern to create objects with protected variables and public methods, create a collection of functions acting as capabilities that grant specific actions to the protected state
- Methods that do not have a return value can return this to enable cascades, a cascade allows you to call many methods of an object in sequence in a single statement
- Each methood in a cascade returns the object it manipulates to allow succinct calls of an object's methods i.e. myObj.color('red').size(9);
- Cascading is very expressive and helps mitigate the tendency to try and make interfaces that try to do too much at once
- Curry functions by producing a new function from an input and a function
- Memoization: Optimization technique where functions save and recall previous calculations with the help of closures to avoid extra work (naive fib function can be memoized)

Inheritance
-----------

