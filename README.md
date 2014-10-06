types.js
========
<br/>
A tiny (1.8kb), but essential Javascript type checking library.

Especially in non-typed scripting languages like Javascript, proper manual type checking is crucial.
Because type checking in Javascript is so confusing and contradictory sometimes, I decided to make a
definitive library for myself, with for me understandable standards.

`(NaN !== NaN) == true` still freakes me out, I just don't like to see that kind of stuff in my code.
With types.js I can now test NaN with: `Types.isNaN(NaN)` or `Types.typeof( parseInt('Not A Number!') ) === 'nan'`,
both will return true.

Object is another one; `typeof ['array']` renders `'object'`, even in strict mode. So if we want to know
if some input is an `'object'`, we are constantly fooled by `typeof` returning `'object'` for `[]`, `null`
and `/regexp/`. With types.js the latter returns `'array'`, `'null'` and `'regexp'` respectively.

Be careful with using types.js for variables created with `new Number()` or other non-literal instantiations. No
support for them, because I don't want to get `'number'` on `Types.typeof( new Number(10) )`, as it actually is an object
where you can add stuff to.

I've added support for multiple arguments so we can test for multiple values in one call. For save variable
instantiation/usage or save function calls I added forceType, ideal for testing a value and setting it (or a replacement)
to a variable in a definite type, in one statement.
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

_.forceString();								// (empty String)
_.forceString( null, 'ok' );					// ok (as String)
_.forceString( null, [1, 2, 3] );				// (empty String (== default literal) )
_.forceString(33);								// 33 (as String)
_.forceNumber('35px');							// 35 (as Number)
_.forceNumber( true, function(){} );			// 0 (as Number)
_.forceBoolean('35px');							// false (as Boolean)

MyObject= function( data ){
	this.data= _.forceString( data );			// (empty string if data is not of type string or number)
	// or
	this.data= _.forceString( data, 'default init');	// default init
}

var invalidMethod= null;
_.forceFunction( invalidMethod, function(){
	return 'replacement function used.';
 })();											// replacement function used

 _.forceFunction( invalidMethod, /regexp/ )();	// (default empty/nop function is called)

_.isString( 'Hello types.js!' );				// true
_.isString( 23456 );							// false
_.isBoolean( false );							// true
_.isArray( [1,2,3] );							// true
_.isObject( [1,2,3] );							// false
_.isObject( /myRegExp/g );						// false
_.isNaN( parseInt('generate NaN') );			// true

_.notNull('');									// true
_.notUndefined( undefined );					// false

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

> Holds the Radix used by forceNumber, defaults to decimals. Can be set to valid radixes for parseInt().

**Types.forceBoolean**
> `<String> Types.forceBoolean( value, replacement )`

> Returns value if value is of type Boolean. Otherwise it will try to convert value to be a Boolean. If that
> fails too, replacement will be tested for, or converted to, 'boolean' if possible. If that fails, the default
> types.js boolean literal is returned: a Boolean `false`

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
notNaN				|isNaN				|hasNaN				|allNaN

____________________________
**types.js type definitions:**

'boolean', 'string', 'number', 'object', 'array', 'function', 'regexp', 'date', 'null', 'undefined', 'nan', 'unknown'

____________________________
**force'Type' and default literals**

> format: `<string> forceString( <any type> value, <string> replacement )`

forceBoolean	|forceString	|forceNumber
---------------|--------------|--------------
Boolean `false`|String `''`	|Number `0`

forceObject		|forceArray		|forceFunction
---------------|--------------|--------------
Object `{}`		|Array `[]`		|Function `function(){}`

___