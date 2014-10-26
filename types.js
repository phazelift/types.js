// Generated by CoffeeScript 1.8.0
(function() {
  "use strict";
  var Types, breakIfEqual, createForce, emptyNumber, literals, testValues, typesPredicates;

  emptyNumber = function() {
    var number;
    number = new Number;
    number["void"] = true;
    return number;
  };

  Types = {
    parseIntBase: 10
  };

  literals = {
    'Boolean': false,
    'String': '',
    'Number': emptyNumber(),
    'Object': {},
    'Array': [],
    'Function': function() {}
  };

  createForce = function(type) {
    var convertType;
    convertType = function(value) {
      switch (type) {
        case 'Number':
          if (Types.isNumber(value = parseInt(value, Types.parseIntBase))) {
            return value;
          }
          break;
        case 'String':
          if (Types.isStringOrNumber(value)) {
            return value + '';
          }
          break;
        default:
          if (Types['is' + type](value)) {
            return value;
          }
      }
      return false;
    };
    return function(value, replacement) {
      if (false !== (value = convertType(value))) {
        return value;
      }
      if (false !== (replacement = convertType(replacement))) {
        return replacement;
      }
      return literals[type];
    };
  };

  testValues = function(predicate, breakState, values) {
    var value, _i, _len;
    if (values == null) {
      values = [];
    }
    if (values.length < 1) {
      if (predicate === typesPredicates.Undefined) {
        return true;
      }
      return false;
    }
    for (_i = 0, _len = values.length; _i < _len; _i++) {
      value = values[_i];
      if ((predicate(value)) === breakState) {
        return breakState;
      }
    }
    return !breakState;
  };

  typesPredicates = {
    'Undefined': function(value) {
      return value === void 0;
    },
    'Null': function(value) {
      return value === null;
    },
    'Boolean': function(value) {
      return typeof value === 'boolean';
    },
    'String': function(value) {
      return typeof value === 'string';
    },
    'Function': function(value) {
      return typeof value === 'function';
    },
    'Number': function(value) {
      return (typeof value === 'number') && (value === value) || ((typeof value === 'object') && (value instanceof Number) && value["void"]);
    },
    'Array': function(value) {
      return (typeof value === 'object') && (value instanceof Array);
    },
    'RegExp': function(value) {
      return (typeof value === 'object') && (value instanceof RegExp);
    },
    'Date': function(value) {
      return (typeof value === 'object') && (value instanceof Date);
    },
    'Object': function(value) {
      return (typeof value === 'object') && (value !== null) && !(value instanceof Array) && !(value instanceof RegExp) && !(value instanceof Date);
    },
    'NaN': function(value) {
      return (typeof value === 'number') && (value !== value);
    },
    'Defined': function(value) {
      return value !== void 0;
    }
  };

  typesPredicates.StringOrNumber = function(value) {
    return typesPredicates['String'](value) || typesPredicates['Number'](value);
  };

  breakIfEqual = true;

  (function() {
    var name, predicate, _results;
    _results = [];
    for (name in typesPredicates) {
      predicate = typesPredicates[name];
      _results.push((function(name, predicate) {
        Types['is' + name] = predicate;
        Types['not' + name] = function(value) {
          return !predicate(value);
        };
        Types['has' + name] = function() {
          return testValues(predicate, breakIfEqual, arguments);
        };
        Types['all' + name] = function() {
          return testValues(predicate, !breakIfEqual, arguments);
        };
        if (name in literals) {
          return Types['force' + name] = createForce(name);
        }
      })(name, predicate));
    }
    return _results;
  })();

  Types["typeof"] = function(value) {
    var predicate, type;
    for (type in typesPredicates) {
      predicate = typesPredicates[type];
      if (predicate(value) === true) {
        return type.toLowerCase();
      }
    }
  };

  if (typeof window !== "undefined" && window !== null) {
    window.Types = Types;
  } else if (module) {
    module.exports = Types;
  }

}).call(this);
