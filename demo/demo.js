var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __commonJS = (cb, mod) => function __require() {
  return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));

// node_modules/handlebars/dist/cjs/handlebars/utils.js
var require_utils = __commonJS({
  "node_modules/handlebars/dist/cjs/handlebars/utils.js"(exports) {
    "use strict";
    exports.__esModule = true;
    exports.extend = extend;
    exports.indexOf = indexOf;
    exports.escapeExpression = escapeExpression;
    exports.isEmpty = isEmpty;
    exports.createFrame = createFrame;
    exports.blockParams = blockParams;
    exports.appendContextPath = appendContextPath;
    var escape = {
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': "&quot;",
      "'": "&#x27;",
      "`": "&#x60;",
      "=": "&#x3D;"
    };
    var badChars = /[&<>"'`=]/g;
    var possible = /[&<>"'`=]/;
    function escapeChar(chr) {
      return escape[chr];
    }
    function extend(obj) {
      for (var i = 1; i < arguments.length; i++) {
        for (var key in arguments[i]) {
          if (Object.prototype.hasOwnProperty.call(arguments[i], key)) {
            obj[key] = arguments[i][key];
          }
        }
      }
      return obj;
    }
    var toString = Object.prototype.toString;
    exports.toString = toString;
    var isFunction = function isFunction2(value) {
      return typeof value === "function";
    };
    if (isFunction(/x/)) {
      exports.isFunction = isFunction = function(value) {
        return typeof value === "function" && toString.call(value) === "[object Function]";
      };
    }
    exports.isFunction = isFunction;
    var isArray = Array.isArray || function(value) {
      return value && typeof value === "object" ? toString.call(value) === "[object Array]" : false;
    };
    exports.isArray = isArray;
    function indexOf(array, value) {
      for (var i = 0, len = array.length; i < len; i++) {
        if (array[i] === value) {
          return i;
        }
      }
      return -1;
    }
    function escapeExpression(string) {
      if (typeof string !== "string") {
        if (string && string.toHTML) {
          return string.toHTML();
        } else if (string == null) {
          return "";
        } else if (!string) {
          return string + "";
        }
        string = "" + string;
      }
      if (!possible.test(string)) {
        return string;
      }
      return string.replace(badChars, escapeChar);
    }
    function isEmpty(value) {
      if (!value && value !== 0) {
        return true;
      } else if (isArray(value) && value.length === 0) {
        return true;
      } else {
        return false;
      }
    }
    function createFrame(object) {
      var frame = extend({}, object);
      frame._parent = object;
      return frame;
    }
    function blockParams(params, ids) {
      params.path = ids;
      return params;
    }
    function appendContextPath(contextPath, id) {
      return (contextPath ? contextPath + "." : "") + id;
    }
  }
});

// node_modules/handlebars/dist/cjs/handlebars/exception.js
var require_exception = __commonJS({
  "node_modules/handlebars/dist/cjs/handlebars/exception.js"(exports, module) {
    "use strict";
    exports.__esModule = true;
    var errorProps = ["description", "fileName", "lineNumber", "endLineNumber", "message", "name", "number", "stack"];
    function Exception(message, node) {
      var loc = node && node.loc, line = void 0, endLineNumber = void 0, column = void 0, endColumn = void 0;
      if (loc) {
        line = loc.start.line;
        endLineNumber = loc.end.line;
        column = loc.start.column;
        endColumn = loc.end.column;
        message += " - " + line + ":" + column;
      }
      var tmp = Error.prototype.constructor.call(this, message);
      for (var idx = 0; idx < errorProps.length; idx++) {
        this[errorProps[idx]] = tmp[errorProps[idx]];
      }
      if (Error.captureStackTrace) {
        Error.captureStackTrace(this, Exception);
      }
      try {
        if (loc) {
          this.lineNumber = line;
          this.endLineNumber = endLineNumber;
          if (Object.defineProperty) {
            Object.defineProperty(this, "column", {
              value: column,
              enumerable: true
            });
            Object.defineProperty(this, "endColumn", {
              value: endColumn,
              enumerable: true
            });
          } else {
            this.column = column;
            this.endColumn = endColumn;
          }
        }
      } catch (nop) {
      }
    }
    Exception.prototype = new Error();
    exports["default"] = Exception;
    module.exports = exports["default"];
  }
});

// node_modules/handlebars/dist/cjs/handlebars/helpers/block-helper-missing.js
var require_block_helper_missing = __commonJS({
  "node_modules/handlebars/dist/cjs/handlebars/helpers/block-helper-missing.js"(exports, module) {
    "use strict";
    exports.__esModule = true;
    var _utils = require_utils();
    exports["default"] = function(instance) {
      instance.registerHelper("blockHelperMissing", function(context, options) {
        var inverse = options.inverse, fn = options.fn;
        if (context === true) {
          return fn(this);
        } else if (context === false || context == null) {
          return inverse(this);
        } else if (_utils.isArray(context)) {
          if (context.length > 0) {
            if (options.ids) {
              options.ids = [options.name];
            }
            return instance.helpers.each(context, options);
          } else {
            return inverse(this);
          }
        } else {
          if (options.data && options.ids) {
            var data = _utils.createFrame(options.data);
            data.contextPath = _utils.appendContextPath(options.data.contextPath, options.name);
            options = { data };
          }
          return fn(context, options);
        }
      });
    };
    module.exports = exports["default"];
  }
});

// node_modules/handlebars/dist/cjs/handlebars/helpers/each.js
var require_each = __commonJS({
  "node_modules/handlebars/dist/cjs/handlebars/helpers/each.js"(exports, module) {
    "use strict";
    exports.__esModule = true;
    function _interopRequireDefault(obj) {
      return obj && obj.__esModule ? obj : { "default": obj };
    }
    var _utils = require_utils();
    var _exception = require_exception();
    var _exception2 = _interopRequireDefault(_exception);
    exports["default"] = function(instance) {
      instance.registerHelper("each", function(context, options) {
        if (!options) {
          throw new _exception2["default"]("Must pass iterator to #each");
        }
        var fn = options.fn, inverse = options.inverse, i = 0, ret = "", data = void 0, contextPath = void 0;
        if (options.data && options.ids) {
          contextPath = _utils.appendContextPath(options.data.contextPath, options.ids[0]) + ".";
        }
        if (_utils.isFunction(context)) {
          context = context.call(this);
        }
        if (options.data) {
          data = _utils.createFrame(options.data);
        }
        function execIteration(field, index, last) {
          if (data) {
            data.key = field;
            data.index = index;
            data.first = index === 0;
            data.last = !!last;
            if (contextPath) {
              data.contextPath = contextPath + field;
            }
          }
          ret = ret + fn(context[field], {
            data,
            blockParams: _utils.blockParams([context[field], field], [contextPath + field, null])
          });
        }
        if (context && typeof context === "object") {
          if (_utils.isArray(context)) {
            for (var j = context.length; i < j; i++) {
              if (i in context) {
                execIteration(i, i, i === context.length - 1);
              }
            }
          } else if (typeof Symbol === "function" && context[Symbol.iterator]) {
            var newContext = [];
            var iterator = context[Symbol.iterator]();
            for (var it = iterator.next(); !it.done; it = iterator.next()) {
              newContext.push(it.value);
            }
            context = newContext;
            for (var j = context.length; i < j; i++) {
              execIteration(i, i, i === context.length - 1);
            }
          } else {
            (function() {
              var priorKey = void 0;
              Object.keys(context).forEach(function(key) {
                if (priorKey !== void 0) {
                  execIteration(priorKey, i - 1);
                }
                priorKey = key;
                i++;
              });
              if (priorKey !== void 0) {
                execIteration(priorKey, i - 1, true);
              }
            })();
          }
        }
        if (i === 0) {
          ret = inverse(this);
        }
        return ret;
      });
    };
    module.exports = exports["default"];
  }
});

// node_modules/handlebars/dist/cjs/handlebars/helpers/helper-missing.js
var require_helper_missing = __commonJS({
  "node_modules/handlebars/dist/cjs/handlebars/helpers/helper-missing.js"(exports, module) {
    "use strict";
    exports.__esModule = true;
    function _interopRequireDefault(obj) {
      return obj && obj.__esModule ? obj : { "default": obj };
    }
    var _exception = require_exception();
    var _exception2 = _interopRequireDefault(_exception);
    exports["default"] = function(instance) {
      instance.registerHelper("helperMissing", function() {
        if (arguments.length === 1) {
          return void 0;
        } else {
          throw new _exception2["default"]('Missing helper: "' + arguments[arguments.length - 1].name + '"');
        }
      });
    };
    module.exports = exports["default"];
  }
});

// node_modules/handlebars/dist/cjs/handlebars/helpers/if.js
var require_if = __commonJS({
  "node_modules/handlebars/dist/cjs/handlebars/helpers/if.js"(exports, module) {
    "use strict";
    exports.__esModule = true;
    function _interopRequireDefault(obj) {
      return obj && obj.__esModule ? obj : { "default": obj };
    }
    var _utils = require_utils();
    var _exception = require_exception();
    var _exception2 = _interopRequireDefault(_exception);
    exports["default"] = function(instance) {
      instance.registerHelper("if", function(conditional, options) {
        if (arguments.length != 2) {
          throw new _exception2["default"]("#if requires exactly one argument");
        }
        if (_utils.isFunction(conditional)) {
          conditional = conditional.call(this);
        }
        if (!options.hash.includeZero && !conditional || _utils.isEmpty(conditional)) {
          return options.inverse(this);
        } else {
          return options.fn(this);
        }
      });
      instance.registerHelper("unless", function(conditional, options) {
        if (arguments.length != 2) {
          throw new _exception2["default"]("#unless requires exactly one argument");
        }
        return instance.helpers["if"].call(this, conditional, {
          fn: options.inverse,
          inverse: options.fn,
          hash: options.hash
        });
      });
    };
    module.exports = exports["default"];
  }
});

// node_modules/handlebars/dist/cjs/handlebars/helpers/log.js
var require_log = __commonJS({
  "node_modules/handlebars/dist/cjs/handlebars/helpers/log.js"(exports, module) {
    "use strict";
    exports.__esModule = true;
    exports["default"] = function(instance) {
      instance.registerHelper("log", function() {
        var args = [void 0], options = arguments[arguments.length - 1];
        for (var i = 0; i < arguments.length - 1; i++) {
          args.push(arguments[i]);
        }
        var level = 1;
        if (options.hash.level != null) {
          level = options.hash.level;
        } else if (options.data && options.data.level != null) {
          level = options.data.level;
        }
        args[0] = level;
        instance.log.apply(instance, args);
      });
    };
    module.exports = exports["default"];
  }
});

// node_modules/handlebars/dist/cjs/handlebars/helpers/lookup.js
var require_lookup = __commonJS({
  "node_modules/handlebars/dist/cjs/handlebars/helpers/lookup.js"(exports, module) {
    "use strict";
    exports.__esModule = true;
    exports["default"] = function(instance) {
      instance.registerHelper("lookup", function(obj, field, options) {
        if (!obj) {
          return obj;
        }
        return options.lookupProperty(obj, field);
      });
    };
    module.exports = exports["default"];
  }
});

// node_modules/handlebars/dist/cjs/handlebars/helpers/with.js
var require_with = __commonJS({
  "node_modules/handlebars/dist/cjs/handlebars/helpers/with.js"(exports, module) {
    "use strict";
    exports.__esModule = true;
    function _interopRequireDefault(obj) {
      return obj && obj.__esModule ? obj : { "default": obj };
    }
    var _utils = require_utils();
    var _exception = require_exception();
    var _exception2 = _interopRequireDefault(_exception);
    exports["default"] = function(instance) {
      instance.registerHelper("with", function(context, options) {
        if (arguments.length != 2) {
          throw new _exception2["default"]("#with requires exactly one argument");
        }
        if (_utils.isFunction(context)) {
          context = context.call(this);
        }
        var fn = options.fn;
        if (!_utils.isEmpty(context)) {
          var data = options.data;
          if (options.data && options.ids) {
            data = _utils.createFrame(options.data);
            data.contextPath = _utils.appendContextPath(options.data.contextPath, options.ids[0]);
          }
          return fn(context, {
            data,
            blockParams: _utils.blockParams([context], [data && data.contextPath])
          });
        } else {
          return options.inverse(this);
        }
      });
    };
    module.exports = exports["default"];
  }
});

// node_modules/handlebars/dist/cjs/handlebars/helpers.js
var require_helpers = __commonJS({
  "node_modules/handlebars/dist/cjs/handlebars/helpers.js"(exports) {
    "use strict";
    exports.__esModule = true;
    exports.registerDefaultHelpers = registerDefaultHelpers;
    exports.moveHelperToHooks = moveHelperToHooks;
    function _interopRequireDefault(obj) {
      return obj && obj.__esModule ? obj : { "default": obj };
    }
    var _helpersBlockHelperMissing = require_block_helper_missing();
    var _helpersBlockHelperMissing2 = _interopRequireDefault(_helpersBlockHelperMissing);
    var _helpersEach = require_each();
    var _helpersEach2 = _interopRequireDefault(_helpersEach);
    var _helpersHelperMissing = require_helper_missing();
    var _helpersHelperMissing2 = _interopRequireDefault(_helpersHelperMissing);
    var _helpersIf = require_if();
    var _helpersIf2 = _interopRequireDefault(_helpersIf);
    var _helpersLog = require_log();
    var _helpersLog2 = _interopRequireDefault(_helpersLog);
    var _helpersLookup = require_lookup();
    var _helpersLookup2 = _interopRequireDefault(_helpersLookup);
    var _helpersWith = require_with();
    var _helpersWith2 = _interopRequireDefault(_helpersWith);
    function registerDefaultHelpers(instance) {
      _helpersBlockHelperMissing2["default"](instance);
      _helpersEach2["default"](instance);
      _helpersHelperMissing2["default"](instance);
      _helpersIf2["default"](instance);
      _helpersLog2["default"](instance);
      _helpersLookup2["default"](instance);
      _helpersWith2["default"](instance);
    }
    function moveHelperToHooks(instance, helperName, keepHelper) {
      if (instance.helpers[helperName]) {
        instance.hooks[helperName] = instance.helpers[helperName];
        if (!keepHelper) {
          delete instance.helpers[helperName];
        }
      }
    }
  }
});

// node_modules/handlebars/dist/cjs/handlebars/decorators/inline.js
var require_inline = __commonJS({
  "node_modules/handlebars/dist/cjs/handlebars/decorators/inline.js"(exports, module) {
    "use strict";
    exports.__esModule = true;
    var _utils = require_utils();
    exports["default"] = function(instance) {
      instance.registerDecorator("inline", function(fn, props, container, options) {
        var ret = fn;
        if (!props.partials) {
          props.partials = {};
          ret = function(context, options2) {
            var original = container.partials;
            container.partials = _utils.extend({}, original, props.partials);
            var ret2 = fn(context, options2);
            container.partials = original;
            return ret2;
          };
        }
        props.partials[options.args[0]] = options.fn;
        return ret;
      });
    };
    module.exports = exports["default"];
  }
});

// node_modules/handlebars/dist/cjs/handlebars/decorators.js
var require_decorators = __commonJS({
  "node_modules/handlebars/dist/cjs/handlebars/decorators.js"(exports) {
    "use strict";
    exports.__esModule = true;
    exports.registerDefaultDecorators = registerDefaultDecorators;
    function _interopRequireDefault(obj) {
      return obj && obj.__esModule ? obj : { "default": obj };
    }
    var _decoratorsInline = require_inline();
    var _decoratorsInline2 = _interopRequireDefault(_decoratorsInline);
    function registerDefaultDecorators(instance) {
      _decoratorsInline2["default"](instance);
    }
  }
});

// node_modules/handlebars/dist/cjs/handlebars/logger.js
var require_logger = __commonJS({
  "node_modules/handlebars/dist/cjs/handlebars/logger.js"(exports, module) {
    "use strict";
    exports.__esModule = true;
    var _utils = require_utils();
    var logger = {
      methodMap: ["debug", "info", "warn", "error"],
      level: "info",
      // Maps a given level value to the `methodMap` indexes above.
      lookupLevel: function lookupLevel(level) {
        if (typeof level === "string") {
          var levelMap = _utils.indexOf(logger.methodMap, level.toLowerCase());
          if (levelMap >= 0) {
            level = levelMap;
          } else {
            level = parseInt(level, 10);
          }
        }
        return level;
      },
      // Can be overridden in the host environment
      log: function log(level) {
        level = logger.lookupLevel(level);
        if (typeof console !== "undefined" && logger.lookupLevel(logger.level) <= level) {
          var method = logger.methodMap[level];
          if (!console[method]) {
            method = "log";
          }
          for (var _len = arguments.length, message = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
            message[_key - 1] = arguments[_key];
          }
          console[method].apply(console, message);
        }
      }
    };
    exports["default"] = logger;
    module.exports = exports["default"];
  }
});

// node_modules/handlebars/dist/cjs/handlebars/internal/create-new-lookup-object.js
var require_create_new_lookup_object = __commonJS({
  "node_modules/handlebars/dist/cjs/handlebars/internal/create-new-lookup-object.js"(exports) {
    "use strict";
    exports.__esModule = true;
    exports.createNewLookupObject = createNewLookupObject;
    var _utils = require_utils();
    function createNewLookupObject() {
      for (var _len = arguments.length, sources = Array(_len), _key = 0; _key < _len; _key++) {
        sources[_key] = arguments[_key];
      }
      return _utils.extend.apply(void 0, [/* @__PURE__ */ Object.create(null)].concat(sources));
    }
  }
});

// node_modules/handlebars/dist/cjs/handlebars/internal/proto-access.js
var require_proto_access = __commonJS({
  "node_modules/handlebars/dist/cjs/handlebars/internal/proto-access.js"(exports) {
    "use strict";
    exports.__esModule = true;
    exports.createProtoAccessControl = createProtoAccessControl;
    exports.resultIsAllowed = resultIsAllowed;
    exports.resetLoggedProperties = resetLoggedProperties;
    function _interopRequireDefault(obj) {
      return obj && obj.__esModule ? obj : { "default": obj };
    }
    var _createNewLookupObject = require_create_new_lookup_object();
    var _logger = require_logger();
    var _logger2 = _interopRequireDefault(_logger);
    var loggedProperties = /* @__PURE__ */ Object.create(null);
    function createProtoAccessControl(runtimeOptions) {
      var defaultMethodWhiteList = /* @__PURE__ */ Object.create(null);
      defaultMethodWhiteList["constructor"] = false;
      defaultMethodWhiteList["__defineGetter__"] = false;
      defaultMethodWhiteList["__defineSetter__"] = false;
      defaultMethodWhiteList["__lookupGetter__"] = false;
      var defaultPropertyWhiteList = /* @__PURE__ */ Object.create(null);
      defaultPropertyWhiteList["__proto__"] = false;
      return {
        properties: {
          whitelist: _createNewLookupObject.createNewLookupObject(defaultPropertyWhiteList, runtimeOptions.allowedProtoProperties),
          defaultValue: runtimeOptions.allowProtoPropertiesByDefault
        },
        methods: {
          whitelist: _createNewLookupObject.createNewLookupObject(defaultMethodWhiteList, runtimeOptions.allowedProtoMethods),
          defaultValue: runtimeOptions.allowProtoMethodsByDefault
        }
      };
    }
    function resultIsAllowed(result, protoAccessControl, propertyName) {
      if (typeof result === "function") {
        return checkWhiteList(protoAccessControl.methods, propertyName);
      } else {
        return checkWhiteList(protoAccessControl.properties, propertyName);
      }
    }
    function checkWhiteList(protoAccessControlForType, propertyName) {
      if (protoAccessControlForType.whitelist[propertyName] !== void 0) {
        return protoAccessControlForType.whitelist[propertyName] === true;
      }
      if (protoAccessControlForType.defaultValue !== void 0) {
        return protoAccessControlForType.defaultValue;
      }
      logUnexpecedPropertyAccessOnce(propertyName);
      return false;
    }
    function logUnexpecedPropertyAccessOnce(propertyName) {
      if (loggedProperties[propertyName] !== true) {
        loggedProperties[propertyName] = true;
        _logger2["default"].log("error", 'Handlebars: Access has been denied to resolve the property "' + propertyName + '" because it is not an "own property" of its parent.\nYou can add a runtime option to disable the check or this warning:\nSee https://handlebarsjs.com/api-reference/runtime-options.html#options-to-control-prototype-access for details');
      }
    }
    function resetLoggedProperties() {
      Object.keys(loggedProperties).forEach(function(propertyName) {
        delete loggedProperties[propertyName];
      });
    }
  }
});

// node_modules/handlebars/dist/cjs/handlebars/base.js
var require_base = __commonJS({
  "node_modules/handlebars/dist/cjs/handlebars/base.js"(exports) {
    "use strict";
    exports.__esModule = true;
    exports.HandlebarsEnvironment = HandlebarsEnvironment;
    function _interopRequireDefault(obj) {
      return obj && obj.__esModule ? obj : { "default": obj };
    }
    var _utils = require_utils();
    var _exception = require_exception();
    var _exception2 = _interopRequireDefault(_exception);
    var _helpers = require_helpers();
    var _decorators = require_decorators();
    var _logger = require_logger();
    var _logger2 = _interopRequireDefault(_logger);
    var _internalProtoAccess = require_proto_access();
    var VERSION = "4.7.8";
    exports.VERSION = VERSION;
    var COMPILER_REVISION = 8;
    exports.COMPILER_REVISION = COMPILER_REVISION;
    var LAST_COMPATIBLE_COMPILER_REVISION = 7;
    exports.LAST_COMPATIBLE_COMPILER_REVISION = LAST_COMPATIBLE_COMPILER_REVISION;
    var REVISION_CHANGES = {
      1: "<= 1.0.rc.2",
      // 1.0.rc.2 is actually rev2 but doesn't report it
      2: "== 1.0.0-rc.3",
      3: "== 1.0.0-rc.4",
      4: "== 1.x.x",
      5: "== 2.0.0-alpha.x",
      6: ">= 2.0.0-beta.1",
      7: ">= 4.0.0 <4.3.0",
      8: ">= 4.3.0"
    };
    exports.REVISION_CHANGES = REVISION_CHANGES;
    var objectType = "[object Object]";
    function HandlebarsEnvironment(helpers, partials, decorators) {
      this.helpers = helpers || {};
      this.partials = partials || {};
      this.decorators = decorators || {};
      _helpers.registerDefaultHelpers(this);
      _decorators.registerDefaultDecorators(this);
    }
    HandlebarsEnvironment.prototype = {
      constructor: HandlebarsEnvironment,
      logger: _logger2["default"],
      log: _logger2["default"].log,
      registerHelper: function registerHelper(name, fn) {
        if (_utils.toString.call(name) === objectType) {
          if (fn) {
            throw new _exception2["default"]("Arg not supported with multiple helpers");
          }
          _utils.extend(this.helpers, name);
        } else {
          this.helpers[name] = fn;
        }
      },
      unregisterHelper: function unregisterHelper(name) {
        delete this.helpers[name];
      },
      registerPartial: function registerPartial(name, partial) {
        if (_utils.toString.call(name) === objectType) {
          _utils.extend(this.partials, name);
        } else {
          if (typeof partial === "undefined") {
            throw new _exception2["default"]('Attempting to register a partial called "' + name + '" as undefined');
          }
          this.partials[name] = partial;
        }
      },
      unregisterPartial: function unregisterPartial(name) {
        delete this.partials[name];
      },
      registerDecorator: function registerDecorator(name, fn) {
        if (_utils.toString.call(name) === objectType) {
          if (fn) {
            throw new _exception2["default"]("Arg not supported with multiple decorators");
          }
          _utils.extend(this.decorators, name);
        } else {
          this.decorators[name] = fn;
        }
      },
      unregisterDecorator: function unregisterDecorator(name) {
        delete this.decorators[name];
      },
      /**
       * Reset the memory of illegal property accesses that have already been logged.
       * @deprecated should only be used in handlebars test-cases
       */
      resetLoggedPropertyAccesses: function resetLoggedPropertyAccesses() {
        _internalProtoAccess.resetLoggedProperties();
      }
    };
    var log = _logger2["default"].log;
    exports.log = log;
    exports.createFrame = _utils.createFrame;
    exports.logger = _logger2["default"];
  }
});

// node_modules/handlebars/dist/cjs/handlebars/safe-string.js
var require_safe_string = __commonJS({
  "node_modules/handlebars/dist/cjs/handlebars/safe-string.js"(exports, module) {
    "use strict";
    exports.__esModule = true;
    function SafeString(string) {
      this.string = string;
    }
    SafeString.prototype.toString = SafeString.prototype.toHTML = function() {
      return "" + this.string;
    };
    exports["default"] = SafeString;
    module.exports = exports["default"];
  }
});

// node_modules/handlebars/dist/cjs/handlebars/internal/wrapHelper.js
var require_wrapHelper = __commonJS({
  "node_modules/handlebars/dist/cjs/handlebars/internal/wrapHelper.js"(exports) {
    "use strict";
    exports.__esModule = true;
    exports.wrapHelper = wrapHelper;
    function wrapHelper(helper, transformOptionsFn) {
      if (typeof helper !== "function") {
        return helper;
      }
      var wrapper = function wrapper2() {
        var options = arguments[arguments.length - 1];
        arguments[arguments.length - 1] = transformOptionsFn(options);
        return helper.apply(this, arguments);
      };
      return wrapper;
    }
  }
});

// node_modules/handlebars/dist/cjs/handlebars/runtime.js
var require_runtime = __commonJS({
  "node_modules/handlebars/dist/cjs/handlebars/runtime.js"(exports) {
    "use strict";
    exports.__esModule = true;
    exports.checkRevision = checkRevision;
    exports.template = template;
    exports.wrapProgram = wrapProgram;
    exports.resolvePartial = resolvePartial;
    exports.invokePartial = invokePartial;
    exports.noop = noop;
    function _interopRequireDefault(obj) {
      return obj && obj.__esModule ? obj : { "default": obj };
    }
    function _interopRequireWildcard(obj) {
      if (obj && obj.__esModule) {
        return obj;
      } else {
        var newObj = {};
        if (obj != null) {
          for (var key in obj) {
            if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key];
          }
        }
        newObj["default"] = obj;
        return newObj;
      }
    }
    var _utils = require_utils();
    var Utils = _interopRequireWildcard(_utils);
    var _exception = require_exception();
    var _exception2 = _interopRequireDefault(_exception);
    var _base = require_base();
    var _helpers = require_helpers();
    var _internalWrapHelper = require_wrapHelper();
    var _internalProtoAccess = require_proto_access();
    function checkRevision(compilerInfo) {
      var compilerRevision = compilerInfo && compilerInfo[0] || 1, currentRevision = _base.COMPILER_REVISION;
      if (compilerRevision >= _base.LAST_COMPATIBLE_COMPILER_REVISION && compilerRevision <= _base.COMPILER_REVISION) {
        return;
      }
      if (compilerRevision < _base.LAST_COMPATIBLE_COMPILER_REVISION) {
        var runtimeVersions = _base.REVISION_CHANGES[currentRevision], compilerVersions = _base.REVISION_CHANGES[compilerRevision];
        throw new _exception2["default"]("Template was precompiled with an older version of Handlebars than the current runtime. Please update your precompiler to a newer version (" + runtimeVersions + ") or downgrade your runtime to an older version (" + compilerVersions + ").");
      } else {
        throw new _exception2["default"]("Template was precompiled with a newer version of Handlebars than the current runtime. Please update your runtime to a newer version (" + compilerInfo[1] + ").");
      }
    }
    function template(templateSpec, env) {
      if (!env) {
        throw new _exception2["default"]("No environment passed to template");
      }
      if (!templateSpec || !templateSpec.main) {
        throw new _exception2["default"]("Unknown template object: " + typeof templateSpec);
      }
      templateSpec.main.decorator = templateSpec.main_d;
      env.VM.checkRevision(templateSpec.compiler);
      var templateWasPrecompiledWithCompilerV7 = templateSpec.compiler && templateSpec.compiler[0] === 7;
      function invokePartialWrapper(partial, context, options) {
        if (options.hash) {
          context = Utils.extend({}, context, options.hash);
          if (options.ids) {
            options.ids[0] = true;
          }
        }
        partial = env.VM.resolvePartial.call(this, partial, context, options);
        var extendedOptions = Utils.extend({}, options, {
          hooks: this.hooks,
          protoAccessControl: this.protoAccessControl
        });
        var result = env.VM.invokePartial.call(this, partial, context, extendedOptions);
        if (result == null && env.compile) {
          options.partials[options.name] = env.compile(partial, templateSpec.compilerOptions, env);
          result = options.partials[options.name](context, extendedOptions);
        }
        if (result != null) {
          if (options.indent) {
            var lines = result.split("\n");
            for (var i = 0, l = lines.length; i < l; i++) {
              if (!lines[i] && i + 1 === l) {
                break;
              }
              lines[i] = options.indent + lines[i];
            }
            result = lines.join("\n");
          }
          return result;
        } else {
          throw new _exception2["default"]("The partial " + options.name + " could not be compiled when running in runtime-only mode");
        }
      }
      var container = {
        strict: function strict(obj, name, loc) {
          if (!obj || !(name in obj)) {
            throw new _exception2["default"]('"' + name + '" not defined in ' + obj, {
              loc
            });
          }
          return container.lookupProperty(obj, name);
        },
        lookupProperty: function lookupProperty(parent, propertyName) {
          var result = parent[propertyName];
          if (result == null) {
            return result;
          }
          if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
            return result;
          }
          if (_internalProtoAccess.resultIsAllowed(result, container.protoAccessControl, propertyName)) {
            return result;
          }
          return void 0;
        },
        lookup: function lookup(depths, name) {
          var len = depths.length;
          for (var i = 0; i < len; i++) {
            var result = depths[i] && container.lookupProperty(depths[i], name);
            if (result != null) {
              return depths[i][name];
            }
          }
        },
        lambda: function lambda(current, context) {
          return typeof current === "function" ? current.call(context) : current;
        },
        escapeExpression: Utils.escapeExpression,
        invokePartial: invokePartialWrapper,
        fn: function fn(i) {
          var ret2 = templateSpec[i];
          ret2.decorator = templateSpec[i + "_d"];
          return ret2;
        },
        programs: [],
        program: function program(i, data, declaredBlockParams, blockParams, depths) {
          var programWrapper = this.programs[i], fn = this.fn(i);
          if (data || depths || blockParams || declaredBlockParams) {
            programWrapper = wrapProgram(this, i, fn, data, declaredBlockParams, blockParams, depths);
          } else if (!programWrapper) {
            programWrapper = this.programs[i] = wrapProgram(this, i, fn);
          }
          return programWrapper;
        },
        data: function data(value, depth) {
          while (value && depth--) {
            value = value._parent;
          }
          return value;
        },
        mergeIfNeeded: function mergeIfNeeded(param, common) {
          var obj = param || common;
          if (param && common && param !== common) {
            obj = Utils.extend({}, common, param);
          }
          return obj;
        },
        // An empty object to use as replacement for null-contexts
        nullContext: Object.seal({}),
        noop: env.VM.noop,
        compilerInfo: templateSpec.compiler
      };
      function ret(context) {
        var options = arguments.length <= 1 || arguments[1] === void 0 ? {} : arguments[1];
        var data = options.data;
        ret._setup(options);
        if (!options.partial && templateSpec.useData) {
          data = initData(context, data);
        }
        var depths = void 0, blockParams = templateSpec.useBlockParams ? [] : void 0;
        if (templateSpec.useDepths) {
          if (options.depths) {
            depths = context != options.depths[0] ? [context].concat(options.depths) : options.depths;
          } else {
            depths = [context];
          }
        }
        function main(context2) {
          return "" + templateSpec.main(container, context2, container.helpers, container.partials, data, blockParams, depths);
        }
        main = executeDecorators(templateSpec.main, main, container, options.depths || [], data, blockParams);
        return main(context, options);
      }
      ret.isTop = true;
      ret._setup = function(options) {
        if (!options.partial) {
          var mergedHelpers = Utils.extend({}, env.helpers, options.helpers);
          wrapHelpersToPassLookupProperty(mergedHelpers, container);
          container.helpers = mergedHelpers;
          if (templateSpec.usePartial) {
            container.partials = container.mergeIfNeeded(options.partials, env.partials);
          }
          if (templateSpec.usePartial || templateSpec.useDecorators) {
            container.decorators = Utils.extend({}, env.decorators, options.decorators);
          }
          container.hooks = {};
          container.protoAccessControl = _internalProtoAccess.createProtoAccessControl(options);
          var keepHelperInHelpers = options.allowCallsToHelperMissing || templateWasPrecompiledWithCompilerV7;
          _helpers.moveHelperToHooks(container, "helperMissing", keepHelperInHelpers);
          _helpers.moveHelperToHooks(container, "blockHelperMissing", keepHelperInHelpers);
        } else {
          container.protoAccessControl = options.protoAccessControl;
          container.helpers = options.helpers;
          container.partials = options.partials;
          container.decorators = options.decorators;
          container.hooks = options.hooks;
        }
      };
      ret._child = function(i, data, blockParams, depths) {
        if (templateSpec.useBlockParams && !blockParams) {
          throw new _exception2["default"]("must pass block params");
        }
        if (templateSpec.useDepths && !depths) {
          throw new _exception2["default"]("must pass parent depths");
        }
        return wrapProgram(container, i, templateSpec[i], data, 0, blockParams, depths);
      };
      return ret;
    }
    function wrapProgram(container, i, fn, data, declaredBlockParams, blockParams, depths) {
      function prog(context) {
        var options = arguments.length <= 1 || arguments[1] === void 0 ? {} : arguments[1];
        var currentDepths = depths;
        if (depths && context != depths[0] && !(context === container.nullContext && depths[0] === null)) {
          currentDepths = [context].concat(depths);
        }
        return fn(container, context, container.helpers, container.partials, options.data || data, blockParams && [options.blockParams].concat(blockParams), currentDepths);
      }
      prog = executeDecorators(fn, prog, container, depths, data, blockParams);
      prog.program = i;
      prog.depth = depths ? depths.length : 0;
      prog.blockParams = declaredBlockParams || 0;
      return prog;
    }
    function resolvePartial(partial, context, options) {
      if (!partial) {
        if (options.name === "@partial-block") {
          partial = options.data["partial-block"];
        } else {
          partial = options.partials[options.name];
        }
      } else if (!partial.call && !options.name) {
        options.name = partial;
        partial = options.partials[partial];
      }
      return partial;
    }
    function invokePartial(partial, context, options) {
      var currentPartialBlock = options.data && options.data["partial-block"];
      options.partial = true;
      if (options.ids) {
        options.data.contextPath = options.ids[0] || options.data.contextPath;
      }
      var partialBlock = void 0;
      if (options.fn && options.fn !== noop) {
        (function() {
          options.data = _base.createFrame(options.data);
          var fn = options.fn;
          partialBlock = options.data["partial-block"] = function partialBlockWrapper(context2) {
            var options2 = arguments.length <= 1 || arguments[1] === void 0 ? {} : arguments[1];
            options2.data = _base.createFrame(options2.data);
            options2.data["partial-block"] = currentPartialBlock;
            return fn(context2, options2);
          };
          if (fn.partials) {
            options.partials = Utils.extend({}, options.partials, fn.partials);
          }
        })();
      }
      if (partial === void 0 && partialBlock) {
        partial = partialBlock;
      }
      if (partial === void 0) {
        throw new _exception2["default"]("The partial " + options.name + " could not be found");
      } else if (partial instanceof Function) {
        return partial(context, options);
      }
    }
    function noop() {
      return "";
    }
    function initData(context, data) {
      if (!data || !("root" in data)) {
        data = data ? _base.createFrame(data) : {};
        data.root = context;
      }
      return data;
    }
    function executeDecorators(fn, prog, container, depths, data, blockParams) {
      if (fn.decorator) {
        var props = {};
        prog = fn.decorator(prog, props, container, depths && depths[0], data, blockParams, depths);
        Utils.extend(prog, props);
      }
      return prog;
    }
    function wrapHelpersToPassLookupProperty(mergedHelpers, container) {
      Object.keys(mergedHelpers).forEach(function(helperName) {
        var helper = mergedHelpers[helperName];
        mergedHelpers[helperName] = passLookupPropertyOption(helper, container);
      });
    }
    function passLookupPropertyOption(helper, container) {
      var lookupProperty = container.lookupProperty;
      return _internalWrapHelper.wrapHelper(helper, function(options) {
        return Utils.extend({ lookupProperty }, options);
      });
    }
  }
});

// node_modules/handlebars/dist/cjs/handlebars/no-conflict.js
var require_no_conflict = __commonJS({
  "node_modules/handlebars/dist/cjs/handlebars/no-conflict.js"(exports, module) {
    "use strict";
    exports.__esModule = true;
    exports["default"] = function(Handlebars6) {
      (function() {
        if (typeof globalThis === "object") return;
        Object.prototype.__defineGetter__("__magic__", function() {
          return this;
        });
        __magic__.globalThis = __magic__;
        delete Object.prototype.__magic__;
      })();
      var $Handlebars = globalThis.Handlebars;
      Handlebars6.noConflict = function() {
        if (globalThis.Handlebars === Handlebars6) {
          globalThis.Handlebars = $Handlebars;
        }
        return Handlebars6;
      };
    };
    module.exports = exports["default"];
  }
});

// node_modules/handlebars/dist/cjs/handlebars.runtime.js
var require_handlebars_runtime = __commonJS({
  "node_modules/handlebars/dist/cjs/handlebars.runtime.js"(exports, module) {
    "use strict";
    exports.__esModule = true;
    function _interopRequireDefault(obj) {
      return obj && obj.__esModule ? obj : { "default": obj };
    }
    function _interopRequireWildcard(obj) {
      if (obj && obj.__esModule) {
        return obj;
      } else {
        var newObj = {};
        if (obj != null) {
          for (var key in obj) {
            if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key];
          }
        }
        newObj["default"] = obj;
        return newObj;
      }
    }
    var _handlebarsBase = require_base();
    var base = _interopRequireWildcard(_handlebarsBase);
    var _handlebarsSafeString = require_safe_string();
    var _handlebarsSafeString2 = _interopRequireDefault(_handlebarsSafeString);
    var _handlebarsException = require_exception();
    var _handlebarsException2 = _interopRequireDefault(_handlebarsException);
    var _handlebarsUtils = require_utils();
    var Utils = _interopRequireWildcard(_handlebarsUtils);
    var _handlebarsRuntime = require_runtime();
    var runtime = _interopRequireWildcard(_handlebarsRuntime);
    var _handlebarsNoConflict = require_no_conflict();
    var _handlebarsNoConflict2 = _interopRequireDefault(_handlebarsNoConflict);
    function create() {
      var hb = new base.HandlebarsEnvironment();
      Utils.extend(hb, base);
      hb.SafeString = _handlebarsSafeString2["default"];
      hb.Exception = _handlebarsException2["default"];
      hb.Utils = Utils;
      hb.escapeExpression = Utils.escapeExpression;
      hb.VM = runtime;
      hb.template = function(spec) {
        return runtime.template(spec, hb);
      };
      return hb;
    }
    var inst = create();
    inst.create = create;
    _handlebarsNoConflict2["default"](inst);
    inst["default"] = inst;
    exports["default"] = inst;
    module.exports = exports["default"];
  }
});

// node_modules/handlebars/runtime.js
var require_runtime2 = __commonJS({
  "node_modules/handlebars/runtime.js"(exports, module) {
    module.exports = require_handlebars_runtime()["default"];
  }
});

// src/scripts/data.js
var require_data = __commonJS({
  "src/scripts/data.js"() {
    if (typeof registerHandlebarsHelpers === "function") {
      registerHandlebarsHelpers();
    }
    var layoutTemplate;
    var themeTemplate;
    var boardTemplate;
    if (window.boardTemplates) {
      layoutTemplate = window.boardTemplates.layoutTemplate;
      themeTemplate = window.boardTemplates.themeTemplate;
      boardTemplate = window.boardTemplates.boardTemplate;
    } else {
      layoutTemplate = Handlebars.compile(document.getElementById("template-layout").innerHTML);
      themeTemplate = Handlebars.compile(document.getElementById("template-theme").innerHTML);
      boardTemplate = Handlebars.compile(document.getElementById("template-board").innerHTML);
    }
    var layouts = [
      {
        css: "overhead-platform",
        name: "Overhead platform"
      },
      {
        css: "single-train",
        name: "Single train"
      },
      {
        css: "table",
        name: "Table"
      },
      {
        css: "responsive",
        name: "Responsive"
      }
    ];
    var themes = [{
      css: "",
      name: "Default"
    }, {
      css: "theme-london2025",
      name: "London 2025"
    }];
    var boardData = getTrainData();
    var finalOutput = "";
    for (i = 0; i < layouts.length; i++) {
      finalOutput += layoutTemplate(layouts[i]);
      for (j = 0; j < themes.length; j++) {
        finalOutput += themeTemplate(themes[j]);
        data = {
          layout: layouts[i],
          theme: themes[j],
          maxRows: 9,
          board: boardData
        };
        finalOutput += boardTemplate(data);
      }
    }
    var data;
    var j;
    var i;
    document.getElementById("boards").innerHTML = finalOutput;
    document.dispatchEvent(new CustomEvent("boards:rendered"));
    function getTrainData() {
      return {
        "trainServices": [
          {
            "subsequentCallingPoints": [
              {
                "callingPoint": [
                  {
                    "locationName": "London St Pancras (Intl)",
                    "crs": "STP",
                    "st": "11:27",
                    "et": "On time",
                    "isCancelled": false,
                    "length": 0,
                    "detachFront": false,
                    "affectedByDiversion": false,
                    "rerouteDelay": 0
                  },
                  {
                    "locationName": "Bedford",
                    "crs": "BED",
                    "st": "10:53",
                    "et": "On time",
                    "isCancelled": false,
                    "length": 0,
                    "detachFront": false,
                    "affectedByDiversion": false,
                    "rerouteDelay": 0
                  }
                ],
                "serviceType": "train",
                "serviceChangeRequired": false,
                "assocIsCancelled": false
              }
            ],
            "futureCancellation": false,
            "futureDelay": false,
            "origin": [
              {
                "locationName": "Nottingham",
                "crs": "NOT",
                "assocIsCancelled": false
              }
            ],
            "destination": [
              {
                "locationName": "London St Pancras (Intl)",
                "crs": "STP",
                "assocIsCancelled": false
              }
            ],
            "std": "10:41",
            "etd": "On time",
            "platform": "2",
            "operator": "East Midlands Railway",
            "operatorCode": "EM",
            "isCircularRoute": false,
            "isCancelled": false,
            "filterLocationCancelled": false,
            "serviceType": "train",
            "length": 0,
            "detachFront": false,
            "isReverseFormation": false,
            "serviceID": "1337298WLNGBRO1"
          },
          {
            "subsequentCallingPoints": [
              {
                "callingPoint": [
                  {
                    "locationName": "Bedford",
                    "crs": "BDM",
                    "st": "11:10",
                    "et": "Cancelled",
                    "isCancelled": true,
                    "length": 0,
                    "detachFront": false,
                    "cancelReason": "This service has been cancelled because of a fault with the signalling system",
                    "affectedByDiversion": false,
                    "rerouteDelay": 0
                  },
                  {
                    "locationName": "Luton",
                    "crs": "LUT",
                    "st": "11:25",
                    "et": "Cancelled",
                    "isCancelled": true,
                    "length": 0,
                    "detachFront": false,
                    "cancelReason": "This service has been cancelled because of a fault with the signalling system",
                    "affectedByDiversion": false,
                    "rerouteDelay": 0
                  },
                  {
                    "locationName": "Luton Airport Parkway",
                    "crs": "LTN",
                    "st": "11:28",
                    "et": "Cancelled",
                    "isCancelled": true,
                    "length": 0,
                    "detachFront": false,
                    "cancelReason": "This service has been cancelled because of a fault with the signalling system",
                    "affectedByDiversion": false,
                    "rerouteDelay": 0
                  },
                  {
                    "locationName": "London St Pancras (Intl)",
                    "crs": "STP",
                    "st": "11:52",
                    "et": "Cancelled",
                    "isCancelled": true,
                    "length": 0,
                    "detachFront": false,
                    "cancelReason": "This service has been cancelled because of a fault with the signalling system",
                    "affectedByDiversion": false,
                    "rerouteDelay": 0
                  }
                ],
                "serviceType": "train",
                "serviceChangeRequired": false,
                "assocIsCancelled": false
              }
            ],
            "futureCancellation": false,
            "futureDelay": false,
            "origin": [
              {
                "locationName": "Corby",
                "crs": "COR",
                "assocIsCancelled": false
              }
            ],
            "destination": [
              {
                "locationName": "London St Pancras (Intl)",
                "crs": "STP",
                "assocIsCancelled": false
              }
            ],
            "std": "10:57",
            "etd": "Cancelled",
            "operator": "East Midlands Railway",
            "operatorCode": "EM",
            "isCircularRoute": false,
            "isCancelled": true,
            "filterLocationCancelled": false,
            "serviceType": "train",
            "length": 0,
            "detachFront": false,
            "isReverseFormation": false,
            "cancelReason": "This service has been cancelled because of a fault with the signalling system",
            "serviceID": "1337203WLNGBRO_"
          },
          {
            "subsequentCallingPoints": [
              {
                "callingPoint": [
                  {
                    "locationName": "Kettering",
                    "crs": "KET",
                    "st": "11:15",
                    "et": "Cancelled",
                    "isCancelled": true,
                    "length": 0,
                    "detachFront": false,
                    "cancelReason": "This service has been cancelled because of a fault with the signalling system",
                    "affectedByDiversion": false,
                    "rerouteDelay": 0
                  },
                  {
                    "locationName": "Corby",
                    "crs": "COR",
                    "st": "11:25",
                    "et": "Cancelled",
                    "isCancelled": true,
                    "length": 0,
                    "detachFront": false,
                    "cancelReason": "This service has been cancelled because of a fault with the signalling system",
                    "affectedByDiversion": false,
                    "rerouteDelay": 0
                  }
                ],
                "serviceType": "train",
                "serviceChangeRequired": false,
                "assocIsCancelled": false
              }
            ],
            "futureCancellation": false,
            "futureDelay": false,
            "origin": [
              {
                "locationName": "London St Pancras (Intl)",
                "crs": "STP",
                "assocIsCancelled": false
              }
            ],
            "destination": [
              {
                "locationName": "Corby",
                "crs": "COR",
                "assocIsCancelled": false
              }
            ],
            "std": "11:07",
            "etd": "Cancelled",
            "operator": "East Midlands Railway",
            "operatorCode": "EM",
            "isCircularRoute": false,
            "isCancelled": true,
            "filterLocationCancelled": false,
            "serviceType": "train",
            "length": 0,
            "detachFront": false,
            "isReverseFormation": false,
            "cancelReason": "This service has been cancelled because of a fault with the signalling system",
            "serviceID": "1337359WLNGBRO_"
          },
          {
            "subsequentCallingPoints": [
              {
                "callingPoint": [
                  {
                    "locationName": "Luton Airport Parkway",
                    "crs": "LTN",
                    "st": "11:34",
                    "et": "On time",
                    "isCancelled": false,
                    "length": 0,
                    "detachFront": false,
                    "affectedByDiversion": false,
                    "rerouteDelay": 0
                  },
                  {
                    "locationName": "London St Pancras (Intl)",
                    "crs": "STP",
                    "st": "11:55",
                    "et": "On time",
                    "isCancelled": false,
                    "length": 0,
                    "detachFront": false,
                    "affectedByDiversion": false,
                    "rerouteDelay": 0
                  }
                ],
                "serviceType": "train",
                "serviceChangeRequired": false,
                "assocIsCancelled": false
              }
            ],
            "futureCancellation": false,
            "futureDelay": false,
            "origin": [
              {
                "locationName": "Nottingham",
                "crs": "NOT",
                "assocIsCancelled": false
              }
            ],
            "destination": [
              {
                "locationName": "London St Pancras (Intl)",
                "crs": "STP",
                "assocIsCancelled": false
              }
            ],
            "rsid": "EM223400",
            "std": "11:12",
            "etd": "On time",
            "platform": "2",
            "operator": "East Midlands Railway",
            "operatorCode": "EM",
            "isCircularRoute": false,
            "isCancelled": false,
            "filterLocationCancelled": false,
            "serviceType": "train",
            "length": 0,
            "detachFront": false,
            "isReverseFormation": false,
            "serviceID": "1337259WLNGBRO1"
          },
          {
            "subsequentCallingPoints": [
              {
                "callingPoint": [
                  {
                    "locationName": "Kettering",
                    "crs": "KET",
                    "st": "11:21",
                    "et": "11:23",
                    "isCancelled": false,
                    "length": 0,
                    "detachFront": false,
                    "affectedByDiversion": false,
                    "rerouteDelay": 0
                  },
                  {
                    "locationName": "Market Harborough",
                    "crs": "MHR",
                    "st": "11:31",
                    "et": "11:33",
                    "isCancelled": false,
                    "length": 0,
                    "detachFront": false,
                    "affectedByDiversion": false,
                    "rerouteDelay": 0
                  },
                  {
                    "locationName": "Leicester",
                    "crs": "LEI",
                    "st": "11:45",
                    "et": "11:47",
                    "isCancelled": false,
                    "length": 0,
                    "detachFront": false,
                    "affectedByDiversion": false,
                    "rerouteDelay": 0
                  },
                  {
                    "locationName": "Nottingham",
                    "crs": "NOT",
                    "st": "12:09",
                    "et": "On time",
                    "isCancelled": false,
                    "length": 0,
                    "detachFront": false,
                    "affectedByDiversion": false,
                    "rerouteDelay": 0
                  }
                ],
                "serviceType": "train",
                "serviceChangeRequired": false,
                "assocIsCancelled": false
              }
            ],
            "futureCancellation": false,
            "futureDelay": false,
            "origin": [
              {
                "locationName": "London St Pancras (Intl)",
                "crs": "STP",
                "assocIsCancelled": false
              }
            ],
            "destination": [
              {
                "locationName": "Nottingham",
                "crs": "NOT",
                "assocIsCancelled": false
              }
            ],
            "std": "11:16",
            "etd": "11:19",
            "platform": "1",
            "operator": "East Midlands Railway",
            "operatorCode": "EM",
            "isCircularRoute": false,
            "isCancelled": false,
            "filterLocationCancelled": false,
            "serviceType": "train",
            "length": 0,
            "detachFront": false,
            "isReverseFormation": false,
            "serviceID": "1330820WLNGBRO1"
          },
          {
            "subsequentCallingPoints": [
              {
                "callingPoint": [
                  {
                    "locationName": "Bedford",
                    "crs": "BDM",
                    "st": "11:40",
                    "et": "Cancelled",
                    "isCancelled": true,
                    "length": 0,
                    "detachFront": false,
                    "cancelReason": "This service has been cancelled because of a fault with the signalling system",
                    "affectedByDiversion": false,
                    "rerouteDelay": 0
                  },
                  {
                    "locationName": "Luton",
                    "crs": "LUT",
                    "st": "11:55",
                    "et": "Cancelled",
                    "isCancelled": true,
                    "length": 0,
                    "detachFront": false,
                    "cancelReason": "This service has been cancelled because of a fault with the signalling system",
                    "affectedByDiversion": false,
                    "rerouteDelay": 0
                  },
                  {
                    "locationName": "Luton Airport Parkway",
                    "crs": "LTN",
                    "st": "11:58",
                    "et": "Cancelled",
                    "isCancelled": true,
                    "length": 0,
                    "detachFront": false,
                    "cancelReason": "This service has been cancelled because of a fault with the signalling system",
                    "affectedByDiversion": false,
                    "rerouteDelay": 0
                  },
                  {
                    "locationName": "London St Pancras (Intl)",
                    "crs": "STP",
                    "st": "12:22",
                    "et": "Cancelled",
                    "isCancelled": true,
                    "length": 0,
                    "detachFront": false,
                    "cancelReason": "This service has been cancelled because of a fault with the signalling system",
                    "affectedByDiversion": false,
                    "rerouteDelay": 0
                  }
                ],
                "serviceType": "train",
                "serviceChangeRequired": false,
                "assocIsCancelled": false
              }
            ],
            "futureCancellation": false,
            "futureDelay": false,
            "origin": [
              {
                "locationName": "Corby",
                "crs": "COR",
                "assocIsCancelled": false
              }
            ],
            "destination": [
              {
                "locationName": "London St Pancras (Intl)",
                "crs": "STP",
                "assocIsCancelled": false
              }
            ],
            "currentDestinations": [
              {
                "locationName": "Kettering",
                "crs": "KET",
                "assocIsCancelled": false
              }
            ],
            "std": "11:27",
            "etd": "Cancelled",
            "operator": "East Midlands Railway",
            "operatorCode": "EM",
            "isCircularRoute": false,
            "isCancelled": true,
            "filterLocationCancelled": false,
            "serviceType": "train",
            "length": 0,
            "detachFront": false,
            "isReverseFormation": false,
            "cancelReason": "This service has been cancelled because of a fault with the signalling system",
            "serviceID": "1337584WLNGBRO_"
          },
          {
            "subsequentCallingPoints": [
              {
                "callingPoint": [
                  {
                    "locationName": "Kettering",
                    "crs": "KET",
                    "st": "11:46",
                    "et": "On time",
                    "isCancelled": false,
                    "length": 0,
                    "detachFront": false,
                    "affectedByDiversion": false,
                    "rerouteDelay": 0
                  },
                  {
                    "locationName": "Corby",
                    "crs": "COR",
                    "st": "11:54",
                    "et": "On time",
                    "isCancelled": false,
                    "length": 0,
                    "detachFront": false,
                    "affectedByDiversion": false,
                    "rerouteDelay": 0
                  }
                ],
                "serviceType": "train",
                "serviceChangeRequired": false,
                "assocIsCancelled": false
              }
            ],
            "futureCancellation": false,
            "futureDelay": false,
            "origin": [
              {
                "locationName": "London St Pancras (Intl)",
                "crs": "STP",
                "assocIsCancelled": false
              }
            ],
            "destination": [
              {
                "locationName": "Corby",
                "crs": "COR",
                "assocIsCancelled": false
              }
            ],
            "currentOrigins": [
              {
                "locationName": "Kettering",
                "crs": "KET",
                "assocIsCancelled": false
              }
            ],
            "std": "11:37",
            "etd": "Cancelled",
            "operator": "East Midlands Railway",
            "operatorCode": "EM",
            "isCircularRoute": false,
            "isCancelled": true,
            "filterLocationCancelled": false,
            "serviceType": "train",
            "length": 0,
            "detachFront": false,
            "isReverseFormation": false,
            "cancelReason": "This service has been cancelled because of a fault with the signalling system",
            "serviceID": "1337554WLNGBRO_"
          },
          {
            "subsequentCallingPoints": [
              {
                "callingPoint": [
                  {
                    "locationName": "London St Pancras (Intl)",
                    "crs": "STP",
                    "st": "12:27",
                    "et": "On time",
                    "isCancelled": false,
                    "length": 0,
                    "detachFront": false,
                    "affectedByDiversion": false,
                    "rerouteDelay": 0
                  }
                ],
                "serviceType": "train",
                "serviceChangeRequired": false,
                "assocIsCancelled": false
              }
            ],
            "futureCancellation": false,
            "futureDelay": false,
            "origin": [
              {
                "locationName": "Nottingham",
                "crs": "NOT",
                "assocIsCancelled": false
              }
            ],
            "destination": [
              {
                "locationName": "London St Pancras (Intl)",
                "crs": "STP",
                "assocIsCancelled": false
              }
            ],
            "std": "11:42",
            "etd": "On time",
            "platform": "2",
            "operator": "East Midlands Railway",
            "operatorCode": "EM",
            "isCircularRoute": false,
            "isCancelled": false,
            "filterLocationCancelled": false,
            "serviceType": "train",
            "length": 0,
            "detachFront": false,
            "isReverseFormation": false,
            "serviceID": "1337093WLNGBRO1"
          },
          {
            "subsequentCallingPoints": [
              {
                "callingPoint": [
                  {
                    "locationName": "Bedford",
                    "crs": "BDM",
                    "st": "12:09",
                    "et": "Cancelled",
                    "isCancelled": true,
                    "length": 0,
                    "detachFront": false,
                    "cancelReason": "This service has been cancelled because of a fault with the signalling system",
                    "affectedByDiversion": false,
                    "rerouteDelay": 0
                  },
                  {
                    "locationName": "Luton",
                    "crs": "LUT",
                    "st": "12:25",
                    "et": "Cancelled",
                    "isCancelled": true,
                    "length": 0,
                    "detachFront": false,
                    "cancelReason": "This service has been cancelled because of a fault with the signalling system",
                    "affectedByDiversion": false,
                    "rerouteDelay": 0
                  },
                  {
                    "locationName": "Luton Airport Parkway",
                    "crs": "LTN",
                    "st": "12:28",
                    "et": "Cancelled",
                    "isCancelled": true,
                    "length": 0,
                    "detachFront": false,
                    "cancelReason": "This service has been cancelled because of a fault with the signalling system",
                    "affectedByDiversion": false,
                    "rerouteDelay": 0
                  },
                  {
                    "locationName": "London St Pancras (Intl)",
                    "crs": "STP",
                    "st": "12:51",
                    "et": "Cancelled",
                    "isCancelled": true,
                    "length": 0,
                    "detachFront": false,
                    "cancelReason": "This service has been cancelled because of a fault with the signalling system",
                    "affectedByDiversion": false,
                    "rerouteDelay": 0
                  }
                ],
                "serviceType": "train",
                "serviceChangeRequired": false,
                "assocIsCancelled": false
              }
            ],
            "futureCancellation": false,
            "futureDelay": false,
            "origin": [
              {
                "locationName": "Corby",
                "crs": "COR",
                "assocIsCancelled": false
              }
            ],
            "destination": [
              {
                "locationName": "London St Pancras (Intl)",
                "crs": "STP",
                "assocIsCancelled": false
              }
            ],
            "std": "11:56",
            "etd": "Cancelled",
            "operator": "East Midlands Railway",
            "operatorCode": "EM",
            "isCircularRoute": false,
            "isCancelled": true,
            "filterLocationCancelled": false,
            "serviceType": "train",
            "length": 0,
            "detachFront": false,
            "isReverseFormation": false,
            "cancelReason": "This service has been cancelled because of a fault with the signalling system",
            "serviceID": "1337541WLNGBRO_"
          },
          {
            "subsequentCallingPoints": [
              {
                "callingPoint": [
                  {
                    "locationName": "Kettering",
                    "crs": "KET",
                    "st": "12:15",
                    "et": "Cancelled",
                    "isCancelled": true,
                    "length": 0,
                    "detachFront": false,
                    "cancelReason": "This service has been cancelled because of a fault with the signalling system",
                    "affectedByDiversion": false,
                    "rerouteDelay": 0
                  },
                  {
                    "locationName": "Corby",
                    "crs": "COR",
                    "st": "12:24",
                    "et": "Cancelled",
                    "isCancelled": true,
                    "length": 0,
                    "detachFront": false,
                    "cancelReason": "This service has been cancelled because of a fault with the signalling system",
                    "affectedByDiversion": false,
                    "rerouteDelay": 0
                  }
                ],
                "serviceType": "train",
                "serviceChangeRequired": false,
                "assocIsCancelled": false
              }
            ],
            "futureCancellation": false,
            "futureDelay": false,
            "origin": [
              {
                "locationName": "London St Pancras (Intl)",
                "crs": "STP",
                "assocIsCancelled": false
              }
            ],
            "destination": [
              {
                "locationName": "Corby",
                "crs": "COR",
                "assocIsCancelled": false
              }
            ],
            "std": "12:07",
            "etd": "Cancelled",
            "operator": "East Midlands Railway",
            "operatorCode": "EM",
            "isCircularRoute": false,
            "isCancelled": true,
            "filterLocationCancelled": false,
            "serviceType": "train",
            "length": 0,
            "detachFront": false,
            "isReverseFormation": false,
            "cancelReason": "This service has been cancelled because of a fault with the signalling system",
            "serviceID": "1337650WLNGBRO_"
          }
        ],
        "Xmlns": {
          "Count": 8
        },
        "generatedAt": "2026-03-19T10:42:44.6047546+00:00",
        "locationName": "Wellingborough",
        "crs": "WEL",
        "filterType": "to",
        "nrccMessages": [
          {
            "Value": '\nEast Midlands Railway services to / from London St Pancras International may be cancelled, delayed by up to 50 minutes or revised. Latest information can be found in <a href="https://www.nationalrail.co.uk/service-disruptions/london-st-pancras-international-20260318/">Status and Disruptions</a>.'
          }
        ],
        "platformAvailable": true,
        "areServicesAvailable": true
      };
    }
  }
});

// src/demo/main.js
var import_runtime4 = __toESM(require_runtime2());

// src/templates/layout.hbs
var import_runtime = __toESM(require_runtime2());
var layout_default = import_runtime.default.template({ "compiler": [8, ">= 4.3.0"], "main": function(container, depth0, helpers, partials, data) {
  var helper, lookupProperty = container.lookupProperty || function(parent, propertyName) {
    if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
      return parent[propertyName];
    }
    return void 0;
  };
  return "<h1>" + container.escapeExpression((helper = (helper = lookupProperty(helpers, "name") || (depth0 != null ? lookupProperty(depth0, "name") : depth0)) != null ? helper : container.hooks.helperMissing, typeof helper === "function" ? helper.call(depth0 != null ? depth0 : container.nullContext || {}, { "name": "name", "hash": {}, "data": data, "loc": { "start": { "line": 1, "column": 4 }, "end": { "line": 1, "column": 12 } } }) : helper)) + "</h1>\r\n";
}, "useData": true });

// src/templates/theme.hbs
var import_runtime2 = __toESM(require_runtime2());
var theme_default = import_runtime2.default.template({ "compiler": [8, ">= 4.3.0"], "main": function(container, depth0, helpers, partials, data) {
  var helper, lookupProperty = container.lookupProperty || function(parent, propertyName) {
    if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
      return parent[propertyName];
    }
    return void 0;
  };
  return "<h2>" + container.escapeExpression((helper = (helper = lookupProperty(helpers, "name") || (depth0 != null ? lookupProperty(depth0, "name") : depth0)) != null ? helper : container.hooks.helperMissing, typeof helper === "function" ? helper.call(depth0 != null ? depth0 : container.nullContext || {}, { "name": "name", "hash": {}, "data": data, "loc": { "start": { "line": 1, "column": 4 }, "end": { "line": 1, "column": 12 } } }) : helper)) + "</h2>\r\n";
}, "useData": true });

// src/templates/board.hbs
var import_runtime3 = __toESM(require_runtime2());
var board_default = import_runtime3.default.template({ "1": function(container, depth0, helpers, partials, data, blockParams, depths) {
  var stack1, helper, alias1 = depth0 != null ? depth0 : container.nullContext || {}, alias2 = container.hooks.helperMissing, alias3 = container.escapeExpression, alias4 = "function", lookupProperty = container.lookupProperty || function(parent, propertyName) {
    if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
      return parent[propertyName];
    }
    return void 0;
  };
  return '        <train role="listitem" itemscope itemtype="https://schema.org/TrainTrip"\r\n            data-status="' + alias3((lookupProperty(helpers, "statusText") || depth0 && lookupProperty(depth0, "statusText") || alias2).call(alias1, depth0, { "name": "statusText", "hash": {}, "data": data, "loc": { "start": { "line": 11, "column": 25 }, "end": { "line": 11, "column": 44 } } })) + '" data-isEstimated="' + alias3((lookupProperty(helpers, "isEstimated") || depth0 && lookupProperty(depth0, "isEstimated") || alias2).call(alias1, depth0, { "name": "isEstimated", "hash": {}, "data": data, "loc": { "start": { "line": 11, "column": 64 }, "end": { "line": 11, "column": 84 } } })) + '" data-isCancelled="' + alias3((lookupProperty(helpers, "isCancelled") || depth0 && lookupProperty(depth0, "isCancelled") || alias2).call(alias1, depth0, { "name": "isCancelled", "hash": {}, "data": data, "loc": { "start": { "line": 11, "column": 104 }, "end": { "line": 11, "column": 124 } } })) + '"\r\n            data-operator="' + alias3((helper = (helper = lookupProperty(helpers, "operator") || (depth0 != null ? lookupProperty(depth0, "operator") : depth0)) != null ? helper : alias2, typeof helper === alias4 ? helper.call(alias1, { "name": "operator", "hash": {}, "data": data, "loc": { "start": { "line": 12, "column": 27 }, "end": { "line": 12, "column": 39 } } }) : helper)) + '"\r\n            title="' + alias3((lookupProperty(helpers, "fallback") || depth0 && lookupProperty(depth0, "fallback") || alias2).call(alias1, (lookupProperty(helpers, "statusText") || depth0 && lookupProperty(depth0, "statusText") || alias2).call(alias1, depth0, { "name": "statusText", "hash": {}, "data": data, "loc": { "start": { "line": 13, "column": 30 }, "end": { "line": 13, "column": 47 } } }), "Unknown", { "name": "fallback", "hash": {}, "data": data, "loc": { "start": { "line": 13, "column": 19 }, "end": { "line": 13, "column": 59 } } })) + ": " + alias3((helper = (helper = lookupProperty(helpers, "std") || (depth0 != null ? lookupProperty(depth0, "std") : depth0)) != null ? helper : alias2, typeof helper === alias4 ? helper.call(alias1, { "name": "std", "hash": {}, "data": data, "loc": { "start": { "line": 13, "column": 61 }, "end": { "line": 13, "column": 70 } } }) : helper)) + " service to " + alias3((lookupProperty(helpers, "destinationName") || depth0 && lookupProperty(depth0, "destinationName") || alias2).call(alias1, depth0, { "name": "destinationName", "hash": {}, "data": data, "loc": { "start": { "line": 13, "column": 82 }, "end": { "line": 13, "column": 108 } } })) + '"\r\n            aria-label="' + alias3((lookupProperty(helpers, "fallback") || depth0 && lookupProperty(depth0, "fallback") || alias2).call(alias1, (lookupProperty(helpers, "statusText") || depth0 && lookupProperty(depth0, "statusText") || alias2).call(alias1, depth0, { "name": "statusText", "hash": {}, "data": data, "loc": { "start": { "line": 14, "column": 35 }, "end": { "line": 14, "column": 52 } } }), "Unknown", { "name": "fallback", "hash": {}, "data": data, "loc": { "start": { "line": 14, "column": 24 }, "end": { "line": 14, "column": 64 } } })) + ": " + alias3((helper = (helper = lookupProperty(helpers, "std") || (depth0 != null ? lookupProperty(depth0, "std") : depth0)) != null ? helper : alias2, typeof helper === alias4 ? helper.call(alias1, { "name": "std", "hash": {}, "data": data, "loc": { "start": { "line": 14, "column": 66 }, "end": { "line": 14, "column": 75 } } }) : helper)) + " service to " + alias3((lookupProperty(helpers, "destinationName") || depth0 && lookupProperty(depth0, "destinationName") || alias2).call(alias1, depth0, { "name": "destinationName", "hash": {}, "data": data, "loc": { "start": { "line": 14, "column": 87 }, "end": { "line": 14, "column": 113 } } })) + '">\r\n            <time itemprop="departureTime" class="departure ' + alias3((lookupProperty(helpers, "departureClass") || depth0 && lookupProperty(depth0, "departureClass") || alias2).call(alias1, depth0, { "name": "departureClass", "hash": {}, "data": data, "loc": { "start": { "line": 15, "column": 60 }, "end": { "line": 15, "column": 83 } } })) + '" datetime="' + alias3((lookupProperty(helpers, "serviceDateTime") || depth0 && lookupProperty(depth0, "serviceDateTime") || alias2).call(alias1, depth0, (stack1 = depths[1] != null ? lookupProperty(depths[1], "board") : depths[1]) != null ? lookupProperty(stack1, "generatedAt") : stack1, { "name": "serviceDateTime", "hash": {}, "data": data, "loc": { "start": { "line": 15, "column": 95 }, "end": { "line": 15, "column": 140 } } })) + '">' + alias3((lookupProperty(helpers, "fallback") || depth0 && lookupProperty(depth0, "fallback") || alias2).call(alias1, depth0 != null ? lookupProperty(depth0, "std") : depth0, "--:--", { "name": "fallback", "hash": {}, "data": data, "loc": { "start": { "line": 15, "column": 142 }, "end": { "line": 15, "column": 166 } } })) + '</time>\r\n            <station itemprop="departureStation" class="can-scroll" name="' + alias3((lookupProperty(helpers, "fallback") || depth0 && lookupProperty(depth0, "fallback") || alias2).call(alias1, (stack1 = depths[1] != null ? lookupProperty(depths[1], "board") : depths[1]) != null ? lookupProperty(stack1, "locationName") : stack1, "Unknown", { "name": "fallback", "hash": {}, "data": data, "loc": { "start": { "line": 16, "column": 74 }, "end": { "line": 16, "column": 118 } } })) + '" code="' + alias3((lookupProperty(helpers, "fallback") || depth0 && lookupProperty(depth0, "fallback") || alias2).call(alias1, (stack1 = depths[1] != null ? lookupProperty(depths[1], "board") : depths[1]) != null ? lookupProperty(stack1, "crs") : stack1, "Unknown", { "name": "fallback", "hash": {}, "data": data, "loc": { "start": { "line": 16, "column": 126 }, "end": { "line": 16, "column": 161 } } })) + '">' + alias3((lookupProperty(helpers, "fallback") || depth0 && lookupProperty(depth0, "fallback") || alias2).call(alias1, (stack1 = depths[1] != null ? lookupProperty(depths[1], "board") : depths[1]) != null ? lookupProperty(stack1, "locationName") : stack1, "Unknown", { "name": "fallback", "hash": {}, "data": data, "loc": { "start": { "line": 16, "column": 163 }, "end": { "line": 16, "column": 207 } } })) + '</station>\r\n            <station itemprop="arrivalStation" class="destination final can-scroll" name="' + alias3((lookupProperty(helpers, "fallback") || depth0 && lookupProperty(depth0, "fallback") || alias2).call(alias1, (lookupProperty(helpers, "destinationName") || depth0 && lookupProperty(depth0, "destinationName") || alias2).call(alias1, depth0, { "name": "destinationName", "hash": {}, "data": data, "loc": { "start": { "line": 17, "column": 101 }, "end": { "line": 17, "column": 123 } } }), "Unknown", { "name": "fallback", "hash": {}, "data": data, "loc": { "start": { "line": 17, "column": 90 }, "end": { "line": 17, "column": 135 } } })) + '" code="' + alias3((lookupProperty(helpers, "fallback") || depth0 && lookupProperty(depth0, "fallback") || alias2).call(alias1, (lookupProperty(helpers, "destinationCode") || depth0 && lookupProperty(depth0, "destinationCode") || alias2).call(alias1, depth0, { "name": "destinationCode", "hash": {}, "data": data, "loc": { "start": { "line": 17, "column": 154 }, "end": { "line": 17, "column": 176 } } }), "Unknown", { "name": "fallback", "hash": {}, "data": data, "loc": { "start": { "line": 17, "column": 143 }, "end": { "line": 17, "column": 188 } } })) + '">' + alias3((lookupProperty(helpers, "fallback") || depth0 && lookupProperty(depth0, "fallback") || alias2).call(alias1, (lookupProperty(helpers, "destinationName") || depth0 && lookupProperty(depth0, "destinationName") || alias2).call(alias1, depth0, { "name": "destinationName", "hash": {}, "data": data, "loc": { "start": { "line": 17, "column": 201 }, "end": { "line": 17, "column": 223 } } }), "Unknown", { "name": "fallback", "hash": {}, "data": data, "loc": { "start": { "line": 17, "column": 190 }, "end": { "line": 17, "column": 235 } } })) + "</station>\r\n" + ((stack1 = lookupProperty(helpers, "if").call(alias1, depth0 != null ? lookupProperty(depth0, "platform") : depth0, { "name": "if", "hash": {}, "fn": container.program(2, data, 0, blockParams, depths), "inverse": container.noop, "data": data, "loc": { "start": { "line": 18, "column": 12 }, "end": { "line": 23, "column": 19 } } })) != null ? stack1 : "") + '            <span class="prefix status">' + alias3((lookupProperty(helpers, "fallback") || depth0 && lookupProperty(depth0, "fallback") || alias2).call(alias1, (lookupProperty(helpers, "statusText") || depth0 && lookupProperty(depth0, "statusText") || alias2).call(alias1, depth0, { "name": "statusText", "hash": {}, "data": data, "loc": { "start": { "line": 24, "column": 51 }, "end": { "line": 24, "column": 68 } } }), "Unknown", { "name": "fallback", "hash": {}, "data": data, "loc": { "start": { "line": 24, "column": 40 }, "end": { "line": 24, "column": 80 } } })) + '</span>\r\n            <h3 class="calling-at">Calling at</h3>\r\n            <stations class="calling-at can-scroll" role="list" aria-label="Intermediate and final stops">\r\n' + ((stack1 = lookupProperty(helpers, "each").call(alias1, (lookupProperty(helpers, "callingPoints") || depth0 && lookupProperty(depth0, "callingPoints") || alias2).call(alias1, depth0, { "name": "callingPoints", "hash": {}, "data": data, "loc": { "start": { "line": 27, "column": 24 }, "end": { "line": 27, "column": 44 } } }), { "name": "each", "hash": {}, "fn": container.program(4, data, 0, blockParams, depths), "inverse": container.noop, "data": data, "loc": { "start": { "line": 27, "column": 16 }, "end": { "line": 32, "column": 25 } } })) != null ? stack1 : "") + "            </stations>\r\n        </train>\r\n";
}, "2": function(container, depth0, helpers, partials, data) {
  var helper, lookupProperty = container.lookupProperty || function(parent, propertyName) {
    if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
      return parent[propertyName];
    }
    return void 0;
  };
  return '            <span class="location platform">\r\n                <span class="prefix">platform</span>\r\n                <span class="platform-number">' + container.escapeExpression((helper = (helper = lookupProperty(helpers, "platform") || (depth0 != null ? lookupProperty(depth0, "platform") : depth0)) != null ? helper : container.hooks.helperMissing, typeof helper === "function" ? helper.call(depth0 != null ? depth0 : container.nullContext || {}, { "name": "platform", "hash": {}, "data": data, "loc": { "start": { "line": 21, "column": 46 }, "end": { "line": 21, "column": 60 } } }) : helper)) + "</span>\r\n            </span>\r\n";
}, "4": function(container, depth0, helpers, partials, data) {
  var stack1, alias1 = depth0 != null ? depth0 : container.nullContext || {}, alias2 = container.hooks.helperMissing, alias3 = container.escapeExpression, lookupProperty = container.lookupProperty || function(parent, propertyName) {
    if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
      return parent[propertyName];
    }
    return void 0;
  };
  return '                <station class="location stop can-scroll' + ((stack1 = lookupProperty(helpers, "if").call(alias1, data && lookupProperty(data, "last"), { "name": "if", "hash": {}, "fn": container.program(5, data, 0), "inverse": container.noop, "data": data, "loc": { "start": { "line": 28, "column": 56 }, "end": { "line": 28, "column": 82 } } })) != null ? stack1 : "") + '" role="listitem"' + ((stack1 = lookupProperty(helpers, "if").call(alias1, data && lookupProperty(data, "last"), { "name": "if", "hash": {}, "fn": container.program(7, data, 0), "inverse": container.noop, "data": data, "loc": { "start": { "line": 28, "column": 99 }, "end": { "line": 28, "column": 145 } } })) != null ? stack1 : "") + ">\r\n                    " + alias3((lookupProperty(helpers, "fallback") || depth0 && lookupProperty(depth0, "fallback") || alias2).call(alias1, depth0 != null ? lookupProperty(depth0, "locationName") : depth0, "Unknown", { "name": "fallback", "hash": {}, "data": data, "loc": { "start": { "line": 29, "column": 20 }, "end": { "line": 29, "column": 55 } } })) + '\r\n                    <time class="estimated"' + ((stack1 = lookupProperty(helpers, "if").call(alias1, data && lookupProperty(data, "last"), { "name": "if", "hash": {}, "fn": container.program(9, data, 0), "inverse": container.noop, "data": data, "loc": { "start": { "line": 30, "column": 43 }, "end": { "line": 30, "column": 86 } } })) != null ? stack1 : "") + ' datetime="' + alias3((lookupProperty(helpers, "callingPointDateTime") || depth0 && lookupProperty(depth0, "callingPointDateTime") || alias2).call(alias1, depth0, (stack1 = (stack1 = data && lookupProperty(data, "root")) && lookupProperty(stack1, "board")) && lookupProperty(stack1, "generatedAt"), { "name": "callingPointDateTime", "hash": {}, "data": data, "loc": { "start": { "line": 30, "column": 97 }, "end": { "line": 30, "column": 150 } } })) + '">' + alias3((lookupProperty(helpers, "displayTime") || depth0 && lookupProperty(depth0, "displayTime") || alias2).call(alias1, depth0, { "name": "displayTime", "hash": {}, "data": data, "loc": { "start": { "line": 30, "column": 152 }, "end": { "line": 30, "column": 172 } } })) + "</time>\r\n                </station>\r\n";
}, "5": function(container, depth0, helpers, partials, data) {
  return " final";
}, "7": function(container, depth0, helpers, partials, data) {
  return ' itemprop="arrivalStation"';
}, "9": function(container, depth0, helpers, partials, data) {
  return ' itemprop="arrivalTime"';
}, "compiler": [8, ">= 4.3.0"], "main": function(container, depth0, helpers, partials, data, blockParams, depths) {
  var stack1, alias1 = container.lambda, alias2 = container.escapeExpression, alias3 = depth0 != null ? depth0 : container.nullContext || {}, alias4 = container.hooks.helperMissing, lookupProperty = container.lookupProperty || function(parent, propertyName) {
    if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
      return parent[propertyName];
    }
    return void 0;
  };
  return '<section class="board ' + alias2(alias1((stack1 = depth0 != null ? lookupProperty(depth0, "layout") : depth0) != null ? lookupProperty(stack1, "css") : stack1, depth0)) + " " + alias2(alias1((stack1 = depth0 != null ? lookupProperty(depth0, "theme") : depth0) != null ? lookupProperty(stack1, "css") : stack1, depth0)) + '" data-swipe-enabled="true" data-location-city="' + alias2(alias1((stack1 = depth0 != null ? lookupProperty(depth0, "board") : depth0) != null ? lookupProperty(stack1, "locationName") : stack1, depth0)) + '" data-location-platform="' + alias2((lookupProperty(helpers, "firstPlatform") || depth0 && lookupProperty(depth0, "firstPlatform") || alias4).call(alias3, (stack1 = depth0 != null ? lookupProperty(depth0, "board") : depth0) != null ? lookupProperty(stack1, "trainServices") : stack1, { "name": "firstPlatform", "hash": {}, "data": data, "loc": { "start": { "line": 1, "column": 146 }, "end": { "line": 1, "column": 183 } } })) + '">\r\n    <header>\r\n        <h1>\r\n            <span class="prefix">Departures from</span>\r\n            <span class="location can-scroll">' + alias2(alias1((stack1 = depth0 != null ? lookupProperty(depth0, "board") : depth0) != null ? lookupProperty(stack1, "locationName") : stack1, depth0)) + '</span>\r\n        </h1>\r\n    </header>\r\n    <trains role="list">\r\n' + ((stack1 = lookupProperty(helpers, "each").call(alias3, (lookupProperty(helpers, "limit") || depth0 && lookupProperty(depth0, "limit") || alias4).call(alias3, (stack1 = depth0 != null ? lookupProperty(depth0, "board") : depth0) != null ? lookupProperty(stack1, "trainServices") : stack1, depth0 != null ? lookupProperty(depth0, "maxRows") : depth0, { "name": "limit", "hash": {}, "data": data, "loc": { "start": { "line": 9, "column": 16 }, "end": { "line": 9, "column": 51 } } }), { "name": "each", "hash": {}, "fn": container.program(1, data, 0, blockParams, depths), "inverse": container.noop, "data": data, "loc": { "start": { "line": 9, "column": 8 }, "end": { "line": 35, "column": 17 } } })) != null ? stack1 : "") + "    </trains>\r\n</section>\r\n";
}, "useData": true, "useDepths": true });

// src/shared/register-handlebars-helpers.js
function registerHandlebarsHelpers2(Handlebars6) {
  Handlebars6.registerHelper("statusText", function(service) {
    return service && (service.etd || service.std) || "";
  });
  Handlebars6.registerHelper("departureClass", function(service) {
    return (service && service.etd || "") === "On time" ? "on-time" : "";
  });
  Handlebars6.registerHelper("isEstimated", function(service) {
    var status = service && service.etd || "";
    var cancelled = !!(service && service.isCancelled) || status === "Cancelled";
    return !cancelled && status !== "On time";
  });
  Handlebars6.registerHelper("isCancelled", function(service) {
    var status = service && service.etd || "";
    return !!(service && service.isCancelled) || status === "Cancelled";
  });
  Handlebars6.registerHelper("firstPlatform", function(trainServices) {
    if (!trainServices || trainServices.length === 0) return "";
    return trainServices[0].platform || "";
  });
  Handlebars6.registerHelper("destinationName", function(service) {
    var currentDestinations = service && service.currentDestinations;
    if (currentDestinations && currentDestinations.length > 0) {
      return currentDestinations[0].locationName || "";
    }
    var destinations = service && service.destination;
    if (destinations && destinations.length > 0) {
      return destinations[0].locationName || "";
    }
    return "";
  });
  Handlebars6.registerHelper("destinationCode", function(service) {
    var currentDestinations = service && service.currentDestinations;
    if (currentDestinations && currentDestinations.length > 0) {
      return currentDestinations[0].crs || "";
    }
    var destinations = service && service.destination;
    if (destinations && destinations.length > 0) {
      return destinations[0].crs || "";
    }
    return "";
  });
  Handlebars6.registerHelper("callingPoints", function(service) {
    if (!service || !service.subsequentCallingPoints || service.subsequentCallingPoints.length === 0) {
      return [];
    }
    return service.subsequentCallingPoints[0].callingPoint || [];
  });
  Handlebars6.registerHelper("displayTime", function(callingPoint) {
    var estimated = callingPoint && callingPoint.et || "";
    if (isClockTime(estimated)) return estimated;
    var scheduled = callingPoint && callingPoint.st || "";
    if (isClockTime(scheduled)) return scheduled;
    return "--:--";
  });
  Handlebars6.registerHelper("serviceDateTime", function(service, generatedAt) {
    return buildDateTime(service && service.std || "", generatedAt);
  });
  Handlebars6.registerHelper("callingPointDateTime", function(callingPoint, generatedAt) {
    var time = getMachineTime(callingPoint && callingPoint.et || "", callingPoint && callingPoint.st || "");
    return buildDateTime(time, generatedAt);
  });
  Handlebars6.registerHelper("fallback", function(value, defaultValue) {
    if (value === null || value === void 0 || value === "") {
      return defaultValue;
    }
    return value;
  });
  Handlebars6.registerHelper("limit", function(collection, count) {
    if (!collection || !collection.length) {
      return [];
    }
    var max = parseInt(count, 10);
    if (isNaN(max) || max < 0) {
      return collection;
    }
    return collection.slice(0, max);
  });
}
function isClockTime(value) {
  return /^\d{2}:\d{2}$/.test(value || "");
}
function getMachineTime(estimatedTime, scheduledTime) {
  if (isClockTime(estimatedTime)) return estimatedTime;
  if (isClockTime(scheduledTime)) return scheduledTime;
  return "";
}
function buildDateTime(time, generatedAt) {
  if (!isClockTime(time)) return "";
  var date = generatedAt ? generatedAt.slice(0, 10) : "";
  if (!date) return "";
  return date + "T" + time + ":00";
}

// src/scripts/next-train.js
var rootBoards = /* @__PURE__ */ new WeakMap();
var rootListenerStates = /* @__PURE__ */ new WeakMap();
var TICK_INTERVAL = 10 * 1e3;
var renderPlugins = [];
registerRenderPlugin(createSingleTrainRenderPlugin());
registerRenderPlugin(createOverheadPlatformRenderPlugin());
function registerRenderPlugin(renderPlugin) {
  renderPlugins.push(renderPlugin);
}
function ensureNumberBetweenMaxAndMin(value, min, max) {
  var parsed = parseInt(value, 10);
  if (isNaN(parsed)) return min;
  if (parsed < min) return min;
  if (parsed > max) return max;
  return parsed;
}
function getWindowForElement(el) {
  return el.ownerDocument ? el.ownerDocument.defaultView : window;
}
function Board(el) {
  var that = this;
  that.element = el;
  that.renderPluginState = {};
  that.getRenderPluginState = function(pluginName) {
    if (!that.renderPluginState[pluginName]) {
      that.renderPluginState[pluginName] = {};
    }
    return that.renderPluginState[pluginName];
  };
  that.collectTrains = function() {
    that.allTrains = [];
    var trains = that.element.querySelectorAll("train");
    trains.forEach(function(trainElement) {
      that.allTrains.push(new Train(trainElement));
    });
  };
  that.shouldPauseOnHover = function() {
    return false;
    var view = getWindowForElement(that.element);
    var value = view.getComputedStyle(that.element).getPropertyValue("--board-pause-on-hover").trim().toLowerCase();
    return value === "true" || value === "1";
  };
  that.ensureNavigationControls = function() {
    if (!that.allTrains || that.allTrains.length <= 1) {
      var existingPrev = that.element.querySelector(".board-nav.prev");
      var existingNext = that.element.querySelector(".board-nav.next");
      if (existingPrev) existingPrev.remove();
      if (existingNext) existingNext.remove();
      that.element.removeAttribute("data-board-has-navigation");
      return;
    }
    if (that.element.querySelector(".board-nav.prev")) {
      that.element.setAttribute("data-board-has-navigation", "true");
      return;
    }
    var ownerDocument = that.element.ownerDocument;
    var prev = ownerDocument.createElement("button");
    prev.type = "button";
    prev.className = "board-nav prev";
    prev.setAttribute("aria-label", "Previous train");
    prev.textContent = "\u2039";
    var next = ownerDocument.createElement("button");
    next.type = "button";
    next.className = "board-nav next";
    next.setAttribute("aria-label", "Next train");
    next.textContent = "\u203A";
    prev.addEventListener("click", function(event) {
      event.stopPropagation();
      that.showPreviousTrain();
    });
    next.addEventListener("click", function(event) {
      event.stopPropagation();
      that.showNextTrain();
    });
    that.element.appendChild(prev);
    that.element.appendChild(next);
    that.element.setAttribute("data-board-has-navigation", "true");
  };
  that.showNextTrain = function() {
    that.collectTrains();
    renderPlugins.forEach(function(renderPlugin) {
      if (typeof renderPlugin.next === "function") {
        renderPlugin.next(that);
      }
    });
    that.resetTimer();
  };
  that.showPreviousTrain = function() {
    that.collectTrains();
    renderPlugins.forEach(function(renderPlugin) {
      if (typeof renderPlugin.previous === "function") {
        renderPlugin.previous(that);
      }
    });
    that.resetTimer();
  };
  that.render = function() {
    that.collectTrains();
    that.ensureNavigationControls();
    renderPlugins.forEach(function(renderPlugin) {
      if (typeof renderPlugin.render === "function") {
        renderPlugin.render(that);
      }
    });
  };
  that.pause = function() {
    if (!that.shouldPauseOnHover() || that.isPaused) return;
    that.isPaused = true;
    that.element.classList.add("board-paused");
    if (that.timerId) {
      clearTimeout(that.timerId);
      that.timerId = null;
    }
  };
  that.resume = function() {
    if (!that.shouldPauseOnHover() || !that.isPaused) return;
    that.isPaused = false;
    that.element.classList.remove("board-paused");
    that.resetTimer();
  };
  that.tick = function() {
    that.timerId = null;
    if (that.isPaused) return;
    that.showNextTrain();
  };
  that.resetTimer = function() {
    if (that.timerId) {
      clearTimeout(that.timerId);
    }
    that.timerId = setTimeout(that.tick, TICK_INTERVAL);
  };
  that.destroy = function() {
    if (that.timerId) {
      clearTimeout(that.timerId);
      that.timerId = null;
    }
    that.element.removeEventListener("mouseenter", that.pause);
    that.element.removeEventListener("mouseleave", that.resume);
    that.element.removeEventListener("touchstart", onSwipeStart, { passive: true });
    that.element.removeEventListener("touchend", onSwipeEnd);
    that.element.removeEventListener("touchcancel", resetSwipeState);
  };
  that.collectTrains();
  that.ensureNavigationControls();
  that.swipeStartX = null;
  that.swipeStartY = null;
  function resetSwipeState() {
    that.swipeStartX = null;
    that.swipeStartY = null;
  }
  function onSwipeStart(event) {
    var touch = event.touches ? event.touches[0] : event;
    that.swipeStartX = touch.clientX;
    that.swipeStartY = touch.clientY;
  }
  function onSwipeEnd(event) {
    if (that.swipeStartX === null || that.swipeStartY === null) {
      return;
    }
    var touch = event.changedTouches ? event.changedTouches[0] : event;
    var deltaX = touch.clientX - that.swipeStartX;
    var deltaY = touch.clientY - that.swipeStartY;
    resetSwipeState();
    if (Math.abs(deltaX) < 40 || Math.abs(deltaX) < Math.abs(deltaY)) {
      return;
    }
    if (event.cancelable) {
      event.preventDefault();
    }
    if (deltaX > 0) {
      that.showPreviousTrain();
    } else {
      that.showNextTrain();
    }
  }
  that.element.addEventListener("touchstart", onSwipeStart, { passive: false });
  that.element.addEventListener("touchend", onSwipeEnd);
  that.element.addEventListener("touchcancel", resetSwipeState);
  that.render();
  that.element.addEventListener("mouseenter", that.pause);
  that.element.addEventListener("mouseleave", that.resume);
  that.resetTimer();
  return that;
}
function Train(el) {
  var that = this;
  that.element = el;
  that.setAttribute = function(attributeName, value) {
    that.element.setAttribute(attributeName, value);
  };
  that.removeAttribute = function(attributeName) {
    that.element.removeAttribute(attributeName);
  };
  return that;
}
function createOverheadPlatformRenderPlugin() {
  var pluginName = "overhead-platform";
  function getPluginState(board) {
    var pluginState = board.getRenderPluginState(pluginName);
    if (typeof pluginState.trainIndex !== "number") {
      pluginState.trainIndex = 0;
    }
    return pluginState;
  }
  function clearCurrentTrainState(train) {
    train.removeAttribute("data-overhead-platform-train-state");
  }
  function setTrainStructure(board, pluginState) {
    var overviewRow = pluginState.fixedRows - 1;
    board.element.setAttribute("data-overhead-platform-overview-row", overviewRow);
    board.element.setAttribute("data-overhead-platform-static-train-count", pluginState.staticTrainCount);
    board.allTrains.forEach(function(train, index) {
      var role = "rotating";
      if (index === 0) {
        role = "next-train";
      } else if (index < pluginState.staticTrainCount) {
        role = "static";
      }
      train.setAttribute("data-overhead-platform-train-role", role);
      clearCurrentTrainState(train);
    });
  }
  function populateTrains(board, pluginState) {
    pluginState.fixedRows = ensureNumberBetweenMaxAndMin(board.element.getAttribute("data-overhead-platform-fixed-rows"), 3, 7);
    pluginState.baseStaticTrainCount = Math.max(1, pluginState.fixedRows - 2);
    pluginState.staticTrainCount = Math.min(pluginState.baseStaticTrainCount, board.allTrains.length);
    if (board.allTrains.length - pluginState.staticTrainCount <= 1) {
      pluginState.staticTrainCount = board.allTrains.length;
    }
    setTrainStructure(board, pluginState);
    pluginState.rotatingTrains = board.allTrains.slice(pluginState.staticTrainCount);
  }
  function showCurrentTrain(board, pluginState) {
    board.allTrains.forEach(function(train) {
      clearCurrentTrainState(train);
    });
    if (!pluginState.rotatingTrains || pluginState.rotatingTrains.length === 0) {
      return;
    }
    pluginState.trainIndex = (pluginState.trainIndex % pluginState.rotatingTrains.length + pluginState.rotatingTrains.length) % pluginState.rotatingTrains.length;
    pluginState.rotatingTrains[pluginState.trainIndex].setAttribute("data-overhead-platform-train-state", "current");
  }
  function showNextTrain(board) {
    var pluginState = getPluginState(board);
    populateTrains(board, pluginState);
    if (!pluginState.rotatingTrains || pluginState.rotatingTrains.length === 0) {
      return;
    }
    pluginState.trainIndex = (pluginState.trainIndex + 1) % pluginState.rotatingTrains.length;
    showCurrentTrain(board, pluginState);
  }
  function showPreviousTrain(board) {
    var pluginState = getPluginState(board);
    populateTrains(board, pluginState);
    if (!pluginState.rotatingTrains || pluginState.rotatingTrains.length === 0) {
      return;
    }
    pluginState.trainIndex = (pluginState.trainIndex - 1 + pluginState.rotatingTrains.length) % pluginState.rotatingTrains.length;
    showCurrentTrain(board, pluginState);
  }
  return {
    name: pluginName,
    render: function(board) {
      var pluginState = getPluginState(board);
      populateTrains(board, pluginState);
      showCurrentTrain(board, pluginState);
    },
    next: showNextTrain,
    previous: showPreviousTrain
  };
}
function createSingleTrainRenderPlugin() {
  var pluginName = "single-train";
  function getPluginState(board) {
    var pluginState = board.getRenderPluginState(pluginName);
    if (typeof pluginState.trainIndex !== "number") {
      pluginState.trainIndex = 0;
    }
    return pluginState;
  }
  function clearCurrentTrainState(train) {
    train.removeAttribute("data-single-train-state");
  }
  function showCurrentTrain(board, pluginState) {
    board.allTrains.forEach(function(train) {
      clearCurrentTrainState(train);
    });
    if (board.allTrains.length === 0) {
      return;
    }
    pluginState.trainIndex = (pluginState.trainIndex % board.allTrains.length + board.allTrains.length) % board.allTrains.length;
    board.allTrains[pluginState.trainIndex].setAttribute("data-single-train-state", "current");
  }
  function showNextTrain(board) {
    var pluginState = getPluginState(board);
    if (board.allTrains.length === 0) {
      return;
    }
    if (pluginState.trainIndex + 1 >= board.allTrains.length)
      return;
    if (pluginState.trainIndex + 1 >= board.allTrains.length)
      return;
    pluginState.trainIndex = (pluginState.trainIndex + 1) % board.allTrains.length;
    showCurrentTrain(board, pluginState);
  }
  function showPreviousTrain(board) {
    var pluginState = getPluginState(board);
    if (board.allTrains.length === 0) {
      return;
    }
    if (pluginState.trainIndex - 1 < 0)
      return;
    if (pluginState.trainIndex - 1 < 0)
      return;
    pluginState.trainIndex = (pluginState.trainIndex - 1 + board.allTrains.length) % board.allTrains.length;
    showCurrentTrain(board, pluginState);
  }
  return {
    name: pluginName,
    render: function(board) {
      var pluginState = getPluginState(board);
      if (board.allTrains && board.allTrains.length > 1) {
        board.element.setAttribute("data-single-train-animation", "true");
      } else {
        board.element.removeAttribute("data-single-train-animation");
      }
      showCurrentTrain(board, pluginState);
    },
    next: showNextTrain,
    previous: showPreviousTrain
  };
}
function createBoards(root) {
  var boards = [];
  root.querySelectorAll(".board").forEach(function(el) {
    boards.push(new Board(el));
  });
  rootBoards.set(root, boards);
  return boards;
}
function initializeRenderedBoards(root) {
  var existingBoards = rootBoards.get(root);
  if (existingBoards && existingBoards.length > 0) {
    existingBoards.forEach(function(board) {
      if (board && typeof board.destroy === "function") {
        board.destroy();
      }
    });
  }
  return createBoards(root);
}
function registerDocumentBoards(doc) {
  var targetDocument = doc || document;
  var state = rootListenerStates.get(targetDocument);
  if (!state) {
    state = {
      listenersAttached: false,
      domReadyHandler: null,
      boardsRenderedHandler: null
    };
    rootListenerStates.set(targetDocument, state);
  }
  if (state.listenersAttached) {
    return state;
  }
  state.domReadyHandler = function() {
    initializeRenderedBoards(targetDocument);
  };
  state.boardsRenderedHandler = function() {
    initializeRenderedBoards(targetDocument);
  };
  if (targetDocument.readyState === "loading") {
    targetDocument.addEventListener("DOMContentLoaded", state.domReadyHandler, { once: true });
  } else {
    state.domReadyHandler();
  }
  targetDocument.addEventListener("boards:rendered", state.boardsRenderedHandler);
  state.listenersAttached = true;
  return state;
}

// src/scripts/scrolling.js
var BASE_CALLING_AT_DISTANCE_PX = 772 - 426;
var BASE_CALLING_AT_DURATION_S = 10;
var CALLING_AT_FIXED_TIME_S = 0.5 + 2 + 1.5 + 0.5;
var BASE_CALLING_AT_TRAVEL_TIME_S = BASE_CALLING_AT_DURATION_S - CALLING_AT_FIXED_TIME_S;
var rootRuntimeStates = /* @__PURE__ */ new WeakMap();
function getWindowForRoot(root) {
  if (!root) {
    return typeof window !== "undefined" ? window : null;
  }
  if (typeof Document !== "undefined" && root instanceof Document) {
    return root.defaultView;
  }
  return root.ownerDocument ? root.ownerDocument.defaultView : null;
}
function getDocumentForElement(el) {
  return el.ownerDocument || document;
}
function getRuntimeState(root) {
  var state = rootRuntimeStates.get(root);
  if (!state) {
    state = {
      observer: null,
      observedElements: [],
      measureHandler: null,
      resizeHandler: null,
      windowObject: null,
      listenersAttached: false,
      boardsRenderedHandler: null,
      domReadyHandler: null
    };
    rootRuntimeStates.set(root, state);
  }
  return state;
}
function getScrollableElements(root) {
  return root.querySelectorAll(".can-scroll");
}
function isTruthyFlag(value, defaultValue) {
  var normalized = (value || "").trim().toLowerCase();
  if (!normalized) {
    return defaultValue;
  }
  return normalized !== "0" && normalized !== "false" && normalized !== "off" && normalized !== "no";
}
function shouldMeasureElement(el) {
  var view = getWindowForRoot(getDocumentForElement(el));
  if (!view || typeof view.getComputedStyle !== "function") {
    return true;
  }
  var styles = view.getComputedStyle(el);
  var isEnabled = isTruthyFlag(styles.getPropertyValue("--scroll-enabled"), true);
  if (!isEnabled) {
    return false;
  }
  return isTruthyFlag(styles.getPropertyValue("--scroll-measure-root"), true);
}
function canWrapElementContent(el) {
  var tagName = (el.tagName || "").toUpperCase();
  return tagName !== "OL" && tagName !== "UL" && tagName !== "STATIONS";
}
function ensureScrollerElement(el) {
  if (!canWrapElementContent(el)) {
    return null;
  }
  var existingScroller = el.querySelector(":scope > .scroller");
  if (existingScroller) {
    return existingScroller;
  }
  if (!el.firstChild) {
    return null;
  }
  var scroller = getDocumentForElement(el).createElement("span");
  scroller.className = "scroller";
  while (el.firstChild) {
    scroller.appendChild(el.firstChild);
  }
  el.appendChild(scroller);
  return scroller;
}
function measureScrollableElement(el) {
  if (!shouldMeasureElement(el)) {
    el.classList.remove("scroll");
    return;
  }
  ensureScrollerElement(el);
  var availableWidth = el.getBoundingClientRect().width;
  var actualWidth = el.scrollWidth;
  var overflowDistance = Math.max(0, actualWidth - availableWidth);
  var callingAtTravelDurationSeconds = overflowDistance / BASE_CALLING_AT_DISTANCE_PX * BASE_CALLING_AT_TRAVEL_TIME_S;
  var callingAtDurationSeconds = CALLING_AT_FIXED_TIME_S + callingAtTravelDurationSeconds;
  el.style.setProperty("--available-width", parseInt(availableWidth, 10) + "px");
  el.style.setProperty("--actual-width", parseInt(actualWidth, 10) + "px");
  el.style.setProperty("--overhead-platform-calling-at-scroll-duration", callingAtDurationSeconds + "s");
  if (actualWidth - 1 >= availableWidth) {
    el.classList.add("scroll");
    return;
  }
  el.classList.remove("scroll");
}
function measureScrollableElements(root) {
  getScrollableElements(root).forEach(function(el) {
    measureScrollableElement(el);
  });
}
function debounce(fn, waitMs) {
  var timeoutId;
  return function() {
    if (timeoutId) {
      clearTimeout(timeoutId);
    }
    timeoutId = setTimeout(function() {
      fn();
    }, waitMs);
  };
}
function getMeasureHandler(root, state) {
  if (!state.measureHandler) {
    state.measureHandler = debounce(function() {
      measureScrollableElements(root);
    }, 300);
  }
  return state.measureHandler;
}
function ensureResizeHandling(root, state) {
  var windowObject = getWindowForRoot(root);
  if (!windowObject) {
    return;
  }
  if (!state.resizeHandler) {
    state.resizeHandler = getMeasureHandler(root, state);
  }
  if (state.windowObject && state.windowObject !== windowObject) {
    state.windowObject.removeEventListener("resize", state.resizeHandler);
    state.windowObject = null;
  }
  if (!state.windowObject) {
    windowObject.addEventListener("resize", state.resizeHandler);
    state.windowObject = windowObject;
  }
}
function observeScrollableElements(root, state) {
  if (state.observer) {
    state.observedElements.forEach(function(el) {
      state.observer.unobserve(el);
    });
    state.observedElements = [];
  }
  if (typeof ResizeObserver === "undefined") {
    return;
  }
  if (!state.observer) {
    state.observer = new ResizeObserver(function() {
      getMeasureHandler(root, state)();
    });
  }
  getScrollableElements(root).forEach(function(el) {
    state.observer.observe(el);
    state.observedElements.push(el);
  });
  if (root.host) {
    state.observer.observe(root.host);
    state.observedElements.push(root.host);
  }
}
function initializeScrolling(root) {
  var state = getRuntimeState(root);
  measureScrollableElements(root);
  ensureResizeHandling(root, state);
  observeScrollableElements(root, state);
  return state;
}
function scheduleInitializeScrolling(root) {
  var windowObject = getWindowForRoot(root);
  if (windowObject && typeof windowObject.requestAnimationFrame === "function") {
    windowObject.requestAnimationFrame(function() {
      initializeScrolling(root);
    });
    return;
  }
  initializeScrolling(root);
}
function registerDocumentScrolling(doc) {
  var targetDocument = doc || document;
  var state = getRuntimeState(targetDocument);
  if (state.listenersAttached) {
    return state;
  }
  state.domReadyHandler = function() {
    initializeScrolling(targetDocument);
  };
  state.boardsRenderedHandler = function() {
    scheduleInitializeScrolling(targetDocument);
  };
  if (targetDocument.readyState === "loading") {
    targetDocument.addEventListener("DOMContentLoaded", state.domReadyHandler, { once: true });
  } else {
    state.domReadyHandler();
  }
  targetDocument.addEventListener("boards:rendered", state.boardsRenderedHandler);
  state.listenersAttached = true;
  return state;
}

// src/demo/main.js
window.Handlebars = import_runtime4.default;
window.registerHandlebarsHelpers = function() {
  registerHandlebarsHelpers2(import_runtime4.default);
};
window.boardTemplates = {
  layoutTemplate: layout_default,
  themeTemplate: theme_default,
  boardTemplate: board_default
};
registerDocumentBoards(document);
registerDocumentScrolling(document);
Promise.resolve().then(() => __toESM(require_data()));
