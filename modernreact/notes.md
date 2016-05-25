Modern React with Redux
=======================

An Intro to React
-----------------

1. Intro - Github Project Links
    - course plan/layout:
        1. first gain familiarity with react
        2. then learn conceprts of data modeling in apps
        3. finally get exposure to redux
    - instructor's github lives at github.com/stephengrider
    - all course code can be found at https://github.com/StephenGrider/ReduxCasts

2. The Purpose of Boilerplate Projects
    - modern JS tooling includes project files with libraries React.js and Redux.js in ES6 & JSX
    - these project files are transpiled to ES5 by webpack + babel.js packed in application.js
    - once transpiled into a single JS file it can be ] served to the client's browser with your html/css

3. Environment Setup
    - install redux boilerplate app at https://github.com/StephenGrider/ReduxSimpleStarter with git clone
    - npm install inside the cloned directory

4. Project Setup
    - application will just use react, no redux
    - app will be a video player much like youtube
    - data will be coming from the youtube api, not mocked
    - run npm start to launch the application and run it at localhost:8080

5. A Taste of JSX
    - start with a fresh src directory, getting rid of the old boilerplate in place
    - React is a front end framework for writing individual components/views that clients will see when they render the html produced
    - React code writes multiple, nested components to manage app hierarchy and ultimately produce html
    - const is an ES6 syntax keyword, const declares a variable that can not change value once initially assigned
    - HTML looking syntax in JS code is JSX code, behind the scenes the HTML looking code is transpiled into valid JS

6. More on JSX
    - JSX and ES6 can not be interpreted by the browser, webpack and babel translate our code into valid JS the browser can use
    - JSX gets turned into HTML and eventually placed on the DOM for clients, JSX provides a handy layer of abstraction for this
    - evaluate your ES6 and JSX code interactively at https://babeljs.io/repl/ to see the vanilla JS that will be generated
    - JSX syntax can nest HTML elements and babel can transpile the correct vanilla code to do so

7. ES6 Import Statements
    - ES6 code gives us access to a concept called JavaScript modules
    - JS modules silo code into decoupled modules to help seperate logic and protect references and create public APIs
    - import syntax is as like the following example, import React from 'react'; where react is an installed npm module

8. ReactDOM vs React
    - React is diverging into 2 seperate libraries:
        1. The core library React is used to work with React components (nesting, rendering, etc.)
        2. The library ReactDOM provides functionality for actually rendering/inserting React components on the DOM

9. Differences Between Component Instances and Component Classes
    - when you create a React component, you are creating a class/factory, a type of component that can have many instances
    - ReactDOM renders isntances of components not the classes directly
    - you can use the shorthand <Component /> to create an instance of a React component named Component

10. Render Targets
    - to make use of a component class just wap it in JSX tags <... />
    - to render component instances pass the DOM element to render into to ReactDOM.render
    - ES6 shorthand syntax for functions uses fat arrow => i.e. function () { } becomes more terse as () => { }

11. Component Structure
    - a React app is made up of many different components
    - a component is an object or function that returns some HTML
    - React can render many different components at the same time (asynchronous)
    - can nest components inside each other to do things like form a list (ul/li)
    - building small, modular components makes code reuse throghout your app easy
    - ALWAYS make ONE component per file

12. Youtube Search API Signup
    - to access the Youtube API you need to retrieve a Youtube API key at https://console.developers.google.com/apis/api/youtube/overview
    - to help with the Youtube search retrieve the npm package youtube-api-search (npm install --save)

13. Export Statements
    - work on the search bar to get exposure to exporting modules, classes, and state
    - need to import React in all modules that use JSX syntax
    - use export default <var to export> to expose public facing member from your component modules (often export a component)
    - when importing from local files use a real file reference, the relative path to the file

14. Class-Based Components
    - components don't have to just be functions, ES6 classes can also be used to build them to achieve smarter acting components
    - when extending a Readt.Component it is required to implement the React.Component's abstract render method
    - can use { } in import statement as shorthand for grabbing specific parts of an exposed module
    - import React, { Component } from 'react'; { Component } expression is equivalent to const Component = React.Component;
    - in general its smart to start off with a functional React component and only refactor to a class if a lot of additional logic is needed

15. Handling User Events
    - to handle user events write handler functions in your component class, generally with the naming pattern on<SomeEvent>
    - in vanilla HTML all inputs have an onChange field that can be assigned an event handler
    - to use JS in a JSX HTML element use curly braces { } i.e. {this.onInputChange} to grab the component instance's (referenced with this) members
    - browser's pass an event object to relevant event handlers you employ
    - you can use concise arrow syntax when writing one line event handler functions

16. Introduction to State
    - state is a plain JS object that is used to record and react to events
    - each class based component has its own state object
    - when a component's state changes the component immediately rerenders, forcing children to rerender as well
    - to initialize state in a class based component implement the constructor method
    - all JS classes have a constructor function to perform setup tasks that is called whenever a new instance of the object is created
    - call parent methods in class methods by using the special super function (remember JS uses prototypal inheritance not classical based OO)

17. More on State
    - set up a React Component class' state with the constructor function
    - only inside the constructor funciton do we set state directly, use the setState method in all other class methods
    - its safe to read state directly from the state object as not modifications will be made

18. Controlled Components
    - a controlled field/input is a form value whose value is set by the components state instead of updating state on a changed value
    - by setting the value field on a form it effectively becomes a controlled component, controlled form element
    - a controlled form element only updates when the relevant state its value references is updated
    - in React we don't have an imperative flow where we look for and change state, but in a reactive/declarative flow where components say what they are not how to update

19. Review
    - so far we've looked at JSX, React Components and their state, ES6 syntax including classes, import, export, arrow functions
    - so far app starts in index.js as a base component App, index imports SearchBar component class and renders it inside App component
    - App is a functional component because it does not dabble in any state
    - SearchBar component is a class based component containing state, reacting to data changes
    - updating React component's state causes the component to rerender
    - controlled components respond to updates to the component's state and nothing else

Ajax Requests with React
------------------------

1. Youtube Search Response
    - downwards data flow: only the most parent component in app should be responsible for fetching data
    - this flow means that it is common to fetch data in the index.js react component, one with no parent component

2. Refactoring Functional Components to Class Components
    - the outermast App component will be converted to a class component, recording videos it searches in its internal state
    - ES6 syntax allows you to write concise object literals when properties share the same field and value variable name
    - an object in ES5 { videos: videos } can be written as { videos } in ES6

3. Props
    - to pass data from a parent component to one of its child components, simply set a new property on the component i.e. <VideoList videos={this.state.videos} />
    - passing data in this fashion is considering passing by props, videos is a prop in the above example
    - functional react components can take props as an argument and use data passed by props via this object
    - class components can access data passed by props via their own property props i.e. this.props

4. Building Lists with Map
    - stay away from for loops where possible, use the built in map iterator instead
    - map is a method Array objects have, map takes a function which is applied to each element of the array and returns a new Array
    - React knows how to render an array of <li> components when passed as JSX

5. List Item Keys
    - React looks for a unique identifeir when rendering a list of components so it will be easy to find individual components later for updating
    - a warning is thrown if React renders a list of componenets that do not each contain a unique id property
    - in some cases a unique key can be used from incoming data that already contains a field for unique identification
    - adding a key to a component is very straight forward, <VideoListItem key={video.etag} video={video} />

6. Video List Items
    - ES6 syntax allows for object unpacking in function parameters i.e. if an object props has property video then ({video}) => {...} is valid syntax for a function that takes an object with a video property, create a new variable video to reference the property
    - declare variables to pull of just the pieces of data interested in rendering

7. Detail Component and Template Strings
    - when creating a new React component alwasy ask, do I expect this component to need to maintain an internal state?
    - if all data the component needs can be retrieved from the passed in props object then a funcitonal component is sufficient and no class based component is needed
    - the youtube API comes with an embed resource you can use by passing the embed route a videoId to be rendered in an iframe
    - ES6 has support for template strings (string interpolation), syntax is `my name is ${name}` where name is a valid JS variable

8. Handling Null Props
    - when a React component is loaded its constructor is called, but the render function is also called right after while the constructor may still be doing asynchronous work
    - be careful not to access properties that may be undefined because a component's contructor has not yet completed
    - if data used in a component may be null, check first it is properly defined and return something sensible if the data isn't available yet

9. Video Selection
    - add the concept of a selected video to the App component's state
    - update the selected video property when a YT search callback has fired and completed
    - in React it is common to pass down functions that manipulate state at the top level component to the components children i.e. index -> videoList -> videoLsitItem
    - these functions are used to pass updates to the App state back up the chain where rendering updates can take notice of the new state
    - usually these functions don't run more than two levels deeper than the top level App component if the App's state is being updated (limit to two jumps in these cases with whatever components in play)

10. Styling with CSS
    - styling files i.e. CSS files live in a stlye subdirectory in your react app
    - good practice to give top level component in your react component a relevant className attribute to help make styling modular and straight forward

11. Searching for Videos
    - going to pass a call back created at the App level to manipulate its state down to SearchBar
    - search throttling should be considered as firing a search on the YT API every time the search input changes slows down the app

12. Throttling Search Term Input
    - don't make a search on every input change to the search bar
    - lodash's debouncing helper function can be employed to perform the desired effect, pass it a function and the minimum time between calls in milliseconds

13. React Wrapup
    - covered class based components versus functional components
    - functional components are used when they only need to consume properties and return static JSX, slim and easy to work with
    - class based components are used when a component needs to keep internal state, initialize state in the constructor
    - whenever state of a component is changed it and all of its child comoonents immediately rerender
    - files we write are imported with a relative path, livraries are imported with just their name
    - used a couple call backs to help handle state at the App level, passed down to children components for parent-child communication
    - every component has its own dedicated state property and a change to this state stays local to the component it belongs to

Modeling Application State
--------------------------

1. Foreward on Redux
    - docs available at redux.js.org
    - redux relies on a lot of packages on the side
    - on top of redux there is webpack, redux-router, react-router, redux-promise, ES6 syntax, etc.
    - very important to understand the core components of this framework

2. What is Redux?
    - think of a traditional JS web app that displays a list of books and a view with detailed info of a book clicked from the list
    - the app is divided into 2 parts, the data that powers the app, and the views that display the data
    - on the data side there are 2 types, 1. the list of books 2. the data about the currently selected book
    - on the view side there are 3 types 1. a list view 2. list item 3. detailed view
    - important to seperate the views from the data when creating your app, they only come together when the app is put to use

3. More on Redux
    - Redux plays the part of the data container for the application while React is the view container
    - Redux is a state container: a collection of all the data inside the app, including meta level properties like a currently selected book
    - React displays views the user can actually interact with
    - Redux makes it easy to store all of your application's data in one object referred to as state
    - Redux state is application level state, the global level so to speak
    - thinking of a counter app that displays two buttons, one to increment the count, one to decrement, and a label displaying the current count
    - this app's data lives in a Redux container and is simply the current count
    - the app has 2 views React will render, 1. a button 2. the text displaying the count

4. Even More on Redux
    - one of the most important parts of building a solid Redux React app is figuring out how to design your app's state
    - changing the app's state can be painful and should not be done frequently
    - now think of the tinder app, contains 3 screens, 1. swiping screen 2. match list screen 3. chat screen
    - the swipe screen's data contains 1. a list of users to be reviewed 2. the current user to be swiped on
    - swipe screen's views are 1. an image card displaying the current user 2. a button for like and dislike
    - the match list screen's data contains 1. a list of all users currently in convo with
    - the chat screen's data contains 1. the currently viewed convo
    - there is also a global list of all user's with chat logs and associated images in the app's state
    - the mathc list screen has views 1. conversation list
    - the chat screen views are 1. text list (list of text messages) 2. text item (individual message)
    - all of the tiner app's data can sit in a single JS object we refer to as Redux state

Managing App State with Redux
-----------------------------

1. Reducers
    - 



