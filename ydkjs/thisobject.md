this & Object Prototypes
========================

Chapter 1: this or That?
------------------------
- this keyword: special identifier automatically defined in the scope of every
- this can be used with call to pass object contexts along a chain of function calls without having to create a function for each unique object
- this is not an identifier to the function enclosing this, named functions can use their naem inside their body (for recursion, etc.)
- do not use arguments.callee to refer to the function object (deprecated), avoid anonymous functions for functions that need a self reference
- this does not have any link to the internal "scope" object, no bridge between lexical scope look-ups and the this keyword
- this is a run-time binding and is contexual based on the conditions of the function's invocation
- when a function is invoked an execution context is created containing info about where function was called from, how the function was invoked, params passed, including the this reference

Chapter 2: this All Makes Sense Now
-----------------------------------
- call site: location in code where a function is called (not declared)
- call site of interest is in the invocation before the currently executing function
- default binding (normal stand alone function execution) points this at the global object
- default binding occurs when a function call is a plain, undecorated reference
- strict mode does not allow the this keyword to bind to the global object on default binding rule, don't mix strict and unstrict code in the same module
- implicit binding rules apply when the call site has a context object aka an owning/containing object
- when a function call is preceded by an object reference, context object, the object should be used for the function call's this
- only the top/last level of an object property reference chain matters to call site i.e. this is bound to ob2 in foo call for obj1.obj2.foo()
- this can be implicitly lost at call sites that invoke default binding i.e. plain fn() vs obj.fn()
- all functions have some utilities available to them via [[prototype]] including call and apply methods
- explicit binding: directly state what this will be bound to in a function by way of its call and apply methods which take the this object as the first parameter
- passing a simple primitive value to call or apply causes the function to wrap the value in object form i.e. new String(..), new Number(..), etc. and can be referred to as "boxing"
- hard binding: forcibly invoking a function with a specific object at all times i.e. foo.call(obj), foo is always invoked with obj as the this context regardless of the enclosing scope's context
- the bind function method allows for the creation of hard binding functions i.e. foo.bind(obj)
- some newer functions support a "context" parameter to help avoid using bind i.e. [1,2,3].forEach(foo, obj), obj is the this context inside the foo function body
- there is no connection to class-oriented functionality with the new keyword
- constructors in JS are functions (nothing special) that are called with the new operator in front of them i.e. new Foo()
- using the new operator in the front of the function causes JS to make a constructor call, no such thing as constructor functions in JS only constructor calls
- when a function is invoked with new (constructor call) the following occur:
    1. a brand new object is created
    2. the newly constructed object is [[prototype]] linked
    3. the newly created object is set as the this binding for that function call
    4. unless the function explicitly returns another object the new-invoked function call will automatically return the new object
- new binding: binds this to a newly created object and returns it automatically when a function is invoked with the new operator
- explicit binding (call, apply) takes precedence over the implicit binding (object methods), default binding has lowest precedence
- new binding is more precedent then implicit binding i.e. new obj.foo(3) the this context in the foo call is a newly created object not obj
- new binding is more precident then an explicit hard binding performed with bind (new with call/apply is illegal syntax) i.e. new foo.bind(obj), the this context in foo is a newly created object and not obj
- Ask the following questions at a call-site to determine the this context:
    1. was the function invoked with the new operator (new binding)? -> this is a newly created object
    2. is the function called with call/apply/bind (explicit binding) -> this is the explicitly specified object
    3. is the function called with a containing context aka an object's method (implicit binding) -> this is the object
    4. otherwise default binding -> undefined in strict mode else the global object
- passing null or undefined as a this parameter to call/apply/bind will result in default binding rules i.e. foo.bind(null, 3), this context for foo is either undefined or global object
- avoid using null or undefined if the function is suspect to referring to and/or mutating the this context when invoked
- use Object.create(null) in place of passing null along as the this context to safely avoid unwanted mutations to global state
- creating indirect function references i.e. x.foo = y.foo causes the default binding rules to be applied to the x's foo method when invoked instead of the x object
- soft binding: a function utility method that takes an object and uses that object as the this context of the original this context would be retrieved via the default binding rules, otherwise leaves the this context intact
- lexical this: using the fat arrow syntax => for functions causes the functions this context to be bound to the enclosing scope's this context
- lexical binding of an arrow function can not be overridden by new, call/apply/bind, etc.
- don't mix the style of embracing this with call/apply/bind and side stepping with lexical this and a self var

Chapter 3: Objects
------------------ 
- objects come in two forms: 1. literal form crated with { }, or constructed form via new Object(), literal form very common
- objects are one of six primary types, string, number, boolean, null, undefined, object (functions are object type)
- string, number, boolean, null, undefined are not objects
- complex primitives are the function (callable object) and array (more structured) object subtypes
- JS has the following built-in object constructors: String, Number, Boolean, Object, Function, Array, Date, RegExp, Error
- string literals are in primitive form and are coerced to object form for string method support when needed, literla form preffered in code
- number and boolean literals support object coerscion, null and undefined do not, dates must be constructed as objects
- objects, arrays, regexps, and functions are always object whether created literally or with constructor, error objects are usually implicitly created(thrown on errors)
- contents of an object consist of values (any type) tored at specifically named locations reffered to as properties
- access object properties using . (property access) or \[ \] (key access), property names are always converted to string literal form first to create key
- JS supports computed property named syntax when creating objects in literal form, var obj = { [prefix + "bar"]: 1 }, used with ES6 Symbols
- every access of an object's property is reffered to as property access, including functions (not called method access, objects don't technically own funciton properties)
- arrays are objects with indices (positively numbered properties) and additional properties can be added to them (adding additional non indice properties does not alter array length)
- if you add a property name that looks like a number to an array it will be treated like an index (receive certain optimizations specific to array object subtype)
- ES6 has added an Object.assign method (takes a target and source object) to support shallow copying of objects, assign returns the target object
- aside from holding values, object property descriptors include 3 other characteristics, 1. writable 2. enumerable 3. configurable (object properties are inspectable with Object.getOwnPropertyDescriptor)
- use Object.defineProperty to add new property descriptors (or modify configurable properties) in a more manually explicit way
- if not writable, value of property is immutable, if not configurable, defineProperty method and delete unusable with the property descriptor, if not enumerable property won't be accessible in for .. in loops
- to create constant object properties set configurable and writable to false
- to prevent new properties from being added use the Object.preventExtensions method
- Object.seal prevents the addition of new properties and the reconfiguration of existing properties
- Object.freeze achieves highest level of immutability and calls seal on an object while also setting all properties to be unwritable
- [[Get]] operations on object properties first inspects object for property, if not foundsearches the [[Prototype]] chain, [[Get]] returns undefined if it can not find the property at all
- there is also a default [[Put]] operation for objects which checks property accessor first (custom setter and getter), then data descriptor and writable characteristic (is it false), otherwise finally set value normally
- when a property is defined with its own getter and setter methods it is called an accessor descriptor and not a plain old data descriptor
- define custom getters and setters with object literal syntax (get a()) or through Object.defineProperty, usually define both getter and setter to avoid unexpected behavior
- to check property existence on object and its prototype chain use the in operator, to check just the object use method hasOwnProperty
- Object.create(null) does not delegate to Object.prototype on new object property access, hasOwnProperty will not be available (use Object.prototype.hasOwnProperty.call)
- in operator is strictly for checking property existence and should not be used to check array membership, etc.
- only use for..in enumeration on objects (traverses object and its [[Prototype]] chain), use conventional indexed for loops to traverse arrays
- helpful property inspection and enumeration methods include propertyIsEnumerable, Object.keys (array of enumerable properties), Object.getOwnPropertyNames (all properties belonging to the passed in object)
- ES5 array iteration methods include forEach, every (enumerate until return false), and some (enumerate until return true)
- ES6 provides support for looping over array and object values with for..of syntax (and uses built in @@iterator function which returns an iterator object performing it.next() calls)
- @@iterator is provided by default on arrays but not objects, accessed with Symbol.iterator, it is possible to define custom @@iterator for objects (via Object.defineProperty or though literal syntax), can create infinite iterators

Chapter 4: Mixing "Class" Objects
---------------------------------
- OO stresses that data intrinsically has associated behavior that operates on it, package data and behavior together
- classes also imply a way of classifying a certain type of data strucutre i.e. base vehichle class is extended by car class that specializes
- relative polymorphism is the idea that general behavior of a parent class can be overridden by a child class to give it more specifics
- JS does not natively support the notions and design pattern of classes
- class, instance design philosophy follows that of an architect with blue prints and physical buildings, a class (blueprint) must be instantiated into an instance (physical building) to be interacted with
- constructors of classes create instances and belong to the class, have same name as class usually, used with the new keyword
- virtual (relative) polymorphism is used in inheritance to extend and specialize child classes
- relative here means any method can reference another method at a higher level in the inheritance hierarchy, usually one level up
- in JS parent child relationship exists only between the two .prototype objects of respective constructors, constructors are not directly related
- polymorphism does not link a child class to its parent, the child instead copies what it needs from the parent class
- JS does not provide a native mechanism for multiple inheritance
- JS object mechanism does not automatically copy behavior when inheriting or instantiating, no class to instantiate only object
- objects don't get copied to other objects, they get linked together, can use implicit and explicit mixins to achieve copy behavior between classes
- can use mixin or extends function to copy object properties to another object, "mix in" the contents of one object into another (chocolate chips into cookie dough)
- use explicit pseudopolymorphism when a new objects shadows method of another object i.e. Vehicle.drive.call(this) to inherit methods (no relative polymorphism prior to ES6), explicitly state object and method, performing a bind (using call)
- explicit pseudopolymorphism should be avoided because of its brittleness and maintenance costs (outweigh the benefits)
- mix ins create duplicated references, if a modificaton is made to a function being referenced by a mixin object and other object, both objects will reflect the new functionality because they contain references to the sole function
- parasitic inheritance is subtly implicit and explicit, copy original object method to be overridden, then use the copy to create new method, preserving the old method functionality and storing it for use
- implicit polymorphism is basically the same thing as explicit pseudopolymorphism (so avoid when possible) where a method is borrowed and rebinded (Something.cool.call(this))
- traditional classes imply a copy of class functionality is made on instance initialization and when a child inherits from a parent, JS does not do any of this and faking classes in the language will only lead to problems

Chapter 5: Prototypes
---------------------
