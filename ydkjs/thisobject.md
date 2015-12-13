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
- 

