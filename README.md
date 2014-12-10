types.js
========
<br/>
A tiny(1.9Kb) Javascript type checker/enforcer library.

- fixes NaN, array, null, etc..
- checks one or multiple arguments at once
- 4 convenience forms: isNumber, notNumber, hasNumber and allNumber (with any type of choice)
- can force a value to be of some type, with optional value if conversion is not possible

___
**A few quick examples:**
```javascript
_.typeof( [] );								// 'array'
_.typeof( null );							// 'null'
_.typeof( /someregexp/ );					// 'regexp'
_.typeof( parseInt('Not A Number!') );		// 'nan'
_.forceString( 123 );						// '123'
_.forceNumber( '123mm' );					// 123
_.forceNumber( 'use next arg..', 123 );		// 123
_.allDefined( 'good', false, 0 );			// true
_.hasObject( 'not', 'really' );				// false
// there is much more, see below.
```
Force!
------
Force some value to be of some type. A replacement value can be given in case value is invalid, without replacement
a literal of that type is returned (except for Number).

A quick example to show how we can safely call a function that needs to pass a number argument, first in standard JS, next with
types.js force methods:
```javascript
var left= '500px';
var callback= null;
if ( typeof left !== 'number' ){
 		left= parseInt( left, 10 );
 }
// check for parseInt returning NaN..
if ( left !== left || typeof left !== 'number' ){
	left= 100;
}
// be safe before calling the function
if ( typeof callback !== 'function' ){
	callback= function(){}
}
callback( left );

// now with force, exactly the same result:
left=  _.forceNumber( left, 100 );
_.forceFunction( callback )( left );
// see below for more examples
```
Check it out, it's sweet! I've added force to types.js because I use it all the time and it seems to belong in here.
___
**node.js**
For use with node.js you can install with `npm install types.js`

**AMD**
When using AMD, you can load types.js like so:
```javascript
require.config({
	paths: {
		'types', [ 'path/to/types.min' ]
	}
});

require( ['types'], function( Types ){
	console.log( Types.isNumber(0) );
	// true
});
```
___

Basic usage:
------------

**force'Type'** Forces a value to be of a given type, and returns that value, a given replacement, or a literal for that Type

**is'Type'** and **not'Type'** are useful for single argument type checking.

**all'Type'** is useful for checking if all given arguments are of a certain type.

**has'Type'** is useful for checking if one or more arguments are of a certain type.

**typeof** Returns a lowercase string representation of the type of the argument value, according to types.js type-definitions.
___

**some more examples:**
```javascript
var _= Types;									// browser
var _= require( 'types.js' );					// in node.js with npm

var x;
// initialize a variable and be sure what type it will have in any case:
_.forceString();								// '' (empty String)
_.forceString( null, 'ok' );					// 'ok' (as String)
_.forceString( null, [1, 2, 3] );				// '' (empty String)
_.forceString(33, 'not used');					// '33' (as String)
_.forceNumber('35px');							// 35 (as Number)
_.forceNumber( true, 0 );						// 0 (as Number)
_.forceBoolean('35px');							// false (as Boolean)
_.forceArray("you'll get an array!");			// []

var func= null;
// call a function that might not exist anymore:
_.forceFunction( func )( 'arguments for func, or replacement' );
// no crash, default empty function is called, returns undefined

// some default type checking:
_.isDefined()									// false
_.isString( 'Hello types.js!' );				// true
_.isString( 23456 );								// false
_.isBoolean( false );							// true
_.isArray( [1,2,3] );							// true
_.isObject( [1,2,3] );							// false
_.isObject( /myRegExp/g );						// false
_.isNaN( parseInt('generate NaN') );			// true

_.notNull('');									// true
_.notUndefined( undefined );					// false
_.isDefined( null );							// true

// check multiple values in one call:
_.allString( '', " ", 'with text' );					// true
_.allString( '', ' ', 'with text', 123 );				// false
_.allStringOrNumber( '', ' ', 'with text', 123 );		// true
_.allObject( { key: 'nice' }, [], /regexp/ig );			// false
_.allArray( [1,2,3], [{}], new RegExp('stop') );		// false
_.allArray( [1,2,3], [{}], [false, true] );				// true

_.hasString( 123, { value: 'nice' }, ['?'] );			// false
_.hasStringOrNumber( [1,2], /reg/, 'true' )				// true
_.hasFunction( 123, { value: 'nice' }, function(){} );	// true
_.hasUndefined( 'render false!', 123, null );			// false
_.hasUndefined( 'render true!', 123, undefined );		// true

// check for a types.js type definition, returns lowercase string:
_.typeof( [1,2,3] );									// 'array'
_.typeof( null );										// 'null'
_.typeof( parseInt('generate NaN') );					// 'nan'
_.typeof( new Date() );									// 'date'
// etc..
```
___
API
---

**Types.parseIntBase**
> `<Number> parseIntBase= 10`

Holds the Radix used by forceNumber, defaults to decimals. Can be set to valid radixes for parseInt(). Note that once set, all
following forceNumber calls will use the new Radix.
```javascript
_.parseIntBase= 0xf;
// parse from hexadecimal, _.forceNumber will parse character 'a'
var nr= _.forceNumber( 'a linefeed' );
console.log( nr );
// 10 (decimal)
```

**Types.force'Type'**
> `<'Type'> force'Type'( <any type> value, <'Type'> replacement )`

Force the return value to be of a particular type. A replacement value can be given for in case value is invalid, if also no replacement
is given, a literal of the type will be returned, with an exception to Number(see below).

All force'Types' share the same methodology, only applying the type denoted by the method name. See the following examples
for it's workings.

**Types.forceBoolean**
> `<String> Types.forceBoolean( value, replacement )`

> Returns value if value is a types.js boolean. Otherwise it will try to convert value to be true or false. If that fails too,
> replacement will be tested for, or converted to boolean if possible. If that fails, the default types.js boolean literal
> is returned: a Boolean false

```javascript
var assert= _.forceBoolean( 'Only a true true returns true' );
console.log( assert );
// false
var assert= _.forceBoolean( NaN != NaN );
console.log( assert );
// true
```

**Types.forceString**, **Types.forceArray**, **Types.forceObject**

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
like: `var nr= _.forceNumber(nr, 0);`, and it will never return the Number-object form.

`Types.typeof( nr= Types.forceNumber() );` returns 'number', also if `nr.void === true`

Example: make a numberFilter for arguments with forceNumber:
```javascript
function numberFilter(){
	var numbers= [];
	for( var arg in arguments ){
		var value= _.forceNumber( arguments[arg] );
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
// [ 1, 2, 3 ]
```

**Types.forceFunction**
> `<Function> Types.forceFunction( <Function> func, <Function> replacement )`

Returns func if it is a Function. forceFunction will not try/catch func for other failures.

If func or replacement are not a Function, a dummy function(){} will be returned. So you can safely call your function with
`Types.forceFunction(func)( args )`. If it is a Function, it will call func and pass the given arguments.
```javascript
// define a working function and a failing one for the examples
var showAuthor= function( name ){
	console.log( 'Author: '+ _.forceString(name) );
};
var brokenFunc= null;

var func= _.forceFunction( showAuthor );
// still the same function?
console.log( func === showAuthor );
// true

// now func will again become equal to showAuthor because forceFunction will
// return showAuthor as replacement is the only valid function found:
var func= _.forceFunction( brokenFunc, showAuthor );
console.log( func === showAuthor );
// true

// because in the following example no valid functions are passed as arguments,
// func will become a dummy function, returning undefined.
var func= _.forceFunction( brokenFunc, brokenFunc );
// save to call, but no effect
func();

// as in the example above you can see that because forceFunction always returns
// a callable function you can safely call in one go like this:
_.forceFunction( brokenFunc, showAuthor )( 'Dennis' );
// Author: Dennis

// now we call with two invalid functions:
_.forceFunction( brokenFunc, brokenFunc )( 'Dennis' );
//
// the empty dummy-function was called, no crash
```
___
**Types.typeof**
> `<String> Types.typeof( value )`

Returns a lowercase string representation of the type of value, according to types.js types. See all types.js
type-definitions below.
```javascript
var number= parseInt( 'damn NaN!' );
console.log( _.typeof(number) );
// 'nan'
```
**Types.isBoolean**
> `<Boolean> Types.isBoolean( value )`

Returns true if the given argument is a Boolean true or false
```javascript
console.log( _.isBoolean(false) );
// true
```
**Types.notBoolean**
> `<Boolean> Types.isBoolean( value )`

Returns true if the given argument is not a Boolean true or false
```javascript
console.log( _.notBoolean('not a Boolean') );
// true
```
**Types.hasBoolean**
> `<Boolean> Types.hasBoolean( values, [value1, ..., valueN])`

Returns true if any of the given arguments is a Boolean true or false
```javascript
console.log( _.hasBoolean('the third', null, false) );
// true
```
**Types.allBoolean**
> `<Boolean> Types.allBoolean( values, [value1, ..., valueN])`

Returns true only if all given arguments are either a Boolean true or false
```javascript
console.log( _.allBoolean(false, null, true) );
// false
```
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
notUndefined		|isUndefined		|hasUndefined		|allUndefined
notDefined			|isDefined			|hasDefined			|allDefined
notNaN				|isNaN				|hasNaN				|allNaN

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

___

**force'Type' default return values**

type				| return value
:--------------|:-----------------
forceBoolean	| false
forceString		| ''
forceNumber		| a new Number with a .void property set to true
forceObject		| {}
forceArray		| []
forceFunction	| function(){}
___
change log
==========
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

	Just use: `_.forceNumber( value, 0 );` to return a 0 as replacement, it only is not default anymore.

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
Now you can: `if (_.isDefined(value) )`<br/>
instead of `if (_.notUndefined(value) )`