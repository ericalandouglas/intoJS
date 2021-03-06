Advanced React and Redux
========================

Welcome
-------

1. Introduction
    - free to jump to any section (auth, middleware etc.), as this is an advanced course, the topics covered assume react/redux knowledge
    - all project files are hosted at https://github.com/StephenGrider/AdvancedReduxCode and https://github.com/StephenGrider/ReduxSimpleStarter

Testing
--------

1. Project Setup
    - we will be working out of the redux simple starter repo and adding test to the test directory

2. Core Testing - Describe, It, Expect
    - the repo already has a dev server we can run on localhost with npm start
    - component test files live in the test/components directory and the files use a name that begins with their component name
    - to begin we only care about the simple app component containing a certain piece of text
    - in your test suites you make use of three core key words, describe, it, and expect
    - describe is used to group together similar tests, describe takes a string to provide group context in the test report
    - it is used to group and describe one single test, it is a specific test, also takes a string to provide individual test context in the test report
    - expect is used to assert things about specific targets i.e. components we're testing
    - many testing frameworks carry these three keywords (or very similar keywords) and are set up in the same fashion, knowledge carries around

3. A First Spec
    - the second parameter to the describe function is a function
    - the second parameter to the it function is also a function
    - it function calls are nested inside the 'describe' function parameter, expect is used inside an 'it' function parameter
    - the structure of a test suite is important and a core piece to the mocha testing framework, mocha first parses test files before executing them
    - mocha queues up each testing function to safetly execute each test in isolation and gracefully handle errors
    - the anatomy of an assertion/expect statement: expect makes one simple focused declarative test about a target
    - expect can read like english i.e. expect(component).to.have.class('comment-box');
    - expect's parameter is the target an assertion wants to be made about, the to.have.class piece is the matcher and tells how to compare, and the value we expect is passed in last
    - expect returns an object we can chain properties on, this object provides a wide variety of matchers you can employ
    - are first test on app will use the .to.contain matcher to check the text the component contains
    - to run our test we use the commnad npm run test:watch, watch automatically reruns our specs for us on updates

4. Test Reporting
    - the report we see when running tests reflect how we structure the describe and it function calls in our test files
    - failing tests throw assertion errors and appear as red in the test report

5. Feature Mockups
    - we will do test driven development by first writing out specs/tests for the component we wish to create and then create the component itself
    - we will build a comment box feature, we won't make any ajax requests for state, we will keep it in a redux store
    - we will seperate our comment box feature into two seperate components, an add comment component, and a comment list component
    - in the add comment component we care that the component has a text area, a button, and entering text updates the text area
    - in the comment list component we care that comments appear in LIs, and that the list displays all comments
    - try to keep test flexible and refactorable for other developers including yourself

6. Test Structure Setup
    - we now need to scaffold out the comment box component (text area) and its specs
    - the rule of thumb is one react component file corresponds to one react test file, create a new test file when creating a new component file
    - mocha does not pick up on newly created test files when in watch mode until you restart the whole process with npm run test:watch
    - don't double up it when writing string for the it function, don't use 'it' in the string

7. Comment Box Tests
    - one of the comment box tests needs to assert that we have an actual HTML element rendered that is a text area
    - we will look to use the chai-jquery package to help with our assertions
    - on our application side all components written are using react, only the tests make use of jquery in specific ways
    - documentation for the chai-jquery package is available at https://github.com/chaijs/chai-jquery, visit to see a wide variety of matchers
    - we will use the exist matcher to assert the text area is actually rendered
    - when first testing it is common to hunt through docs to find appropriate matchers until they become more familiar
    - the renderComponent helper used with our tests returns a jquery object containing our react component to make jquery testing plugins available
    - once a spec is written and is failing in red do some implementation to make the test pass

8. Testing Class Names
    - top level divs or other HTML elements usually use a class name that is the same as the react component's declared class name
    - we can use the matcher .to.have.class to help us assert correct class names on our elements/components
    - when writing code first before your spec/test, it is a good idea to go and break the spec and watch the test fail and then succeed when fixed again
    - breaking and fixing your specs can help you determine if your spec and test are actually behaving correctly and doing something meaningful

9. Using beforeEach to Condense Tests
    - along with the describe, it, and expect constructs we are also given access to a beforeEach construct
    - the 'beforeEach' function take a function parameter that serves as a set up function to be run before each test decalred with 'it'
    - the setup done before each test in 'beforeEach' helps reduce redundancy in our tests
    - declare variables you want to set in 'beforeEach' at the top of the describe function parameter, set them inside the 'beforeEach' function
    - mocha first sets these declared vars to undefined, and then the vars receive a fresh instance of a component when set in 'beforeEach' for each test

10. Expecting Child Elements
    - when placing the CommentBox component inside of our App component we can expect the CommentBox component to have the unqiue class name "comment-box"
    - we can use the jquery .find method we get from the chai-jquery package to help retrieve the proper assertion target i.e. '.comment-box'

11. Simulating Events
    - we need to handle the two text area events of entering text and submitting the text
    - it is possible to nest 'describe' function calls to update the formatting in your test report and provide more context
    - nested 'it' function calls still run any beforeEach's defined in the outer/parent 'describe' call(s)
    - multiple beforeEach functions will run and can do multiple levels of setup when beforeEach calls are nested
    - child beforeEach calls are run last, this effectively creates a stacked structure of these setup calls, makes it easy to customize
    - you can use an HTML elements .simulate method when finding them in your test suite

12. Testing Controlled Components
    - we use the component .find method to get the specific text area element and then use the .simulate method to trigger an on change event which returns the new text
    - when working with controlled components (like our textarea) you first set up your event handler (remembering to bind 'this')
    - our event handler function updates the react component's state which will rerender our controlled component updating the value to the new value set in our state

13. Form Submit Event
    - we will first write our test/spec to verify the text area is cleared on submit
    - we need to trigger a submit form event in our spec to get the desired behavior using .simulate('submit')
    - we will change the div holding our textarea to a form so that submit behavior can be achieved and we can define a submit handler
    - with the proper specs and some thought, you can work with and simulate using your component and could opt to by pass using the browser a lot

14. Stub Comment List
    - we will build an action creaetor to save comments for us as well as a reducer to save comments into a list
    - make sure to rerun npm run test:watch when adding new components and specs about those components to your test report

15. Expectations on Consent
    - we want our comment list to show comments in <li> components and we want all the comments in our list to be rendered in the view
    - our CommentList component will be a container that is hooked up to our redux state tree, it will receive the list of comments as props
    - we need a way to push comment lists into our CommentList container when testing, the renderComponent function can receive props to push to our components
    - the renderComponent function can take a third argument that is an object containing our desired props

16. Assertions with Lists
    - we will turn our CommentLisrt component into a container, a react component that has access to a piece of the redux state tree
    - containers are hooked up via react-redux's connect function, the function takes a mapStateToProps function parameter to map redux state accordingly into the component's props

17. Testing Action Creators
    - we will now use redux to save comments via an action creator and have a reducer collecting the comments and feeding the updated comment list to our CommentList container
    - we will write our specs first for our comment action creator and then implement the action creator to mimic test driven development
    - we will be particular with our action creator tests and ensure they have the correct type and payload
    - we will save our action types into a file called types.js in the src/actions directory

18. Action Creator Shortcuts
    - our saveComment action creator will have a comment for its payload and the SAVE_COMMENT type we defined in actions/types.js
    - our CommentBox component will need to be a container so that it can make use of our saveComment action creator via the connect funciton
    - we will pass the connect function an object containing our action creators as the second parameter to inject our action creators into our component's props
    - can use the syntax import * as <MY_OBJECT> from '<MY_MODULE.JS>'; to load all exported members from a module into a single object
    - the above is nice to create a single object holding all your action cretors easily, to be passed to connect function
    - we will use the available action creator saveComment injected onto props in our handleSubmit function to fire a save comment action before clearing the box's input

19. TDD Comments Reducer
    - we want to test our reducers by passing them an action we know they won't respond to so we can ensure proper default behavior and initial state
    - we will also test our reducers with each action they care about whether its one or many
    - the chai library provides some very low level and default assertions we can use
    - remember, reducers consume actions (objects witha  type and payload property) and return a new piece for our redux state tree, reducers consume all actions and always return a new piece of state (no mutations)

20. Spec Failure After Code Change
    - there may be instances where you're passing specs fail after some refactor or new implementation, in this case adjust your test case accordingly

21. App Review
    - be sure to hook up your reducers in the combineReducers call of the reducers/index.js file

Test Environment Setup
----------------------

1. Purpose of Mocha and Chai
    - the expect keyword comes from the chai library
    - the needs of a testing suite include two things:
      1. we need something to run the tests (load tests, run on by one, clean up, reporting)
      2. we need something to something to write tests (helpers to assert properties about test subjects)
    - mocha helps us accomplish number 1 above and will run our tests, we don't really directly interact with mocha
    - chai provides the a lot of helpful assertions to cover number 2 above, chai api docs available at http://chaijs.com/api/
    - we loaded other libraries to augment chai and the available matchers as well in our test suite like chai-jquery

2. Test Helper From Scratch
    - we will completely rewrite test_helper.js
    - the test helper was doing four useful things for us, these include:
      1. Set up testing environment to run like a browser in the command line
      2. Build "renderComponent" helper that will render a given React component
      3. Build helper for simulating events
      4. Set up chai-jquery
    - we will deep dive into each of these four pieces and implement them ourselves so we can later add our own tweaks as necessary

3. JSDom Setup
    - we will set up our testing environment to run like a browser in the command line
    - all of the code we write gets put into a file called bundle.js which will be sent to the browser for app rendering
    - bundle.js includes libraries like react, redux, but not libraries like mocha or chai
    - when we write our specs/test we did not have to interact with a borwser, all work was done in the terminal
    - terminal does not include html elements, the DOM, etc. like a browser does
    - we will use a library to help emulate a DOM and HTML standards called jsdom
    - we will set up a document in our testHelper.js file to serve as the HMTL view, assigned on global (acts as window)
    - jquery will make use of the fake document and window variables created on the global object

4. More JSDom Setup
    - we will import _$ from jquery to tell jquery to use our window
    - we will call _$ passing our window to create a full fledged instance of jquery
    - we have now setup our command line to act like a browser to run our testing suite appropriately

5. TestUtils Library
    - 







