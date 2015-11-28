The Silence
===========

Intro
-----
- exercise restraint when coding, stay discplined and keep away from messy features i.e. goto
- symptoms of undiscplined code: custom names, looping patterns, glue code, side effects (all make code harder to track and reason about)

Omit Needless Names
-------------------
- use separations and recognitions
- seperate function inputs from the function environment
- easier to test, share, and port code with inputs explicitly stated and seperated from the function evnironment
- secret inputs are scary because varying JS environments (server vs client) may change how secret inputs work

Seperating Mutation From Calculation
------------------------------------
- hard to test functions that calculate as well as mutate state, keep the two as seperated as possible
- keep mutations in as few spots as possible to make for easier testing

Recognize Pure Functions
------------------------
- functions that do not change any state (calculations instead), more testable, portable, memoizable, and parallelizable
- functions that interact with specific global scopes (window object) aren't very pure (getQueryVariable), functions that perform strictly math and bitwise arithmetic are pure (random)
- console.log is unpure (if run console.log in paralell order of logging is not consistent)
- purity grants purity as you compose pure functions, introducing any impurities (in function params, function execution, or otherwise) will strip away all purity

Seperate Functions From Rules
-----------------------------
- functions are nouns, you can do things to functions
- think of as having intension (performing calculations) as well as having extension, providing a platter of new mappings/pairings (strings -> hexcode, etc.)
- set theory: every function is a single-valued collection of pairs, every input from the domain maps to a single output in the range/codomain (one input can only produce one unique output)
- seperate arity from functions, functions can take many arguments and be fed them one at a time, language construct object.property vs writing a get function to get the property => function is composable
- ordering arguments is important for composability and readable when using currying, map, etc.

Curry Exercise
--------------
- catamorphism: recursive pattern that passes along an accumulator and the next element in the input list to successive recursive calls, can implement map, filter, reduce, sorts, etc. with this idea
- avoid writing actual recursive functions in JS, use available pre-built composable HOFs which are well optimized (no tail call optimization in JS)

Compose
-------
- functions can meld aka compose together i.e. A -f-> B -g-> C composing f and g maps domain A to codomain C, g(f(a)) = g . f = c, f: A -> B, g: B-> C
- categories: start seeing similarities, pure functions are the arrows of a "category"
- seperate composition form arguments, JS code composes functions, often uses unnecessary arguments
- point free function: no arguments mentioned, just glue/compose functions and data together, can be very declarative but no need to force
- focus less on names and less on how, focus on the what, keeps it terse and maintainable, supports portable implementations

Point Free
----------
- functions take points to points, arguments (domain) to codomain, point free means argument free i.e. var max = reduce(max, -Infinity);
- using a pallette of composable tools, avoiding the function keyword

The Silence Review
------------------
- when loops are pure can often be one of map, filter, or reduce
- make all function inputs with arguments, inputs can be provided over time (curried) to aid composability
- avoid modifying outside scopes and environment (teaser dom modifier function has pure teaser function sandwiched between the impure functions)
- compose without glue variables, point free when possible
- often times thinking about performance optimizations and efficiencies is not needed, extra function calls are much cheaper when a web app is also communicating over a network
- being very declarative keeps everything defined and designed at a high level, less focus on small implementation details

The Voyage
==========

Composition Review
------------------
- like all functional code, compositions should aim to read like a book i.e. compose(toUpper, firstChar)
- point free functions, resusable parts/compositions don't care or root themselves in specific app data, easily interchangable, used to define and declare the grammar of your program in a straight forward manner

Category Theory
---------------
- consider add function (take 2 inputs x and y, produce their sum, don't care about exact implementation details), add is associative, commutative, distributive, identity = 0
- add is polymorphic and the properties of the function are well defined on all types (associative, commutative) which is really nice to have when writing and reasoning about code
- like add compose has laws and properties, type signature = compose :: (b -> c) -> (a, b) -> (a -> c)
- to form a category you need 1. a composition with the above type signature and 2. an identity with type signature = id :: a -> a i.e. var id = function (x) {return x;}
- Category laws: 1. Left Identity, compose(id, f) == f 2. Right Identity, compose(f, id) == f 3. Associativity, compose(compose(f, g), h) == compose(f, compose(g, h)) == f(g(h(x)))
- category theory and the laws and properties it grants can aid in developing programs (not a full necessity but good to know)

Objects
-------
- objects are containers/wrappers for values, no methods, not nouns (User, Blog, etc.) -> looking to capture behavior, don't make your own too often
- consider function capitalize, basically a standard function defined on the standard string type, how do we extend to wrappers/objects? i.e. capitalize("hello") => "Hello" vs. capitalize(Container("hello")) => Object/Wrapper

Object Map
----------
- when mapping a function over a container it is first necessary to unpack the contained value, second pass it along to the mapping function, and finally construct a new wrapper with the new mapped value
- offers support for dynamic dispatch where many different types of containers (lists, maybes, eithers, etc.) support the same operations (map, reduce, etc.)
- container map: we have a container holding a value and we want to map a function over the container's value by running the function "inside the container" yielding a new container i.e. list container -> [1].map(add(2)) = [2]
- Containers that support map operation have to be polymorphic containers (can hold any type of value)
- it is encouraged to create functions that take containers/objects as the last argument so dot notation is not needed (abstracted) and point free composable style can be achieved

Maybe Functor
-------------
- functor: any object or data structure you can map over
- Maybe functor captures a null check (sometimes referred too as option with subclasses some or none)
- can use Maybe in function composition because it is just a function that takes a value and creates an option container
- Maybe can help protect against a null blowing up a chain of function calls

Either Functor
--------------
- somewhat like Maybe, typically used for pure error handling with an error message embed
- has 2 subclass functors: Right and Left, mapping over the Either functor maps the function when the class is of Right flavor, ignores mapping a function if subclass is Left flavor i.e. map(add(1), Right(1)) = Right(2), map(add(1), Left('error msg')) = Left('error msg')
- If you want program to continue running return the Right subclass, if you want to stop computation and report an error return Left subclass
- more useful for syncronous operations vs asyncronous

