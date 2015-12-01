
var VOYAGEAPP = {}; // module object

VOYAGEAPP.compositionReview = function () {
    var toUpper = function (s) {return s.toUpperCase();};
    var firstUpper = R.compose(toUpper, R.head);
    var splitByDash = R.split("-");
    var firstUppers = R.compose(R.join("**"), R.map(firstUpper), splitByDash); // firstUpper is also a composition

    alert(firstUppers("people-order-our-patties"));
};

VOYAGEAPP.categoryTheoryExample = function () {
    var myAdd = function (x, y) {return x + y;}; // polymorphic (ints, strings, arrays) but laws still hold for all types
    var myMultiply = function (x, y) {return x * y;};

    // Function Category
    var funcId = function (f) {return f;}; // id, required piece 1
    var funcCompose = function (g, f) {return function (x) {g(f(x))}}; // composition, required piece 2

    alert(
        "Add is associative = " + (myAdd(1, myAdd(2, 4)) === myAdd(myAdd(1, 2), 4)) + "\n" + // add is associative
        "Add is commutative = " + (myAdd(1, 4) === myAdd(4, 1)) + "\n" + // add is commutative
        "Add is distributive = " + (myMultiply(2, myAdd(3, 4)) === myAdd(myMultiply(2, 3), myMultiply(2, 4))) + "\n" + // add is distributive
        "Add identity is 0 = " + (myAdd(5, 0) === 5) + "\n" + // add identity is 0
        "Left and right identities exist for function category = " + (funcCompose(funcId, R.add(1))(2) === funcCompose(R.add(1), funcId)(2)) + "\n" + // left and right identites for function category
        "Function category has associativity = " + (funcCompose(funcCompose(R.add(1), R.add(2)), R.add(3))(0) === funcCompose(R.add(1), funcCompose(R.add(2), R.add(3)))(0)) // associativity for function category
    );
};

VOYAGEAPP.objectMapExample = function () {
    var _Container = function (val) {this.val = val;};
    var Container = function (x) {return new _Container(x);}; // constructor to literally create a wrapper (object) around a value

    _Container.prototype.repr = function (f) {
        return ["val", this["val"]].join(": ");
    };
    _Container.prototype.map = function (f) {
        return Container(f(this.val)); // open up container and pass contained value along to mapping function
    };

    var myCapitalize = function (s) {return s[0].toUpperCase() + s.slice(1)};
    var flameWrapper = Container("flame"); // Container can take strings, lists, ints, etc.

    var myMap = R.curry(function (f, obj) { // general pattern to achieve point free style and greate composability
        return obj.map(f);
    });

    alert(
        flameWrapper.repr() + "\n" +
        flameWrapper.map(myCapitalize).repr() + "\n" +
        Container([1,2,3]).map(R.reverse).map(R.head).repr() + "\n" + // map chain is like a composition of maps i.e. map(compose(head, reverse))
        myMap(R.add(1), Container(-21)).repr() + " " + myMap(R.compose(R.head, R.reverse), Container("dog")).repr() // can curry myMap as myMap(add(1)), etc. without needing a container/object, more composable
    );
};

VOYAGEAPP.maybeFunctorExample = function () {
    var _Maybe = function (val) {this.val = val;};
    var Maybe = function (x) {return new _Maybe(x);};
    _Maybe.prototype.map = function (f) {
        return this.val ? Maybe(f(this.val)) : Maybe(null);
    };
    _Maybe.prototype.repr = function (f) {
        return ["val", this["val"] ? this["val"] : "null"].join(": ");
    };

    var myMap = R.curry(function (f, obj) {
        return obj.map(f);
    });

    var firstMatch = R.compose(myMap(R.head), Maybe, R.match(/cat/g)); // can drop maybe into a compostion

    alert(
        myMap(R.split(' '), Maybe("Cat dog")).repr() + "\n" + // non null
        myMap(R.add(2), Maybe(null)).repr() + ", " + firstMatch("soup").repr() // null
    );
};

VOYAGEAPP.functorExercise = function () {
    var myMap = R.curry(function (f, obj) {
        return obj.map(f);
    });
    var _Identity = function (val) {this.val = val;};
    var Identity = function (x) {return new _Identity(x);}; // identity helps LIFT regular data values into the functor world, compose with other functors
    _Identity.prototype.repr = function (f) {
        return ["val", this["val"]].join(": ");
    };
    _Identity.prototype.map = function (f) {
        return Identity(f(this.val));
    };

    var ex1 = myMap(R.add(1));
    var ex1Thing = myMap(function(x) {return x.toUpperCase();}); // x becomes the string held inside the identity container (x gets unwrapped and is used to create a new identity container)

    var ex2 = myMap(R.head);

    var _Maybe = function (val) {this.val = val;};
    var Maybe = function (x) {return new _Maybe(x);};
    _Maybe.prototype.map = function (f) {
        return this.val ? Maybe(f(this.val)) : Maybe(null); // running f inside Maybe context (abstract out function application)
    };
    _Maybe.prototype.repr = function (f) {
        return ["val", this["val"] ? this["val"] : "null"].join(": ");
    };

    var safeGet = R.curry(function (prop, o) { // safeGet returns the Maybe functor
        return Maybe(o[prop]);
    });
    var ex3 = R.compose(myMap(R.head), safeGet("name")); // map head on Maybe functor returned by safeGet

    var ex4 = R.compose(myMap(parseInt), Maybe); // parseInt with null check

    alert(
        ex1(Identity(2)).repr() + ", " + ex1Thing(Identity("firehose")).repr() + ", " + myMap(R.add(2), [2]) + "\n" + // exercise 1
        ex2(Identity([1, 2, 3])).repr() + ", " + myMap(myMap(R.add(1)), Identity([3, 4])).repr() + "\n" + // Identity functor contains list functor, need double map to handle both functors
        ex3({name: "Rick Sanchez"}).repr() + ", " + ex3({badName: "Morty Smith"}).repr() + "\n" +
        ex4(33).repr() + ", " + ex4(null).repr() // parseInt can handle null now
    );
};

VOYAGEAPP.eitherFunctorExample = function () {
    var myMap = R.curry(function (f, obj) {
        return obj.map(f);
    });
    var _Right = function (val) {this.val = val;};
    var Right = function (x) {return new _Right(x);};
    _Right.prototype.map = function (f) {
        return Right(f(this.val));
    };
    _Right.prototype.repr = function (f) {
        return ["val", this["val"]].join(": ");
    };
    var _Left = function (val) {this.val = val;};
    var Left = function (errMsg) {return new _Left(errMsg);};
    _Left.prototype.map = function (f) {
        return this;
    };
    _Left.prototype.repr = _Right.prototype.repr;

    var determineAge = function (user) {
        return user.age ? Right(user.age) : Left("No age available");
    };
    var yearOlder = R.compose(myMap(R.add(1)), determineAge);

    alert(
        yearOlder({age: 3}).repr() + ", " + yearOlder({age: null}).repr()
    );
};

VOYAGEAPP.ioFunctorExample = function () {
	var myMap = R.curry(function (f, obj) {
        return obj.map(f);
    });

    var emailIO = IO(function () {
        return $('#email').val();
    });
    var msgIO = myMap(R.concat("welcome "), emailIO);
    runIO(msgIO); // => "welcome steve@foodie.net"

    var getBgColor = R.compose(get("background-color"), JSON.parse); // mapping function to be run over the contained value in IO functor
    var bgPref = R.compose(myMap(getBgColor), Store.get("preferences")); // Store.get returns an IO functor, only kicked off with runIO
    var app = bgPref(); // => returns an IO functor
    runIO(app); // => runIO

    var getValue = function (sel) {return $(sel).val();}.toIO(); // like emailIO but toIO is a helper that lets us pass arguments to contained function (sel in this example)

};

VOYAGEAPP.eitherIOExercise = function () {
    var myMap = R.curry(function (f, obj) {
        return obj.map(f);
    });
    var _Right = function (val) {this.val = val;};
    var Right = function (x) {return new _Right(x);};
    _Right.prototype.map = function (f) {
        return Right(f(this.val));
    };
    _Right.prototype.repr = function (f) {
        return ["val", this["val"]].join(": ");
    };
    var _Left = function (val) {this.val = val;};
    var Left = function (errMsg) {return new _Left(errMsg);};
    _Left.prototype.map = function (f) {
        return this;
    };
    _Left.prototype.repr = _Right.prototype.repr;

    var showWelcome = R.compose(R.add( "Welcome "), R.prop('name'));
    var checkActive = function(user) { // user validation
        return user.active ? Right(user) : Left('Your account is not active')
    };
    var ex1 = R.compose(myMap(showWelcome), checkActive);

    var ex2 = function (xs) { // length validation
        return R.length(xs) > 3 ? Right(xs) : Left("You need length > 3");
    };

    var save = function (user) {
        console.log("User " + user + " saved!");
        return user;
    };
    var ex3 = R.compose(myMap(save), ex2); // saves on valid user

    /*****
    var getValue = function (x) {
        return document.querySelector(x).value;
    }.toIO(); // IO functor containing getValue function
    var stripSpaces = function (s) {return s.replace(/\s+/g, '');};
    var ex4 = R.compose(myMap(stripSpaces), getValue); // strips spaces from good x values, have to call runIO on ex4 to get value

    var getHref = function () {return location.href;}.toIO(); // IO functor for location href
    var getProtocal = R.compose(R.head, R.split("/"));
    var ex5 = R.compose(myMap(getProtocal), getHref); // have to call runIO on ex5 to get the value

    var localStorage = {};
    localStorage.user = JSON.stringify({email: "george@foreman.net"});

    var _Maybe = function (val) {this.val = val;};
    var Maybe = function (x) {return new _Maybe(x);};
    _Maybe.prototype.map = function (f) {
        return this.val ? Maybe(f(this.val)) : Maybe(null); // running f inside Maybe context (abstract out function application)
    };
    _Maybe.prototype.repr = function (f) {
        return ["val", this["val"] ? this["val"] : "null"].join(": ");
    };

    var getCache = function(x){return Maybe(localStorage[x]);}.toIO(); // IO functor for getting user cache safely
    var log = function (x) {
    	console.log(x);
    	return x;
    };
    var getStringEmail = R.compose(R.prop('email'), JSON.parse); // get email out of JSON string in cache
    var ex6 = R.compose(myMap(myMap(getStringEmail)), getCache); // have to call runIO on ex6 to get Maybe value out of operation
    *****/

    alert(
        ex1({active: true, name: "eric"}).repr() + ", " + ex1({active: false, name: "john"}).repr() + "\n" +
        ex2([1]).repr() + ", " + ex2([1,2,3,4]).repr() + "\n" + 
        ex3("eric").repr() + ", " + ex3("bob").repr()
    );
};

VOYAGEAPP.otherFunctorExample = function () {
    var myMap = R.curry(function (f, obj) {
        return obj.map(f);
    });

    var clickStream = myMap(function (e) {console.log(e); return e.clientX + ", " + e.clientY;}, Bacon.fromEventTarget(document, "click")); // => EventStream string
    var elementStream = myMap(document.querySelector, clickStream);
    clickStream.onValue(function (loc) {alert('you clicked @ ' + loc);}); // kicks off stream processing
    //elementStream.onValue(function (el) {alert('The inner HTML is ' + el.innerHTML);});

    var makeHtml = function (post) {
        return "<div>" + post.title + "</div>";
    };
    //var pageFuture = myMap(makeHtml, http.get("/posts/1"));
    //pageFuture.fork(function (err) {throw(err);}, function (page) { // pass functions to handle 1. error or 2. the eventual value (like Either)
    //    $('#container').html(page);
    //});
};

VOYAGEAPP.otherFunctorExercise = function () {
    var myMap = R.curry(function (f, obj) {
        return obj.map(f);
    });
    //var ex1 = R.compose(myMap(R.get('title')), getPost);
    //var ex2 = R.compose(myMap(function (x) {return "<div>" + x + "</div>";}), ex1);

    //var clicks = Bacon.fromEventTarget(document.querySelector("#box"), "click");
    //var htmlClicks = clicks.map(function (e) {return e.target.innerHTML;});
    //htmlClicks.onValue(function(html){
    //    console.log(html);
    //});

    //var pureLog = function(x){ console.log(x); return x; }.toIO();
    //var searchInput = document.querySelector("#search");
    //var keydowns = Bacon.fromEventTarget(searchInput, "keydown");
    //var logs = R.compose(myMap(pureLog), keydowns);
    //logs.onValue(function(io){
    //    assertEqual(searchInput.value, runIO(io));
    //});

    var _Maybe = function (val) {this.val = val;};
    var Maybe = function (x) {return new _Maybe(x);};
    _Maybe.prototype.map = function (f) {
        return this.val ? Maybe(f(this.val)) : Maybe(null); // running f inside Maybe context (abstract out function application)
    };
    _Maybe.prototype.repr = function (f) {
        return ["val", this["val"] ? this["val"] : "null"].join(": ");
    };
    var safeGet = R.curry(function (x, o) {return Maybe(o[x])});
    var user = {id: 2, name: "Albert", address: {street: {number: 22, name: 'Walnut St'}}};
    var ex5 = R.compose(myMap(safeGet('name')), myMap(safeGet('street')), myMap(safeGet('address'))); // null checks begin to get nested, introducing large control flow => monad

};

VOYAGEAPP.functorLawsExample = function () {
    var myMap = R.curry(function (f, obj) { // fmap function
        return obj.map(f);
    });
    var _Maybe = function (val) {this.val = val;};
    var Maybe = function (x) {return new _Maybe(x);};
    _Maybe.prototype.map = function (f) {
        return this.val ? Maybe(f(this.val)) : Maybe(null); // running f inside Maybe context (abstract out function application)
    };
    _Maybe.prototype.repr = function (f) {
        return ["val", this["val"] ? this["val"] : "null"].join(": ");
    };

    var toArray = function (x) {return [x];};
    var afbtb = R.compose(toArray, R.reverse); // a -f-> b -t-> tb
    var atafmftb = R.compose(myMap(R.reverse), toArray); // a -t-> ta -fmapf-> tb
    var efficientMapCompose = R.compose(myMap(R.compose(R.reverse, R.toUpper)), toArray);

    var maybeToArray = function (m) {return m.val ? [m.val] : [];};

    var ntmapf = R.compose(maybeToArray, myMap(R.add(1)));
    var mapfnt = R.compose(myMap(R.add(1)), maybeToArray);

    alert(
        afbtb("bingo") + ", " + atafmftb("bingo") + "\n" +
        efficientMapCompose("bingo") + "\n" +
        ntmapf(Maybe(5)) + ", " + mapfnt(Maybe(5))
    );
};

VOYAGEAPP.monadExample = function () {
    var getTrackingId = R.compose(Maybe, R.get('tracking_id'));
    var findOrder = R.compose(Maybe, Api.findOrder);
    var getTrackingOrder = R.compose(mjoin, myMap(getTrackingId), findOrder); // findOrder and getTrackingId return a Maybe, use mjoin to flatten the nested maybe returned by myMap(getTrackingId)

    var chain = function (f) { // (a -> M b) -> M a -> M b a.k.a. flatMap/bind
        return R.compose(mjoin, myMap(f));
    };
    var mjoin = chain(id); // :: M M a -> M a, id returns original contained monad

    var sendToServer = httpGet('/upload');
    var uploadFromFile = R.compose(mjoin, myMap(sendToServer), readFile); // Future contained in a future before mjoin
    var uploadFromFile2 = R.compose(mjoin, myMap(sendToServer), mjoin, myMap(readFile), askUser);
    var uploadFromFileChained = R.compose(chain(sendToServer), chain(readFile), askUser);

    // uploadFromFile("tmp/file.txt").fork(logErr, alertSuccess); // only have to fork once since the future's were joined/flattened
    // uploadFromFile("What file?").fork(logErr, alertSuccess);

};

VOYAGEAPP.monadExercise = function () {
    var safeGet = _.curry(function(x,o){ return Maybe(o[x]) });
    var user = {id: 2, name: "Albert", address: { street: {number: 22, name: 'Walnut St'} } };
    var ex1 = R.compose(chain(safeGet('name')), chain(safeGet('street')), safeGet('address'));

    var getHref = function(){ return 'http://run.jsbin.io/runner' }.toIO();
    var pureLog = function(x){ console.log(x); return x; }.toIO();
    var ex2 = R.compose(chain(pureLog), getHref);

    var e3 = R.compose(chain(getComments), map(safeGet('id')), getPost); // getPost returns a Maybe, fmap over to get Maybe id, chain to get comments

};

