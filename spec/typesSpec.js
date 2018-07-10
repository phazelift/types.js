//
// Jasmine tests for types.js
//
const Types= require( '../types.js' );

Types.disableLogging()




describe("forceNumber(value, replacement)", function() {

  it("should be able to do mathemetical operations with an emptyNumber", function(){

    result= Types.forceNumber();
    result+= 10;
    expect( result ).toBe( 10 );

    result= Types.forceNumber();
    result-= 10;
    expect( result ).toBe( -10 );

    result= Types.forceNumber();
    result*= 10;
    expect( result ).toBe( 0 );

    result= Types.forceNumber();
    ++result;
    expect( result ).toBe( 1 );

    result= Types.forceNumber();
    result+= 0;
    expect( result ).toBe( 0 );

  });
});


describe("forceNumber(value, replacement)", function() {

  it("should return a normal typeof 'number' if value or replacement is valid", function(){

    result= typeof Types.forceNumber( 0 );
    expect( result ).toBe( 'number' );

    result= typeof Types.forceNumber( 'abc', 0 );
    expect( result ).toBe( 'number' );

    result= typeof Types.forceNumber( 'not a number', '123 parsable' );
    expect( result ).toBe( 'number' );

    result= typeof Types.forceNumber( {}, 10 );
    expect( result ).toBe( 'number' );

    result= typeof Types.forceNumber( null, '123' );
    expect( result ).toBe( 'number' );

    result= typeof Types.forceNumber( '123abc', 0 );
    expect( result ).toBe( 'number' );

  });
});



describe("forceNumber(value, replacement)", function() {

  it("should not auto-convert strings when types.autoConvert is set to false", function(){

    Types.autoConvert= false;

    result= Types.forceNumber( '1' );
    expect( result ).not.toBe( 1 );

    result= Types.forceNumber( '123', 'abc123' );
    expect( result ).not.toBe( 123 );

    result= Types.forceNumber( '6', 5 );
    expect( result ).toBe( 5 );

    Types.autoConvert= true;
  });
});


describe("forceNumber(value, replacement)", function() {

  it("should return a Number object with .void property set to true if no valid argument is given", function(){

    result= Types.forceNumber().void;
    expect( result ).toBe( true );

    result= Types.forceNumber( undefined, null ).void;
    expect( result ).toBe( true );

    result= Types.forceNumber( 'not a number', false ).void;
    expect( result ).toBe( true );

    result= Types.forceNumber( {}, {} ).void;
    expect( result ).toBe( true );

    result= Types.forceNumber( [], NaN ).void;
    expect( result ).toBe( true );

    result= Types.forceNumber( new Date, new Date ).void;
    expect( result ).toBe( true );

    result= Types.forceNumber( null, true ).void;
    expect( result ).toBe( true );

  });
});


describe("forceNumber(value, replacement)", function() {

  it("should always return a types.js number type", function(){

    result= Types.typeof( Types.forceNumber() );
    expect( result ).toBe( 'number' );

    result= Types.typeof( Types.forceNumber( undefined ) );
    expect( result ).toBe( 'number' );

    result= Types.typeof( Types.forceNumber( undefined, 30 ) );
    expect( result ).toBe( 'number' );

    result= Types.typeof( Types.forceNumber( undefined, null ) );
    expect( result ).toBe( 'number' );

    result= Types.typeof( Types.forceNumber( undefined, [] ) );
    expect( result ).toBe( 'number' );

    result= Types.typeof( Types.forceNumber( undefined, new Date ) );
    expect( result ).toBe( 'number' );

    result= Types.typeof( Types.forceNumber( {}, false ) );
    expect( result ).toBe( 'number' );

    result= Types.typeof( Types.forceNumber( true, 'asdf' ) );
    expect( result ).toBe( 'number' );

  });
});


describe("isDefined( value )", function() {

  it("should return false if value is undefined or no argument is given", function(){

    result= Types.isDefined();
    expect( result ).toBe( false );

    result= Types.isDefined( undefined );
    expect( result ).toBe( false );

  });
});

describe("isDefined( value )", function() {

  it("should return true for any argument given that is not undefined", function(){

    result= Types.isDefined( null );
    expect( result ).toBe( true );

    result= Types.isDefined( '' );
    expect( result ).toBe( true );

    result= Types.isDefined( false );
    expect( result ).toBe( true );

    result= Types.isDefined( true );
    expect( result ).toBe( true );

    result= Types.isDefined( new Object );
    expect( result ).toBe( true );

    result= Types.isDefined( {} );
    expect( result ).toBe( true );

    result= Types.isDefined( [] );
    expect( result ).toBe( true );

    result= Types.isDefined( /bla/ );
    expect( result ).toBe( true );

  });
});

describe("isBoolean( value )", function() {

  it("should return true for type Boolean arguments only", function(){

    result= Types.isBoolean( true );
    expect( result ).toBe( true );

    result= Types.isBoolean( false );
    expect( result ).toBe( true );

    result= Types.isBoolean( (1 + 1 === 2) );
    expect( result ).toBe( true );

    result= Types.isBoolean( true || false );
    expect( result ).toBe( true );

    result= Types.isBoolean( (function(){ return false })() );
    expect( result ).toBe( true );

    result= Types.isBoolean();
    expect( result ).toBe( false );

    result= Types.isBoolean( 'true' );
    expect( result ).toBe( false );

    result= Types.isBoolean( 234 );
    expect( result ).toBe( false );

    result= Types.isBoolean( ['array'] );
    expect( result ).toBe( false );

    result= Types.isBoolean( {string: 'string'} );
    expect( result ).toBe( false );

    result= Types.isBoolean( /regexp/ig );
    expect( result ).toBe( false );

    result= Types.isString( new Date() );
    expect( result ).toBe( false );

    result= Types.isBoolean( function(){ return true; } );
    expect( result ).toBe( false );

    result= Types.isBoolean( NaN );
    expect( result ).toBe( false );

    result= Types.isBoolean( null );
    expect( result ).toBe( false );

    result= Types.isBoolean( undefined );
    expect( result ).toBe( false );

  });
});

describe("isString( value )", function() {

    it("should return true for type String arguments only", function(){

        result= Types.isString( '' );
        expect( result ).toBe( true );

        result= Types.isString( "" );
        expect( result ).toBe( true );

        result= Types.isString( '123' );
        expect( result ).toBe( true );

        result= Types.isString( "123" );
        expect( result ).toBe( true );

        result= Types.isString( (function(){ return 'string (only when called..)'; })() );
        expect( result ).toBe( true );
    });

    it("should return false if argument is not of type String", function(){

        result= Types.isString();
        expect( result ).toBe( false );

        result= Types.isString( new String() );
        expect( result ).toBe( false );

        result= Types.isString( true );
        expect( result ).toBe( false );

        result= Types.isString( 234 );
        expect( result ).toBe( false );

        result= Types.isString( ['array'] );
        expect( result ).toBe( false );

        result= Types.isString( {string: 'string'} );
        expect( result ).toBe( false );

        result= Types.isString( /regexp/ig );
        expect( result ).toBe( false );

        result= Types.isString( new Date() );
        expect( result ).toBe( false );

        result= Types.isString( function(){ return 'string (only when called..)'; } );
        expect( result ).toBe( false );

        result= Types.isString( NaN );
        expect( result ).toBe( false );

        result= Types.isString( null );
        expect( result ).toBe( false );

        result= Types.isString( undefined );
        expect( result ).toBe( false );

    });
});



describe("isNumber( value )", function() {

  it("should return true for type Number arguments only", function(){

    result= Types.isNumber( 0 );
    expect( result ).toBe( true );

    result= Types.isNumber( 10 * 10 );
    expect( result ).toBe( true );

    result= Types.isNumber( parseInt('123') );
    expect( result ).toBe( true );

    result= Types.isNumber( (function(){ return 44; })() );
    expect( result ).toBe( true );

    result= Types.isNumber();
    expect( result ).toBe( false );

    result= Types.isNumber( true );
    expect( result ).toBe( false );

    result= Types.isNumber( new Boolean() );
    expect( result ).toBe( false );

    result= Types.isNumber( '234' );
    expect( result ).toBe( false );

    result= Types.isNumber( ['array'] );
    expect( result ).toBe( false );

    result= Types.isNumber( {string: 'string'} );
    expect( result ).toBe( false );

    result= Types.isNumber( /regexp/ig );
    expect( result ).toBe( false );

    result= Types.isNumber( new Date() );
    expect( result ).toBe( false );

    result= Types.isNumber( function(){ return 0; } );
    expect( result ).toBe( false );

    result= Types.isNumber( NaN );
    expect( result ).toBe( false );

    result= Types.isNumber( null );
    expect( result ).toBe( false );

    result= Types.isNumber( undefined );
    expect( result ).toBe( false );

  });
});

describe("isStringOrNumber( value )", function() {

  it("should return true for type String or Number arguments only", function(){

    result= Types.isStringOrNumber( 0 );
    expect( result ).toBe( true );

    result= Types.isStringOrNumber( 10 * 10 );
    expect( result ).toBe( true );

    result= Types.isStringOrNumber( 'a'+ 'b' );
    expect( result ).toBe( true );

    result= Types.isStringOrNumber( 'this is a string' );
    expect( result ).toBe( true );

    result= Types.isStringOrNumber( 44+ '' );
    expect( result ).toBe( true );

    result= Types.isStringOrNumber( typeof Types.isStringOrNumber() );
    expect( result ).toBe( true );

    result= Types.isStringOrNumber( parseInt('123') );
    expect( result ).toBe( true );

    result= Types.isStringOrNumber( (function(){ return 44; })() );
    expect( result ).toBe( true );

    result= Types.isStringOrNumber();
    expect( result ).toBe( false );

    result= Types.isStringOrNumber( true );
    expect( result ).toBe( false );

    result= Types.isStringOrNumber( new Boolean() );
    expect( result ).toBe( false );

    result= Types.isStringOrNumber( parseInt('abc') );
    expect( result ).toBe( false );

    result= Types.isStringOrNumber( ['array'] );
    expect( result ).toBe( false );

    result= Types.isStringOrNumber( {string: 'string'} );
    expect( result ).toBe( false );

    result= Types.isStringOrNumber( /regexp/ig );
    expect( result ).toBe( false );

    result= Types.isStringOrNumber( new Date() );
    expect( result ).toBe( false );

    result= Types.isStringOrNumber( function(){ return 0; } );
    expect( result ).toBe( false );

    result= Types.isStringOrNumber( null );
    expect( result ).toBe( false );

    result= Types.isStringOrNumber( NaN );
    expect( result ).toBe( false );

    result= Types.isStringOrNumber( undefined );
    expect( result ).toBe( false );

  });
});

describe("isArray( value )", function() {

 it("should return true for type Array arguments only", function(){

    result= Types.isArray( [] );
    expect( result ).toBe( true );

    result= Types.isArray( [1, 2, 3] );
    expect( result ).toBe( true );

    result= Types.isArray( (function(){ return []; })() );
    expect( result ).toBe( true );

    result= Types.isArray( new Array() );
    expect( result ).toBe( true );

    result= Types.isArray();
    expect( result ).toBe( false );

    result= Types.isArray( true );
    expect( result ).toBe( false );

    result= Types.isArray( '234' );
    expect( result ).toBe( false );

    result= Types.isArray( '[]' );
    expect( result ).toBe( false );

    result= Types.isArray( {array: []} );
    expect( result ).toBe( false );

    result= Types.isArray( /[]/ig );
    expect( result ).toBe( false );

    result= Types.isArray( new Date() );
    expect( result ).toBe( false );

    result= Types.isArray( function(){ return [1]; } );
    expect( result ).toBe( false );

    result= Types.isArray( null );
    expect( result ).toBe( false );

    result= Types.isArray( NaN );
    expect( result ).toBe( false );

    result= Types.isArray( undefined );
    expect( result ).toBe( false );

  });

});

describe("isObject( value )", function() {

 it("should return true for type Object arguments only", function(){

    result= Types.isObject( {} );
    expect( result ).toBe( true );

    result= Types.isObject( { ok: 'is object' } );
    expect( result ).toBe( true );

    result= Types.isObject( (function(){ return {}; })() );
    expect( result ).toBe( true );

    result= Types.isObject( new Object() );
    expect( result ).toBe( true );

    result= Types.isObject( new String() );
    expect( result ).toBe( true );
  });

 it("should return false if argument is not instanceof Object", function(){
    result= Types.isObject();
    expect( result ).toBe( false );

    result= Types.isObject( true );
    expect( result ).toBe( false );

    result= Types.isObject( '234' );
    expect( result ).toBe( false );

    result= Types.isObject( '[]' );
    expect( result ).toBe( false );

    result= Types.isObject( /object/ig );
    expect( result ).toBe( false );

    result= Types.isObject( function(){ return {}; } );
    expect( result ).toBe( false );

    result= Types.isObject( NaN );
    expect( result ).toBe( false );

    result= Types.isObject( null );
    expect( result ).toBe( false );

    result= Types.isObject( undefined );
    expect( result ).toBe( false );

  });
});

describe("isFunction( value )", function() {

 it("should return true for type Function arguments only", function(){

    result= Types.isFunction( function(){} );
    expect( result ).toBe( true );

    result= Types.isFunction( expect );
    expect( result ).toBe( true );

    result= Types.isFunction( (function(){ return function(){}; })() );
    expect( result ).toBe( true );

    result= Types.isFunction( Object );
    expect( result ).toBe( true );

    result= Types.isFunction();
    expect( result ).toBe( false );

    result= Types.isFunction( true );
    expect( result ).toBe( false );

    result= Types.isFunction( '234' );
    expect( result ).toBe( false );

    result= Types.isFunction( '[]' );
    expect( result ).toBe( false );

    result= Types.isFunction( /object/ig );
    expect( result ).toBe( false );

    result= Types.isFunction( {} );
    expect( result ).toBe( false );

    result= Types.isFunction( NaN );
    expect( result ).toBe( false );

    result= Types.isFunction( null );
    expect( result ).toBe( false );

    result= Types.isFunction( undefined );
    expect( result ).toBe( false );

  });
});

describe("isRegExp( value )", function() {

 it("should return true for type RegExp arguments only", function(){

    var reg= new RegExp('abc');

    result= Types.isRegExp( /reg/ig );
    expect( result ).toBe( true );

    result= Types.isRegExp( new RegExp('123') );
    expect( result ).toBe( true );

    result= Types.isRegExp( (function(){ return /abc/; })() );
    expect( result ).toBe( true );

    result= Types.isRegExp( reg );
    expect( result ).toBe( true );

    result= Types.isRegExp();
    expect( result ).toBe( false );

    result= Types.isRegExp( true );
    expect( result ).toBe( false );

    result= Types.isRegExp( '234' );
    expect( result ).toBe( false );

    result= Types.isRegExp( '[]' );
    expect( result ).toBe( false );

    result= Types.isRegExp( function(){ return /asdf/; } );
    expect( result ).toBe( false );

    result= Types.isRegExp( {} );
    expect( result ).toBe( false );

    result= Types.isRegExp( NaN );
    expect( result ).toBe( false );

    result= Types.isRegExp( null );
    expect( result ).toBe( false );

    result= Types.isRegExp( undefined );
    expect( result ).toBe( false );

  });
});

describe("isDate( value )", function() {

 it("should return true for type Date arguments only", function(){

    var date= new Date();

    result= Types.isDate( new Date() );
    expect( result ).toBe( true );

    result= Types.isDate( new Date('123') );
    expect( result ).toBe( true );

    result= Types.isDate( (function(){ return new Date(); })() );
    expect( result ).toBe( true );

    result= Types.isDate( date );
    expect( result ).toBe( true );

    result= Types.isDate();
    expect( result ).toBe( false );

    result= Types.isDate( true );
    expect( result ).toBe( false );

    result= Types.isDate( '234' );
    expect( result ).toBe( false );

    result= Types.isDate( '[]' );
    expect( result ).toBe( false );

    result= Types.isDate( function(){ return /asdf/; } );
    expect( result ).toBe( false );

    result= Types.isDate( {} );
    expect( result ).toBe( false );

    result= Types.isDate( NaN );
    expect( result ).toBe( false );

    result= Types.isDate( null );
    expect( result ).toBe( false );

    result= Types.isDate( undefined );
    expect( result ).toBe( false );

  });
});

describe("isNaN( value )", function() {

 it("should return true for type NaN arguments only", function(){

    result= Types.isNaN( NaN );
    expect( result ).toBe( true );

    result= Types.isNaN( parseInt('abc') );
    expect( result ).toBe( true );

    result= Types.isNaN();
    expect( result ).toBe( false );

    result= Types.isNaN( parseInt('123', 10) );
    expect( result ).toBe( false );

    result= Types.isNaN( true );
    expect( result ).toBe( false );

    result= Types.isNaN( '234' );
    expect( result ).toBe( false );

    result= Types.isNaN( '[]' );
    expect( result ).toBe( false );

    result= Types.isNaN( function(){ return /asdf/; } );
    expect( result ).toBe( false );

    result= Types.isNaN( {} );
    expect( result ).toBe( false );

    result= Types.isNaN( null );
    expect( result ).toBe( false );

    result= Types.isNaN( undefined );
    expect( result ).toBe( false );

  });
});

describe("isNull( value )", function() {

 it("should return true for type null arguments only", function(){

    result= Types.isNull( null );
    expect( result ).toBe( true );

    result= Types.isNull();
    expect( result ).toBe( false );

    result= Types.isNull( true );
    expect( result ).toBe( false );

    result= Types.isNull( '234' );
    expect( result ).toBe( false );

    result= Types.isNull( '[]' );
    expect( result ).toBe( false );

    result= Types.isNull( function(){ return /asdf/; } );
    expect( result ).toBe( false );

    result= Types.isNull( {} );
    expect( result ).toBe( false );

    result= Types.isNull( 88 );
    expect( result ).toBe( false );

    result= Types.isNull( NaN );
    expect( result ).toBe( false );

    result= Types.isNull( undefined );
    expect( result ).toBe( false );

  });
});

describe("isUndefined( value )", function() {

 it("should return true for type undefined arguments only", function(){

    result= Types.isUndefined( undefined );
    expect( result ).toBe( true );

    result= Types.isUndefined();
    expect( result ).toBe( true );

    result= Types.isUndefined( true );
    expect( result ).toBe( false );

    result= Types.isUndefined( '234' );
    expect( result ).toBe( false );

    result= Types.isUndefined( '[]' );
    expect( result ).toBe( false );

    result= Types.isUndefined( function(){ return /asdf/; } );
    expect( result ).toBe( false );

    result= Types.isUndefined( {} );
    expect( result ).toBe( false );

    result= Types.isUndefined( 88 );
    expect( result ).toBe( false );

    result= Types.isUndefined( NaN );
    expect( result ).toBe( false );

    result= Types.isUndefined( null );
    expect( result ).toBe( false );

    result= Types.isUndefined( new Date() );
    expect( result ).toBe( false );

  });

});

//                                            not
// copied from above and inverted result, to make a little haste..

describe("notBoolean( value )", function() {

  it("should return true if argument is not of type Boolean", function(){

    result= ! Types.notBoolean( true );
    expect( result ).toBe( true );

    result= ! Types.notBoolean( false );
    expect( result ).toBe( true );

    result= ! Types.notBoolean( (1 + 1 === 2) );
    expect( result ).toBe( true );

    result= ! Types.notBoolean( true || false );
    expect( result ).toBe( true );

    result= ! Types.notBoolean( (function(){ return false })() );
    expect( result ).toBe( true );

    result= ! Types.notBoolean();
    expect( result ).toBe( false );

    result= ! Types.notBoolean( 'true' );
    expect( result ).toBe( false );

    result= ! Types.notBoolean( 234 );
    expect( result ).toBe( false );

    result= ! Types.notBoolean( ['array'] );
    expect( result ).toBe( false );

    result= ! Types.notBoolean( {string: 'string'} );
    expect( result ).toBe( false );

    result= ! Types.notBoolean( /regexp/ig );
    expect( result ).toBe( false );

    result= ! Types.notString( new Date() );
    expect( result ).toBe( false );

    result= ! Types.notBoolean( function(){ return false; } );
    expect( result ).toBe( false );

    result= ! Types.notBoolean( NaN );
    expect( result ).toBe( false );

    result= ! Types.notBoolean( null );
    expect( result ).toBe( false );

    result= ! Types.notBoolean( undefined );
    expect( result ).toBe( false );

  });
});

describe("notString( value )", function() {

  it("should return true if argument is not of type String", function(){

    result= Types.notString( '' );
    expect( result ).toBe( false );

    result= Types.notString( "" );
    expect( result ).toBe( false );

    result= Types.notString( '123' );
    expect( result ).toBe( false );

    result= Types.notString( "123" );
    expect( result ).toBe( false );

    result= Types.notString( (function(){ return 'string (only when called..)'; })() );
    expect( result ).toBe( false );
  });

  it("should return true if argument is not of type String", function(){
    result= Types.notString();
    expect( result ).toBe( true );

    result= Types.notString( new String() );
    expect( result ).toBe( true );

    result= Types.notString( true );
    expect( result ).toBe( true );

    result= Types.notString( 234 );
    expect( result ).toBe( true );

    result= Types.notString( ['array'] );
    expect( result ).toBe( true );

    result= Types.notString( {string: 'string'} );
    expect( result ).toBe( true );

    result= Types.notString( /regexp/ig );
    expect( result ).toBe( true );

    result= Types.notString( new Date() );
    expect( result ).toBe( true );

    result= Types.notString( function(){ return 'string (only when called..)'; } );
    expect( result ).toBe( true );

    result= Types.notString( NaN );
    expect( result ).toBe( true );

    result= Types.notString( null );
    expect( result ).toBe( true );

    result= Types.notString( undefined );
    expect( result ).toBe( true );

  });
});

describe("notNumber( value )", function() {

  it("should return true if argument is not of type Number", function(){

    result= ! Types.notNumber( 0 );
    expect( result ).toBe( true );

    result= ! Types.notNumber( 10 * 10 );
    expect( result ).toBe( true );

    result= ! Types.notNumber( parseInt('123') );
    expect( result ).toBe( true );

    result= ! Types.notNumber( (function(){ return 44; })() );
    expect( result ).toBe( true );

    result= ! Types.notNumber();
    expect( result ).toBe( false );

    result= ! Types.notNumber( true );
    expect( result ).toBe( false );

    result= ! Types.notNumber( new Boolean() );
    expect( result ).toBe( false );

    result= ! Types.notNumber( '234' );
    expect( result ).toBe( false );

    result= ! Types.notNumber( ['array'] );
    expect( result ).toBe( false );

    result= ! Types.notNumber( {string: 'string'} );
    expect( result ).toBe( false );

    result= ! Types.notNumber( /regexp/ig );
    expect( result ).toBe( false );

    result= ! Types.notNumber( new Date() );
    expect( result ).toBe( false );

    result= ! Types.notNumber( function(){ return 0; } );
    expect( result ).toBe( false );

    result= ! Types.notNumber( NaN );
    expect( result ).toBe( false );

    result= ! Types.notNumber( null );
    expect( result ).toBe( false );

    result= ! Types.notNumber( undefined );
    expect( result ).toBe( false );

  });
});

describe("notStringOrNumber( value )", function() {

  it("should return true if argument is not of type String or Number", function(){

    result= ! Types.notStringOrNumber( 0 );
    expect( result ).toBe( true );

    result= ! Types.notStringOrNumber( 10 * 10 );
    expect( result ).toBe( true );

    result= ! Types.notStringOrNumber( 'a'+ 'b' );
    expect( result ).toBe( true );

    result= ! Types.notStringOrNumber( 'this is a string' );
    expect( result ).toBe( true );

    result= ! Types.notStringOrNumber( 44+ '' );
    expect( result ).toBe( true );

    result= ! Types.notStringOrNumber( typeof ! Types.notStringOrNumber() );
    expect( result ).toBe( true );

    result= ! Types.notStringOrNumber( parseInt('123') );
    expect( result ).toBe( true );

    result= ! Types.notStringOrNumber( (function(){ return 44; })() );
    expect( result ).toBe( true );

    result= ! Types.notStringOrNumber();
    expect( result ).toBe( false );

    result= ! Types.notStringOrNumber( true );
    expect( result ).toBe( false );

    result= ! Types.notStringOrNumber( new Boolean() );
    expect( result ).toBe( false );

    result= ! Types.notStringOrNumber( parseInt('abc') );
    expect( result ).toBe( false );

    result= ! Types.notStringOrNumber( ['array'] );
    expect( result ).toBe( false );

    result= ! Types.notStringOrNumber( {string: 'string'} );
    expect( result ).toBe( false );

    result= ! Types.notStringOrNumber( /regexp/ig );
    expect( result ).toBe( false );

    result= ! Types.notStringOrNumber( new Date() );
    expect( result ).toBe( false );

    result= ! Types.notStringOrNumber( function(){ return 0; } );
    expect( result ).toBe( false );

    result= ! Types.notStringOrNumber( null );
    expect( result ).toBe( false );

    result= ! Types.notStringOrNumber( NaN );
    expect( result ).toBe( false );

    result= ! Types.notStringOrNumber( undefined );
    expect( result ).toBe( false );

  });
});


describe("notArray( value )", function() {

 it("should return true if argument is not of type Array", function(){

    result= ! Types.notArray( [] );
    expect( result ).toBe( true );

    result= ! Types.notArray( [1, 2, 3] );
    expect( result ).toBe( true );

    result= ! Types.notArray( (function(){ return []; })() );
    expect( result ).toBe( true );

    result= ! Types.notArray( new Array() );
    expect( result ).toBe( true );

    result= ! Types.notArray();
    expect( result ).toBe( false );

    result= ! Types.notArray( true );
    expect( result ).toBe( false );

    result= ! Types.notArray( '234' );
    expect( result ).toBe( false );

    result= ! Types.notArray( '[]' );
    expect( result ).toBe( false );

    result= ! Types.notArray( {array: []} );
    expect( result ).toBe( false );

    result= ! Types.notArray( /[]/ig );
    expect( result ).toBe( false );

    result= ! Types.notArray( new Date() );
    expect( result ).toBe( false );

    result= ! Types.notArray( function(){ return [1]; } );
    expect( result ).toBe( false );

    result= ! Types.notArray( null );
    expect( result ).toBe( false );

    result= ! Types.notArray( NaN );
    expect( result ).toBe( false );

    result= ! Types.notArray( undefined );
    expect( result ).toBe( false );

  });
});

describe("notObject( value )", function() {

 it("should return true if argument is not of type Object", function(){

    result= ! Types.notObject( {} );
    expect( result ).toBe( true );

    result= ! Types.notObject( { ok: 'is object' } );
    expect( result ).toBe( true );

    result= ! Types.notObject( (function(){ return {}; })() );
    expect( result ).toBe( true );

    result= ! Types.notObject( new Object() );
    expect( result ).toBe( true );

    result= ! Types.notObject( new String() );
    expect( result ).toBe( true );

    result= ! Types.notObject();
    expect( result ).toBe( false );

    result= ! Types.notObject( true );
    expect( result ).toBe( false );

    result= ! Types.notObject( '234' );
    expect( result ).toBe( false );

    result= ! Types.notObject( '[]' );
    expect( result ).toBe( false );

    result= ! Types.notObject( /object/ig );
    expect( result ).toBe( false );

    result= ! Types.notObject( function(){ return {}; } );
    expect( result ).toBe( false );

    result= ! Types.notObject( NaN );
    expect( result ).toBe( false );

    result= ! Types.notObject( null );
    expect( result ).toBe( false );

    result= ! Types.notObject( undefined );
    expect( result ).toBe( false );

  });
});

describe("notFunction( value )", function() {

 it("should return true if argument is not of type Function", function(){

    result= ! Types.notFunction( function(){} );
    expect( result ).toBe( true );

    result= ! Types.notFunction( expect );
    expect( result ).toBe( true );

    result= ! Types.notFunction( (function(){ return function(){}; })() );
    expect( result ).toBe( true );

    result= ! Types.notFunction( Object );
    expect( result ).toBe( true );

    result= ! Types.notFunction();
    expect( result ).toBe( false );

    result= ! Types.notFunction( true );
    expect( result ).toBe( false );

    result= ! Types.notFunction( '234' );
    expect( result ).toBe( false );

    result= ! Types.notFunction( '[]' );
    expect( result ).toBe( false );

    result= ! Types.notFunction( /object/ig );
    expect( result ).toBe( false );

    result= ! Types.notFunction( {} );
    expect( result ).toBe( false );

    result= ! Types.notFunction( NaN );
    expect( result ).toBe( false );

    result= ! Types.notFunction( null );
    expect( result ).toBe( false );

    result= ! Types.notFunction( undefined );
    expect( result ).toBe( false );

  });
});

describe("notRegExp( value )", function() {

 it("should return true if argument is not of type RegExp", function(){

    var reg= new RegExp('abc');

    result= ! Types.notRegExp( /reg/ig );
    expect( result ).toBe( true );

    result= ! Types.notRegExp( new RegExp('123') );
    expect( result ).toBe( true );

    result= ! Types.notRegExp( (function(){ return /abc/; })() );
    expect( result ).toBe( true );

    result= ! Types.notRegExp( reg );
    expect( result ).toBe( true );

    result= ! Types.notRegExp();
    expect( result ).toBe( false );

    result= ! Types.notRegExp( true );
    expect( result ).toBe( false );

    result= ! Types.notRegExp( '234' );
    expect( result ).toBe( false );

    result= ! Types.notRegExp( '[]' );
    expect( result ).toBe( false );

    result= ! Types.notRegExp( function(){ return /asdf/; } );
    expect( result ).toBe( false );

    result= ! Types.notRegExp( {} );
    expect( result ).toBe( false );

    result= ! Types.notRegExp( NaN );
    expect( result ).toBe( false );

    result= ! Types.notRegExp( null );
    expect( result ).toBe( false );

    result= ! Types.notRegExp( undefined );
    expect( result ).toBe( false );

  });
});

describe("notDate( value )", function() {

 it("should return true if argument is not of type Date", function(){

    var date= new Date();

    result= ! Types.notDate( new Date() );
    expect( result ).toBe( true );

    result= ! Types.notDate( new Date('123') );
    expect( result ).toBe( true );

    result= ! Types.notDate( (function(){ return new Date(); })() );
    expect( result ).toBe( true );

    result= ! Types.notDate( date );
    expect( result ).toBe( true );

    result= ! Types.notDate();
    expect( result ).toBe( false );

    result= ! Types.notDate( true );
    expect( result ).toBe( false );

    result= ! Types.notDate( '234' );
    expect( result ).toBe( false );

    result= ! Types.notDate( '[]' );
    expect( result ).toBe( false );

    result= ! Types.notDate( function(){ return /asdf/; } );
    expect( result ).toBe( false );

    result= ! Types.notDate( {} );
    expect( result ).toBe( false );

    result= ! Types.notDate( NaN );
    expect( result ).toBe( false );

    result= ! Types.notDate( null );
    expect( result ).toBe( false );

    result= ! Types.notDate( undefined );
    expect( result ).toBe( false );

  });
});

describe("notNaN( value )", function() {

 it("should return true if argument is not of type NaN", function(){

    result= ! Types.notNaN( NaN );
    expect( result ).toBe( true );

    result= ! Types.notNaN( parseInt('abc') );
    expect( result ).toBe( true );

    result= ! Types.notNaN();
    expect( result ).toBe( false );

    result= ! Types.notNaN( parseInt('123', 10) );
    expect( result ).toBe( false );

    result= ! Types.notNaN( true );
    expect( result ).toBe( false );

    result= ! Types.notNaN( '234' );
    expect( result ).toBe( false );

    result= ! Types.notNaN( '[]' );
    expect( result ).toBe( false );

    result= ! Types.notNaN( function(){ return /asdf/; } );
    expect( result ).toBe( false );

    result= ! Types.notNaN( {} );
    expect( result ).toBe( false );

    result= ! Types.notNaN( null );
    expect( result ).toBe( false );

    result= ! Types.notNaN( undefined );
    expect( result ).toBe( false );

  });
});

describe("notNull( value )", function() {

 it("should return true if argument is not of type Null", function(){

    result= ! Types.notNull( null );
    expect( result ).toBe( true );

    result= ! Types.notNull();
    expect( result ).toBe( false );

    result= ! Types.notNull( true );
    expect( result ).toBe( false );

    result= ! Types.notNull( '234' );
    expect( result ).toBe( false );

    result= ! Types.notNull( '[]' );
    expect( result ).toBe( false );

    result= ! Types.notNull( function(){ return /asdf/; } );
    expect( result ).toBe( false );

    result= ! Types.notNull( {} );
    expect( result ).toBe( false );

    result= ! Types.notNull( 88 );
    expect( result ).toBe( false );

    result= ! Types.notNull( NaN );
    expect( result ).toBe( false );

    result= ! Types.notNull( undefined );
    expect( result ).toBe( false );

  });

});

describe("notUndefined( value )", function() {

 it("should return true if argument is not of type Undefined", function(){

    result= ! Types.notUndefined( undefined );
    expect( result ).toBe( true );

    result= ! Types.notUndefined();
    expect( result ).toBe( true );

    result= ! Types.notUndefined( true );
    expect( result ).toBe( false );

    result= ! Types.notUndefined( '234' );
    expect( result ).toBe( false );

    result= ! Types.notUndefined( '[]' );
    expect( result ).toBe( false );

    result= ! Types.notUndefined( function(){ return /asdf/; } );
    expect( result ).toBe( false );

    result= ! Types.notUndefined( {} );
    expect( result ).toBe( false );

    result= ! Types.notUndefined( 88 );
    expect( result ).toBe( false );

    result= ! Types.notUndefined( NaN );
    expect( result ).toBe( false );

    result= ! Types.notUndefined( null );
    expect( result ).toBe( false );

    result= ! Types.notUndefined( new Date() );
    expect( result ).toBe( false );

  });
});

//                                              hasType

describe("hasBoolean( value, [value1, ..., valueN] )", function() {

it("should return true if at least one argument is of type Boolean", function(){

    result= Types.hasBoolean( true );
    expect( result ).toBe( true );

    result= Types.hasBoolean( 'string', 123, false );
    expect( result ).toBe( true );

    result= Types.hasBoolean( false, true, ( true && true) );
    expect( result ).toBe( true );

    result= Types.hasBoolean( 22, 'has bool', /reg/, (1 + 1 === 2));
    expect( result ).toBe( true );

    result= Types.hasBoolean();
    expect( result ).toBe( false );

    result= Types.hasBoolean( 'true', function(){} );
    expect( result ).toBe( false );

    result= Types.hasBoolean( 234, [], {} );
    expect( result ).toBe( false );

    result= Types.hasBoolean( ['array'], 'ok', null );
    expect( result ).toBe( false );

    result= Types.hasBoolean( {string: 'string'}, 55 );
    expect( result ).toBe( false );

    result= Types.hasBoolean( /regexp/ig, 'multiple' );
    expect( result ).toBe( false );

    result= Types.hasString( new Date(), undefined, null );
    expect( result ).toBe( false );

    result= Types.hasBoolean( function(){ return true; }, 'no', NaN );
    expect( result ).toBe( false );

    result= Types.hasBoolean( NaN, null );
    expect( result ).toBe( false );

    result= Types.hasBoolean( null, NaN, function(){} );
    expect( result ).toBe( false );

    result= Types.hasBoolean( undefined );
    expect( result ).toBe( false );

  });
});

describe("hasString( value, [value1, ..., valueN] )", function() {


  it("should return true if at least one argument is of type String", function(){

        result= Types.hasString( '' );
        expect( result ).toBe( true );

        result= Types.hasString( 24, true, 'string' );
        expect( result ).toBe( true );

        result= Types.hasString( [1, 2, 3], (function(){ return 'string returned'; })() );
        expect( result ).toBe( true );

        result= Types.hasString( 44, null, undefined, "123" );
        expect( result ).toBe( true );

        result= Types.hasString( (function(){ return 'string (only when called..)'; })(), 44, new Date(), NaN );
        expect( result ).toBe( true );
    });

  it("should return false if no argument is of type String", function(){
    result= Types.hasString();
    expect( result ).toBe( false );

    result= Types.hasString( new String(), 123, undefined );
    expect( result ).toBe( false );

    result= Types.hasString( true, [1], { aString: 'string' }, 2345 );
    expect( result ).toBe( false );

    result= Types.hasString( 234, parseInt('abc') );
    expect( result ).toBe( false );

    result= Types.hasString( ['array'], {} );
    expect( result ).toBe( false );

    result= Types.hasString( {string: 'string'}, null );
    expect( result ).toBe( false );

    result= Types.hasString( /regexp/ig, 66 );
    expect( result ).toBe( false );

    result= Types.hasString( new Date(), /2345/ );
    expect( result ).toBe( false );

    result= Types.hasString( function(){ return 'string (only when called..)'; } );
    expect( result ).toBe( false );

    result= Types.hasString( NaN );
    expect( result ).toBe( false );

    result= Types.hasString( null );
    expect( result ).toBe( false );

    result= Types.hasString( undefined );
    expect( result ).toBe( false );

  });
});

describe("hasNumber( value, [value1, ..., valueN] )", function() {

  it("should return true if at least one argument is of type Number", function(){

    result= Types.hasNumber( 'abc', {}, 0, /asdf/ );
    expect( result ).toBe( true );

    result= Types.hasNumber( 10 * 10 );
    expect( result ).toBe( true );

    result= Types.hasNumber( parseInt('123'), ['string'], null );
    expect( result ).toBe( true );

    result= Types.hasNumber( (function(){ return 44; })(), undefined, true );
    expect( result ).toBe( true );

    result= Types.hasNumber();
    expect( result ).toBe( false );

    result= Types.hasNumber( true, '0', /234/ );
    expect( result ).toBe( false );

    result= Types.hasNumber( new Boolean(), new Array(), 'no' );
    expect( result ).toBe( false );

    result= Types.hasNumber( '234', [1], undefined );
    expect( result ).toBe( false );

    result= Types.hasNumber( ['array'], '55', function(){} );
    expect( result ).toBe( false );

    result= Types.hasNumber( {string: 'string'}, [4], { n: 1} );
    expect( result ).toBe( false );

    result= Types.hasNumber( new Date(), NaN, null, undefined );
    expect( result ).toBe( false );

  });

});

describe("hasStringOrNumber( value, [value1, ..., valueN] )", function() {

  it("should return true if at least one argument is of type String or Number", function(){

    result= Types.hasStringOrNumber( 0 );
    expect( result ).toBe( true );

    result= Types.hasStringOrNumber( 10 * 10, 'both ok' );
    expect( result ).toBe( true );

    result= Types.hasStringOrNumber( function(){}, null, 'a'+ 'b' );
    expect( result ).toBe( true );

    result= Types.hasStringOrNumber( 'this is a string' );
    expect( result ).toBe( true );

    result= Types.hasStringOrNumber( 44+ '' );
    expect( result ).toBe( true );

    result= Types.hasStringOrNumber( typeof Types.hasStringOrNumber(), /123/, new Array() );
    expect( result ).toBe( true );

    result= Types.hasStringOrNumber( null, parseInt('123') );
    expect( result ).toBe( true );

    result= Types.hasStringOrNumber( [{}], (function(){ return 44; })(), NaN );
    expect( result ).toBe( true );

    result= Types.hasStringOrNumber();
    expect( result ).toBe( false );

    result= Types.hasStringOrNumber( /0/, true );
    expect( result ).toBe( false );

    result= Types.hasStringOrNumber( new Boolean(), new Date() );
    expect( result ).toBe( false );

    result= Types.hasStringOrNumber( parseInt('abc'), {string: 'string'} );
    expect( result ).toBe( false );

    result= Types.hasStringOrNumber( ['array'], null, undefined );
    expect( result ).toBe( false );

  });
});

describe("hasArray( value, [value1, ..., valueN] )", function() {

 it("should return true if at least one argument is of type Array", function(){

    result= Types.hasArray( null, undefined, [], NaN);
    expect( result ).toBe( true );

    result= Types.hasArray( 'string', 45, [1, 2, 3], new Date() );
    expect( result ).toBe( true );

    result= Types.hasArray( /abc/, false, (function(){ return []; })(), 'break' );
    expect( result ).toBe( true );

    result= Types.hasArray( 'this is an instance of array ->', new Array(), 777 );
    expect( result ).toBe( true );

    result= Types.hasArray();
    expect( result ).toBe( false );

    result= Types.hasArray( true, false, {}, '[]' );
    expect( result ).toBe( false );

    result= Types.hasArray( '234', 234, function(){} );
    expect( result ).toBe( false );

    result= Types.hasArray( {array: []}, /[]/ig, new Date() );
    expect( result ).toBe( false );

    result= Types.hasArray( NaN, null, undefined );
    expect( result ).toBe( false );

  });
});

describe("hasObject( value, [value1, ..., valueN] )", function() {

 it("should return true if at least one argument is of type Object", function(){

    result= Types.hasObject( {} );
    expect( result ).toBe( true );

    result= Types.hasObject( undefined, '', { ok: 'is object' }, [], null );
    expect( result ).toBe( true );

    result= Types.hasObject( /abc/ig, (function(){ return {}; })(), 234 );
    expect( result ).toBe( true );

    result= Types.hasObject( 22, new Object(), null, NaN );
    expect( result ).toBe( true );

    result= Types.hasObject();
    expect( result ).toBe( false );

    result= Types.hasObject( true, false, [], null );
    expect( result ).toBe( false );

    result= Types.hasObject( '234', NaN, /abc/, function(){} );
    expect( result ).toBe( false );

    result= Types.hasObject( 'object', NaN, function(){ return {}; }, undefined );
    expect( result ).toBe( false );

  });

});

describe("hasFunction( value, [value1, ..., valueN] )", function() {

 it("should return true if at least one argument is of type Function", function(){

    result= Types.hasFunction( function(){} );
    expect( result ).toBe( true );

    result= Types.hasFunction( expect );
    expect( result ).toBe( true );

    result= Types.hasFunction( NaN, null, (function(){ return function(){}; })(), 'string', Object );
    expect( result ).toBe( true );

    result= Types.hasFunction();
    expect( result ).toBe( false );

    result= Types.hasFunction( true, false, 23, 'false' );
    expect( result ).toBe( false );

    result= Types.hasFunction( /asdf/ig, undefined, NaN, [], {} );
    expect( result ).toBe( false );

  });
});

describe("hasRegExp( value, [value1, ..., valueN] )", function() {

 it("should return true if at least one argument is of type RegExp", function(){

    var reg= new RegExp('abc');

    result= Types.hasRegExp( /reg/ig );
    expect( result ).toBe( true );

    result= Types.hasRegExp( 'string', 12, [], new RegExp('123') );
    expect( result ).toBe( true );

    result= Types.hasRegExp( undefined, (function(){ return /abc/; })(), {}, null );
    expect( result ).toBe( true );

    result= Types.hasRegExp( NaN, new String(), reg, Object );
    expect( result ).toBe( true );

    result= Types.hasRegExp( function(){ return /asdf/; } );
    expect( result ).toBe( false );

    result= Types.hasRegExp( {}, NaN, null, undefined );
    expect( result ).toBe( false );

  });

});

describe("hasDate( value, [value1, ..., valueN] )", function() {

 it("should return true if at least one argument is of type Date", function(){

    var date= new Date();

    result= Types.hasDate( new Date() );
    expect( result ).toBe( true );

    result= Types.hasDate( new Date('123') );
    expect( result ).toBe( true );

    result= Types.hasDate( (function(){ return new Date(); })() );
    expect( result ).toBe( true );

    result= Types.hasDate( [], null, date, undefined, false );
    expect( result ).toBe( true );

    result= Types.hasDate();
    expect( result ).toBe( false );

    result= Types.hasDate( true, 234, 'strings', {} );
    expect( result ).toBe( false );

    result= Types.hasDate( function(){ return /asdf/; }, /asdf/, NaN );
    expect( result ).toBe( false );

  });
});

describe("hasNaN( value, [value1, ..., valueN] )", function() {

 it("should return true if at least one argument is of type NaN", function(){

    result= Types.hasNaN( NaN );
    expect( result ).toBe( true );

    result= Types.hasNaN( null, undefined, parseInt('abc'), 234, [] );
    expect( result ).toBe( true );

    result= Types.hasNaN();
    expect( result ).toBe( false );

    result= Types.hasNaN( parseInt('123', 10) );
    expect( result ).toBe( false );

    result= Types.hasNaN( true, /123/, '234', [], false );
    expect( result ).toBe( false );

  });

});

describe("hasNull( value, [value1, ..., valueN] )", function() {

 it("should return true if at least one argument is of type Null", function(){

    result= Types.hasNull( null );
    expect( result ).toBe( true );

    result= Types.hasNull( undefined, true, null, false, NaN );
    expect( result ).toBe( true );

    result= Types.hasNull();
    expect( result ).toBe( false );

    result= Types.hasNull( true, false, undefined, NaN, [], {} );
    expect( result ).toBe( false );

    result= Types.hasNull( '234', /abc/, function(){}, 44 );
    expect( result ).toBe( false );

  });

});

describe("hasUndefined( value, [value1, ..., valueN] )", function() {

 it("should return true if at least one argument is of type Undefined", function(){

    result= Types.hasUndefined( undefined );
    expect( result ).toBe( true );

    result= Types.hasUndefined( null, false, function(){}, undefined, true, '' );
    expect( result ).toBe( true );

    result= Types.hasUndefined();   // cannot be tested properly in jasmine, manual testing returns true.
    expect( result ).toBe( true );

    result= Types.hasUndefined( true, false, '234', 234, [], {}, NaN, null, new Date(), /abc/ );
    expect( result ).toBe( false );

  });
});

//                                              allType

describe("allBoolean( value, [value1, ..., valueN] )", function() {

it("should return true if all arguments are of type Boolean", function(){

    result= Types.allBoolean( true );
    expect( result ).toBe( true );

    result= Types.allBoolean( true, false, ('a' === 'a'), (true || false) );
    expect( result ).toBe( true );

    result= Types.allBoolean();
    expect( result ).toBe( false );

    result= Types.allBoolean( 'true', function(){}, 234, [], {}, null , undefined, NaN, /234/, new Date() );
    expect( result ).toBe( false );

  });
});

describe("allString( value, [value1, ..., valueN] )", function() {

  it("should return true if all arguments are of type String", function(){

    result= Types.allString( '' );
    expect( result ).toBe( true );

    result= Types.allString( 21+ '' );
    expect( result ).toBe( true );

    result= Types.allString( 'string', "double", (function(){ return 'hi'; })() );
    expect( result ).toBe( true );

    result= Types.allString();
    expect( result ).toBe( false );

    result= Types.allString( 'string', 'two', true, 'three', 'four' );
    expect( result ).toBe( false );

    result= Types.allString( 'at least one!', true, [1], { aString: 'string' }, 2345, false, undefined, null, NaN, new Date() );
    expect( result ).toBe( false );

  });
});

describe("allNumber( value, [value1, ..., valueN] )", function() {

  it("should return true if all arguments are of type Number", function(){

    result= Types.allNumber( 0 );
    expect( result ).toBe( true );

    result= Types.allNumber( parseInt('123'), 10 * 10 );
    expect( result ).toBe( true );

    result= Types.allNumber();
    expect( result ).toBe( false );

    result= Types.allNumber( 1, 2, 3, undefined, 4, 5 );
    expect( result ).toBe( false );

    result= Types.allNumber( new Object, 44, 88, 22 );
    expect( result ).toBe( false );

    result= Types.allNumber( NaN, 0 );
    expect( result ).toBe( false );

  });
});

describe("allStringOrNumber( value, [value1, ..., valueN] )", function() {

  it("should return true if all arguments are of type String or Number", function(){

    result= Types.allStringOrNumber( 0 );
    expect( result ).toBe( true );

    result= Types.allStringOrNumber( '0' );
    expect( result ).toBe( true );

    result= Types.allStringOrNumber( 10 * 10, 'both ok' );
    expect( result ).toBe( true );

    result= Types.allStringOrNumber( 'a'+ 'b', 24, parseInt('12', 10), 'abc', (10 * 10) );
    expect( result ).toBe( true );

    result= Types.allStringOrNumber();
    expect( result ).toBe( false );

    result= Types.allStringOrNumber( /0/, true, 'string', false );
    expect( result ).toBe( false );

    result= Types.allStringOrNumber( new Boolean(), 'a', 'b', 1, 2 );
    expect( result ).toBe( false );

    result= Types.allStringOrNumber( ['array'], null, undefined );
    expect( result ).toBe( false );

  });

});

describe("allArray( value, [value1, ..., valueN] )", function() {

 it("should return true if all arguments are of type Array", function(){

    result= Types.allArray( [] );
    expect( result ).toBe( true );

    result= Types.allArray();
    expect( result ).toBe( false );

    result= Types.allArray( [1, 2], [3, 4], undefined, [5,  6] );
    expect( result ).toBe( false );

  });
});

describe("allObject( value, [value1, ..., valueN] )", function() {

 it("should return true if all arguments are of type Object", function(){

    result= Types.allObject( {} );
    expect( result ).toBe( true );

    result= Types.allObject( {}, { ok: 'is object' }, new Object() );
    expect( result ).toBe( true );

    result= Types.allObject();
    expect( result ).toBe( false );

    result= Types.allObject( {}, { ok: 'is object' }, 0, new Object() );
    expect( result ).toBe( false );

  });
});

describe("allFunction( value, [value1, ..., valueN] )", function() {


 it("should return true if all arguments are of type Function", function(){

    result= Types.allFunction( function(){} );
    expect( result ).toBe( true );

    result= Types.allFunction( expect, Object, console.log );
    expect( result ).toBe( true );

    result= Types.allFunction();
    expect( result ).toBe( false );

    result= Types.allFunction(  expect, Object, 'not all', console.log );
    expect( result ).toBe( false );

  });
});

describe("allRegExp( value, [value1, ..., valueN] )", function() {

 it("should return true if all arguments are of type RegExp", function(){

    var reg= new RegExp('abc');

    result= Types.allRegExp( /reg/ig );
    expect( result ).toBe( true );

    result= Types.allRegExp( /re/, reg, new RegExp('123') );
    expect( result ).toBe( true );

    result= Types.allRegExp();
    expect( result ).toBe( false );

    result= Types.allRegExp( /re/, reg, true, new RegExp('123') );
    expect( result ).toBe( false );

  });
});

describe("allDate( value, [value1, ..., valueN] )", function() {


 it("should return true if all arguments are of type Date", function(){

    var date= new Date();

    result= Types.allDate( new Date() );
    expect( result ).toBe( true );

    result= Types.allDate( new Date('123'), date );
    expect( result ).toBe( true );

    result= Types.allDate();
    expect( result ).toBe( false );

    result= Types.allDate( date, undefined, new Date() );
    expect( result ).toBe( false );

  });
});

describe("allNaN( value, [value1, ..., valueN] )", function() {


 it("should return true if all arguments are of type NaN", function(){

    result= Types.allNaN( NaN );
    expect( result ).toBe( true );

    result= Types.allNaN(  NaN, parseInt('abc') );
    expect( result ).toBe( true );

    result= Types.allNaN();
    expect( result ).toBe( false );

    result= Types.allNaN( parseInt('123', 10), NaN, parseInt('abc') );
    expect( result ).toBe( false );

  });
});

describe("allNull( value, [value1, ..., valueN] )", function() {


 it("should return true if all arguments are of type Null", function(){

    result= Types.allNull( null );
    expect( result ).toBe( true );

    result= Types.allNull();
    expect( result ).toBe( false );

    result= Types.allNull( null, undefined );
    expect( result ).toBe( false );

  });

});

describe("allUndefined( value, [value1, ..., valueN] )", function() {

 it("should return true if all arguments are of type Undefined", function(){
    result= Types.allUndefined( undefined );
    expect( result ).toBe( true );

    var what;
    result= Types.allUndefined( undefined, (function(){})(), undefined, what);
    expect( result ).toBe( true );

    result= Types.allUndefined();
    expect( result ).toBe( true );

    result= Types.allUndefined( undefined, (function(){})(), null, undefined, 4  );
    expect( result ).toBe( false );

  });
});

//  //                                 typeof

describe("typeof( value )", function() {

it("should return true if the type of the argument corresponds to the types.js type definition for that type", function(){

    result= Types.typeof( false );
    expect( result ).toBe( 'boolean' );

    result= Types.typeof( 'a' === true );
    expect( result ).toBe( 'boolean' );

    result= Types.typeof( 'string' );
    expect( result ).toBe( 'string' );

    result= Types.typeof( '' );
    expect( result ).toBe( 'string' );

    result= Types.typeof( 0 );
    expect( result ).toBe( 'number' );

    result= Types.typeof( parseInt('abc') );
    expect( result ).toBe( 'nan' );

    result= Types.typeof( [] );
    expect( result ).toBe( 'array' );

    result= Types.typeof( {} );
    expect( result ).toBe( 'object' );

    result= Types.typeof( new Object() );
    expect( result ).toBe( 'object' );

    result= Types.typeof( null );
    expect( result ).toBe( 'null' );

    result= Types.typeof( NaN );
    expect( result ).toBe( 'nan' );

    result= Types.typeof( new Date() );
    expect( result ).toBe( 'date' );

    result= Types.typeof( /abc/ig );
    expect( result ).toBe( 'regexp' );

    result= Types.typeof( Object );
    expect( result ).toBe( 'function' );

    result= Types.typeof( function(){} );
    expect( result ).toBe( 'function' );

  });
});
//                                    forceTypes

describe("forceBoolean( value )", function() {

    it("should return a Boolean when only one argument of any type is given", function(){

        result= Types.typeof( Types.forceBoolean( true ) );
        expect( result ).toBe( 'boolean' );

        result= Types.typeof( Types.forceBoolean( '' ) );
        expect( result ).toBe( 'boolean' );

        result= Types.typeof( Types.forceBoolean( 'true' ) );
        expect( result ).toBe( 'boolean' );

        result= Types.typeof( Types.forceBoolean( 0 ) );
        expect( result ).toBe( 'boolean' );

        result= Types.typeof( Types.forceBoolean( 10 + 10 ) );
        expect( result ).toBe( 'boolean' );

        result= Types.typeof( Types.forceBoolean( function(){ return true; } ) );
        expect( result ).toBe( 'boolean' );

        result= Types.typeof( Types.forceBoolean( null ) );
        expect( result ).toBe( 'boolean' );

        result= Types.typeof( Types.forceBoolean( NaN ) );
        expect( result ).toBe( 'boolean' );

        result= Types.typeof( Types.forceBoolean() );
        expect( result ).toBe( 'boolean' );

      });

    it("should return a Boolean when two or more non Boolean arguments are given", function(){

        result= Types.typeof( Types.forceBoolean( 1, 2, 3 ) );
        expect( result ).toBe( 'boolean' );

        result= Types.typeof( Types.forceBoolean( '', 'true' ) );
        expect( result ).toBe( 'boolean' );

        result= Types.typeof( Types.forceBoolean( 'true', /false/ ) );
        expect( result ).toBe( 'boolean' );

        result= Types.typeof( Types.forceBoolean( 0, null, undefined ) );
        expect( result ).toBe( 'boolean' );

        result= Types.typeof( Types.forceBoolean( 10 + 10, [1,2,3],  {} ) );
        expect( result ).toBe( 'boolean' );

        result= Types.typeof( Types.forceBoolean( function(){ return true; }, new Date(), Object ) );
        expect( result ).toBe( 'boolean' );

        result= Types.typeof( Types.forceBoolean( null, NaN  ) );
        expect( result ).toBe( 'boolean' );

        result= Types.typeof( Types.forceBoolean( NaN, undefined ) );
        expect( result ).toBe( 'boolean' );

    });

    it("should return the value of the argument as a Boolean when it is a Boolean with a value", function(){
        result= Types.forceBoolean( true );
        expect( result ).toBe( true );

        result= Types.forceBoolean( false );
        expect( result ).toBe( false );
    });

    it("should return a Boolean false if argument is not a Boolean or convertable", function(){

        result= Types.forceBoolean( /false/ );
        expect( result ).toBe( false );

        result= Types.forceBoolean( 0 );
        expect( result ).toBe( false );

        result= Types.forceBoolean( 10 + 10 );
        expect( result ).toBe( false );

        result= Types.forceBoolean( function(){ return false; } );
        expect( result ).toBe( false );

        result= Types.forceBoolean( null );
        expect( result ).toBe( false );

        result= Types.forceBoolean( NaN );
        expect( result ).toBe( false );

        result= Types.forceBoolean( undefined );
        expect( result ).toBe( false );

        result= Types.forceBoolean( new Boolean() );
        expect( result ).toBe( false );

        result= Types.forceBoolean( 'false' );
        expect( result ).toBe( false );

    });

    it("should return the value of the second argument as a Boolean or false, when the first argument is not a Boolean", function(){

        result= Types.forceBoolean( 0, true );
        expect( result ).toBe( true );

        result= Types.forceBoolean( /false/, true );
        expect( result ).toBe( true );

        result= Types.forceBoolean( [], false );
        expect( result ).toBe( false );

        result= Types.forceBoolean( 0, false );
        expect( result ).toBe( false );

        result= Types.forceBoolean( function(){ return true; }, false );
        expect( result ).toBe( false );
    });
});

describe("forceString( value )", function() {

    it("should return a String type value, or String literal, when only one(or no) argument of any type is given", function(){

        result= Types.typeof( Types.forceString( true ) );
        expect( result ).toBe( 'string' );

        result= Types.typeof( Types.forceString( '' ) );
        expect( result ).toBe( 'string' );

        result= Types.typeof( Types.forceString( 'true' ) );
        expect( result ).toBe( 'string' );

        result= Types.typeof( Types.forceString( 0 ) );
        expect( result ).toBe( 'string' );

        result= Types.typeof( Types.forceString( 10 + 10 ) );
        expect( result ).toBe( 'string' );

        result= Types.typeof( Types.forceString( function(){ return true; } ) );
        expect( result ).toBe( 'string' );

        result= Types.typeof( Types.forceString( null ) );
        expect( result ).toBe( 'string' );

        result= Types.typeof( Types.forceString( NaN ) );
        expect( result ).toBe( 'string' );

        result= Types.typeof( Types.forceString() );
        expect( result ).toBe( 'string' );

      });


    it("should return a String literal when two or more non String arguments are given", function(){

        result= Types.typeof( Types.forceString( 1, 2, 3 ) );
        expect( result ).toBe( 'string' );

        result= Types.typeof( Types.forceString( true, /false/ ) );
        expect( result ).toBe( 'string' );

        result= Types.typeof( Types.forceString( 0, null, undefined ) );
        expect( result ).toBe( 'string' );

        result= Types.typeof( Types.forceString( 10 + 10, [1,2,3],  {} ) );
        expect( result ).toBe( 'string' );

        result= Types.typeof( Types.forceString( function(){ return true; }, new Date(), Object ) );
        expect( result ).toBe( 'string' );

        result= Types.typeof( Types.forceString( null, NaN  ) );
        expect( result ).toBe( 'string' );

        result= Types.typeof( Types.forceString( NaN, undefined ) );
        expect( result ).toBe( 'string' );

    });


    it("should return the value of the only argument as a String when it is a String or Number", function(){

        result= Types.forceString( 'true' );
        expect( result ).toBe( 'true' );

        result= Types.forceString( 10+ '');
        expect( result ).toBe( '10' );

        result= Types.forceString( 0 );
        expect( result ).toBe( '0' );

        result= Types.forceString( 10 + 10 );
        expect( result ).toBe( '20' );

        result= Types.forceString( parseInt('123', 10) );
        expect( result ).toBe( '123' );
    });


    it("should return empty string if argument is not a string", function(){
        result= Types.forceString( true );
        expect( result ).toBe( '' );

        result= Types.forceString( false );
        expect( result ).toBe( '' );

        result= Types.forceString( /false/ );
        expect( result ).toBe( '' );

        result= Types.forceString( function(){ return true; } );
        expect( result ).toBe( '' );

        result= Types.forceString( null );
        expect( result ).toBe( '' );

        result= Types.forceString( NaN );
        expect( result ).toBe( '' );

        result= Types.forceString( undefined );
        expect( result ).toBe( '' );

        result= Types.forceString( new Boolean() );
        expect( result ).toBe( '' );

    });


    it("should return the value of the second argument as a String(if it is a String), when the first argument is not a String or Number", function(){

        result= Types.forceString( {}, 'true' );
        expect( result ).toBe( 'true' );

        result= Types.forceString( /false/, 'ok' );
        expect( result ).toBe( 'ok' );

        result= Types.forceString( [], 'abc' );
        expect( result ).toBe( 'abc' );

        result= Types.forceString( function(){ return true; }, 'string' );
        expect( result ).toBe( 'string' );

        result= Types.forceString( null, 'null is not a string' );
        expect( result ).toBe( 'null is not a string' );

        result= Types.forceString( NaN, 'new String' );
        expect( result ).toBe( 'new String' );

    });



    it("should not auto-convert numbers when types.autoConvert is set to false", function(){

        Types.autoConvert= false;

        result= typeof Types.forceString( 1 );
        expect( result ).not.toBe( '1' );

        result= typeof Types.forceString( 1, 2 );
        expect( result ).not.toBe( '2' );

        Types.autoConvert= true;
    });

});


describe("forceNumber( value )", function() {


    it("should return a Number type value, or the Number 0, when only one(or no) argument of any type is given", function(){

        result= Types.typeof( Types.forceNumber(true) );
        expect( result ).toBe( 'number' );

        result= Types.typeof( Types.forceNumber('') );
        expect( result ).toBe( 'number' );

        result= Types.typeof( Types.forceNumber('true') );
        expect( result ).toBe( 'number' );

        result= Types.typeof( Types.forceNumber(0) );
        expect( result ).toBe( 'number' );

        result= Types.typeof( Types.forceNumber(10 + 10) );
        expect( result ).toBe( 'number' );

        result= Types.typeof( Types.forceNumber(function(){ return true; }) );
        expect( result ).toBe( 'number' );

        result= Types.typeof( Types.forceNumber(null) );
        expect( result ).toBe( 'number' );

        result= Types.typeof( Types.forceNumber(NaN) );
        expect( result ).toBe( 'number' );

        result= Types.typeof( Types.forceNumber(new Number()) );
        expect( result ).toBe( 'number' );

        result= Types.typeof( Types.forceNumber(undefined) );
        expect( result ).toBe( 'number' );

        result= Types.typeof( Types.forceNumber() );
        expect( result ).toBe( 'number' );

      });


    it("should return a Number type value when two or more non Number/(Number-String) arguments are given", function(){

        result= Types.typeof( Types.forceNumber([1, 2, 3], null, []) );
        expect( result ).toBe( 'number' );

        result= Types.typeof( Types.forceNumber('true', /false/) );
        expect( result ).toBe( 'number' );

        result= Types.typeof( Types.forceNumber(new Date(), null, undefined) );
        expect( result ).toBe( 'number' );

        result= Types.typeof( Types.forceNumber(10 + 10 === 0, [1,2,3],  {}) );
        expect( result ).toBe( 'number' );

        result= Types.typeof( Types.forceNumber(function(){ return true; }, new Date(), Object) );
        expect( result ).toBe( 'number' );

        result= Types.typeof( Types.forceNumber(null, NaN ) );
        expect( result ).toBe( 'number' );

        result= Types.typeof( Types.forceNumber(NaN, undefined) );
        expect( result ).toBe( 'number' );

    });


    it("should return result.void === true if argument cannot be converted to a usable Number", function(){

        result= Types.forceNumber( 'true' ).void;
        expect( result ).toBe( true );

        result= Types.forceNumber( parseInt('abc', 10) ).void;
        expect( result ).toBe( true );

        result= Types.forceNumber( true ).void;
        expect( result ).toBe( true );

        result= Types.forceNumber( false ).void;
        expect( result ).toBe( true );

        result= Types.forceNumber( /false/ ).void;
        expect( result ).toBe( true );

        result= Types.forceNumber( function(){ return true; } ).void;
        expect( result ).toBe( true );

        result= Types.forceNumber( null ).void;
        expect( result ).toBe( true );

        result= Types.forceNumber( NaN ).void;
        expect( result ).toBe( true );

        result= Types.forceNumber( undefined ).void;
        expect( result ).toBe( true );

        result= Types.forceNumber( new Boolean() ).void;
        expect( result ).toBe( true );

    });


    it("should return the value of the second argument as a Number(if it is a Number)", function(){

        result= Types.forceNumber( 'true', 1 );
        expect( result ).toBe( 1 );

        result= Types.forceNumber( /false/, 0 );
        expect( result ).toBe( 0 );

        result= Types.forceNumber( 'abc', 22 );
        expect( result ).toBe( 22 );

        result= Types.forceNumber( '', -1 );
        expect( result ).toBe( -1 );

        result= Types.forceNumber( function(){ return true; }, 44 );
        expect( result ).toBe( 44 );

        result= Types.forceNumber( null, 0 );
        expect( result ).toBe( 0 );

        result= Types.forceNumber( NaN, 10 );
        expect( result ).toBe( 10 );

    });
});

describe("forceArray( value )", function() {


    it("should return a Array type (according to types.js) value, or Array literal, when only one(or no) argument of any type is given", function(){

        result= Types.typeof( Types.forceArray( true ) );
        expect( result ).toBe( 'array' );

        result= Types.typeof( Types.forceArray( '' ) );
        expect( result ).toBe( 'array' );

        result= Types.typeof( Types.forceArray( 'true' ) );
        expect( result ).toBe( 'array' );

        result= Types.typeof( Types.forceArray( 0 ) );
        expect( result ).toBe( 'array' );

        result= Types.typeof( Types.forceArray( 10 + 10 ) );
        expect( result ).toBe( 'array' );

        result= Types.typeof( Types.forceArray( function(){ return true; } ) );
        expect( result ).toBe( 'array' );

        result= Types.typeof( Types.forceArray( null ) );
        expect( result ).toBe( 'array' );

        result= Types.typeof( Types.forceArray( NaN ) );
        expect( result ).toBe( 'array' );

        result= Types.typeof( Types.forceArray( new Number() ) );
        expect( result ).toBe( 'array' );

        result= Types.typeof( Types.forceArray( undefined ) );
        expect( result ).toBe( 'array' );

        result= Types.typeof( Types.forceArray() );
        expect( result ).toBe( 'array' );

      });


    it("should return a Array type value when two or more non Array arguments are given", function(){

        result= Types.typeof( Types.forceArray( 1, 2, 3 ) );
        expect( result ).toBe( 'array' );

        result= Types.typeof( Types.forceArray( 'true', /false/ ) );
        expect( result ).toBe( 'array' );

        result= Types.typeof( Types.forceArray( new Date(), null, undefined ) );
        expect( result ).toBe( 'array' );

        result= Types.typeof( Types.forceArray( 10 + 10 === 0, {}, NaN ) );
        expect( result ).toBe( 'array' );

        result= Types.typeof( Types.forceArray( function(){ return true; }, new Date(), Object ) );
        expect( result ).toBe( 'array' );

        result= Types.typeof( Types.forceArray( false, true, undefined ) );
        expect( result ).toBe( 'array' );

    });


    it("should return the value of the only argument as an Array, only when it is an Array, otherwise an empty Array literal ([]) instead", function(){

      function equal( a, b ){
        return ( (a > b) || (a < b) ) ? false : true;
      }

        result= equal( Types.forceArray( ['a'] ), ['a'] );
        expect( result ).toBe( true );

        result= equal( Types.forceArray( [] ), [] );
        expect( result ).toBe( true );

        result= equal( Types.forceArray( [{h: 'hello'}] ), [{h: 'hello'}] );
        expect( result ).toBe( true );

        result= equal( Types.forceArray( 'true' ), [] );
        expect( result ).toBe( true );

        result= equal( Types.forceArray( 10+ ''), [] );
        expect( result ).toBe( true );

        result= equal( Types.forceArray( 0 ), [] );
        expect( result ).toBe( true );

        result= equal( Types.forceArray( 10 + 10 ), [] );
        expect( result ).toBe( true );

        result= equal( Types.forceArray( parseInt('123', 10) ), [] );
        expect( result ).toBe( true );

        result= equal( Types.forceArray( parseInt('abc', 10) ), [] );
        expect( result ).toBe( true );

        result= equal( Types.forceArray( true ), [] );
        expect( result ).toBe( true );

        result= equal( Types.forceArray( false ), [] );
        expect( result ).toBe( true );

        result= equal( Types.forceArray( /false/ ), [] );
        expect( result ).toBe( true );

        result= equal( Types.forceArray( function(){ return true; } ), [] );
        expect( result ).toBe( true );

        result= equal( Types.forceArray( null ), [] );
        expect( result ).toBe( true );

        result= equal( Types.forceArray( NaN ), [] );
        expect( result ).toBe( true );

        result= equal( Types.forceArray( undefined ), [] );
        expect( result ).toBe( true );

        result= equal( Types.forceArray( new Boolean() ), [] );
        expect( result ).toBe( true );

    });

    it("should return the value of the second argument as an Array, or false(if it is an Array), when the first argument is not a Array", function(){

      function equal( a, b ){
        return ( (a > b) || (a < b) ) ? false : true;
      }

        result= equal( Types.forceArray( 'true', [1] ), [1]);
        expect( result ).toBe( true );

        result= equal( Types.forceArray( /false/, [0] ), [0] );
        expect( result ).toBe( true );

        result= equal( Types.forceArray( 'abc', [22] ), [22] );
        expect( result ).toBe( true );

        result= equal( Types.forceArray( '', [-1, 0] ), [-1, 0] );
        expect( result ).toBe( true );

        result= equal( Types.forceArray( function(){ return true; }, [44, 66] ), [44, 66] );
        expect( result ).toBe( true );

        result= equal( Types.forceArray( null, [0] ), [0] );
        expect( result ).toBe( true );

        result= equal( Types.forceArray( NaN, [0, 10] ), [0, 10] );
        expect( result ).toBe( true );

    });

});

describe("forceObject( value )", function() {

    it("should return a Object type (according to types.js) value, or object literal, when only one(or no) argument of any type is given", function(){

        result= Types.typeof( Types.forceObject( true ) );
        expect( result ).toBe( 'object' );

        result= Types.typeof( Types.forceObject( '' ) );
        expect( result ).toBe( 'object' );

        result= Types.typeof( Types.forceObject( 'true' ) );
        expect( result ).toBe( 'object' );

        result= Types.typeof( Types.forceObject( 0 ) );
        expect( result ).toBe( 'object' );

        result= Types.typeof( Types.forceObject( 10 + 10 ) );
        expect( result ).toBe( 'object' );

        result= Types.typeof( Types.forceObject( function(){ return true; } ) );
        expect( result ).toBe( 'object' );

        result= Types.typeof( Types.forceObject( null ) );
        expect( result ).toBe( 'object' );

        result= Types.typeof( Types.forceObject( NaN ) );
        expect( result ).toBe( 'object' );

        result= Types.typeof( Types.forceObject( new Number() ) );
        expect( result ).toBe( 'object' );

        result= Types.typeof( Types.forceObject( undefined ) );
        expect( result ).toBe( 'object' );

        result= Types.typeof( Types.forceObject() );
        expect( result ).toBe( 'object' );

      });


    it("should return a Object type value when two or more non Object arguments are given", function(){

        result= Types.typeof( Types.forceObject( 1, 2, 3 ) );
        expect( result ).toBe( 'object' );

        result= Types.typeof( Types.forceObject( 'true', /false/ ) );
        expect( result ).toBe( 'object' );

        result= Types.typeof( Types.forceObject( new Date(), null, undefined ) );
        expect( result ).toBe( 'object' );

        result= Types.typeof( Types.forceObject( 10 + 10 === 0, NaN ) );
        expect( result ).toBe( 'object' );

        result= Types.typeof( Types.forceObject( function(){ return true; }, new Date(), Object ) );
        expect( result ).toBe( 'object' );

        result= Types.typeof( Types.forceObject( false, true, undefined ) );
        expect( result ).toBe( 'object' );

    });


    it("should return the value of the only argument as an Object, only when it is an Object where .void is undefined", function(){

        result= Types.forceObject( {} );
        expect( result ).toEqual( {} );

        result= Types.forceObject( new Object );
        expect( result ).toEqual( {} );

        result= Types.forceObject( {hi: 'hi'} );
        expect( result ).toEqual( {hi: 'hi'} );

        result= Types.forceObject( new Object({hi: 'hi'}) );
        expect( result ).toEqual( {hi: 'hi'} );

    });


    it("should return an object literal {} if argument is no object and no replacement is given", function(){
        result= Types.forceObject( 10+ '' );
        expect( result ).toEqual( {} );

        result= Types.forceObject( 0 );
        expect( result ).toEqual( {} );

        result= Types.forceObject( 10 + 10 );
        expect( result ).toEqual( {} );

        result= Types.forceObject( parseInt('123', 10) );
        expect( result ).toEqual( {} );

        result= Types.forceObject( true );
        expect( result ).toEqual( {} );

        result= Types.forceObject( false );
        expect( result ).toEqual( {} );

        result= Types.forceObject( /false/ );
        expect( result ).toEqual( {} );

        result= Types.forceObject( function(){ return true; } );
        expect( result ).toEqual( {} );

        result= Types.forceObject( null );
        expect( result ).toEqual( {} );

        result= Types.forceObject( NaN );
        expect( result ).toEqual( {} );

        result= Types.forceObject( undefined );
        expect( result ).toEqual( {} );

    });

    it("should return the value of the second argument as an Object(if it is an Object), or {}, when the first argument is not a Object", function(){

      result= Types.forceObject( [1, 2], {firstArg: 'no object'} );
      expect( result ).toEqual( {firstArg: 'no object'} );

      result= Types.forceObject( /false/, {firstArg: 'no object'} );
      expect( result ).toEqual( {firstArg: 'no object'} );

      result= Types.forceObject( 'abc', {firstArg: 'no object'} );
      expect( result ).toEqual( {firstArg: 'no object'} );

      result= Types.forceObject( 25, {firstArg: 'no object'} );
      expect( result ).toEqual( {firstArg: 'no object'} );

      result= Types.forceObject( null, {firstArg: 'no object'} );
      expect( result ).toEqual( {firstArg: 'no object'} );

      result= Types.forceObject( NaN, {firstArg: 'no object'} );
      expect( result ).toEqual( {firstArg: 'no object'} );

      result= Types.forceObject( new Date(), {firstArg: 'no object'} );
      expect( result ).toEqual( {firstArg: 'no object'} );

      result= Types.forceObject( new RegExp(), {firstArg: 'no object'} );
      expect( result ).toEqual( {firstArg: 'no object'} );

    });

});

describe("forceFunction( value )", function() {

    it("should return a Function type (according to types.js) value, or an empty function, when only one(or no) argument of any type is given", function(){

        result= Types.typeof( Types.forceFunction() );
        expect( result ).toBe( 'function' );

        result= Types.typeof( Types.forceFunction( function(){} ) );
        expect( result ).toBe( 'function' );

        result= Types.typeof( Types.forceFunction( '' ) );
        expect( result ).toBe( 'function' );

        result= Types.typeof( Types.forceFunction( 'true' ) );
        expect( result ).toBe( 'function' );

        result= Types.typeof( Types.forceFunction( 0 ) );
        expect( result ).toBe( 'function' );

        result= Types.typeof( Types.forceFunction( 10 + 10 ) );
        expect( result ).toBe( 'function' );

        result= Types.typeof( Types.forceFunction( /asdf/ ) );
        expect( result ).toBe( 'function' );

        result= Types.typeof( Types.forceFunction( null ) );
        expect( result ).toBe( 'function' );

        result= Types.typeof( Types.forceFunction( NaN ) );
        expect( result ).toBe( 'function' );

        result= Types.typeof( Types.forceFunction( new Number() ) );
        expect( result ).toBe( 'function' );

        result= Types.typeof( Types.forceFunction( undefined ) );
        expect( result ).toBe( 'function' );


      });


    it("should return a Function type value when two or more non Function arguments are given", function(){

        result= Types.typeof( Types.forceFunction( 1, 2, 3 ) );
        expect( result ).toBe( 'function' );

        result= Types.typeof( Types.forceFunction( 'true', /false/ ) );
        expect( result ).toBe( 'function' );

        result= Types.typeof( Types.forceFunction( new Date(), null, undefined ) );
        expect( result ).toBe( 'function' );

        result= Types.typeof( Types.forceFunction( 10 + 10 === 0, NaN ) );
        expect( result ).toBe( 'function' );

        result= Types.typeof( Types.forceFunction( (function(){ return true; })(), new Date() ) );
        expect( result ).toBe( 'function' );

        result= Types.typeof( Types.forceFunction( false, true, undefined ) );
        expect( result ).toBe( 'function' );

    });


    it("should return the value of the only argument as a Function, only when it is a Function, otherwise an empty function instead", function(){

        result= Types.forceFunction( Object  );
        expect( result ).toBe( Object );

        result= Types.forceFunction( Function );
        expect( result ).toBe( Function );

        result= Types.forceFunction( function(){ return 'ok'; } )();
        expect( result ).toBe( 'ok' );

        result= Types.forceFunction()();  // calls the default (nop) function, returns undefined as standard Javascript
        expect( result ).toBe( undefined );

        result= Types.forceFunction( false )();
        expect( result ).toBe( undefined );

        result= Types.forceFunction( /abc/ )();
        expect( result ).toBe( undefined );

        result= Types.forceFunction( [1,2,3] )();
        expect( result ).toBe( undefined );

        result= Types.forceFunction( {final: true} )();
        expect( result ).toBe( undefined );

        result= Types.forceFunction( null )();
        expect( result ).toBe( undefined );

        result= Types.forceFunction( new Date() )();
        expect( result ).toBe( undefined );

        result= Types.forceFunction( undefined )();
        expect( result ).toBe( undefined );

        // don't know yet how to better test for types.js default empty function with jasmin.
        // tested this thoroughly by hand anyways, but should be in here eventually..
    });


    it("should return the second argument as a Function(if it is a Function), when the first argument is not of type Function", function(){
        // Object is a function..
        result= Types.forceFunction( 123, function(){}  );
        expect( Types.typeof(result) ).toBe( 'function' );

        result= Types.forceFunction( 'string', Object  );
        expect( Types.typeof(result) ).toBe( 'function' );

        result= Types.forceFunction( [1,2,3], Object  );
        expect( Types.typeof(result) ).toBe( 'function' );

        result= Types.forceFunction( new Date(), Object  );
        expect( Types.typeof(result) ).toBe( 'function' );

        result= Types.forceFunction( null, Object  );
        expect( Types.typeof(result) ).toBe( 'function' );

        result= Types.forceFunction( NaN, Object  );
        expect( Types.typeof(result) ).toBe( 'function' );

        result= Types.forceFunction( /asdf/, Object  );
        expect( Types.typeof(result) ).toBe( 'function' );

        result= Types.forceFunction( undefined, Object  );
        expect( Types.typeof(result) ).toBe( 'function' );

      });

});


//
//  enum
//
describe( "enum( items, offset )", function(){

    const COLORS= [ 'RED', 'GREEN', 'BLUE' ];


    it( "should always return an object", function(){

        result= Types.enum();
        expect( Types.typeof(result) ).toBe( 'object' );

        result= Types.enum( new Date, '?' );
        expect( Types.typeof(result) ).toBe( 'object' );
    });


    it( "types.isEnum should return true when tested on a with types.js created enum", function(){
        const colors= Types.enum( COLORS );
        expect( Types.isEnum(colors) ).toBe( true );
    });


    it( "should return an object with the same amount of key's as items given in 'items'", function(){

        const colors    = Types.enum( COLORS );
        const count     = Object.keys( colors ).length;
        expect( COLORS.length ).toBe( count );
    });


    it( "should ignore non-string type items", function(){

        const containsNonStrings= COLORS.concat( [1, [], new Date] );
        const colors       = Types.enum( containsNonStrings );
        const colorsLength = Object.keys( colors ).length;

        expect( COLORS.length ).toBe( colorsLength );
    });


    it( "should return keys with its proper index as value", function(){

        const colors= Types.enum( COLORS );

        expect( colors.RED ).toBe( 0 );
        expect( colors.GREEN ).toBe( 1 );
        expect( colors.BLUE ).toBe( 2 );
    });


    it( "should return keys with its proper index as value, also relative to a provided offset", function(){

        const colors= Types.enum( COLORS, 10 );

        expect( colors.RED ).toBe( 10 );
        expect( colors.GREEN ).toBe( 11 );
        expect( colors.BLUE ).toBe( 12 );
    });


    it( "should return an immutable object", function(){

        const colors= Types.enum( COLORS );
        colors.SHOULD_BE_IGNORED= '!';

        const count= Object.keys( colors ).length;
        expect( COLORS.length ).toBe( count );

        colors.RED= '?';
        expect( colors.RED ).toBe( 0 );

        delete colors.GREEN;
        expect( colors.GREEN ).toBe( 1 );
    });

});



it( "should equal aliases", function(){

    expect( Types.enum ).toEqual( Types.enumerate );
    expect( Types.typeof ).toEqual( Types.typeOf );

});

it( "should set the defaults right", function(){

    expect( Types.parseIntBase ).toBe( 10 );
    expect( Types.autoConvert ).toBe( true );

});

