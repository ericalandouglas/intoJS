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
- JS is loosely typed so never type casts, lineage of an object doesn't matter
- what matters about an object is what it can do, not what it descended from
- JS is a prototypal language, objects inherit directly from other objects
- When function object is created function constructor runs code like: this.prototype = {constructor: this}; the returned function object has a new property prototype which is the new function object
- The prototype object is the place where inherited traits are deposited
- Every function gets a prototype object because JS can't determine which functions are to be used as constructors
- Forgetting to call new on a function meant to be constructor (denoted with as a title - initial capital i.e. new Dog();) will bind the global object to this which will then be augmented with any properties this has set in the function
- It can be wise to avoid using the new keyword at all, JS isn't constrained to classical class inheritance/hierarchies because of its loose typing, JS has multiple (better) options
- Pass along objects to makers to safely specify params without worrying about order i.e. func({xs: [1,2,3], isEmpty: false});
- When passing along objects as function parameters we get added support for JSON objects and data when the JSON object is used as input
- In purely prototypal inheritance pattern classes are dispensed with, new objects inherit properties driectly from old objects
- Prototypyal inheritance patterns thus far have not offered privacyy of variables and functions, functional inheritance can help by incorporating the module pattern
- The functional pattern uses functions that create and return new objects (so the functions begin witha  lower case and don't require the use of the new keyword)
- The functions contain 4 steps: 1. create a new object (multiple ways to do so) 2. Optionally defines private members of the function using var 3. Augments object with new methods that enjoy privileged access to the private vars defined 4. Return the new object
- It is beneficial to declare all functions as var even when assigned as a public method i.e. var sayHi = function () {...}; obj.sayHi = sayHi;
- When private or public functions use other functions in this context it is safe to use the variable function instead of an object property to eb sure tampering with public properties does not break the functionality of other methods (because they use the protected var functions)
- Objects created in the functional pattern that do not have functions acting on this or that are durable
- Durable: An object that is just a colledction of functions that serve as capabilities
- In the parts pattern functions are created that when called with an object as input augment the object with extra methods for event processing, etc.
- JS loosing typing gives benefit of not worrying about class lineages and instead focuses on the character of the parts (the object's contents)

Arrays
------
- Classical Array: linear allocation of memory, elements accessed by integers that are used to compute offsets in memory, can be fast
- JS Array: object with array-like properties, converts array subscripts into strings that are used as properties i.e. 1 = > array['1'], slower then classical array but can be more convenient
- Retrieving and updating array properties works the same as any other JS object, special support for integer property names, many useful built-in methods
- literal format available i.e. var xs = [1, 2, 3]; and inherit from Array.prototype where as an objetc dfeined like an array has less coapabilities inherenting from Object.prototype (no length property, etc.)
- Elements in a JS array can be a iax of type i.e. va xs = ["apple", 1, {name: "cat"}]; is a valid array expression
- length property is equal to the lsrgest integer property for an array plus 1 i.e. var as = []; as[1000] = 1; as.length; // length is 1001, as has 1 integer property, 1000
- the [] postfix subscript operator converts its expression to a string using toString, string is used as property name
- a string looking like a postive integer greating then or equal to current length property will set legnth to the new subscript + 1
- length can be explicitly modified, increasing the legnth's value does not allocate more space, decreasing size below the current property count deletes properties with a subscript greater then or equal to the new length
- splice and delete are available to remove elements from the array with splice replacing the indexs it removes, delete leaves the index blank
- avoid using for...in enumeration on arrays as order of properties is not guaranteed, use the conventional for (i=0; i<array.length; i++) {} C like enumeration
- when property names are small sequential integers use an array, otherwise use an object
- JS typeof function reports type 'object' for array values, use helper method to make better distinctions between objects and arrays
- set of methods provided that act on arrays live in Array.prototype, like Object.prototype it can be augmented
- adding a property like 'total' to an array is not an integer property and so does not modify the array object's length property
- it is not useful to constrcut arrays with the Object.create method as the array object will inherit from Object.prototype and not Array.prototype missing properties such as length
- JS arrays do not prefill array indices with elements, accessing uninitialized elements will return undefined, use helper method to initialize array and its elements appropriately
- JS supports matrix's and multi indexes i.e. xs[2][1], provide a matrix method (including identityMatrix) to Array for easy matrix construction

Regular Expressions
-------------------
- JS borrowed syntax from Java, functions from Scheme, prototypal inheritance from Self, and regular expressions from Perl
- regular expression: the specification of teh syntax of a simple language, used with methods to search, replace and extract info from strings
- Methods with regex support include: regexp.exec, regexp.test, string.match, string.replace, string.search, string.split
- Regex in JS can have significant performance advantage over other equivalent string operations
- JS regular expressions do not allow comments or white space
- parsed url regex = /^(?:([A-Za-z]+):)?(\/{0,3})([0-9.\-A-Za-z]+)(?::(\d+))?(?:\/([^?#]*))?(?:\?([^#]*))?(?:#(.*))?$/
- ^ indicates the beginning of a string, prevents exec from skipping over a non URL-like prefix
- (?:([A-Za-z]+):)? - (?:...) is a noncapturing group 1, the scheme, must be followed by a :, ending ? means match is optional and means repeat 0 or 1 time
- A capturing group copies text it matches and places it into the results array, first capturing group is 1 so it lives in results[1], full string being matched lives in results[0]
- [...] indicates a character class, characters A-Za-z contain the 26 upper and lower case letters of the alphabet, hyphens indicate ranges, + means character class can be matched 1 or more times
- [A-Za-z]+ means 1 or more characters of the upper and lower case alphabet letters
- the ending colon is matched literally, (?:([A-Za-z]+):)
- (\/{0,3}) is capturing group 2, the slash field, \/ indicates a slash, / should be matched, \, backslash is the escape character, {0,3} means match / 0-3 times
- ([0-9.\-A-Za-z]+) is caputring group 3, the host (results[3]), [0-9.\-A-Za-z]+ character class matches any upper lower case alphabet letter, digit, . and -, \- was used to escape -, matches 1 or more times ([...]+)
- (?::(\d+))? is capturing group 4, optional (terminating ?) port number match, :(\d+) noncapturing group means : followed by 1 or more digits, \d denotes any digit
- (?:\/([^?#]*))? is capturing group 5, optional path match, \/([^?#]*) noncapturing group begins with / (\/), has character class [^?#] which matches all characters except ? and #, and is repeated zero or more times (ending *, [...]*)
- (?:\?([^#]*))? is capturing group 6, optional query match, \?([^#]*) uses character class to match zero or more characters where the character is not #, ? precedes the characters (\?)
- (?:#(.*))? is the final and 7th capturing group, optional hash match, #(.*) noncaputring group begins with # followed by zero or more of any character except line end (\n), . matches all characters except new line
- $ represents the end of hte string, assures us there is no extra material at the end of the url
- it is better to use more short and simple regular expressions as complexitly can explode rapidly as longer regex is used, harder to modify
- regular expressions that are complicated or convulted can have portability problems, ested regular expressions can suffer horrible performance, simplicity is best strategy
- the test method on regex objects can verify if a string conforms to the regex pattern defined, if it returns false it does not report on where the mimsmatching occurred
- regex to parse numbers = /^-?\d+(?:\.\d*)?(?:e[+\-]?\d+)?$/i
- /^ $/i like the url matcher uses ^ and $ to anchor the string, all characters in the text are matched to teh regular expression, with the anchors the pattern tells us if a string contains only a number, ^ without $ matches string starting with a number, including only $ at the end matches strings ending in a number, i flag causes case to be ignored when matching characters (e or E)
- conversily instead of using i we could also have done [Ee] or (?:E|e) because e is the only character in number strings
- optional minus sign = -?, one or more digits = /d+, optional . followed by zero or more digits = (?:\.\d*)?, optional exponent e (optionla + or -) followed by one or more digit = (?:e[+\-]?\d+)?
- preferred way to create regex objects is with literal notation i.e. /.../[gim], (optionsl g, i, m flags)
- g flag is global, match multiple times (precise meaning varies by method), i flag is insensitive, ignore character case, m flag is multiline, ^ and $ can matchline-ending characters
- regex objects can also be created using the RegExp constructor i.e. RegExp("\"(?:\\\\.|[^\\\\\\\"])*\"", 'g') to match any string "...", \\\ = '\', first input is regex pattern, second are any regex flags
- regexp object properties: global (true if g was flagged), ignoreCase (true if i was flagged), multiLine (true if m was flagged), lastIndex (index at which to start next exec match, initially 0), source (source text of the regular expression)
- RegExp objects made by regular expression literals share one instance i.e. function makeRegex (foo) {return /a/gi;} x = makeRegex(); y = makeRegex(); x.lastIndex = 10, now y.lastIndex = 10, x === y
- regexp choice contains one or more regexp sequences, sequences are seperated by |, choice matches if any of the sequences match, attempts to match each sequence in order i.e. "into".match(/in|int/) matches with in, not int
- regexp sequences contain one or more regexp factors, factors can be followed by a quantifier (*, +) that determines how many times the factor can appear, if no quantifier is specified factor is matched once
- a regexp factor is a character, a paranthesized group, a character class, or escape sequence, all characters are literal except for /, \, [, ], {, }, (, ), ?, +, *, |, ., ^, $, must be escaped, \ to be used literally, \ prefix does nit make letters or digits literal
- unescaped . matches all characters except a line-ending character, unescaped ^ matches beginning of textwhen lastIndex = 0, can match line ending chracaters when m flag is specified, unescaped $ matches end of text, also match line ending characters when m is flagged
- backslash character \ indicates a regexp escape sequence, \f is formfeed character, \n is new-line, \r is carriage return, \t is tab, \u is used to specify unicode character as 16 bit hex constant
- \d is same as [0-9] matching digits, \D is opposite as [^0-9], matching non digits, \s is white space scharacters, \S is non white space characters, \w is same as [0-9A-Z_a-z] matching words while \W matches non words, it is best to specify own regexp class to match specific characters of interest as \w is very general
- JS regular expressions provide poor support for internationilzation (very slow when using huge sets of characters in character classes i.e. all unicode)
- \1 references first text captured by group 1 in matching i.e. var doubleWords = /([A-Z_a-z)+]\s+\1/gi; matches words like "cats cats", \2 can reference group 2 matched, \3 is the 3rd group, etc.
- 4 kinds of regex groups:
1. capturing - (), regex choice wrapped in parantheses, characters matching group are captured, first capturing group is numbered 1
2. noncapturing - ?:(), has ?: prefix, simply matches and is not captured, does not interrupt numbering of capture groups
3. positive lookahead - ?=(), has ?= prefix, like noncapturing but text is rewound to start of group on match, a bad part of JS
4. negative lookahead - ?!(), has ?! prefix, matches when positive lookahead group fails a match (inverse), also not a good part of JS

