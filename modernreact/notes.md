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
    - all of the tinder app's data can sit in a single JS object we refer to as Redux state

Managing App State with Redux
-----------------------------

1. Reducers
    - a reducer is a function that returns a piece of the application's state
    - the application may contain many different pieces of state and hence many different reducers
    - in a web app displaying lists of books there are 2 pieces of state, the list of books, and the currently selected book
    - this book app will then have 2 reducers, one responsible for producing the list of books, and one responsible for producing the currently selected book
    - think of the application's state object generated by ther reducers as: 
      {
        books: [{title: 'Javascript'}, {title: 'Harry Potter'}], ==> value produced by Books Reducer
        activeBook: {title: 'JS: The Good Parts'} ==> value produced by ActiveBook Reducer
      }
    - it is common to use the combineReducers function in an index.js file to create the above mapping for app state

2. Containers - Connecting Redux to React
    - React does not hook up to Redux natively, another library is needed called react-redux to bridge the two
    - to communicate the state held in the redux object with your react views it is necessary to create a container
    - a container is a react component that has a direct connection to the state managed by redux
    - containers are necessary to hook up react and redux together, they are considered smart components
    - in the book web app the books list view will contain a smart component aka container

3. Containers Continued
    - in general you want the most parent component that cares about the Redux state object to be a container, this doesn't necessarily mean the top level app
    - in the book web app, app doesn't care about the book list or selected book, the book list view cares about the list of books, the detail book view cares about the selected book
    - app is in the book web app to simply say render the book list and render the detail book view
    - book list view and detail book view will be a smart component, a container, app will not
    - only the book list view component will be connected to the Redux state object, detailed book view can communicate with book list data

4. Implementation of a Container Class
    - react and redux form a connection with a seperate library react-redux to create that connection
    - a component connected to the redux state object is a container, a smart component
    - use the react-redux function connect in conjunciton with a function you write that can serve a piece of the redux state as props to your connected container
    - using connect, whenever app state changes (new list of books loaded, etc.) the container's instantly rerender with the new data
    - using connect, whenever app state changes, the object's mapped in the state function will be assigned as props to the component

5. Containers and Reducers Review
    - Redux serves to construct app state and React provides the views to display that state, the two libs are only connected with react-redux
    - app state generated by reducer functions, in book web app we used one BookReducer, a function returning a list of objects respresenting books
    - the rootReducer in index.js consumes the BookReducer by adding a key-value property for it
    - a book list component was promoted to a container to consume a piece of the redux state tree by connecting the view to the appropriate state using the connect function
    - the book list view, a smart component, will now properly rerender when an update to the book list state piece is made

6. Actions and Action Creators
    - the active book for the detailed book view is a dynamic piece of state that changes over time
    - actions and action creators are employed to make these changes to state
    - most changes in a react application happens when a user performs on action/triggers an event in a view
    - the events a user performs can call an action creator that returns an action
    - for example if a user clicks a book in the book list view, an action creator is called and returns an action object with type and data properties
    - the created action object automatically flows through all the reducers present in our app
    - each reducer can return a new piece of state depending on the action it receives (often achieved with a switch statement on action.type)
    - the new piece of state is pumped back into the Redux's state object which will automatically rerender the React container's connected to the state
    - various reducers you create are hooked up to the various pieces of the Redux state tree and so update their piece of state when processing actions
    - once a user triggers a new event the whole process reruns, new data propofates through the app and new views are rendered

7. Binding Action Creators
    - action creators are simply functions that create action objects
    - action objects automatically flow through all of our app's reducers when created
    - it is necessary to wire up your action creator functions to Redux and its state object
    - only reducers care about created actions, bindActionCreators is responsible for taking created actions and allowing them to automatically flow through all reducers

8. Creating an Action
    - in the web book app we link our action creator selectBook to a list component, <li> with the onClick attribute
    - the action creator is made available to the <li> component in props with bindActionCreators (also makes actions automatically flow through all reducers)
    - be sure to always return an object with a type property, and optionally a payload/other data when creating action creator functions

9. Consuming Actions in Reducers
    - all reducers get two arguments, the current state, and the action that occurred
    - the state that gets passed to the reducers is the value/object the reducer cares about (which continually flows back into the reducer) and not the app's state
    - usually just pass state back through when a reducer consumes an action it doesn't care about
    - most reducers are set up using JS switch statement, cases observe/match with the action.type property
    - be sure to consider returning something resonible as the initial state for your reducers when an app first boots up, otherwise it will be undefined to start
    - can default a value for the state param in your reducers using the available ES6 syntax for the base case (initial state)
    - it is important reducers never mutate the current state, they simply return a valid value/expression for the new state

10. Consuming Actions in Reducers Cntd.
    - in the book web app, the detail book view component is a container, as it cares about a piece of the redux state object
    - we hook up the book detail container to redux the same way we did with the book list contianer via the connect function

11. Conditional Rendering
    - remember when an app initially boots up, reducers do not have any current state
    - redux also passes some actions to your reducers, like start up actions, etc.
    - in the book web app we defaulted the state value to null in the active book reducer and so this is the initial state for the reducer
    - this is common in redux applications and must be handled accordingly in the corresponding react view
    - a conditional check for null can be performed on the piece of state that may be initally null, where the view can act and return accordingly based on the existence of the state value

12. Reducers and Actions Review
    - redux is in charge of managing our application's state as a single plain JS object
    - application state and component state are completely different, using this.state and this.setState in a component does not affect app state, there is no connection
    - application state is formed by a set of reducers, functions that consume the current state and action with a type and produce a new state
    - reducers are all tied together into the redux state object with the combineReducers method inside reducers/index.js
    - each key in the redux object corresponds to one reducer function as the value
    - reducers change the application state over time when actions dispatch and automatically flow through them (an action always flows through all reducers)
    - action creators are simple functions that return actions which are plain JS objects with a type property and an optional payload or other data properties
    - remember the flow of actions through the app:
        1. a user performs an action/emits an event in the UI
        2. the view calls the appropriate action creator to create an action object
        3. the action object (with a certain type) flows through each of the reducers in the app
        4. reducers then create new values for their piece of the redux state they own, optionally acting on the action's type
        5. containers are notified of the new values in the redux state objecrt and rerender to update views accordingly with the new props

Intermediate Redux: Middleware
------------------------------

1. App Overview and Planning
    - will create an app to 1. solidify knowledge of React 2. Get more experience with Redux 3. Start making async calls in our apps
    - the app will be a weather forecast browser, it includes views for searching cites
    - the search will make an ajax request query for the cities 5 day forecast
    - there will be a table view that will render each queried city's 5 day forecasts as they are returned asynchronously
    - the table columns include city name, and 3 columns for temperature, pressure, humidty as 5 day forecast plots
    - we need to make sure we can handle state changing a lot (gathering) over time and keep it centralized in the redux state object

2. Component Setup
    - the weather app will contain 4 views, 1. the overall application view 2. a search bar view 3. a forecast list view which knows how to render each line item 4. a forecasst chart view
    - we will be taking advantage of reusable components with our chart component as there will be many present in the forecast list view
    - the search bar needs to be able to dispatch an action creator (a search API query) that can flow through the app's reducers and thus will need to be a container

3. Controlled Components and Binding Context
    - a controlled field is a form element where the value of the input is set by the state of our component
    - the search input in the search bar view will be a controlled component
    - remember when referring to this.state in React components that is simply referencing the component level state and not the app's state held in a redux object
    - to initialize component level state in a React component class we must use the constructor function
    - the two component properties required to create a controlled component are the value and onChange properties
    - when a callback function is handed off as a parameter to be used, like an event handler on a form input change, the this context is not passed along to the event handler from the form input component, an explicit binding of the this context is needed on the callback
    - we can explicitily bind event handler methods we create in our class components in the class's constructor i.e. this.onInputChange = this.onInputChange.bind(this) where this.onInputChange itself is just an unbounded event handler callback function
    - remember it is usually always necessary to bind the parent this context to callbacks you use (when they reference this)

4. Form Elements in React
    - we created a form element to house our search bar view, when hitting enter or pressing a submit button in a child element on a form, the browser submits the for contents
    - an HTML post request is made to a server with the form data upon submitting and the page is reloaded, all browsers handle this HTML element this way (not a React behaviour)
    - to prevent the browser from automatically making the request and reloading the page, override the HTML form's onSubmit property with your own function, being sure to call event.preventDefault()
    - we decide to use a form over a simple div even though we're preventing the default form behaviour because we get nice functionality baked into the component
    - in a form a user can expect to submit content when hitting enter or a button (we don't need to write our own special event handlers that observe what button/key a user is pressing)

5. Working with API's
    - we will be using the open weather map API to fetch five-day forecast data which requires a sign up and personal API key
    - we will be consuming a json object that contains a list of objects, each representing a reading spaced three hours apart

6. Intoduction to Middleware
    - making Ajax requests in React has a certain form and falls in a specific spot in the lifecycle of a React action
    - middleware shows up right after the action creator returns an action before the action flows through all reducers
    - middleware functions can be used to inspect, manipulate, log, stop, etc. any incoming action
    - use the redux-promise npm package to help make Ajax requests in your React app
    - it is necessary to hook up the redux-promise middleware with the applyMiddleware function from redux

7. Ajax Requests with Axios
    - it is wise to create consts (single source of truth) for your action types (exporting them out of your action modules) so the string values can be kept consistent between action creators and the reducers they flow in which act on the action.type
    - template strings help keep code clean and easy to read and can be used to create the URL string
    - for the weather forecasting app the city will be dynamic but the country will be static with a value of 'us'
    - the npm package axios can be used to help make Ajax requests and deal with promises (jQuery functionality is a bit overkill)
    - the axios promise request can then be passed to the action object as a payload, it will be handled properly with the help of redux-promise middleware

8. Redux Promise in Practice
    - we now want to wire up the for submittal in our weather app to trigger an Ajax request action and fetch the five-day forecast data
    - it is necessary to connect the SearchBar React component (making it a container) to the Redux state object (to gain access to our Ajax request action)
    - the SearchBar container will use the connect function coupled with bindActionCreators/mapDispatchToProps to get access to the fetchWeather action creator (note SearchBar view does not care about any state on the actual Redux state object)

9. Redux-Promise Continued
    - remember we return a request promise as the action payload in the fetchWeather action creator
    - the middleware actually allows the promise to resolve and contain the data (the request's reponse) we care about
    - with the response object now resolved, the action payload now contains the response object to be consumed by the reducers
    - the redux-promise middleware sees the incoming action object and its promise payload, it stops the action, allows the request to resolve, unwraps it and dispatches a new action obect with payload set as the resolved response
    - middleware here allows us to not have to worry about handling promises in our reducers, only the resolved payloads (what we want anyways)
    - redux-promise observes the action bject's payload type and if it is a promise it stops the action, after the resolution it creates a new action to dispatch to all reducers
    - if the action object doesn't contain a promise payload the action is let through and not stopped by redux-promise middleware
    - middleware allows us to write code that is easy to understand i.e. can abstract away async nature keeping code looking synchronous

10. Adding State Mutations in Reducers
    - once redux-promise middleware has helped us resolve an action object for our reducers we now only care about action.payload.data
    - in the weather app our weather reducer will want to contain a list of the forecasts we retrieve (initial state is empy list)
    - in React we never want to explicitilly set a component's state equal to something i.e. this.state = {...}
    - like React, in Redux we NEVER manipulate state directly, we must use return a fresh value for state i.e. don't do state.push(...) for weather forecast list
    - when building lists in Redux state and reducers remember to use concat or the ES6 spread operator ... as that creates a fresh list and does not mutate any list

11. Building a List Container
    - we now need a new component to render the list of weather forecast for the cities we query
    - the component needs access to the redux state object containing the list of forecasts and so needs to be a container
    - remember ES6 syntax for unpacking objects in params i.e. ({ weather }) => { ... } unpacks weather property from object param
    - remember ES6 synatx shorthand for creating objects when property key and var value share name i.e. { weather } = { weather: weather }

12. Mapping Props to a Render Helper
    - remember the structure of the API data: contains a city object with city data and a list of weather readings
    - our redux state object contains a weather property that is a list containing the API data objects from our city queries
    - to build the rows in our table body we need to map over the city weather readings list, we'll get one city per row
    - when rendering React lists it is necessaryh to give each list component a unique key using the key property

13. Rendering Sparkline Charts
    - each column representing a piece of weather data will be a chart
    - we will employ the package react-sparklines to help us render the charts
    - the package lets us use a SparkLines component which is passed a list of data and options for sizing/styling
    - can use a SparkLinesLine child element to color the graph
    - we need to create 3 lists from the lsit of weather readings for each city, one for temp, pressure, and humidity
    - can use ES6 shorthand syntax for mapping functions i.e. weather => weather.main.temp

14. Making a Reusable Chart Component
    - when you want to replicate some piece of markup in your react components its probably time to pull out the markup into a reusable component
    - the reusable chart component will always be passed the data it needs from its parent and it won't need to know about redux state
    - the chart component simply ingests a list parameter and renders the data without mutating so it only needs to be a functional component, no need to track any state
    - get used to creating reusable components, whether they're functional, class based, or container

15. Labeling of Units
    - we want to provide useful info in the weather charts like provide a line and value for the average of the 5 days
    - the units of data may not be obvious to the user so we need to add headers for units
    - can also pass a units property to the child chart column component

16. Google Maps Integration
    - can add your own custom styling in the styles/style.css file
    - we're now interested in adding a tiny google maps window placed in the name column for the city's row
    - to help integrate google maps we will use a package called 'react-google-maps'
    - this package will help us make a react component that is wrapper around a google map
    - to create a google map react component we need to use he GoogleMapLoader and GoogleMap components from the library
    - we will center the google map on the coordinates the API returns for a city we query
    - the google map component we create will be a seperate reusable functional component, don't care about state in the component
    - specify specific package versions when npm installing like so: npm install <package>@X.X.X (X >= 0)
    - we'll lock to a specific version of the react google maps api to be sure api changes to google maps doesn't effect our app later
    - we directly pass a style object in CSS syntax to our container element

17. Google Maps Integration Continued
    - we use object destructuring syntax from ES6 to grab lat and lon i.e. const { lon, lat } = cityData.city.coord;

18. Project Review
    - our action creator in this weather app used a constant for type to mitigate typos
    - we also used redux-rpomise to handle a promise received by axios (making the Ajax request)
    - the middleware automatically stops the action and lets the promise resolve, once resolved it sends the now ready data to our reducers
    - the middeware here helps us abstract away async code
    - reducers always strive to never mutate current state it was passed, we alwasy return a new object to take place of current state
    - we reviewed how to destructure an array in ES6 syntax
    - we also employed third-party libraries with pre built react components to make our app that much more lively (charts and maps)
    - we also build reusable components when we want to better organize our components and abstractions, especially when working with third party packages

React Router + Redux Form
-------------------------

1. App Overview and Goals
    - 




