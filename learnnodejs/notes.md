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
    - 2 protocols that are the backbone of the internet
    - Protocol: a set of rules two sides agree on to use when communicating
    - both client and server are programmed to understand and use these particular sets of rules (like 2 people from different countries agreeing on a language to converse with)
    - server performs (responds with) services, client asks (requests) for them
    - each computer has a unique IP (internet protocol) address, IP tells us where to send data
    - a web browser connects to a web server using a socket
    - various protocols can be used between client and server for structuring data i.e. http, ftp, smtp (text, file, mail)
    - TCP: transmission control protocol is responsible for defining the set of rules on how the information is sent (regardless of structure) from server to client
    - TCP splits info into pieces and sends them as packets over the open socket from server to client
    - TCP acts like a stream because it continually pushes packets along the socket connection, Node ingests packets like a stream then
    - sockets are constantly open and closed on the web, newer ideas keep web socket connections open for prolonged periods of time

2. Addresses and Ports
    - Port: once a computer receives a packet, how it knows what program to send it to
    - programs are set up on a machine to receive packets from a particular port, program is 'listening' to that port
    - browser makes a request at a particular server (particular IP address), Node JS is assigned a unique port number to receive info sent in request using server IP and Node port (like 443)
    - socket address is an IP address and port together, usually use a domain name instead of an IP/Port combo (socket address)

3. HTTP
    - HTTP: A set of rules (and format) for data being transferred on the web, hypertext transfer protocol
    - http is a format defining dagta being transferred via tcp/ip (html, JS files, images, etc.), protocol of the web
    - client makes http requests at web servers, request can have headers which are just name value pairs for things like connection length, host, etc.
    - web server response is in HTTP format, response has status code, headers for content properties (like type), and a body (like html or a JS file)
    - http response header content type is a MIME type, browser acts on the response according to its MIME type for proper interpretation
    - MIME type: a standard for specifiying the type of data being sent, multipurpose internet mail extensions (application/json, text/html, image/jpeg)

4. http_parser
    - a C program embedded in Node for parsing client requests and server responses using the HTTP protocol (parses headers, status, body, etc.)
    - Node has native http and https native modules for handling http(s) request and responses
    - Node _http_server.js module (used in http/https modules) wraps the C http_parser program, builds proper request and response formats
    - http module can create an http server using a request listener to accept reqeusts and generate responses, Node has proper pieces for building a web server

5. Build a Web Server in Node
    - http.createServer accepts one callback parameter that acts as an event listener
    - the event listener passes a request and response to the callback parameter function when the emittance of either a request or response happens, allows for streaming response back
    - see httpApp.js in src/webserver for how to build a simple HTTP response in Node and have the node web server listen to a specific port
    - the request and response objects passed to the callback can be examined and offer utilities so the web server can properly receive and respond

6. Outputting HTML and Templates
    - use the fs native Node module to read server side html files and send them to clients' browsers
    - to pick up on Node server code changes you must stop and restart the Node server app
    - use MIME type 'text/html' to have browser properly render html, 'text/plain' just spits out raw html when used
    - Template: text designed to be the basis for final text or content after being processed i.e. <h1>{Message}</h1> => {Message} is a template to be replaced with some final text
    - templating usually involves the of use some specific template language so templating system knows how to replace placeholders with real values
    - see httpApp.js in src/webserver for html/templating example response
    - html templates allow you to build content dynamically on the server and send final result to client as response
    - Node JS core does not include a native templating engine

7. Streams and Performance
    - synchronous processing is a non option when the server expects many requests and wants to process large amounts of data (like files)
    - viable option here is asynchronous streaming of responses to clients for best performance
    - send chunks of data instead of all of it at one time to limit buffer sizes and memory usage of Node server
    - use streams wherever possible in Node unless you have good reason not to
    - see httpApp.js in src/webserver for file streaming example response

8. APIs and Endpoints
    - API: A set of tools for building a software application, stands for application programming interface
    - Web APIs usually make these tools available via a set of URLs which accept and send only data via HTTP and IP/TCP protocols
    - Endpoint: one URL in a web API, sometimes the endpoint does multiple things based on the HTTP request headers
    - most popular data format used with endpoints and web APIs is JSON

9. Outputting JSON
    - use the native JSON object available to V8 engine for processing and handling JSON data in web server responses and requests
    - Node makes it very easy to serialize objects into JSON string and generate appropriate JSON responses for clients
    - Serialize: translating an object into a format that can be stored or transferred
    - JSON.stringify is a serialization method to aid in sending web server JSON responses
    - popular serialization formats include JSON, CSV, XML
    - 'deserialize' is the opposite (converting format back into JS object)
    - can deserialize JSON strings in requests from client to load proper JS objects in Node server, objects can aid in generating appropriate responses
    - see httpApp.js in src/webserver for JSON example response

10. Routing
    - Routing: mapping HTTP requests to content, whether actual files exist on the server, or not
    - server examines request URL and acts accordingly to what it received, chooses content to serve based on URL
    - routing can get complicated i.e. fetching various items from a database table by id, each item has its own url => /items/{:id}
    - see httpApp.js in src/webserver for routing via URL examination examples 

11. Web Server Checklist
    - already seen how to handle modules (require, module.exports), handling files (fs module), handle tasks that are long running (async, callbacks, streams, pipes)
    - now we know we have the ability to communicate over the internet, Node under the hood supports protocols IP, TCP, HTTP
    - Node allows us to accept requests and send responses in the standard format with its native modules http and https

NPM: The Node Package Manager
-----------------------------

1. Packages and Package Managers
    - Package: simply code, various packages (code) is managed and maintained with a package management system
    - Package management system: software that automates installing and updating packages, deals with what versions are needed and manages dependencies
    - Dependency: Code (package) that another set of code depends on to function, when you use a package in your app it becomes a dependency

2. Semantic Versioning (semver)
    - Versioning: specifying what version of a set of code (package/app) this is
    - versioning allows others can track if a new version has come out, can watch for new features or for 'breaking changes'
    - semantic imlplies that something conveys meaning
    - versioning format is major.minor.patch i.e. 1.5.2
    - patch increment entails that bug fixes were made and code should still be funcitoning properly
    - minor increment entails that some features were added but all existing code should still work fine (no breaking changes)
    - major increment entails that big changes were made and there may be some breaking changes introduced, should document major changes
    - more information and some history are available at semver.org, semver is very prominent in Node

3. npm and the npm registry: Other People's Code
    - npm can refer to two things: 1. the package registry holding Node packages, or the program run to install and maintain packages
    - see npmjs.com for more info on npm and available packages, there are many pacakges available (like getting more info on express)
    - normal installation of packages: npm install <package>
    - be sure to reference a packages activity, popularity, source code, documentation, etc. to gauge how effective a package may be for your own work

4. init, nodemon, and package.js
    - to initiate a node npm app use the npm init command at the root of the app's directory, this creates the package.json file
    - use the command npm install <package> --save to update the dependency field in the package.json file
    - npm install <package> creates a node_modules directory where all your app's dependencies are placed
    - the ^ character at the beginning of dependency versions tells npm to automatically install new minor updates and patches, ignoring major updates
    - use the ~ to tell npm to only automatically install patches, ignoring minor and major updates
    - use npm install to easily install all dependencies listed in package.json, issue command in directory where package.json lives
    - require can look into the newly created node_modules directory when used in your own modules
    - use command npm install <package> --save-dev to save an npm package to package.json as a dev dependency (like modules that help with testing, profiling, etc.) and not as a required dependency your app needs to run
    - --save-dev option will create a devDependencies field in the package.json file
    - servers can ignore installing dev dependencies this way only grabbing dependencies necessary for app to function
    - to install npm packages globally use -g flag i.e. npm install -g <package>
    - installed npm packages have their own node_modules folder which are that packages dependecies, this helps keep packages self contained even if the chain of node_modules directories gets beefy
    - use npm update to update your app's dependencies as specified in package.json
    - nodemon helps your app automatically pick up on changes and restart itself helping streamline development
    - nodemon has its own cli tool you use to execute node modules that automatically restart when needed

5. Using Other People's Code
    - anyone can push code into npm so be sure the packages you choose will reliably work for you
    - don't be afraid to dig into other's source code, its all just other's JS code
    - be judicious when choosing, test well, stick to semversioning, and npm and registry will be of great benefit

Express
-------

1. Installing Express, Making it Easier to Build a Web Server
    - npm makes installing express very easy i.e. npm install express
    - the express module exports a function that create an express application when invoked
    - the returned application is a function with many helpful properties for dealing with web server tasks
    - Environment variables: global variables specific to the environment (server) the code is living in
    - different servers can have different variable settings, we can access the values in code
    - access environment variables in node through the process.env object
    - HTTP method: specifies the type of action the request wishes to make, usually one of GET, POST, PUT, DELETE (called verbs)
    - submitting data like in a form is usually a POST request, grabbing data like an html template is usually a GET request
    - same URL like index '/' can support multiple actions/verbs i.e. GET and POST
    - express response objects are smart enough to look at the content being sent and make the appropriate headers (auto detects html, etc.)
    - use the .json method of express response object to send literal JS objects as a properly formatted JSON repsponse
    - see index.js in src/expressapp for an example app

2. Routes
    - see expressjs.com for detailed documentation about express including what is available to help with routing and url matching
    - use : in express url string to signify variable i.e. '/people/:id' => id is a variable and can be anything
    - use the request object's params property to access variables like id above when generating a response
    - see index.js in src/expressapp for examples of using routing with an express app

3. Static Files and Middleware
    - Middleware: code that sits between two layers of software, like in the case of express, code working between the request and response
    - Static: not dynamic, fixed content that never changes once incepted, no code processing done, HTML, CSS, and images are examples of static files
    - you can use middleware provided by Node or custom made yourself, coupled with any amount of other middleware when handling one, many, or all requests
    - custom middleware packages exist to help with things like auth (passport), or cookies (cookie-parser) - little piece of info sitting in browser
    - see index.js in src/expressapp for middleware examples

4. Templates and Template Engines
    - express allows you to plug in any template engine you can download from npm (like jade) using the app.set('view engine', '<TEMPLATE ENGINE PACKAGE>') method for dynamic html generation
    - see documentation at expressjs.com for more info about template engines and how to use them with express
    - template engine used in these examples is EJS, see ejs.co for more info on how to use this engine
    - simply load html views in a views directory with the res.render method once Node has set a view engine
    - res.render can accept an object of key, value pairs that will store variables which can be used in the EJS templating logic in your view files
    - some templating engines support the notion of layouts which help combine different views and templates for reuse
    - see the expressapp directory for sample views and example EJS usage

5. Querystring and Post Parameters
    - example query string data GET: /?id=4&page=3 HTTP/1.1, Host: www.learnwebdev.net, Cookie: username=abc;name=Tony
    - example query string data POST: HTTP/1.1, Host: www.learnwebdev.net, Content-Type: application/x-www-orm-urlencoded, Cookie: num=4;page=2, username=Tony&password=pwd
    - can also send JSON data from the browser to the server with tools like jQuery
    - use req.query object in express to retrieve query strings parameters
    - express doesn't have a way to parse the body of a request natively, use thrid party middleware like body-parser
    - you can pass the middleware, like a url encoded parser to app.post method to be performed before handling the request and generating your response
    - body-parser also offers utilites for parsing JSON from a request and making it available in the req.body
    - see index.js and index.ejs template in src/expressapp for query string and post examples

6. RESTful APIs and JSON
    - REST: an architectural style for building APIs, stands for 'representational state transfer', HTTP verbs and URLs mean somethings
    - help developers using your API reason about what certain URLs do and what services are offered/performed with the coupling of url name and http verb (put, post, get, delete)
    - see index.js and apiController.js in controllers directory for some REST API examples, express make developing RESTful APIs straight forward

7. Structuring an App
    - express is an unopiniated minimalistic framework so we can choose to use npm packages that help us structure express apps certain ways
    - example npm package used here for app structure is express-generator (globally installed)
    - express-generator attaches routing middleware with its own local modules to handle different routes (users, routes)
    - to forward paths to be used as middleware use routers and then the local module router can be passed to app.use with some route
    - seperate code into modules and use express and Node features to help keep apps strucuted and easy to navigate, there are many ways to do so, be pragmatic
    - see index.js and controllers directory for modularizing routes example, see generatedApp directory for example express-generator app

JavaScript, JSON, and Databases
-------------------------------

1. Relational Databases and SQL
    - relational implies tables with columns/fields and rows of data
    - relational databases use schemas to not repeat ourselves, use ids to link tables and data
    - normalized data is data that doesn't repeat itself, structure data to save space and be able to ask interesting questions with SQL
    - think of a table as an array in JavaScript and each element is an object representing a row in the relational table

2. Node and MySQL
    - npm has many packages that offer support to work with mysql databases
    - for these examples using mysql npm package, currently the most popular
    - mysql connection queries return database rows as JavaScript objects with key-value fields for each column in the table queried

3. NoSQL and Documents
    - NoSQL: a variety of technologies that are alternatives to tables and SQL
    - one type of NoSQL database/store is a document database, MongoDB being one of them
    - a document is basically a record of an array of Javascript objects, while reptitive the memory issues are less of a concern in modern day
    - MongoDB makes it easy to store JSON and change certain records on the fly, makes updates cheap

4. MongoDB and Mongoose
    - visit mongodb.com for more info on MongoDB and installation help
    - can use mongolab to help host mongodb databases in the cloud, has a web portal for viewing documents in the database as well as query
    - mongoose is an npm package that helps interface with a MonogDB database
    - it is required to define a schema in mongoose for the certain types of records you want to use, and then a mongoose model
    - when working with NoSQL documents the data may not be uniform and be changed on the fly, still fairly easily to graba nd work with data in documents
    - see index.js in src/expressApp directory for example of using mongoose (potentially as middleware)

5. Web Server Checklist
    - we have now seen Node communicate with web servers completing all items on the checklist
    - Node is a reliable and robust http/https web server

The MEAN Stack
--------------

1. MongoDB, Express, AngularJS, NodeJS
    - Stack (tech stack): the combination of all thechnologies used to build a piece of software
    - technologies in the stack include your database system, server side code, client side code, everything else
    - MongoDB stores data in documents that look like JSON and JS object literal notation
    - Express is the JS framework that makes things like routing, writing APIs, and wokring with HTTP easier
    - AngularJS is a JS framework for managing code and UI in the browser, removing a lot of manual work
    - NodeJS is JS on the server, handles HTTP requests and responses, including lots more
    - all these technoliges incorporate JavaScript/JSON data, popular combination

2. AngularJS: Managing the Client
    - browsers are written in C++, in general these have JavaScript engines embedded in them, and give access to additonal features
    - DOM: structure browers use to store and manage web pages, stands for 'Document Object Model', browsers allow JS to manipulate the DOM
    - DOM doesn't live in JS, it lives in the browsers, when JS changes the DOM as enabled by the broswer's engine the engine rerenders the DOM
    - HTML and the DOM is structured in a tree like fashion, JS can add, change, remove elements as needed and the engine updates the DOM
    - you have to make sure JS code you write can be properly converted in all browsers, as each may have a unique engine with its own features
    - frameworks like AngularJS help us structure code to manipulate the DOM while avoiding cross browser problems
    - Angular is usually Angular 1, Angular 2 is still fairly new
    - see the angularApp directory for a sample Angular app
    - you can use angular in your views with a simple script link fetched from angularjs.org, the browser engine fetches the Angular source for you to use in these views
    - you pass Angular controllers and bind them to various HTML elements to use their values and functionality in the DOM

3. Angular, Angular 2, React, and more...
    - angular and react are front end frameworks and run code on the client side browser to manipulate the DOM
    - all these front end frameworks are just JS, still all just JS running on the client's browser
    - free to choose any framework as long as it is in JS, react, angular, ember, no framework, etc.

4. Working with The Full Stack
    - Full Stack Developer: a developer who knows all the pieces of a software stack, can build software (web apps) by themselves
    - it is important to understand how data flows from the server (Node engine) to the client's browser (perhaps getting processed by JS on client side)

Build an App
------------

1. NodeTodo: Software Requirements
    - the app will be a to do list, a CRUD app that can serve as an example for some of the core things web apps do
    - a user should be able to add, edit, and delete to do lists
    - each to do list should be able to be marked as complete
    - each to do list can have one optional file attachment
    - one person can not access the to do lists of another person (authentication)
    - we should be willing to explore the npm ecosystem for packages they will help us meet our needs as defined above to help streamline development

2. Initial Setup
    - start with npm init in an empty directory to begin
    - we will grab the express package to help build routes quickly, and the ejs package to help with templating
    - we will use the package body-parser to help submit JSON data
    - we will use the mongoose npm package to easily interact with mongodb

3. Setting up Mongo and Mongoose
    - we will use mlab to host a free instance of mongo for us in the cloud
    - mongoose will help us define our schema and interact with this mongo database and perform CRUD operations
    - we will use a config directory to help store things like the mongo connection url and help us cahnge between dev, prod, etc. envs
    - you should never store usernames and passwords as plain text in these config files for security reasons
    - we will place the db connection in the app.js file but this could be done somewhere else
    - mongo connections stay open once you instantiate them as they are single connections

4. Adding Seed Data
    - Seed: add initial data to a database (seed a database)
    - seeding the database with dummy data makes it easy to rapidly develop (schemas, local envs, etc) 
    - there are tools available to help generate initial fake data, especially when you want to generate a lot of data
    - one helpful tool for creating seed data is http://beta.json-generator.com
    - it is helpful to build a setup controller for your express app and create RESTful resources to seed databases, etc
    - can add checks when running the seed db route to make sure you don't seed twice, pass an env var etc.

5. Creating our API
    - we will use the body-parser package to add help json and url encoding middleware to our api routes
    - we will provide the usual CRUD routes for our todo lists

6. Testing our API
    - dev dependencies and regular dependencies both get installed to the node_modules directory
    - we will use the chrome postman app to help us test and develop on our API
    - our post route looks at the request body property to find data about the todo post
    - the delete route expects an id found on the body property for the request
    - when sending JSON data in postman it automatically adds the content-type header property for us
    - we have built a web API not a web app, were free to choose web, mobile, IoT, etc. apps which access our data via the API we created
    - 



