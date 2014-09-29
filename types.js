// Generated by CoffeeScript 1.8.0
(function() {
  "use strict";
  var Types, breakIfEqual, testValues, typesPredicates;

  Types = {};

  testValues = function(predicate, breakState, values) {
    var value, _i, _len;
    if (values == null) {
      values = [];
    }
    if (values.length < 1) {
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
      return (typeof value === 'number') && (value === value);
    },
    'Array': function(value) {
      return (typeof value === 'object') && (value instanceof Array);
    },
    'RegExp': function(value) {
      return value instanceof RegExp;
    },
    'Date': function(value) {
      return value instanceof Date;
    },
    'Object': function(value) {
      return (typeof value === 'object') && !(value instanceof Array) && !(value instanceof RegExp) && !(value === null);
    },
    'NaN': function(value) {
      return (typeof value === 'number') && (value !== value);
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
        return Types['all' + name] = function() {
          return testValues(predicate, !breakIfEqual, arguments);
        };
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
    return 'unknown';
  };

  if (typeof window !== "undefined" && window !== null) {
    window.Types = Types;
  } else if (module) {
    module.exports = Types;
  }

}).call(this);