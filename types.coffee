#	types.js - A tiny Javascript type-check library, written in Coffeescript.
#
# MIT License
#
# Copyright (c) 2014 Dennis Raymondo van der Sluis
#
# Permission is hereby granted, free of charge, to any person obtaining a copy
# of this software and associated documentation files (the "Software"), to deal
# in the Software without restriction, including without limitation the rights
# to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
# copies of the Software, and to permit persons to whom the Software is
# furnished to do so, subject to the following conditions:
#
# The above copyright notice and this permission notice shall be included in all
# copies or substantial portions of the Software.
#
# THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
# IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
# FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
# AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
# LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
# OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
# SOFTWARE.
#

"use strict"

# heavily refactored to reduce size while optimizing for speed, at the cost of readability..


# use dummy log for forceTypes until logging is enabled by user
log= ->

# used for forceTypes logging
logPrefix	= 'types.js - force'



instanceOf	= ( type, value ) -> value instanceof type
# type defaults to object, for internal can do, saves for a few bytes..
typeOf		= ( value, type= 'object' ) -> typeof value is type


LITERALS=
	'Boolean'	: false
	'String'		: ''
	'Object'		: {}
	'Array'		: []
	'Function'	: ->
	'Number'		: do ->
		number= new Number
		number.void= true
		return number
	'RegExp'		: new RegExp



TYPES=
	'Undefined'		: ( value ) -> value is undefined
	'Null'			: ( value ) -> value is null
	'Function'		: ( value ) -> typeOf value, 'function'
	'Boolean'		: ( value ) -> typeOf value, 'boolean'
	'String'			: ( value ) -> typeOf value, 'string'
	'Array'			: ( value ) -> typeOf(value) and instanceOf Array, value
	'RegExp'			: ( value ) -> typeOf(value) and instanceOf RegExp, value
	'Date'			: ( value ) -> typeOf(value) and instanceOf Date, value
	'Number'			: ( value ) -> typeOf(value, 'number') and (value is value) or ( typeOf(value) and instanceOf(Number, value) )
	'Object'			: ( value ) -> typeOf(value) and (value isnt null) and not instanceOf(Boolean, value) and not instanceOf(Number, value) and not instanceOf(Array, value) and not instanceOf(RegExp, value) and not instanceOf(Date, value)
	'NaN'				: ( value ) -> typeOf(value, 'number') and (value isnt value)
	'Defined'		: ( value ) -> value isnt undefined

TYPES.StringOrNumber= (value) -> TYPES.String(value) or TYPES.Number(value)



# define the main object that this module will return
Types= types=

	# used by forceNumber to set the Radix, defaults to decimals
	parseIntBase: 10

	logForce: ( logger ) ->
		return log= logger if types.isFunction logger
		return log= types.forceFunction(console.log) if types.isObject console




createForce= ( type ) ->

	# convert value in case initial type test failed. failed conversion returns undefined
	convertType= ( value ) ->
		switch type
			when 'Number' then return value if (types.isNumber value= parseInt value, types.parseIntBase) and not value.void
			when 'String' then return value+ '' if types.isStringOrNumber value
			else return value if Types[ 'is'+ type ] value

	# the forctType method, returns the type's defaultValue, if both value and replacement are not of, or convertible to, type
	return ( value, replacement ) ->

		valueType= types.typeof value
		return value if value? and undefined isnt value= convertType value
		log logPrefix+ type+ ': invalid first argument with type: \''+ valueType+ '\''

		if types.isDefined replacement
			replacementType= types.typeof replacement
			return replacement if replacement? and undefined isnt replacement= convertType replacement
			log logPrefix+ type+ ': invalid second argument with type: \''+ replacementType+ '\''

		log logPrefix+ type+ ': forcing return value to type '+ type
		return LITERALS[ type ]




# test multiple values(arguments) for a given predicate. returns breakState if predicate is breakState for some value
# when no break occured, ! breakState will be returned.
testValues= ( predicate, breakState, values= [] ) ->

	# testing 'has' or 'all' for 'undefined' should return true on calls without arguments
	return ( predicate is TYPES.Undefined ) if values.length < 1

	for value in values
		return breakState if predicate(value) is breakState

	return not breakState



# generate all the is/not/has/all/force'Types'
breakIfEqual= true
do -> for name, predicate of TYPES then do ( name, predicate ) ->

	Types[ 'is'+ name ]	= predicate
	Types[ 'not'+ name ]	= ( value ) -> not predicate value
	Types[ 'has'+ name ]	= -> testValues predicate, breakIfEqual, arguments
	Types[ 'all'+ name ]	= -> testValues predicate, not breakIfEqual, arguments

	# create only forceType of types found in LITERALS
	Types[ 'force'+ name ]= createForce name if name of LITERALS

	Types[ 'getFirst'+ name ]= ( values... ) ->
		for value in values
			return value if Types[ 'is'+ name ] value



Types.intoArray= ( args... ) ->
	if args.length < 2

		if types.isString args[ 0 ]
			# to string, trim, limit to one consecutive space, back to array
			args= args.join( '' ).replace( /^\s+|\s+$/g, '' ).replace( /\s+/g, ' ' ).split ' '
		else if types.isArray args[ 0 ]
			args= args[ 0 ]

	return args



Types.typeof= ( value ) ->
	for name, predicate of TYPES
		return name.toLowerCase() if predicate( value ) is true




if define? and ( 'function' is typeof define ) and define.amd
	define 'types', [], -> Types

if typeof module isnt 'undefined'
	module.exports= Types

if typeof window isnt 'undefined'
	window.Types= Types