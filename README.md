types.js
========
<br/>
A tiny (1.8kb), but essential Javascript type checking library.

Especially in non-typed scripting languages like Javascript, proper manual type checking is crucial.
Because type checking in Javascript is such a mess, I decided to make a library with clear standards
I can build upon.

A few quick examples with types.js:
```javascript
_.typeof( [] );							// 'array'
_.typeof( null );						// 'null'
_.typeof( /someregexp/ );				// 'regexp'
_.typeof( parseInt('Not A Number!') );	// 'nan'
_.forceString( 123 );					// '123'
_.allDefined( 'good', false, null );	// true (null !== undefined in strict mode)
_.hasObject( 'not', 'really' );			// false
// there is much more! see below.
```
Force!
------
Force some value to be of some type. A replacement value can be given in case value is invalid, without replacement
a default literal of the forced type will be returned.
```javascript
var left= '500px';
var callback= null;
// now some 10 lines of code to be save:
if ( typeof left === 'string' ){
		left= parseInt( left, 10 );
}
// check if parseInt returned NaN..
if ( left !== left || typeof left !== 'number' )
	left= 100;
}
if ( typeof callback !== 'function' ){
	callback= function(){}
}
callback( left );
// 2 lines of code with force, and a better read if you ask me:
left=  _.forceNumber( left, 100 );
_.forceFunction( callback )( left );
// see below for more examples
```
Check it out, it's sweet! I've added force to types.js because I use it all the time and it seems to belong in here.
___
For use with node.js you can install with `npm install types.js`
___

Basic usage:
------------

**forceString** Forces a value to be of a given type, and returns that value, a replacement, or it's literal default.

**isString** and **notString** (and the other is and not-types) are useful for single argument type checking.

**allString** (and the other all-types) are useful for checking if all given arguments are of a certain type.

**hasString** (and the other has-types) are useful for checking if one or more arguments are of a certain type.

**typeof** Returns a lowercase string representation of the type of the argument value, according to types.js type-definitions.
___

**some examples:**
```javascript
var _= Types;									// browser
var _= require( 'types.js' );					// in node.js with npm

var x;
// initialize a variable and be sure what type it will have in any case:
x= _.forceString();								// (empty String)
x= _.forceString( null, 'ok' );					// ok (as String)
x= _.forceString( null, [1, 2, 3] );			// (empty String)
x= _.forceString(33);							// 33 (as String)
x= _.forceNumber('35px');						// 35 (as Number)
x= _.forceNumber( true, function(){} );			// 0 (as Number)
x= _.forceBoolean('35px');						// false (as Boolean)

// initialize your object:
var Client= function( name ){
	this.name= _.forceString( name, 'no name given yet' );
};
var unborn= new Client();
console.log( unborn.name );						// 'no name given yet'

var func= null;
// call a function that might not exist anymore:
_.forceFunction( func )( 'some arguments', 'for func' );
// no crash, default empty function is called, returns undefined

// or add a replacement function in case the first one fails:
var message= _.forceFunction( func, function(args){
	return 'replacement function used '+ args;
 })( 'with some arguments' );
 console.log( message );
 // replacement function used with some arguments

// some default type checking:
x= _.isString( 'Hello types.js!' );				// true
x= _.isString( 23456 );							// false
x= _.isBoolean( false );						// true
x= _.isArray( [1,2,3] );						// true
x= _.isObject( [1,2,3] );						// false
x= _.isObject( /myRegExp/g );					// false
x= _.isNaN( parseInt('generate NaN') );			// true

x= _.notNull('');								// true
x= _.notUndefined( undefined );					// false
x= _.isDefined( null );							// true

// check multiple values in one call:
x= _.allString( '', " ", 'with text' );						// true
x= _.allString( '', ' ', 'with text', 123 );				// false
x= _.allStringOrNumber( '', ' ', 'with text', 123 );		// true
x= _.allObject( { key: 'nice' }, [], /regexp/ig );			// false
x= _.allArray( [1,2,3], [{}], new RegExp('stop') );			// false
x= _.allArray( [1,2,3], [{}], [false, true] );				// true

x= _.hasString( 123, { value: 'nice' }, ['?'] );			// false
x= _.hasStringOrNumber( [1,2], /reg/, 'true' )				// true
x= _.hasFunction( 123, { value: 'nice' }, function(){} );	// true
x= _.hasUndefined( 'render false!', 123, null );			// false
x= _.hasUndefined( 'render true!', 123, undefined );		// true

// check for a types.js type definition, returns lowercase string:
x= _.typeof( [1,2,3] );										// 'array'
x= _.typeof( null );										// 'null'
x= _.typeof( parseInt('generate NaN') );					// 'nan'
x= _.typeof( new Date() );									// 'date'
// etc..
```
___
API
---

**Types.parseIntBase**
> `<Number> parseIntBase= 10`

> Holds the Radix used by forceNumber, defaults to decimals. Can be set to valid radixes for parseInt().

**Types.forceBoolean**
> `<String> Types.forceBoolean( value, replacement )`

> Returns value if value is of type Boolean. Otherwise it will try to convert value to be a Boolean. If that
> fails too, replacement will be tested for, or converted to, 'boolean' if possible. If that fails, the default
> types.js boolean literal is returned: a Boolean `false`

**Types.forceString**, **Types.forceArray**, **Types.forceObject**

> Just like forceBoolean, only applying the type denoted by the method name. See the force'Type' literals for
> the different methods below.

**Types.forceNumber**
> `<Number> forceNumber( <String>/<Number> value, <String>/<Number> replacement )`

> Returns value if it is a Number or convertable to a Number. Returns replacement if value is invalid or not convertable.
> Returns a Number object with a .void property set to true if no valid value and replacement were given or no conversion was possible.

> You can check yourNumber.void to see if yourNumber is set to a valid number. If .void is true, yourNumber is not set to a
> number, but to a Number object which is ready for mathemetical operation, and defaults to 0.

> `Types.typeof( Types.forceNumber() );` returns 'number', as it is a Number and you can use it as number.

**Types.forceFunction**
> `<Function> Types.forceFunction( <Function> func, <Function> replacement )`

> Returns func if it is a Function. So you can call your function with Types.forceFunction(func)( args ). If it is
> a Function, it will call and pass the given arguments.

> forceFunction will not try/catch func for other failures.

> If func or replacement are not of type Function, a dummy function will be called returning undefined.

**Types.typeof**
> `<String> Types.typeof( value )`

> Returns a lowercase string representation of the type of value, according to types.js types. See all types.js
> type-definitions below.

**Types.isBoolean**
> `<Boolean> Types.isBoolean( value )`

> Returns true if the given argument is a Boolean true or false

**Types.notBoolean**
> `<Boolean> Types.isBoolean( value )`

> Returns true if the given argument is not a Boolean true or false

**Types.hasBoolean**
> `<Boolean> Types.hasBoolean( values, [value1, ..., valueN])`

> Returns true if any of the given arguments is a Boolean true or false

**Types.allBoolean**
> `<Boolean> Types.allBoolean( values, [value1, ..., valueN])`

> Returns true only if all given arguments are either a Boolean true or false

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

____________________________
**types.js type definitions:**

'boolean', 'string', 'number', 'object', 'array', 'function', 'regexp', 'date', 'null', 'undefined', 'nan', 'unknown'

____________________________
**force'Type' method and default literals**

> format: `<'Type'> force'Type'( <any type> value, <'Type'> replacement )`
<br/><br/>
> The literals returned by default:

forceBoolean	|forceString	|forceNumber	|forceObject		|forceArray		|forceFunction
---------------|--------------|--------------|---------------|--------------|--------------
`false`			|`''`				|`0`				|`{}`				|`[]`				|`function(){}`

change log
==========

1.3.5

Changed:
-	forceNumber doesn't return 0 by default anymore. It now returns a Number object with a .void property which is set to
	true if no valid Number was given or no conversion was possible.

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
1.3.1

Added:
- change log in the readme, more convenient overview of changes.

- is/not/has/allDefined<br/>
Now you can: `if (_.isDefined(value) )`<br/>
instead of `if (_.notUndefined(value) )`