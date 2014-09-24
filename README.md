Type.js
=========

A tiny (1.2kb), but essential Javascript type checking library.

Especially in non-typed scripting languages like Javascript, proper manual type checking is crucial. Unfortunately
the Javascript `typeof` operator gives us in some cases vague clues about what type some value is. `typeof []`
renders `'object'`, even in strict mode! So if we want to know if some input is an `'object'`, we are constantly fooled
by `typeof` returning `'object'` for `[]`, `null` and `/regexp/`. The latter return `'array'`, `'null'` and `'regexp'`
respectively in Type.js.

Type.js treats `NaN` a little different. In Javascript `NaN` (Not A Number) is of type Number, and `NaN === NaN`
returns `false`... For that I added `nan` to Type's type-definitions. Now you can test NaN with: `Type.isNaN(NaN)` or
`Type.typeof( parseInt('Not A Number!') ) === 'nan'`, both will return true.

Be careful with using Type.js for variables created with `new Number()` or other non-literal type instantiations. No
support for them, because I don't want to get `'number'` on `Type.typeof( new Number(10) )`, as it actually is an object
where you can add stuff to.

To give it a little more functionality, I've added support for multiple arguments so you can test for multiple values in one
call.

Basic usage:
------------

**isString** and **notString** (and the other is and not-types) are useful for single argument type checking.

**allString** (and the other all-types) are useful for checking if all given arguments are of a certain type.

**hasString** (and the other has-types) are useful for checking if one or more arguments are of a certain type.

**typeof** Returns a lowercase string representation of the type of the argument value, according to Type.js type-definitions.

___

```javascript
var _= Type;											// browser
var _= require( './type.js' );							// node.js

// comments reflect the result
_.isString( 'Hello Type.js!' );							// true
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
_.allObject( { key: 'nice' }, [], /regexp/ig );			// false
_.allArray( [1,2,3], [{}], new RegExp('stop') );		// false
_.allArray( [1,2,3], [{}], [false, true] );				// true

_.hasString( 123, { value: 'nice' }, ['?'] );			// false
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

**Type.typeof**
> `<String> Type.typeof( value )`

> Returns a lowercase string representation of the type of value, according to Type.js types.

**Type.isBoolean**
> `<Boolean> Type.isBoolean( value )`

> Returns true if the given argument is a Boolean true or false

**Type.notBoolean**
> `<Boolean> Type.isBoolean( value )`

> Returns true if the given argument is not a Boolean true or false

**Type.hasBoolean**
> `<Boolean> Type.hasBoolean( values, [value1, ..., valueN])`

> Returns true if any of the given arguments is a Boolean true or false

**Type.allBoolean**
> `<Boolean> Type.allBoolean( values, [value1, ..., valueN])`

> Returns true only if all given arguments are either a Boolean true or false

All remaining methods are equal to the last four above, except for that they differ in the type being checked. The complete
list of all these methods:


not					|is						|has						|all
:-----------------|:-------------------|:-------------------|:------------------
Type.notBoolean	|Type.isBoolean		|Type.hasBoolean		|Type.allBoolean
Type.notString		|Type.isString			|Type.hasString		|Type.allString
Type.notNumber		|Type.isNumber			|Type.hasNumber		|Type.allNumber
Type.notObject		|Type.isObject			|Type.hasObject		|Type.allObject
Type.notArray		|Type.isArray			|Type.hasArray			|Type.allArray
Type.notFunction	|Type.isFunction		|Type.hasFunction		|Type.allFunction
Type.notRegexp		|Type.isRegexp			|Type.hasRegexp		|Type.allRegexp
Type.notDate		|Type.isDate			|Type.hasDate			|Type.allDate
Type.notNull		|Type.isNull			|Type.hasNull			|Type.allNull
Type.notUndefined	|Type.isUndefined		|Type.hasUndefined	|Type.allUndefined
Type.notNaN			|Type.isNaN				|Type.hasNaN			|Type.allNaN

