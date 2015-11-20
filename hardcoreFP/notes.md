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

