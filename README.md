types.js
========

A tiny (1.3kb), but essential Javascript type checking library.

Especially in non-typed scripting languages like Javascript, proper manual type checking is crucial. Unfortunately
the Javascript `typeof` operator gives us in some cases vague clues about what type some value is. `typeof []`
renders `'object'`, even in strict mode! So if we want to know if some input is an `'object'`, we are constantly fooled
by `typeof` returning `'object'` for `[]`, `null` and `/regexp/`. The latter return `'array'`, `'null'` and `'regexp'`
respectively in types.js.

types.js treats `NaN` a little different. In Javascript `NaN` (Not A Number) is of type Number, and `NaN === NaN`
returns `false`... For that I added `nan` to Type's type-definitions. Now you can test NaN with: `Types.isNaN(NaN)` or
`Types.typeof( parseInt('Not A Number!') ) === 'nan'`, both will return true.

Be careful with using types.js for variables created with `new Number()` or other non-literal type instantiations. No
support for them, because I don't want to get `'number'` on `Types.typeof( new Number(10) )`, as it actually is an object
where you can add stuff to.

To give it a little more functionality, I've added support for multiple arguments so you can test for multiple values in one
call.

For use with node.js you can install with `npm install types.js`

Basic usage:
------------

**isString** and **notString** (and the other is and not-types) are useful for single argument type checking.

**allString** (and the other all-types) are useful for checking if all given arguments are of a certain type.

**hasString** (and the other has-types) are useful for checking if one or more arguments are of a certain type.

**typeof** Returns a lowercase string representation of the type of the argument value, according to types.js type-definitions.

___

```javascript
var _= Types;											// browser
var _= require( './types.min.js' );						// node.js

// comments reflect the result
_.isString( 'Hello types.js!' );						// true
_.isString( 23456 );									// false
_.isBoolean( false );									// true
_.isArray( [1,2,3] );									// true
_.isObject( [1,2,3] );									// false
_.isObject( /myRegExp/g );								// false
_.isNaN( parseInt('generate NaN') );					// true

_.notNull('');											// true
_.notUndefined( undefined );							// false


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

