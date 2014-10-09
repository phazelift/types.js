types.js
========
<br/>
A tiny (1.7kb), but essential Javascript type checking library.

Especially in non-typed scripting languages like Javascript, proper manual type checking is crucial.
Because type checking in Javascript is so confusing and contradictory sometimes, I decided to make a
definitive library for myself, with for me understandable standards.

Standard Javascript `(NaN !== NaN) == true` still freakes me out, I just don't like to see that kind of stuff in
my code. With types.js I can now test NaN with: `Types.isNaN(NaN)` or `Types.typeof( parseInt('Not A Number!') ) === 'nan'`,
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

var x;
x= _.forceString();								// (empty String)
x= _.forceString( null, 'ok' );					// ok (as String)
x= _.forceString( null, [1, 2, 3] );			// (empty String (== default literal) )
x= _.forceString(33);							// 33 (as String)
x= _.forceNumber('35px');						// 35 (as Number)
x= _.forceNumber( true, function(){} );			// 0 (as Number)
x= _.forceBoolean('35px');						// false (as Boolean)

MyObject= function( data ){
	this.data= _.forceString( data );			// (empty string if data is not of type string or number)
	// or
	this.data= _.forceString( data, 'default init');	// default init
}

var invalidMethod= null;
_.forceFunction( invalidMethod, function(){
	return 'replacement function used.';
 })();											// replacement function used

 x= _.forceFunction( invalidMethod, /regexp/ )();	// (default empty/nop function is called)

x= _.isString( 'Hello types.js!' );				// true
x= _.isString( 23456 );							// false
x= _.isBoolean( false );						// true
x= _.isArray( [1,2,3] );						// true
x= _.isObject( [1,2,3] );						// false
x= _.isObject( /myRegExp/g );					// false
x= _.isNaN( parseInt('generate NaN') );			// true

x= _.notNull('');								// true
x= _.notUndefined( undefined );					// false

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

**Types.forceString** **Types.forceNumber** **Types.forceArray** **Types.forceObject** **Types.forceFunction**
> Just like forceBoolean, only applying the type denoted by the method name. See the forceType literals for
> the different methods below.

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
**force'Type' method and default literals**

> format: `<'Type'> force'Type'( <any type> value, <'Type'> replacement )`
<br/><br/>
> The literals returned by default:

forceBoolean	|forceString	|forceNumber	|forceObject		|forceArray		|forceFunction
---------------|--------------|--------------|---------------|--------------|--------------
`false`			|`''`				|`0`				|`{}`				|`[]`				|`function(){}`
