# types.js - A tiny Javascript type-check library, written in Coffeescript.
#
# Copyright (c) 2014 Dennis Raymondo van der Sluis
#
# This program is free software: you can redistribute it and/or modify
#     it under the terms of the GNU General Public License as published by
#     the Free Software Foundation, either version 3 of the License, or
#     (at your option) any later version.
#
#     This program is distributed in the hope that it will be useful,
#     but WITHOUT ANY WARRANTY; without even the implied warranty of
#     MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
#     GNU General Public License for more details.
#
#     You should have received a copy of the GNU General Public License
#     along with this program.  If not, see <http://www.gnu.org/licenses/>

"use strict"

# heavily refactored to reduce size while optimizing for speed, at the cost of readability..

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

Types= _=
	# used by forceNumber to set the Radix, defaults to decimals
	parseIntBase: 10


createForce= ( type ) ->

	# convert value in case initial type test failed. failed conversion returns undefined
	convertType= ( value ) ->
		switch type
			when 'Number' then return value if (_.isNumber value= parseInt value, _.parseIntBase) and not value.void
			when 'String' then return value+ '' if _.isStringOrNumber value
			else return value if Types[ 'is'+ type ] value

	# the forctType method, returns the type's defaultValue, if both value and replacement are not of, or convertible to, type
	return ( value, replacement ) ->

		return value if value? and undefined isnt value= convertType value
		return replacement if replacement? and undefined isnt replacement= convertType replacement
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

		if _.isString args[ 0 ]
			# to string, trim, limit to one consecutive space, back to array
			args= args.join( '' ).replace( /^\s+|\s+$/g, '' ).replace( /\s+/g, ' ' ).split ' '
		else if _.isArray args[ 0 ]
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