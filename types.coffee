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

# I refactored types.js quite a bit to make it smaller and faster, at the cost of readability.

# create a Number to work with, and attach .void so you can test before fetching
emptyNumber= ->
	number= new Number
	number.void= true
	return number

Types=
	# used by forceNumber to set the Radix, defaults to decimals
	parseIntBase: 10

# types.js default literals, used for literal instantiation when forceType failed
literals=
	'Boolean'	: false
	'String'		: ''
	'Number'		: emptyNumber()
	'Object'		: {}
	'Array'		: []
	'Function'	: ->

# returns a function that returns a value tested for a certain type.
createForce= ( type ) ->

	# will try to convert value in case initial type test failed. failed conversion returns false
	convertType= ( value ) ->
		switch type
			when 'Number' then return value if Types.isNumber value= parseInt value, Types.parseIntBase
			when 'String' then return value+ '' if Types.isStringOrNumber value
			else return value if Types[ 'is'+ type ] value
		return false

	# the actual forctType method, returns the type's literal, if both value and replacement are not of, or convertible to, type
	return ( value, replacement ) ->
		return value if false isnt value= convertType value
		return replacement if false isnt replacement= convertType replacement
		return literals[ type ]

# test multiple values for a given predicate. returns breakState if predicate is breakState for some value
# when no break occured, ! breakState will be returned.
testValues= ( predicate, breakState, values= [] ) ->
	if values.length < 1
		# testing 'has' or 'all' for 'undefined' should return true on calls without arguments
		return true if predicate is typesPredicates.Undefined
		return false
	for value in values
		return breakState if (predicate value) is breakState
	return not breakState

typesPredicates=
	'Undefined'		: (value) -> value is undefined
	'Null'			: (value) -> value is null
	'Boolean'		: (value) -> typeof value is 'boolean'
	'String'			: (value) -> typeof value is 'string'
	'Function'		: (value) -> typeof value is 'function'
	'Number'			: (value) -> (typeof value is 'number') and (value is value) or ( (typeof value is 'object') and (value instanceof Number) and value.void )
	'Array'			: (value) -> (typeof value is 'object') and (value instanceof Array)
	'RegExp'			: (value) -> (typeof value is 'object') and (value instanceof RegExp)
	'Date'			: (value) -> (typeof value is 'object') and (value instanceof Date)
	'Object'			: (value) -> (typeof value is 'object') and (value isnt null) and not (value instanceof Array) and not (value instanceof RegExp) and not (value instanceof Date)
	'NaN'				: (value) -> (typeof value is 'number') and (value isnt value)
	'Defined'		: (value) -> value isnt undefined

typesPredicates.StringOrNumber= (value) -> typesPredicates['String'](value) or typesPredicates['Number'](value)

# generate all the is/not/has/all/force Types
breakIfEqual= true
do -> for name, predicate of typesPredicates then do ( name, predicate ) ->
	Types[ 'is'+ name ]	= predicate
	Types[ 'not'+ name ]	= ( value ) -> not predicate value
	Types[ 'has'+ name ]	= -> testValues predicate, breakIfEqual, arguments
	Types[ 'all'+ name ]	= -> testValues predicate, not breakIfEqual, arguments
	# create only forceTypes of types found in literals
	Types[ 'force'+ name ]= createForce name if name of literals

Types.typeof= ( value ) ->
	for type, predicate of typesPredicates
		return type.toLowerCase() if predicate(value) is true
	return 'unknown'

if window? then window.Types= Types
else if module then module.exports= Types