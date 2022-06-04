types.js
========
<br/>

### A tiny and fast dynamic type checker/enforcer library.

<br/>

**Why**

Because only with dynamic type checking I can be 100% sure my app handles type issues properly at run time.

<br/>

**Performance**

With reduced size and optimized for speed, the performance penalty is negligible for the majority of operations. It's roughly between 0.00002ms and 0.0001ms per call (on my 4yr old laptop).

<br/>

**Features**

- fixes NaN, array, null, etc..
- can check one or multiple values at once
- 4 convenience forms: is[type], not[type], has[type] and all[type]
- provides a typeof replacement for proper and reliable type assessment
- you can force/ensure any return value to be of any specific type
- create basic immutable 'enum' objects
- battle tested

<br/>

**Some examples**

```javascript
const { enumerate, typeOf, forceString, forceNumber, intoArray, allDefined,
	hasObject }	= require( 'types.js' );

typeOf( [] );
// 'array'
typeOf( null );
// 'null'
typeOf( /someregexp/ );
// 'regexp'
typeOf( parseInt('Not A Number!') );
// 'nan'

// when Types.autoConvert is set to true (default) you can
// auto convert/parse number to string or vice versa if possible
forceString( 12 );
// '12'
forceNumber( '12px' );
// 12
forceNumber( 'will use next arg..', 12 );
// 12

intoArray( '1 2 3' );
// ['1', '2', '3']
intoArray( '1', '2', '3' );
// ['1', '2', '3']

allDefined( 'good', false, 0 );
// true
hasObject( 'not', ['really'] );
// false

const COLORS= enumerate( ['RED', 'GREEN', 'BLUE'] );
console.log( COLORS.BLUE );
// 2

// there is much more, see below.
```

Force!
------
Force a value to be of a specific type. A replacement value can be given (as second argument) for in case the first provided value is incompatible. If none of the given values is compatible a literal of that type is returned (except for Number).

For example a look at how we can safely call a function that needs to pass a number argument, first in
"standard" JS, next with types.js force methods:
```javascript

function test( left, callback ){
	// left needs to be or become a number
	if ( typeof left !== 'number' ){
	 	left= parseInt( left, 10 );
	}

	// check for parseInt returning a number instead of NaN..
	if ( left !== left || typeof left !== 'number' ){
		left= 0;
	}

	// be safe before calling the function
	if ( typeof callback === 'function' ){
		callback( left );
	}

	// with force it's easy and readable, exactly the same result:
	left= forceNumber( left, 0 );
	forceFunction( callback )( left );
}
test( '20px', console.log );
// 20
// 20

// see below for more examples
```
Check it out, it's sweet! I've added force to types.js because I use it all the time and it seems to belong in here.
___
**node.js**
For use with node.js you can install with `npm install types.js`
___
**AMD**
```javascript
require.config({
	paths: {
		'types', [ 'path/to/types.min(.js)' ]
	}
});

require( ['types'], function( _ ){
	console.log( types.isNumber(0) );
	// true
});
```
___

Basic usage:
------------

**force[Type]** Forces a value to be of a given type, and returns that value, a given replacement, or a literal for that Type

**is[Type]** and **not[Type]** are useful for single argument type checking.

**all[Type]** is useful for checking if all given arguments are of a certain type.

**has[Type]** is useful for checking if one or more arguments are of a certain type.

**typeof** Returns a lowercase string representation of the type of the argument value, according to types.js type-definitions.

**intoArray** Converts arguments or space delimited strings into an array.

**enumerate** Creates an immutable 'enum' object

___

**some more examples:**
```javascript
// browser
var types= Types;
// in node.js with npm
var types= require( 'types.js' );

var x;
types.forceString( x );
// ''
types.forceString( null, 'ok' );
// 'ok'
types.forceString( null, [1, 2, 3] );
// ''

// when Types.autoConvert == true (default)
types.forceString(33, 'not used');
// '33'
types.forceNumber('35px');
// 35

// when Types.autoConvert == false
types.forceString(33, 'must be string');
// 'must be string'

types.forceNumber( true, 0 );
// 0
types.forceBoolean('35px');
// false
types.forceArray("you'll get an array!");
// []
types.intoArray( 'hi', 'there' );
// [ 'hi', 'there' ]
types.intoArray( ' hi   there ' );
// [ 'hi', 'there' ]
types.intoArray( '', 0, {}, [] );
// [ '', 1, {}, [] ]

var func= null;
// call a function that might not exist anymore:
types.forceFunction( func )( 'arguments for func' );
// your app won't crash, default empty function is called, returns undefined

// some default type checking:
types.isDefined()
// false
types.isString( 'Hello types.js!' );
// true
types.isString( 23456 );
// false
types.isBoolean( false );
// true
types.isArray( [1,2,3] );
// true
types.isObject( [1,2,3] );
// false
types.isObject( /myRegExp/g );
// false
types.isNaN( parseInt('generate NaN') );
// true

types.notNull('');
// true
types.notUndefined( undefined );
// false
types.isDefined( null );
// true

// check multiple values in one call:
types.allString( '', " ", 'with text' );
// true
types.allString( '', ' ', 'with text', 123 );
// false
types.allStringOrNumber( '', ' ', 'with text', 123 );
// true
types.allObject( { key: 'nice' }, [], /regexp/ig );
// false
types.allArray( [1,2,3], [{}], new RegExp('stop') );
// false
types.allArray( [1,2,3], [{}], [false, true] );
// true

types.hasString( 123, { value: 'nice' }, ['?'] );
// false
types.hasStringOrNumber( [1,2], /reg/, 'true' )
// true
types.hasFunction( 123, { value: 'nice' }, function(){} );
// true
types.hasUndefined( 'render false!', 123, null );
// false
types.hasUndefined( 'render true!', 123, undefined );
// true

// check for a types.js type definition, returns lowercase string:
types.typeof( [1,2,3] );
// 'array'
types.typeof( null );
// 'null'
types.typeof( parseInt('generate NaN') );
// 'nan'
types.typeof( new Date() );
// 'date'

// etc..
```
___
API
---

**Types.parseIntBase**
> `<Number> parseIntBase= 10`

Holds the Radix used by forceNumber, defaults to 10 (native default). Can be set to valid radixes for parseInt(). Use with extreme care because once set, all following forceNumber calls will use the new Radix!
```javascript
types.parseIntBase= 0x10; // or 16
// parse from hexadecimal '0' to 'f'

var nr= types.forceNumber( 'a' );
console.log( nr );
// 10 (decimal)
```

**Types.force[Type]**
> `<[type]> force[Type]( <[type]> value, <[type]> replacement )`

Force the return value to be of a specific type. A replacement return value can be given for in case value is incompatible. The replacement value should of course be of the same type, otherwise it will be rejected as well. If no proper value for the given type is found a literal of that type will be returned (with an exception of Number(see below)).

All force[types] share the same methodology, only applying the type denoted by the method name. See the following examples
for it's workings.

**Types.forceBoolean**
> `<Boolean> Types.forceBoolean( value, replacement )`

> Returns value if value is a types.js boolean. Otherwise it will try to convert value to be true or false. If that fails too,
> replacement will be tested for, or converted to boolean if possible. If that fails, the default types.js boolean literal
> is returned: a Boolean false

```javascript
var assert= types.forceBoolean( 'Only a true true returns true' );
console.log( assert );
// false
var assert= types.forceBoolean( NaN != NaN );
console.log( assert );
// true
```

**Types.forceString**, **Types.forceArray**, **Types.forceObject**, **Types.forceRegExp**

> Same as .forceBoolean, except for the type being processed.


**Types.forceNumber**
 > `<Number> forceNumber( <String>/<Number> value, <String>/<Number> replacement )`

Returns value if it is a types.js number or convertable to a number. Returns replacement if value is invalid or not convertable.
Returns a native Number object with a .void property set to true if no valid value and replacement were given and conversion
was not possible.

You can check value.void to see if value is ready to be fetched. If value.void is true, you can only fetch it's
default value by doing some mathematical operation on it like: `value+ 0`, otherwise you'll get an object. After
any mathematical operation on value, value.void will be undefined and value has become a 'real' number.
If value.void is true, the default value returned with `value+ 0` is 0.

If you want to be sure that forceNumber returns a 'real' number, then simply supply a 'real' number replacement,
like: `var nr= types.forceNumber(nr, 0);`, and it will never return the Number-object form.

`Types.typeof( nr= Types.forceNumber() );` returns 'number', also if `nr.void === true`

Example: make a numberFilter for arguments with forceNumber:
```javascript
function numberFilter(){
	var numbers= [];
	for( var arg in arguments ){
		var value= types.forceNumber( arguments[arg] );
		if( value.void )
			continue;
		numbers.push( value );
	}
	return numbers;
}

function forceArgsToNumber(){
	return numberFilter.apply( this, arguments );
}
console.log( forceArgsToNumber('ignore', 1, 'the', 2, 'strings!', 3) );
// [ 1, 2, 3 ]
console.log( forceArgsToNumber('1 but', '2 not', '3 unconditional!') );
// [ 1, 2, 3 ]	// returns [] when types.autoConvert is set to false
```

**Types.forceFunction**
> `<Function> Types.forceFunction( <Function> func, <Function> replacement )`

Returns func if it is a Function. forceFunction will not try/catch func for other failures.

If func or replacement are not a Function, a dummy function(){} will be returned. So you can safely call your function with
`Types.forceFunction(func)( args )`. If it is a Function, it will call func and pass the given arguments.
```javascript
// define a working function and a failing one for the examples
var showAuthor= function( name ){
	console.log( 'Author: '+ types.forceString(name) );
};
var brokenFunc= null;

var func= types.forceFunction( showAuthor );
// still the same function?
console.log( func === showAuthor );
// true

// now func will again become equal to showAuthor because forceFunction will
// return showAuthor as replacement is the only valid function found:
var func= types.forceFunction( brokenFunc, showAuthor );
console.log( func === showAuthor );
// true

// because in the following example no valid functions are passed as arguments,
// func will become a dummy function, returning undefined.
var func= types.forceFunction( brokenFunc, brokenFunc );
// save to call, but no effect
func();

// as in the example above you can see that because forceFunction always returns
// a callable function you can safely call in one go like this:
types.forceFunction( brokenFunc, showAuthor )( 'Dennis' );
// Author: Dennis

// now we call with two invalid functions:
types.forceFunction( brokenFunc, brokenFunc )( 'Dennis' );
//
// the empty dummy-function was called, no crash
```


**Types.logForce**
> `<undefined> Types.logForce( <Function> handler )`

You can call Types.logForce(); to turn on console logging for failed type checks of force[type]. If you prefer a more advanced handler than the basic provided console.log, you can simply pass that handler as argument. The handler will receive 3 arguments: <number> errLevel, <string> expectedType, <string> encounteredType.
```javascript
types.logForce();
var result= types.forceString( [], 'ok' );
// types.js - forceString: initial value is not a String

console.log( result );
// ok
```
___
**Types.intoArray**
> `<array> Types.intoArray( <[type]> arg1, ..., argN )`

intoArray is a convenience method I use mostly for flexible arguments passing, but can also be used to split
space delimited strings into an array in a non-sparse way (destructing spaces).

It accepts 3 kinds of arguments:

kind							|input								|result
------------------------|-----------------------------|--------------
space delimited strings	|'This is intoArray!'			|['This', 'is', 'intoArray!']
multiple arguments		|'This', 'is', 'intoArray!'	|['This', 'is', 'intoArray!']
array							|['This', 'is', 'intoArray!']	|['This', 'is', 'intoArray!']

All generating the same forced array.
```javascript
function testArgs( arg1, ..., argN ){

	// need to .apply with context for all arguments to pass
	var array= types.intoArray.apply( this, arguments );
	console.log( array );
}

testArgs( 'This', 'is', 'intoArray!' );
// [ 'This', 'is', 'intoArray!' ]

testArgs( ['This', 'is', 'intoArray!'] );
// [ 'This', 'is', 'intoArray!' ]

testArgs( 'This is intoArray!' );
// [ 'This', 'is', 'intoArray!' ]
```
For space delimited string parsing, all strings are trimmed and reduced to one consecutive space
to avoid a sparse array.
___
**Types.typeof** and **Types.typeOf**
> `<String> Types.typeOf( value )`

Returns a lowercase string representation of the type of value, according to types.js types. See all types.js
type-definitions below.
```javascript
var number= parseInt( 'damn NaN!' );
console.log( types.typeOf(number) );
// 'nan'
```
**Types.isBoolean**
> `<Boolean> Types.isBoolean( value )`

Returns true if the given argument is a Boolean true or false
```javascript
console.log( types.isBoolean(false) );
// true
```
**Types.notBoolean**
> `<Boolean> Types.isBoolean( value )`

Returns true if the given argument is not a Boolean true or false
```javascript
console.log( types.notBoolean('not a Boolean') );
// true
```
**Types.hasBoolean**
> `<Boolean> Types.hasBoolean( values, [value1, ..., valueN])`

Returns true if any of the given arguments is a Boolean true or false
```javascript
console.log( types.hasBoolean('the third', null, false) );
// true
```
**Types.allBoolean**
> `<Boolean> Types.allBoolean( values, [value1, ..., valueN])`

Returns true only if all given arguments are either a Boolean true or false
```javascript
console.log( types.allBoolean(false, null, true) );
// false
```

**Types.getFirst[type]**
> `<[type]> Types.getFirst[type]( [<[any type]>value1, ..., <[any type]>valueN] )`

Returns the first found argument of a specific type.

```javascript
console.log( types.getFirstString(false, 'hello', true) );
// hello
```


**Types.enum**
> `<Object> Types.enum( [<String>item1, ..., <String>itemN], <Number>offset )`

Returns an object with the given items as keys with their respective indices as values. If an offset is given, the index count starts form the value of the offset.

Please note that types.typeof(myEnum) will return 'object', as it actually is an object. Nevertheless we can test with isEnum, hasEnum, etc.. for it to be of the 'virtual' type 'enum'.
```javascript
var COLORS= types.enum( ['RED', 'BLUE', 'GREEN'] );
console.log( COLORS.BLUE );
// 1

console.log( isEnum(COLORS) );
// true

console.log Types.getFirstEnum 1, COLORS
// { RED: 0, BLUE: 1, GREEN: 2 }

// with offset, starting with 10
COLORS= types.enum( ['RED', 'BLUE', 'GREEN'], 10 );
console.log( COLORS.BLUE );
// 11
```

**Types.disableLogging**
> `<undefined> Types.disableLogging()`

Disables all logging

**Types.enableLogging**
> `<undefined> Types.enableLogging()`

Re-enables logging


**not / is / has / all'Types'**

All remaining methods are equal to the last four above, except for that they differ in the type being checked. The complete
list of all these methods:

not					|is					|has					|all
:-----------------|:----------------|:----------------|:-----------------
notBoolean			|isBoolean			|hasBoolean			|allBoolean
notString			|isString			|hasString			|allString
notNumber			|isNumber			|hasNumber			|allNumber
notStringOrNumber	|isStringOrNumber	|hasStringOrNumber|allStringOrNumber
notObject			|isObject			|hasObject			|allObject
notArray				|isArray				|hasArray			|allArray
notFunction			|isFunction			|hasFunction		|allFunction
notRegexp			|isRegexp			|hasRegexp			|allRegexp
notDate				|isDate				|hasDate				|allDate
notNull				|isNull				|hasNull				|allNull
notSymbol			|isSymbol			|hasSymbol			|allSymbol
notUndefined		|isUndefined		|hasUndefined		|allUndefined
notDefined			|isDefined			|hasDefined			|allDefined
notNaN				|isNaN				|hasNaN				|allNaN
notEnum				|isEnum				|hasEnum				|allEnum

___
**types.js type definitions:**

All types.js types

type				| definition
:--------------|:-----------------
'undefined'		| Any value that is undefined, or no value at all
'null'			| Any value that is null
'boolean'		| A boolean true or false, or the result of a predicate
'string'			| A string literal
'number'			| A number literal or a 'void' Number
'nan'				| Any value that is NaN
'object'			| An object literal {}, or any instance of Object that is not a native JS object (except for Object)
'array'			| An array literal [], or any instance of Array
'function'		| Any function or instance of Function
'regexp'			| Any regular expression literal, or any instance of RegExp
'date'			| Any instance of Date
'symbol'			| Any Symbol created with Symbol()
___

**force[Type] default return values**

type				| return value
:--------------|:-----------------
forceBoolean	| false
forceString		| ''
forceNumber		| a new Number with a .void property set to true
forceObject		| {}
forceArray		| []
forceFunction	| function(){}
forceRegExp		| /(?:)/
___
change log
==========


**1.9.0**

- adds babel transpiler as dev dependency for better cross browser compatibility

**1.8.0**

- adds 'symbol' type to types.js
- is/not/has/allSymbol now available
- adds tests for type 'symbol'
- fixes a minor flaw in autoConvert for forceNumber, it now only attempts to auto-convert values of type 'string'
___
**1.7.0**

- adds types.enum and types.enumerate, for creating enumerables
- adds types.autoConvert (default == true), to allow for disabling automatic String <=> Number conversion with forceString and forceNumber
- adds types.typeOf as alias for types.typeof
- adds types.disableLogging() and types.enableLogging()
- logForce now sends errLevel, expectedType and encounteredType to a custom log handler
- some refactoring
- removes old html style jasmine import for tests
- adds tests for types.enum
- adds tests for types.autoConvert
- updates README.md including usage examples for enum

___
**1.6.1**

- changed license to MIT
___
**1.6.0**

- adds forceRegExp
- adds logForce, now we can show a log when forceTypes encounters a type mismatch
- updates readme

___
**1.5.3**

adds getFirst<Type>, returning the first found argument of a specific type
___
**1.5.1**

Some minor changes to this readme
___
**1.5.0**

Added .intoArray method.

___
**1.4.4**

Added AMD support.
___
**1.4.2**

Optimized and reworked the codebase, and some adjustments to tests.

Updated the readme.
___
**1.3.9**

Removed 'unknown' from types.js type definitions. It was meant to be like a final state, for if no other matching type could
be found, but in the codebase as it is now, that state can never be reached.. If Javascript ever invents a brand new type,
types.js will return 'defined' on that one if I would not take action and implement support for it.

Updated the readme.

___
**1.3.5**

Changed:
-	forceNumber doesn't return 0 by default anymore. It now returns a Number object with a .void property which is set to
	true if no valid Number was given or no conversion was possible.

	Just use: `types.forceNumber( value, 0 );` to return a 0 as replacement, it only is not default anymore.

	I made this change because I wanted to be able to check if forceNumber was successful. Just a 0 can be very misleading and
	a source for bugs. NaN is a failure IMO, so I made a kind of replacement feature in forceNumber.

	You can now check for yourNumber.void to see if it is set. If .void is true, yourNumber is a Number object which is ready for
	mathemetical operation, and defaults to 0, this in contrast with NaN, which is almost totally unusable.

	example:
	```javascript
	// generate a void Number:
	var nr= forceNumber();
	console.log( nr.void );
	// true
	// don't do the following after a forceNumber without a valid replacement:
	console.log( nr );
	// { void: true }
	// instead do what cannot be done with NaN:
	console.log( 0 + nr );
	// 0
	// or check before usage:
	( nr.void )
		? console.log( 'void?', nr+= 36/ 4 );
		: console.log( nr );
	// void? 9
	etc..
	```

Updated:
-	Jasmine tests for forceNumber and isDefined
-	speed optimization for isObject

---------------------------------------------------
**1.3.1**

Added:
- change log in the readme, more convenient overview of changes.

- is/not/has/allDefined<br/>
Now you can: `if (types.isDefined(value) )`<br/>
instead of `if (types.notUndefined(value) )`

---

###license

MIT