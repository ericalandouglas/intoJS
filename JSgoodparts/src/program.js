
Function.prototype.method = function (name, func) {
    if (!this.prototype[name]) { // defensively add methods to objects
        this.prototype[name] = func;
    }
    return this;
};

var MYAPP = {}; // module's object for global linkage

MYAPP.rambdaDemo = function () {
    var input = [1, 2, 3];
    var output = R.map(function (item) {return item * 4;})(input);
    alert(input + " - " + output + " ... " +  R.isArrayLike(output));
};

MYAPP.methodInvocation = function () {

    var myObject = {
        incValue: 0,
        increment: function (inc) {
            this.incValue += typeof(inc) === 'number' ? inc : 1;
        }
    };

    myObject.increment();
    myObject.increment(3);
    
    // below is function invocation work around example
    myObject.doubleVal = function () {
        var that = this; // work around for inner scope
        var doubleHelper = function () {
            that.incValue = (function (x, y) {return x + y;}(that.incValue, that.incValue));
        };
        doubleHelper();
    };

    myObject.doubleVal();
    alert(myObject.incValue);
};

MYAPP.constructorExample = function () {

    var Quo = function (statusValue) {
        this.status = statusValue;
    };
    var myQuo = new Quo("hola");

    Quo.prototype.getStatus = function () {
        return this.status;
    };

    var myObject = {
        status: "beans"
    };
    alert(myQuo.getStatus() + " " + Quo.prototype.getStatus.apply(myObject)); // myObject is bound to this
};

MYAPP.applyInvocation = function () {

    var myObject = {
        incValue: 3,
        doubleVal: function () {
            var doubleHelper = function () {
                this.incValue = (function (x, y) {return x + y;}(this.incValue, this.incValue));
            };
            doubleHelper.apply(this); // pass this along to doubleHelper to get proper this reference
        }
    };

    myObject.doubleVal();
    alert(function (x, y) {return x + y;}.apply(null, [2, 7]) + " " + myObject.incValue); // null is bound to this, result is 9, incValue is 6
};

MYAPP.variableParamsExample = function () {
    var sum = function () {
        var sumReduce = R.reduce(R.add)(0);
        return sumReduce(arguments);
    };
    alert(sum(1, 2, 3, 4) + " " + sum(-1, 2, -3));
};

MYAPP.exceptionExample = function () {
    var add = function (a, b) {
        if (typeof(a) !== 'number' || typeof(b) !== 'number') {
            throw {
                name: 'TypeError',
                message: 'add only accepts 2 numbers'
            };
        }
        return a + b;
    };

    try {
        var badAdd = add("apples", "oranges");
    } catch (err) {
        alert(err.name + ": " + err.message);
    }
};

MYAPP.recursiveExample = function () {
    var fib = function innerFib (n) { // fib and innerFib both refer to the recursive function and each can be used to call recursively
        return n < 2 ? n : fib(n - 1) + innerFib(n - 2); // both recursive calls can be fib or both can be innerFib
    }; // can't refer to innerFib outside recurive functionscope

    var hanoiOutputter = function (x) {
        var hanoi = function (disc, src, aux, dst, accum) {
            if (disc > 0) {
                accum = hanoi(disc - 1, src, dst, aux, accum);
                accum += "Move disk " + disc + " from " + src + " to " + dst +"\n";
                return hanoi(disc - 1, aux, src, dst, accum);
            }
            return accum;
        };
        return hanoi(x, "src", "aux", "dst", "");
    };

    var fact = function (n) { // can't be tail recursion optimized
        var factHelper = function (x, z) {
            return x < 2 ? z : factHelper(x - 1, z * x);
        };
        return factHelper(n, 1);
    };

    alert(fib(6) + "\n" + hanoiOutputter(3) + fact(4));
};

MYAPP.typeAugmentation = function () {
    Number.method('myinteger', function () {
        return Math[this < 0 ? 'ceil' : 'floor'](this);
    });

    String.method('mytrim', function () {
        return this.replace(/^\s+|\s+$/g, '*'); // replace trailing white spaces with *
    });
    String.method('mytrim', function () { // mytrim won't be overwritten
        return this.replace(/^\s+|\s+$/g, '--');
    });

    alert((-10 / 3).myinteger() + " " + "   Trimmed    ".mytrim());
};

MYAPP.pascalTri = function () { // some rambda practice
    var calcPascalNum = function (rowNum, colNum) { // naive pascal calculation
        if (rowNum < 2 || colNum == 0 || colNum == rowNum) {
            return 1;
        }
        return calcPascalNum(rowNum - 1, colNum) + calcPascalNum(rowNum - 1, colNum - 1);
    };
    var memoPascalCalc = function () { // memoized pascal calculation
        var memo = [];
        return function calcp (rnum, cnum) {
            var resultRow = memo[rnum];
            if (!R.isArrayLike(resultRow)) {
                resultRow = [];
                memo[rnum] = resultRow;
            }
            var result = resultRow[cnum];
            if (typeof(result) !== 'number') {
                result = (cnum == 0 || cnum == rnum) ? 1 : calcp(rnum - 1, cnum) + calcp(rnum - 1, cnum - 1);
                memo[rnum][cnum] = result;
            }
            return result;
        };
    }();

    var buildPascalRow = function (rowNum, maxRowNum) {
        var getCoords = R.map(function (colNum) {
            return [rowNum, colNum];
        });
        var getPascalCoords = R.map(function (coord) {
            return [memoPascalCalc(coord[0], coord[1]), coord[1]];
        });
        var getString = R.reduce(function (accumString, pcoord) {
            return accumString + pcoord[0] + (pcoord[1] == rowNum ? "" : "_");
        })("");
        return function (rowNum, maxRowNum) {
            spaces = new Array(maxRowNum - (rowNum - 1)).join('_');
            return spaces + R.pipe(R.range(0), getCoords, getPascalCoords, getString)(rowNum + 1) + spaces;
        }(rowNum, maxRowNum);
    };
    var getPascalTri = function (numRows) {
        return R.pipe(
            R.range(0),
            R.map(function (rowNum) {
                return [rowNum, numRows - 1];
            }),
            R.reduce(function (accumString, rowInput) {
                return accumString + buildPascalRow(rowInput[0], rowInput[1]) + (rowInput[0] == rowInput[1] ? "" : "\n");
            })("")
        )(numRows);
    };

    alert(getPascalTri(5));
};

MYAPP.scopeExample = function () {
    (function () { // parans needed around function to make call to anonymous function
        var a = 3, b = 5;
        var bar = function () {
            var b = 7, c = 11;
            a += b + c; // a = 21, b = 7, c = 11
        };
        bar();
        alert(a);
    }());
};

MYAPP.closureProtectionExample = function () {
    var myObject = function () {
        var value = 0;
        return {
            increment: function (inc) {
                value += typeof(inc) === 'number' ? inc : 1;
            },
            getValue: function () {
                return value;
            }
        };
    }();

    var quo = function (status) { // lowercase q, so as not to be used with the new prefix
        return {
            getStatus: function () {
                return status;
            }
        };
    };

    myQuo = quo('amazed'); // no new prefix
    myObject.increment(3);
    myObject.increment('snoop');
    alert(myObject.getValue() + " " + myQuo.getStatus());
};

MYAPP.callbackExample = function () {
    req = prepare_the_request();
    res = send_async_request(req, function (res) { // use call backs to help handle asynchonicity
        display(res);
    });
};

MYAPP.stringAugment = function () {
    String.method('deentityify', function () {
        var entity = { // only visible to the deentityify method
            quo: '"',
            lt: '<',
            gt: '>'
        };

        return function () {
            return this.replace(/&([^&;]+);/g, function (a, b) {
                var r = entity[b];
                return typeof(r) === 'string' ? r : a;
            });
        }.apply(this);
    });

    alert("&lt;&quo;&gt;".deentityify());
};

MYAPP.modulePattern = function () {
    var serialMaker = function () {
        var prefix = ''; // only accessible inside this function scope (private to instantiated serial maker objects)
        var seq = 0; // only accessible inside this function scope (private to instantiated serial maker objects)
        return {
            setPrefix: function (p) {
                prefix = String(p);
            },
            setSeq: function (s) {
                seq = s;
            },
            gensym: function () {
                var result = prefix + seq;
                seq += 1;
                return result;
            }
        };
    };

    mySerialMaker = serialMaker();
    mySerialMaker.setPrefix('cat');
    mySerialMaker.setSeq(55);
    alert(mySerialMaker.gensym() + " " + mySerialMaker.gensym());
};

MYAPP.curryExample = function () {
    Function.method('mycurry', function () {
        var slice = Array.prototype.slice, args = slice.apply(arguments), that = this;
        return function () {
            return that.apply(null, args.concat(slice.apply(arguments)));
        };
    });

    var add9 = function (a, b) {return a + b;}.mycurry(9);
    alert(add9(1));
};

MYAPP.memoizationExample = function () {
    var fibMemo = function () {
        var memo = [0, 1];
        return function fib (n) {
            var result = memo[n];
            if (typeof(result) !== 'number') {
                result = fib(n - 1) + fib(n - 2);
                memo[n] = result;
            }
            return result;
        };
    }();

    var memoizer = function (memo, formula) {
        return function recur (n) {
            var result = memo[n];
            if (typeof(result) !== 'number') {
                result = formula(recur, n);
                memo[n] = result;
            }
            return result;
        };
    };

    var newFib = memoizer([0, 1], function (recur, n) {
        return recur(n - 1) + recur(n - 2);
    });
    var newFact = memoizer([1], function (recur, n) {
        return n * recur(n - 1);
    });

    alert(fibMemo(10) + " " + fibMemo(7) + " " + newFib(5) + " "  + newFact(4));
};

MYAPP.inheritanceExample = function () {
    Function.method('new', function () {
        var that = Object.beget(this); // new object that inherits from constructor's prototype
        var other = this.apply(that, arguments); // invoke constructor, bind this to the new object
        return (typeof(other) === 'object' && object) || that; // return object if its an object else substitute it with new object
    });

    var Mammal = function (name) {
        this.name = name;
    };
    Mammal.prototype.getName = function () {
        return this.name;
    };
    Mammal.prototype.says = function () {
        return this.saying || '';
    };

    var Cat = function (name) {
        this.name = name;
        this.saying = 'meow';
    };
    Cat.prototype = new Mammal(); // replace Cat prototype with new instance of Mammal
    Cat.prototype.getName = function () {
        return this.says() + " " + this.name + " " + this.says();
    };

    var Objmaker = function () {this.a = 'first';}; // a is first initialized on new
    Objmaker.prototype.b = 'second'; // then b is inheriteed into the new object's private [[prototype]], this can not be modified once the object is created, this is searched when a property can't be found on an object

    SubObjmaker = function () {}; // initializes the empty object {} on new
    SubObjmaker.prototype = new Objmaker(); // set prototype to new Objmaker object, this captures properties first and second into the private [[prototype]]
    SubObjmaker.prototype.c = 'third';
    var obj2 = new SubObjmaker();

    Function.method('inherits', function (Parent) {
        this.prototype = new Parent();
        return this;
    });
    Function.prototype.method = function (name, func) {
        this.prototype[name] = func; // turn off defensive check for inheritance example
        return this;
    };

    var Cat2 = function (name) { // cascade to pass this along as it is initialized and constructed
        this.name = name;
        this.saying = 'meow';
    }.
    inherits(Mammal).
    method('getName', // getName overwritten
        function () {
            return this.says() + " " + this.name + " "  + this.says();
        }
    );

    var myCat = new Cat("Rob");
    var myCat2 = new Cat2("Thelma");
    alert(myCat.getName() + " " + obj2.a + " " + obj2.b + " " + obj2.c + " " + myCat2.getName());
};

MYAPP.prototypalPattern = function () {
    var myMammal = {
        name: "Herb",
        getName: function () {
            return this.name;
        },
        says: function () {
            return this.saying || '';
        }
    };

    var myCat = Object.create(myMammal); // differential inheritance: we are specifying differences between cat and mammal with object customization
    myCat.name = "Molly";
    myCat.saying = "meow";
    myCat.getName = function () {
        return this.says() + " " + this.name + " " + this.says();
    };

    alert(myCat.getName());
};

MYAPP.functionalPattern = function () {

    /* GENERAL PATTERN
    input
        spec: value or container holding all data to create a new object (that initialization)
        my: container of secrets shared and potentially augmented along the inheritance chain as an object is constructed
    output
        that: the newly constructed object

    var constructor = function (spec, my) {
        var that, ... other private members, my = my || {}; // my is a container of secrets that can be shared by the inheritance chain
        // add shared variables and functiosn to my
        var that = NEW OBJECT; // create a new object using data from spec as necessary, perhaps by calling another constructor and passing along my which can be augmented by the called constructor
        // add privileged methods to that as a public interface
        return that;
    };
    */

    // Mammal example doesn't need a my parameter
    var mammal = function (spec) {
        var that = {};
        that.getName = function () {
            return spec.name;
        };
        that.says = function () {
            return spec.saying || '';
        };
        return that;
    };

    var cat = function (spec, my) {
        spec.saying = spec.saying || 'meow';
        var that = mammal(spec);

        my = my || {};
        spec.ending = spec.ending || 'purr';
        my.addEnding = function (isExcited) { // can be shared in the inheritance chain
            return " " + spec.ending + (isExcited ? "!" : "");
        };

        that.saysN = function (n) {
            return function helper (accumStr, x) {
                return x === 0 ? accumStr : helper(accumStr + (x === n ? "" : "-") + that.says(), x - 1);
            }("", n);
        };
        that.getName = function () {
            return that.says() + " " + spec.name + " " + that.says();
        };
        return that;
    };

    Object.method('superior', function (name) { // allow objects to create super methods
        var that = this, method = this[name];
        return function () {
            return method.apply(that, arguments); // apply the super method with that as context passing along any arguments
        };
    });

    var coolcat = function (spec, my) {
        my = my || {};
        var that = cat(spec, my);

        var superGetName = that.superior('getName'); // create a super method
        var superSaysN = that.superior('saysN'); //create another

        that.getName = function () {
            return 'like ' + superGetName() + ' baby';
        };
        that.saysN = function (n) {
            return superSaysN(n) + my.addEnding(true); // cat function call augmented my with an addEnding method
        };
        return that;
    };

    var myCoolCat = coolcat({name: 'Jacobi'});
    alert(myCoolCat.saysN(3) + ", " + myCoolCat.getName());
};

MYAPP.partsPattern = function () {
    var eventuality = function (that) {
        var registry = {};

        that.fire = function (event) { // fire an event on an object, event is a event name string or object with type property containing name of event
            var array, func, handler, i, type = typeof(event) === 'string' ? event : event.type;
            // handlers registered by the 'on' method that match event name will be invoked
            if (registry.hasOwnProperty(type)) { // if an array of handlers exist for this event type
                array = registry[type]; 

                for (i = 0; i < array.length; i += 1) { // loop through the handlers, executing in order
                    handler = array[i]; // handler is an object with a method and optional array of params
                    func = handler.method;

                    if (typeof(handler) === 'string')  { // if method is a name look up function
                        func = this[func];
                    }
                    func.apply(this, handler.parameters || [event]); // invoke handler method, passing it handlers params or event object
                }
            }
            return this;
        };

        that.on = function (type, method, parameters) { // Register an event handler
            var handler = { // create handler object
                method: method,
                parameters: parameters
            };

            if (registry.hasOwnProperty(type)) { // if registry has event type
                registry[type].push(handler); // add handler to list of event type's handlers
            } else {
                registry[type] = [handler]; // otherwise create a new list of handlers
            }
            return this;
        };

        return that;
    };

    var myObj = eventuality({name: "dope"});
    myObj.on("speak", function (s1, s2) {
        alert("shiz " + this.name + s1 + s2);
    }, [" yo", " doe"]) // the handler's method accepts 2 parameters passed along here
    .fire({type: "speak"}); // we can chain calls because on and fire return the object
};
