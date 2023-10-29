#	types.js - A tiny and fast dynamic type checker/enforcer library
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

# heavily refactored to reduce size while optimizing for speed, at the cost of some readability..


MODULE_NAME				= 'types.js'
ENUM_ID					= '_ENUM_'
FORCE_MSG_PREFIX		= "#{MODULE_NAME} - force"
ENUM_ERR_PREFIX		= "#{MODULE_NAME} - enum: ERROR,"
LOGGING_DISABLED		= "#{MODULE_NAME} - all logging disabled by user"
LOGGING_ENABLED		= "#{MODULE_NAME} - logging re-enabled by user"

ARRAY						= 'array'
BOOLEAN					= 'boolean'
DATE						= 'date'
DEFINED					= 'defined'
ENUM						= 'enum'
FUNCTION					= 'function'
NAN						= 'nan'
NULL						= 'null'
NUMBER					= 'number'
OBJECT					= 'object'
REGEXP					= 'regexp'
STRING					= 'string'
SYMBOL					= 'symbol'
UNDEFINED				= 'undefined'


LITERALS=
	[BOOLEAN]		: false
	[STRING]			: ''
	[OBJECT]			: {}
	[ARRAY]			: []
	[FUNCTION]		: ->
	[NUMBER]			: do ->
		number= new Number
		number.void= true
		return number
	[REGEXP]			: new RegExp
	[DATE]			: new Date


log 			= ( args... ) -> if Types.logging then console.log args...
logForce		= ->

# an unsafe internal for making the first character of a type id uppercase
upFirst		= ( str ) -> if str is 'regexp' then 'RegExp' else str[0].toUpperCase()+ str[1..]

instanceOf	= ( type, value ) -> value instanceof type

# type defaults to object, for internal can do, saves for a few bytes..
typeOf		= ( value, type= OBJECT ) -> typeof value is type

createEnum= ->
	_enum= {}
	Object.defineProperty _enum, ENUM_ID,
		configurable	: false
		enumerable		: false
		value				: true
		writable			: false
	return _enum


# all definitions that will be used for the is[type], not[type], etc.. tests
TYPES=
	[UNDEFINED]		: ( value ) -> value is undefined
	[NULL]			: ( value ) -> value is null
	[FUNCTION]		: ( value ) -> typeOf value, FUNCTION
	[BOOLEAN]		: ( value ) -> typeOf value, BOOLEAN
	[STRING]			: ( value ) -> typeOf value, STRING
	[ARRAY]			: ( value ) -> typeOf(value) and instanceOf Array, value
	[REGEXP]			: ( value ) -> typeOf(value) and instanceOf RegExp, value
	[DATE]			: ( value ) -> typeOf(value) and instanceOf Date, value
	[NUMBER]			: ( value ) -> typeOf(value, NUMBER) and (value is value) or ( typeOf(value) and instanceOf(Number, value) )
	[ENUM]			: ( value ) -> Types.forceObject(value).hasOwnProperty ENUM_ID
	[OBJECT]			: ( value ) -> typeOf(value) and (value isnt null) and not instanceOf(Boolean, value) and not instanceOf(Number, value) and not instanceOf(Array, value) and not instanceOf(RegExp, value) and not instanceOf(Date, value)
	[SYMBOL]			: ( value ) -> typeOf value, SYMBOL
	[NAN]				: ( value ) -> typeOf(value, NUMBER) and (value isnt value)
	[DEFINED]		: ( value ) -> value isnt undefined

TYPES.StringOrNumber= (value) -> TYPES[STRING](value) or TYPES[NUMBER](value)



# define the main object that this module returns
Types= types=

	# used by forceNumber to set the Radix, defaults to decimals
	parseIntBase	: 10
	autoConvert		: true
	logging			: true

	disableLogging	: ->
		Types.logging= false
		console.log LOGGING_DISABLED

	enableLogging	: ->
		Types.logging= true
		console.log LOGGING_ENABLED

	logForce			: ( externalLog ) ->
		logForce= ( errLevel, expectedType, encounteredType ) ->
			if (Types.isFunction externalLog) then externalLog errLevel, expectedType, encounteredType
			else
				msg= expectedType
				switch errLevel
					when 1 then msg+= ": initial value is not of type "+ expectedType
					when 2 then msg+= ": optional value is not of type "+ expectedType
					when 3 then msg+= ": no valid type found, returning a type "+ expectedType+ " literal"
				log FORCE_MSG_PREFIX+ msg




# factory that creates all Types.force[type] variations
createForce= ( type ) ->

	Type= upFirst type

	# convert value in case initial Type test failed. failed conversion returns undefined
	test= ( value ) ->
		if types.autoConvert then switch type
			when NUMBER then if types.isString value
				value= parseInt value, types.parseIntBase
			when STRING then if types.isNumber value
				value+= ''
		return value if Types['is'+ Type] value

	# the forctType method, returns the Type's literal or defaultValue if both value and replacement are not compatible
	return ( value, replacement ) ->

		return okValue if value? and (undefined isnt okValue= test value)

		logForce 1, Type, value

		if types.isDefined replacement
			replacementType= types.typeof replacement
			if replacement? and (undefined isnt replacement= test replacement)
				return replacement
			else logForce 2, Type, value

		logForce 3, Type, value

		return LITERALS[ type ]




# test multiple values(arguments) for a given predicate. returns breakState if predicate is breakState for some value
# when no break occured, ! breakState will be returned.
testHasAndAll= ( predicate, breakState, values= [] ) ->
	# testing 'has' or 'all' for 'undefined' should return true on calls without arguments
	return ( predicate is TYPES[UNDEFINED] ) if values.length < 1

	for value in values
		return breakState if predicate(value) is breakState

	return not breakState



# generate all the is/not/has/all/force Types
BREAK_IF_EQUAL= true
do -> for type, predicate of TYPES then do ( type, predicate ) ->

	Type= switch type
		when NAN then 'NaN'
		when REGEXP then 'RegExp'
		else upFirst type

	Types[ 'is'+ Type ]	= predicate
	Types[ 'not'+ Type ]	= ( value ) -> not predicate value
	Types[ 'has'+ Type ]	= -> testHasAndAll predicate, BREAK_IF_EQUAL, arguments
	Types[ 'all'+ Type ]	= -> testHasAndAll predicate, not BREAK_IF_EQUAL, arguments

	# create only forceType of types found in LITERALS
	if type of LITERALS then Types[ 'force'+ Type ]= createForce type

	Types[ 'getFirst'+ Type ]= ( values... ) ->
		for value in values then return value if Types[ 'is'+ Type ] value




Types.intoArray= ( args... ) ->
	if args.length < 2
		if types.isString args[ 0 ]
			# to string, trim, limit to one consecutive space, back to array
			args= args.join( '' ).replace( /^\s+|\s+$/g, '' ).replace( /\s+/g, ' ' ).split ' '
		else if types.isArray args[ 0 ]
			args= args[ 0 ]
	return args




Types.typeOf= Types.typeof= ( value ) ->
	for name, predicate of TYPES
		return name if predicate(value) is true




Types.enum= Types.enumerate= ( items, offset ) ->
	offset	= types.forceNumber offset, 0
	_enum		= createEnum()

	if types.notArray items
		log "#{ENUM_ERR_PREFIX} invalid or missing enumeration array"
		return _enum

	for item, index in items
		if types.isString item then _enum[ item ]= (index+ offset)
		else log "#{ENUM_ERR_PREFIX} ignored non-string item that was found in enumeration array"

	types.forceFunction( Object.freeze ) _enum
	return _enum




if define? and ( FUNCTION is typeof define ) and define.amd
	define 'types', [], -> Types

if typeof module isnt UNDEFINED
	module.exports= Types

if typeof window isnt UNDEFINED
	window.Types= Types