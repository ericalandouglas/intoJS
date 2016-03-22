Learn and Understand Node JS
============================

V8 - The JavaScript Engine
--------------------------

1. Processors, Machine Code, and C++
    - a microprocessor is a very small physical machine
    - processors consume inputs and perform a job based on instructions/machine code (not all speak the same language, x86-64, ARM, etc.)
    - machine code: programming languages spoken by computer processors (very low level)
    - all code is eventually converted into machine code for the processor to understand and execute
    - increasing levels of abstraction: machine code, assembly language, C/C++, scripting languages (JavaScript, Python, etc.)
    - Node is written in C++, it is a C++ program
    - the V8 JavaScript engine which converts JS code to machine code is written in C++
    - Node prgrams are written in JavaScript

2. JavaScript Engines & The ECMAScript Specification
    - ECMAScript: the standard JavaScript is based on, needed to standardize core because many engines exist
    - JavaScript Engine: A program that converts JavaScript code into machine code for the processor's consumption
    - engines should follow the ECMAScript standard on how the langauge works and what features it should provide
    - V8 is one JavaScript engine and sits at the core of Node

3. V8 Under the Hood
    - V8 engine is an open source project created by Google and written in C++
    - used in chrome browser
    - implements ECMAScript 5th edition
    - can run standalone or be embedded into a C++ app

4. Adding Features to JavaScript
    - V8 has an entire embedder's guide, can refer to when embedding into a C++ application
    - V8 has hooks C++ programs can use to add features to JavaScript
    - can extend the V8 engine this way by allowing your C++ programs with new JS features to access all the ECMAScript features
    - V8 engine can be extended (via C++ functions you write) to support features/keywords like print, load, read, etc. that are not defined in the ECMAScript
    - C++ functions that act as new JS features can be added to the V8 engine via the C++ hooks V8 offers
    - features added via C++ and the V8 hooks become native language features and are available to all JS code
    - Node JS is a C++ program with V8 embedded that adds JS features to make the language more suitable for web server development

The Node Core
-------------

1. Servers and Clients
    - server: computer performing services and jobs requested of it, does heavy lifting, receives requests, sends responses
    - client: asks server to do some work, may do small amount of work, sends request, recevies response
    - client server model of computing has a standard model/format
    - web server: computer connected to the internt accepting requests from other online clients (usually client in browser with JS capabilities)
    - the web standard client server model is called HTTP, hyper text transfer protocol
    - Node JS allows web stack to be one language, JavaScript can be used for client and server side development

2. What Does JavaScript Need to Manage a Server?
    - need better ways to organize our code into reusable pieces (modules)
    - need ways to deal with files
    - need ways to deal with databases
    - need way to communicate over the internet
    - need to have the ability to accept requests and send responses in the standard format
    - need a way to deal with jobs that take a long time and continue to allow requests coming in

3. The C++ Core
    - the foundation that makes node js suitable for web server development and implements the necessary features into JS
    - V8 engine is embedded through out the source code
    - the core holds the features/utilities necessary for web servers, implemented in C++ and extends V8 engine by leveraging available hooks
    - Node JS is a V8 web server engine (C++ program) essentially that consumes JavaScript code

4. The JavaScript Core
    - most of the JavaScript core serves as a wrapper around the extension features the Node JS C++ program implements
    - core lib includes utilities for things like http requests and responses, zip files, etc. by wrapping the C++ features
    - core also includes helpful utility functions for common tasks in utils.js

5. Running Node Programs
    - always give node a single entry point (single JavaScript file) for execution
    - breakpoint: a spot in our code where we tell the debugger to pause execution of the code (to help figure out what is going on)

Modules, Exports, and Require
-----------------------------

1. Modules
    - module: reusable block of code whose existence does not impact other code
    - native V8 JS does not have module support
    - Node JS implements common JS modules
    - common JS modules: agreed upon standard for how code modules should be structured

2. First-Class Functions and Function Expressions
    - first-class functions: everything you can do with other types (strings,numbers, etc.) you can do with functions
    - can pass functions around, set variables equal to them, put them in arrays, etc.
    - expression: a block of code that results in a value
    - function expressions are possible in JS because functions are first-class
    - invoke: call/run a function
    - require function is an extneded feature provided by the node engine, used to import modules
    - module object has property exports, module.exports is used to expose functions and objects for public use

3. Objects and Object Literals
    - name/value pair: a name which maps to a value
    - a name may be defined more than once but can only have one value in any given context
    - value may be more name/value pairs
    - name/value pair => Address = "100 Main St."
    - object: a collection of name/value pairs (values can be objects supporting object nesting)
    - objects sit in memory and point at other objects and values (primitives, functions i.e. methods, properties)
    - object literal: name/value pairs seperated by commas and surrounded by curly braces (quick short hand)

4. Prototypal Inheritance and Function Constructors
    - inheritance: when one object gets access to the properties and methods of another object
    - every object points to a private prototype object which the object inherits properties from
    - prototypes can have their own prototypes creating a chain
    - an object on the prototype chain can access the properties of any object down the line from it
    - objects can share and have the same prototype
    - if the prototype is modified, all obejcts with that prototype will get access to the changes
    - function constructors: a normal function that is used to construct objects
    - the this variable will point to a new empty object when the new keyword is used with a function
    - the function called with new will automatically return the newly reated object

5. By Reference and By Value
    - primitive: a type of data that represents a single value (number, string, NOT an object)
    - when variable x points at a primitive value, x knows where the primitive value sits in memory
    - when x is passed to a function or new variable y, the value at x is copied to a new location in memory where y now points, this is called pass by value
    - when an object is passed to a function or assigned to a new variable, the new variable points to the same location as the original location in memory, this is known as pass by reference

6. Immediately Invoked Function Expressions (IIFE)
    - scope: where in code you have access to a particular variable or function
    - IIFE: function wrapped in parentheses (to create an expression) and called immediately, function usually remains anonymous

7. How Do Node Modules Really Work?: module.exports and require
    - require function used to import modules
    - module.exports property used to expose functions and objects of a module for require function
    - Node module functionality found in the internal module.js file
    - Node wraps your code in additional code before handing it off to the V8 engine
    - everything written in Node is run in V8 wrapped inside a function expression
    - module.exports (module is passed by reference, its an object) is the modified parameter that serves as window to getting out of the wrapped function expression
    - require is a function you pass a module path too
    - module.exports is what the require function returns
    - this works because your code is wrapped in a function that is given these things as function parameters (require, module, exports, etc.)

8. JSON
    - JSON: JavaScript object notation, a standard for structuring data inspired by JavaScript object literals
    - JavaScript engines are built to understand JSON
    - JavaScript can easily convert a JSON formatted string to a native object and vice versa

9. More on require
    - see secondApp.js and the greet directory in src for example require usage with modules

10. Module Patterns
    - refer to firstApp.js and greetModule[1,2,3,4,5,6,7].js for some common module patterns
    - require function caches the value assigned to module.exports so that property only gets set once and is then cached
    - revealing module pattern: expose only the properties and methods we want via an returned object
    - revealing module pattern is very common and a clean way to structure and protect code within modules

11. exports vs module.exports
    - require function wrapper provides exports and module parameters
    - the function wrapper sets the exports parameter to the value of module.exports when applying the wrapper (function expression)
    - exports is like a short hand for module.exports but remember the function wrapper returns module.exports so that is what needs to be modified
    - initially module.exports points at an empty object {}, and exports points at the same object
    - when a variable is set equal to a value in JavaScript, any old reference is lost and a new object is created in memory
    - exports will lose its reference to module.exports and get its own spot in memory if assigned to
    - mutate: to change something, for example adding a method or property to an object means you've mutated the object
    - if exports is mutated instead of assigned to then the memory reference to module.exports will not be lost and both will be updated
    - just use module.exports, forget exports exists to relieve cognitive load with the above JS memory quark

12. Requiring Native (Core) Modules
    - require function checks if module path parameter is a native module and if so loads that native module
    - core Node modules available are documented on the Node website in the API docs
    - example import: var util = require('util');
    - notice no './' was included in the above path signafying to require it is not a local path

13. Modules and ES6
    - ES6 adds export and import keyword features
    - export function () { ... }; // in module.js
    - import * as abc from 'abc'; // in app.js
    - V8 engine itself is supporting these module concepts and features in ES6

14. Web Server Checklist
    - module utilities module.exports and require check off the need for better ways of organizing code into reusable pieces

Events and the Event Emitter
----------------------------

1. Events
    - event: something that has happened in our app that we can respond to
    - in Node we talk about 2 different kinds of events
    - one type of events are system events which happen in the C++ Node core with help from libuv (events like finishing reading files, finished receiving data over the internet, etc.)
    - second type of events are custom events which live in the JavaScript core and is the Event Emitter inside the core
    - libuv generally creates a custom event through the event emitter, as many C++ features are wrapped in JS
    - there is no event object in JS, Node event emitter helps add needed functionality for events

2. Object Properties, First Class Functions, and Arrays
    - can set a variable equal to a string and use variable to access an object property i.e. obj[prop] where prop is a string var
    - arrays in JS can be collections of anything including functions (first class citizens)
    - array.forEach is used to iterate over elements and apply a function that takes each element as the parameter

3. The Node Event Emitter - Part 1
    - event listener: the code that responds to an event, in JS case listener is a function
    - can have many different event listeners for one or more events
    - on: register a function (event listener) for later firing (on emit) when an event occurs
    - emit: say that something happened, fire the appropriate event listeners
    - sample event emitter and app in emitter directory in src

4. The Node Event Emitter - Part 2
    - refer to Node website for API documentation on the Node EventEmitter in the native events module
    - Node EventEmitter also supports methods on and emit (custom event emitter protocol is a subset of the Node event emitter)
    - magic string: a string that has special meaning in our code (can elad to bugs when typos occur and is hard to track down)
    - make sure to limit use of magic strings like when using on and emit with the event emitter
    - see emitter directory in src for example module config of event types (config.js) that helps limit magic string use

5. Object.create and Prototypes
    - every object points to a prototype object it can look properties up on (and so on down the chain, prototype objects are still objects too)
    - Object.create is a simple clean fast way to set up inheritance by setting the prototype object when newly created

6. Inheriting From the Event Emitter - Part 1
    - Node creates a brand new prototype object when an object wants to inherit from another object
    - an object's new prototpye contains the desired object to set up inheritance, this is done with the util.inherits helper function
    - combining functionality of various objects is common throught out the Node JS JavaScript core (accomplished with util.inherits)
    - many objects built into Node are a type of Event Emitter i.e. they respond to the EventEmitter protocol by inheritance as above

7. Node, ES6, and Template Literals
    - new version of JavaScript is called ECMAScript 2015 or ES6 for short, new standard includes new features
    - latest version of V8 JS engine supports some ES6 features, and latest versions of Node embed these V8 engines
    - to allow ES6 features to be available in the browser check out babeljs.io which transpiles ES6 syntax to valid older syntax (not native support like in newest V8 engines)
    - template literal: a way to concatenate strings in JavaScript, specifically ES6, easier to work with than a bunch of strings with +

8. Inheriting From the Event Emitter - Part 2
    - can extend the this object by using .call on the super constructor passing along the current constructor this object i.e. EventEmitter.call(this)
    - can make super like calls in constructors by using .call on the super constructor as described above passing along the current this (new object being created)

9. ES6 Classes
    - ES6 classes are basically just syntactic sugar, shorter syntax but no changes under the hood, can be dangerous
    - syntactic sugar: a feature that only changes how you type something, but nothing changes under the hood
    - be wary when using the class syntactic sugar syntax, may confuse devs as JS uses prototypal inheritance and isn't classical OO

10. Inheriting From the Event Emitter - Part 3
    - see the Greetr.js module in emitter directory of src for example ES6 class module which extends Node's native EventEmitter

Asynchronous Code, libuv, The Event Loop, Streams, Files, and more...
---------------------------------------------------------------------

1. JavaScript is Synchronous
    - asynchronous: more than one process is running simultaneously
    - Node does things asynchronously, V8 does not
    - synchronous: one process executing at a time, only one line of code executes at a time, never two or more
    - JavaScript is synchronous, Node is asynchronous

2. Callbacks
    - callback: a function passed to another function to be invoked at some point
    - the function receiving the callback nvokeds the function when it is done with its work essentially 'calling back'

3. libuv, The Event Loop, and Non-Blocking Asynchronous Execution
    - libuv is a C slibrary that helps manage events related to the operating system and closer to the machine, it is embedded in Node
    - there is a queue of completed events inside libuv running alongside V8
    - there also exists an event loop in libuv that constantly checks the queue of completed events
    - operating system places completed events in libuv's queue
    - libuv processes completed events and fires any necessary callbacks inside V8 (running JavaScript code)
    - things hapen in both libuv and V8 at the same time inside Node making Node asynchronous
    - the above architecture gives way to event driven non-blocking I/O in V8 JavaScript
    - non-blocking: doing other things without stopping your program from running, made possible by asychronocity
    - visit libuv.com for source and docs on the library

4. Streams and Buffers
    - buffer: temporary holding spot for data being moved from one place to another, intentionally limited in size
    - data is moved through a buffer via a stream, like processing files line by line, one line in the buffer at a time, consumed from the file stream
    - stream: a sequence of data made available over time, pieces of data that eventually combine into a whole
    - streams (coupled with buffers) help us process data as we load it and not get stuck waiting for the entire piece of data to load

5. Binary Data, Character Sets, and Encodings
    - binary data: data stored in binary, sets of zeros and ones, core of the math computers are based on, each 1 or 0 is called a bit or binary digit
    - binary is base 2, only needs 2 digits to represent numbers which is easy for computers to work with (physically i.e. transistor switches)
    - character set: a representation of characters as numbers, each character gets a number, examples include Unicode and ASCII
    - need more bits to represent a larger set of characters (chinese characters, greek, emoji, etc.)
    - character encoding: how characters are stored in binary, numbers in the character set or code points are converted and stored in binary
    - encoding is about how many bits used to represent a number, utf-8 encoding uses 8 bits and is popular for international usage
    - Node expands V8 to help us deal with binary data more easily

6. Buffers
    - Node has a Buffer module that is a wrapper around a buffer in the C++ core
    - can store strings in buffers as binary data (as 0s and 1s) with a particular encoding (utf-8, base64 - web security, etc.)
    - most of the time you work with buffers that are returned from other feeatures within Node
    - see bufferApp.js in the src/jsconcepts directory for some example Buffer usage

7. ES6 Typed Arrays
    - byte: 8 bits (8 0s and 1s), max number representation is 255
    - V8 engine has native ArrayBuffer constructor available, each element is 1 byte i.e. 8 element ArrayBuffer stores 64 bits of data
    - can create views with ArrayBuffers like Int32Array
    - see bufferApp.js in the src/jsconcepts directory for some example Buffer usage

8. JS Callbacks
    - a callback is a function passed to another function which we assume will be invoked at some point
    - the receiving function 'calls back' by invoking the passed function you give it when its done doing its work
    - can pass data to callback functions for it to use internally
    - see callbackApp.js in the src/jsconcepts directory for examples

9. Files and fs
    - the fs native Node module is a good utility for eorking with files
    - read files with readFileSync(path/to/file, encoding), default encoding = utf-8
    - readFileSync loads the contents into a biffer and then uses the encoding to read proper characters from binary data
    - __dirname is a global var available in Node modules and is a helpful shortcut for working with file paths
    - most of the time you don't want to read files synchronously, don't want to hold requests up, use asynchronous calls whenever possible
    - use fs.readFile to load files asynchronously, it takes a filepath and a callback function to be invoked whent he file has completed loading
    - error-first callback: a callback that takes an error object as its first parameter, object is null if no error, else contain an object defining the error
    - error-first callback is a standard Node pattern, so we know what order to place parameters in when working with callbacks in Node
    - see example usage in the fileApp.js module in src/fs directory

10. Streams
    - a stream is just a sequence of chunks of data
    - Chunk: a piece of data beign sent through a stream, data is plit in 'chunks' and streamed
    - Node provides a variety of streams avaiable through the native stream module
    - Stream is an ABC and Node has custom Streams like Readable that inherits from Stream which inherits from EventEmitter
    - Abstract base class: a type of constructor you never work directly with but inherit from, create custom objects that inherit from ABCs
    - you can use fs.createReadStream(filePath, options) to create a Stream that reads a file, can use the .on EventEmitter protocol to respond to chunks loading
    - fs.createWriteStream creates a file stream you can asynchronously write to
    - see example usage in the streamApp.js module in src/fs directory

11. Pipes
    - Pipe: connecting two streams by writing to one stream what is being read from another
    - in Node you pipe from a Readable stream to a Writable stream
    - pipes can be chained and connected sending chunks to various different writable streams, as long as you first start with a readable stream tht is producing the chunks
    - Node has native zlib module to handle file compression and common file compression algorithms
    - Method chaining: a method returns an object so we can keep calling more methods, sometimes it returns the parent object (the original object, called cascading) and sometimes some other object
    - Node pipes support the notion of chaining
    - pipes help keep the web server responsive and more efficient with resources
    - prefer to use pipes whenever possible in real world applications
 
14. Web Server Checklist
    - fs utility helps us efficiently deal with writing and reading files and binary data using pipes and streams asynchronously
    - Node has a lot of utility functions and modules built in that support doing work asynchronously to help us deal with work that takes a long time in a more efficient manner

HTTP and being a Web Server
---------------------------

1. TCP/IP
    - 


