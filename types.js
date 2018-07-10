// Generated by CoffeeScript 2.1.1
(function() {
  //	types.js - A tiny and fast dynamic type checker/enforcer library

  // MIT License

  // Copyright (c) 2014 Dennis Raymondo van der Sluis

  // Permission is hereby granted, free of charge, to any person obtaining a copy
  // of this software and associated documentation files (the "Software"), to deal
  // in the Software without restriction, including without limitation the rights
  // to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
  // copies of the Software, and to permit persons to whom the Software is
  // furnished to do so, subject to the following conditions:

  // The above copyright notice and this permission notice shall be included in all
  // copies or substantial portions of the Software.

  // THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
  // IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
  // FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
  // AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
  // LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
  // OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
  // SOFTWARE.

  // heavily refactored to reduce size while optimizing for speed, at the cost of some readability..
  var ARRAY, BOOLEAN, BREAK_IF_EQUAL, DATE, DEFINED, ENUM, ENUM_ERR_PREFIX, ENUM_ID, FORCE_MSG_PREFIX, FUNCTION, LITERALS, LOGGING_DISABLED, LOGGING_ENABLED, MODULE_NAME, NAN, NULL, NUMBER, OBJECT, REGEXP, STRING, TYPES, Types, UNDEFINED, createEnum, createForce, instanceOf, log, logForce, testHasAndAll, typeOf, types, upFirst;

  MODULE_NAME = 'types.js';

  ENUM_ID = '_ENUM_';

  FORCE_MSG_PREFIX = `${MODULE_NAME} - force`;

  ENUM_ERR_PREFIX = `${MODULE_NAME} - enum: ERROR,`;

  LOGGING_DISABLED = `${MODULE_NAME} - all logging disabled by user`;

  LOGGING_ENABLED = `${MODULE_NAME} - logging re-enabled by user`;

  UNDEFINED = 'undefined';

  NULL = 'null';

  FUNCTION = 'function';

  BOOLEAN = 'boolean';

  STRING = 'string';

  ARRAY = 'array';

  REGEXP = 'regexp';

  DATE = 'date';

  NUMBER = 'number';

  OBJECT = 'object';

  NAN = 'nan';

  DEFINED = 'defined';

  ENUM = 'enum';

  LITERALS = {
    [BOOLEAN]: false,
    [STRING]: '',
    [OBJECT]: {},
    [ARRAY]: [],
    [FUNCTION]: function() {},
    [NUMBER]: (function() {
      var number;
      number = new Number;
      number.void = true;
      return number;
    })(),
    [REGEXP]: new RegExp
  };

  log = function(...args) {
    if (Types.logging) {
      return console.log(...args);
    }
  };

  logForce = function() {};

  // an unsafe internal for making the first character of a type id uppercase
  upFirst = function(str) {
    return str = str[0].toUpperCase() + str.slice(1);
  };

  instanceOf = function(type, value) {
    return value instanceof type;
  };

  // type defaults to object, for internal can do, saves for a few bytes..
  typeOf = function(value, type = OBJECT) {
    return typeof value === type;
  };

  createEnum = function() {
    var _enum;
    _enum = {};
    Object.defineProperty(_enum, ENUM_ID, {
      configurable: false,
      enumerable: false,
      value: true,
      writable: false
    });
    return _enum;
  };

  // all definitions that will be used for the is[type], not[type], etc.. tests
  TYPES = {
    [UNDEFINED]: function(value) {
      return value === void 0;
    },
    [NULL]: function(value) {
      return value === null;
    },
    [FUNCTION]: function(value) {
      return typeOf(value, FUNCTION);
    },
    [BOOLEAN]: function(value) {
      return typeOf(value, BOOLEAN);
    },
    [STRING]: function(value) {
      return typeOf(value, STRING);
    },
    [ARRAY]: function(value) {
      return typeOf(value) && instanceOf(Array, value);
    },
    [REGEXP]: function(value) {
      return typeOf(value) && instanceOf(RegExp, value);
    },
    [DATE]: function(value) {
      return typeOf(value) && instanceOf(Date, value);
    },
    [NUMBER]: function(value) {
      return typeOf(value, NUMBER) && (value === value) || (typeOf(value) && instanceOf(Number, value));
    },
    [OBJECT]: function(value) {
      return typeOf(value) && (value !== null) && !instanceOf(Boolean, value) && !instanceOf(Number, value) && !instanceOf(Array, value) && !instanceOf(RegExp, value) && !instanceOf(Date, value);
    },
    [NAN]: function(value) {
      return typeOf(value, NUMBER) && (value !== value);
    },
    [DEFINED]: function(value) {
      return value !== void 0;
    },
    [ENUM]: function(value) {
      return Types.forceObject(value).hasOwnProperty(ENUM_ID);
    }
  };

  TYPES.StringOrNumber = function(value) {
    return TYPES[STRING](value) || TYPES[NUMBER](value);
  };

  // define the main object that this module returns
  Types = types = {
    // used by forceNumber to set the Radix, defaults to decimals
    parseIntBase: 10,
    autoConvert: true,
    logging: true,
    disableLogging: function() {
      Types.logging = false;
      return console.log(LOGGING_DISABLED);
    },
    enableLogging: function() {
      Types.logging = true;
      return console.log(LOGGING_ENABLED);
    },
    logForce: function(externalLog) {
      return logForce = function(errLevel, expectedType, encounteredType) {
        var msg;
        if (Types.isFunction(externalLog)) {
          return externalLog(errLevel, expectedType, encounteredType);
        } else {
          msg = expectedType;
          switch (errLevel) {
            case 1:
              msg += ": initial value is not of type " + expectedType;
              break;
            case 2:
              msg += ": optional value is not of type " + expectedType;
              break;
            case 3:
              msg += ": no valid type found, returning a type " + expectedType + " literal";
          }
          return log(FORCE_MSG_PREFIX + msg);
        }
      };
    }
  };

  // factory that creates all Types.force[type] variations
  createForce = function(type) {
    var Type, test;
    Type = upFirst(type);
    // convert value in case initial Type test failed. failed conversion returns undefined
    test = function(value) {
      if (types.autoConvert) {
        switch (type) {
          case NUMBER:
            if (!value.void) {
              value = parseInt(value, types.parseIntBase);
            }
            break;
          case STRING:
            if (types.isNumber(value)) {
              value += '';
            }
        }
      }
      if (Types['is' + Type](value)) {
        return value;
      }
    };
    // the forctType method, returns the Type's literal or defaultValue if both value and replacement are not compatible
    return function(value, replacement) {
      var okValue, replacementType;
      if ((value != null) && (void 0 !== (okValue = test(value)))) {
        return okValue;
      }
      logForce(1, Type, value);
      if (types.isDefined(replacement)) {
        replacementType = types.typeof(replacement);
        if ((replacement != null) && (void 0 !== (replacement = test(replacement)))) {
          return replacement;
        } else {
          logForce(2, Type, value);
        }
      }
      logForce(3, Type, value);
      return LITERALS[type];
    };
  };

  // test multiple values(arguments) for a given predicate. returns breakState if predicate is breakState for some value
  // when no break occured, ! breakState will be returned.
  testHasAndAll = function(predicate, breakState, values = []) {
    var i, len, value;
    if (values.length < 1) {
      // testing 'has' or 'all' for 'undefined' should return true on calls without arguments
      return predicate === TYPES[UNDEFINED];
    }
    for (i = 0, len = values.length; i < len; i++) {
      value = values[i];
      if (predicate(value) === breakState) {
        return breakState;
      }
    }
    return !breakState;
  };

  // generate all the is/not/has/all/force Types
  BREAK_IF_EQUAL = true;

  (function() {
    var predicate, results, type;
    results = [];
    for (type in TYPES) {
      predicate = TYPES[type];
      results.push((function(type, predicate) {
        var Type;
        Type = (function() {
          switch (type) {
            case NAN:
              return 'NaN';
            case REGEXP:
              return 'RegExp';
            default:
              return upFirst(type);
          }
        })();
        Types['is' + Type] = predicate;
        Types['not' + Type] = function(value) {
          return !predicate(value);
        };
        Types['has' + Type] = function() {
          return testHasAndAll(predicate, BREAK_IF_EQUAL, arguments);
        };
        Types['all' + Type] = function() {
          return testHasAndAll(predicate, !BREAK_IF_EQUAL, arguments);
        };
        // create only forceType of types found in LITERALS
        if (type in LITERALS) {
          Types['force' + Type] = createForce(type);
        }
        return Types['getFirst' + Type] = function(...values) {
          var i, len, value;
          for (i = 0, len = values.length; i < len; i++) {
            value = values[i];
            if (Types['is' + Type](value)) {
              return value;
            }
          }
        };
      })(type, predicate));
    }
    return results;
  })();

  Types.intoArray = function(...args) {
    if (args.length < 2) {
      if (types.isString(args[0])) {
        // to string, trim, limit to one consecutive space, back to array
        args = args.join('').replace(/^\s+|\s+$/g, '').replace(/\s+/g, ' ').split(' ');
      } else if (types.isArray(args[0])) {
        args = args[0];
      }
    }
    return args;
  };

  Types.typeOf = Types.typeof = function(value) {
    var name, predicate;
    for (name in TYPES) {
      predicate = TYPES[name];
      if (predicate(value) === true) {
        return name;
      }
    }
  };

  Types.enum = Types.enumerate = function(items, offset) {
    var _enum, i, index, item, len;
    offset = types.forceNumber(offset, 0);
    _enum = createEnum();
    if (types.notArray(items)) {
      log(`${ENUM_ERR_PREFIX} invalid or missing enumeration array`);
      return _enum;
    }
    for (index = i = 0, len = items.length; i < len; index = ++i) {
      item = items[index];
      if (types.isString(item)) {
        _enum[item] = index + offset;
      } else {
        log(`${ENUM_ERR_PREFIX} ignored non-string item that was found in enumeration array`);
      }
    }
    types.forceFunction(Object.freeze)(_enum);
    return _enum;
  };

  if ((typeof define !== "undefined" && define !== null) && (FUNCTION === typeof define) && define.amd) {
    define('types', [], function() {
      return Types;
    });
  }

  if (typeof module !== UNDEFINED) {
    module.exports = Types;
  }

  if (typeof window !== UNDEFINED) {
    window.Types = Types;
  }

}).call(this);
