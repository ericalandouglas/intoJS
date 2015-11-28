
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
        return Right(f(this.val))
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
