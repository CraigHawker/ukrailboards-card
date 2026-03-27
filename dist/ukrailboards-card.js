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
    exports["default"] = function(Handlebars3) {
      (function() {
        if (typeof globalThis === "object") return;
        Object.prototype.__defineGetter__("__magic__", function() {
          return this;
        });
        __magic__.globalThis = __magic__;
        delete Object.prototype.__magic__;
      })();
      var $Handlebars = globalThis.Handlebars;
      Handlebars3.noConflict = function() {
        if (globalThis.Handlebars === Handlebars3) {
          globalThis.Handlebars = $Handlebars;
        }
        return Handlebars3;
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

// src/lovelace/ukrailboards-card.js
var import_runtime2 = __toESM(require_runtime2());

// templates/board.hbs
var import_runtime = __toESM(require_runtime2());
var board_default = import_runtime.default.template({ "1": function(container, depth0, helpers, partials, data, blockParams, depths) {
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
  return '<section class="board ' + alias2(alias1((stack1 = depth0 != null ? lookupProperty(depth0, "layout") : depth0) != null ? lookupProperty(stack1, "css") : stack1, depth0)) + " " + alias2(alias1((stack1 = depth0 != null ? lookupProperty(depth0, "theme") : depth0) != null ? lookupProperty(stack1, "css") : stack1, depth0)) + '" data-location-city="' + alias2(alias1((stack1 = depth0 != null ? lookupProperty(depth0, "board") : depth0) != null ? lookupProperty(stack1, "locationName") : stack1, depth0)) + '" data-location-platform="' + alias2((lookupProperty(helpers, "firstPlatform") || depth0 && lookupProperty(depth0, "firstPlatform") || alias4).call(alias3, (stack1 = depth0 != null ? lookupProperty(depth0, "board") : depth0) != null ? lookupProperty(stack1, "trainServices") : stack1, { "name": "firstPlatform", "hash": {}, "data": data, "loc": { "start": { "line": 1, "column": 120 }, "end": { "line": 1, "column": 157 } } })) + '">\r\n    <header>\r\n        <h1>\r\n            <span class="prefix">Departures from</span>\r\n            <span class="location can-scroll">' + alias2(alias1((stack1 = depth0 != null ? lookupProperty(depth0, "board") : depth0) != null ? lookupProperty(stack1, "locationName") : stack1, depth0)) + '</span>\r\n        </h1>\r\n    </header>\r\n    <trains role="list">\r\n' + ((stack1 = lookupProperty(helpers, "each").call(alias3, (lookupProperty(helpers, "limit") || depth0 && lookupProperty(depth0, "limit") || alias4).call(alias3, (stack1 = depth0 != null ? lookupProperty(depth0, "board") : depth0) != null ? lookupProperty(stack1, "trainServices") : stack1, depth0 != null ? lookupProperty(depth0, "maxRows") : depth0, { "name": "limit", "hash": {}, "data": data, "loc": { "start": { "line": 9, "column": 16 }, "end": { "line": 9, "column": 51 } } }), { "name": "each", "hash": {}, "fn": container.program(1, data, 0, blockParams, depths), "inverse": container.noop, "data": data, "loc": { "start": { "line": 9, "column": 8 }, "end": { "line": 35, "column": 17 } } })) != null ? stack1 : "") + "    </trains>\r\n</section>\r\n";
}, "useData": true, "useDepths": true });

// styles/site.css
var site_default = '@keyframes text-scroll {\n  0% {\n    left: 0;\n  }\n  40% {\n    left: 0;\n  }\n  80% {\n    left: calc(var(--available-width) - var(--actual-width));\n  }\n  100% {\n    left: calc(var(--available-width) - var(--actual-width));\n  }\n}\n.theme-classic {\n  /* Explicit opt-in for the classic theme.\n     These match the default values baked into the board base styles, so a plain `.board` will also behave like classic.\n  */\n  --board-border: black;\n  --board-border-width: 10px;\n  --board-border-radius: 4px;\n  --board-bg: #222;\n  --board-text: orange;\n  --board-font: "UkPIDS", monospace, sans-serif;\n  /* Theme-controlled spacing */\n  --board-margin: 20px;\n  --board-gap: 4px;\n  --board-content-spacing: 8px 16px;\n  --board-font-size: 14px;\n  --board-line-height: 1.3;\n  --board-header-border-width: 30px;\n  /* Theme-controlled layout visibility */\n  --board-header-display: none;\n  --board-footer-display: none;\n  --board-prefix-display: none;\n  /* Theme-controlled status colors */\n  --board-cancel-color: red;\n}\n\n.board.theme-london2025 {\n  /* Add London 2025 theme values here.\n     You can override any of the core variables, for example:\n     --board-border\n     --board-border-width\n     --board-border-radius\n     --board-bg\n     --board-text\n     --board-font\n     --board-margin\n     --board-gap\n     --board-content-spacing\n     --board-font-size\n     --board-line-height\n     --board-header-border-width\n     --board-header-display\n     --board-footer-display\n     --board-prefix-display\n     --board-cancel-color\n  */\n  --board-font: "Roboto Mono", sans-serif;\n  --train-header-background-color: darkblue;\n}\n.board.theme-london2025.single-train trains {\n  /* Allow the base layout to control how many columns are shown via --single-train-columns. */\n  margin: 0px;\n  gap: 0px;\n  column-gap: 0px;\n}\n.board.theme-london2025.single-train trains:before {\n  background-color: var(--train-header-background-color);\n  position: absolute;\n  content: "";\n  display: block;\n  top: 0px;\n  left: 0px;\n  right: 0px;\n  height: 104px;\n  z-index: 1;\n}\n.board.theme-london2025.single-train trains train {\n  grid-template-rows: 36px 20px 20px 20px 36px 1fr auto auto auto;\n  gap: 0px;\n  z-index: 2;\n}\n.board.theme-london2025.single-train trains train time.departure {\n  grid-row: 1;\n  grid-column: 1/-1;\n  font-weight: bold;\n  padding: 2px 16px;\n  background-color: var(--train-header-background-color);\n  color: white;\n  text-align: left;\n  padding-top: 16px;\n}\n.board.theme-london2025.single-train trains train .destination {\n  grid-row: 2;\n  grid-column: 1/-1;\n  font-weight: bold;\n  padding: 2px 16px;\n  background-color: var(--train-header-background-color);\n  color: white;\n  text-align: left;\n}\n.board.theme-london2025.single-train trains train .platform {\n  grid-row: 4;\n  grid-column: 1/-1;\n  padding: 2px 16px;\n  background-color: var(--train-header-background-color);\n  color: white;\n  text-align: left;\n  padding-bottom: 16px;\n}\n.board.theme-london2025.single-train trains train .platform .prefix {\n  display: inline-block;\n}\n.board.theme-london2025.single-train trains train:after {\n  display: none;\n  content: "";\n}\n.board.theme-london2025.single-train trains train:before {\n  grid-row: 9;\n  padding: 2px 16px;\n}\n.board.theme-london2025.single-train trains train h3.calling-at {\n  grid-row: 5;\n  padding: 2px 16px;\n  padding-top: 16px;\n  font-size: 1em;\n}\n.board.theme-london2025.single-train trains train h3.calling-at:after {\n  content: ": ";\n  display: inline-block;\n}\n.board.theme-london2025.single-train trains train stations.calling-at {\n  grid-row: 6;\n  display: block;\n  color: white;\n  padding: 2px 16px;\n}\n.board.theme-london2025.single-train trains train stations.calling-at station {\n  display: grid;\n  grid-template-columns: 1fr auto;\n  align-items: center;\n  font-size: 1em;\n  padding: 1px 0px;\n}\n.board.theme-london2025.single-train trains train stations.calling-at station .location.stop {\n  grid-column: 1;\n}\n.board.theme-london2025.single-train trains train stations.calling-at station time {\n  grid-column: 2;\n}\n.board.theme-london2025.single-train trains train stations.calling-at station .estimated:before, .board.theme-london2025.single-train trains train stations.calling-at station .estimated:after {\n  display: none;\n  content: "";\n}\n.board.theme-london2025.single-train trains train stations.calling-at station:last-child .location.stop, .board.theme-london2025.single-train trains train stations.calling-at station:last-child time {\n  font-weight: bold;\n}\n.board.theme-london2025.table header {\n  background-color: var(--train-header-background-color);\n  display: block;\n  color: white;\n  min-height: 50px;\n  padding: 8px 10px;\n}\n.board.theme-london2025.table header h1 {\n  text-align: center;\n  text-transform: uppercase;\n  font-weight: normal;\n}\n.board.theme-london2025.table header h1::after {\n  content: " Departures";\n  display: inline-block;\n  text-transform: none;\n}\n.board.theme-london2025.table trains {\n  color: white;\n  --board-header-border-width: 0px;\n}\n.board.theme-london2025.table trains train {\n  border-bottom: 1px solid grey;\n}\n.board.theme-london2025.table trains train:nth-child(1) time.departure::before,\n.board.theme-london2025.table trains train:nth-child(1) .platform:before,\n.board.theme-london2025.table trains train:nth-child(1) .status:before {\n  top: -1.5em;\n}\n.board.theme-london2025.table trains train:nth-child(1) .status:before {\n  content: "Expected";\n}\n.board.theme-london2025.table trains .destination {\n  color: yellow;\n}\n@container board (max-width: 500px) {\n  .board.theme-london2025.responsive trains {\n    /* Allow the base layout to control how many columns are shown via --single-train-columns. */\n    margin: 0px;\n    gap: 0px;\n    column-gap: 0px;\n  }\n  .board.theme-london2025.responsive trains:before {\n    background-color: var(--train-header-background-color);\n    position: absolute;\n    content: "";\n    display: block;\n    top: 0px;\n    left: 0px;\n    right: 0px;\n    height: 104px;\n    z-index: 1;\n  }\n  .board.theme-london2025.responsive trains train {\n    grid-template-rows: 36px 20px 20px 20px 36px 1fr auto auto auto;\n    gap: 0px;\n    z-index: 2;\n  }\n  .board.theme-london2025.responsive trains train time.departure {\n    grid-row: 1;\n    grid-column: 1/-1;\n    font-weight: bold;\n    padding: 2px 16px;\n    background-color: var(--train-header-background-color);\n    color: white;\n    text-align: left;\n    padding-top: 16px;\n  }\n  .board.theme-london2025.responsive trains train .destination {\n    grid-row: 2;\n    grid-column: 1/-1;\n    font-weight: bold;\n    padding: 2px 16px;\n    background-color: var(--train-header-background-color);\n    color: white;\n    text-align: left;\n  }\n  .board.theme-london2025.responsive trains train .platform {\n    grid-row: 4;\n    grid-column: 1/-1;\n    padding: 2px 16px;\n    background-color: var(--train-header-background-color);\n    color: white;\n    text-align: left;\n    padding-bottom: 16px;\n  }\n  .board.theme-london2025.responsive trains train .platform .prefix {\n    display: inline-block;\n  }\n  .board.theme-london2025.responsive trains train:after {\n    display: none;\n    content: "";\n  }\n  .board.theme-london2025.responsive trains train:before {\n    grid-row: 9;\n    padding: 2px 16px;\n  }\n  .board.theme-london2025.responsive trains train h3.calling-at {\n    grid-row: 5;\n    padding: 2px 16px;\n    padding-top: 16px;\n    font-size: 1em;\n  }\n  .board.theme-london2025.responsive trains train h3.calling-at:after {\n    content: ": ";\n    display: inline-block;\n  }\n  .board.theme-london2025.responsive trains train stations.calling-at {\n    grid-row: 6;\n    display: block;\n    color: white;\n    padding: 2px 16px;\n  }\n  .board.theme-london2025.responsive trains train stations.calling-at station {\n    display: grid;\n    grid-template-columns: 1fr auto;\n    align-items: center;\n    font-size: 1em;\n    padding: 1px 0px;\n  }\n  .board.theme-london2025.responsive trains train stations.calling-at station .location.stop {\n    grid-column: 1;\n  }\n  .board.theme-london2025.responsive trains train stations.calling-at station time {\n    grid-column: 2;\n  }\n  .board.theme-london2025.responsive trains train stations.calling-at station .estimated:before, .board.theme-london2025.responsive trains train stations.calling-at station .estimated:after {\n    display: none;\n    content: "";\n  }\n  .board.theme-london2025.responsive trains train stations.calling-at station:last-child .location.stop, .board.theme-london2025.responsive trains train stations.calling-at station:last-child time {\n    font-weight: bold;\n  }\n}\n@container board (min-width: 500px) and (max-width: 700px) {\n  .board.theme-london2025.responsive header {\n    background-color: var(--train-header-background-color);\n    display: block;\n    color: white;\n    min-height: 50px;\n    padding: 8px 10px;\n  }\n  .board.theme-london2025.responsive header h1 {\n    text-align: center;\n    text-transform: uppercase;\n    font-weight: normal;\n  }\n  .board.theme-london2025.responsive header h1::after {\n    content: " Departures";\n    display: inline-block;\n    text-transform: none;\n  }\n  .board.theme-london2025.responsive trains {\n    color: white;\n    --board-header-border-width: 0px;\n  }\n  .board.theme-london2025.responsive trains train {\n    border-bottom: 1px solid grey;\n  }\n  .board.theme-london2025.responsive trains train:nth-child(1) time.departure::before,\n  .board.theme-london2025.responsive trains train:nth-child(1) .platform:before,\n  .board.theme-london2025.responsive trains train:nth-child(1) .status:before {\n    top: -1.5em;\n  }\n  .board.theme-london2025.responsive trains train:nth-child(1) .status:before {\n    content: "Expected";\n  }\n  .board.theme-london2025.responsive trains .destination {\n    color: yellow;\n  }\n}\n@container board (min-width: 840px) {\n  .board.theme-london2025.responsive trains {\n    /* Allow the base layout to control how many columns are shown via --single-train-columns. */\n    margin: 0px;\n    gap: 0px;\n    column-gap: 0px;\n  }\n  .board.theme-london2025.responsive trains:before {\n    background-color: var(--train-header-background-color);\n    position: absolute;\n    content: "";\n    display: block;\n    top: 0px;\n    left: 0px;\n    right: 0px;\n    height: 104px;\n    z-index: 1;\n  }\n  .board.theme-london2025.responsive trains train {\n    grid-template-rows: 36px 20px 20px 20px 36px 1fr auto auto auto;\n    gap: 0px;\n    z-index: 2;\n  }\n  .board.theme-london2025.responsive trains train time.departure {\n    grid-row: 1;\n    grid-column: 1/-1;\n    font-weight: bold;\n    padding: 2px 16px;\n    background-color: var(--train-header-background-color);\n    color: white;\n    text-align: left;\n    padding-top: 16px;\n  }\n  .board.theme-london2025.responsive trains train .destination {\n    grid-row: 2;\n    grid-column: 1/-1;\n    font-weight: bold;\n    padding: 2px 16px;\n    background-color: var(--train-header-background-color);\n    color: white;\n    text-align: left;\n  }\n  .board.theme-london2025.responsive trains train .platform {\n    grid-row: 4;\n    grid-column: 1/-1;\n    padding: 2px 16px;\n    background-color: var(--train-header-background-color);\n    color: white;\n    text-align: left;\n    padding-bottom: 16px;\n  }\n  .board.theme-london2025.responsive trains train .platform .prefix {\n    display: inline-block;\n  }\n  .board.theme-london2025.responsive trains train:after {\n    display: none;\n    content: "";\n  }\n  .board.theme-london2025.responsive trains train:before {\n    grid-row: 9;\n    padding: 2px 16px;\n  }\n  .board.theme-london2025.responsive trains train h3.calling-at {\n    grid-row: 5;\n    padding: 2px 16px;\n    padding-top: 16px;\n    font-size: 1em;\n  }\n  .board.theme-london2025.responsive trains train h3.calling-at:after {\n    content: ": ";\n    display: inline-block;\n  }\n  .board.theme-london2025.responsive trains train stations.calling-at {\n    grid-row: 6;\n    display: block;\n    color: white;\n    padding: 2px 16px;\n  }\n  .board.theme-london2025.responsive trains train stations.calling-at station {\n    display: grid;\n    grid-template-columns: 1fr auto;\n    align-items: center;\n    font-size: 1em;\n    padding: 1px 0px;\n  }\n  .board.theme-london2025.responsive trains train stations.calling-at station .location.stop {\n    grid-column: 1;\n  }\n  .board.theme-london2025.responsive trains train stations.calling-at station time {\n    grid-column: 2;\n  }\n  .board.theme-london2025.responsive trains train stations.calling-at station .estimated:before, .board.theme-london2025.responsive trains train stations.calling-at station .estimated:after {\n    display: none;\n    content: "";\n  }\n  .board.theme-london2025.responsive trains train stations.calling-at station:last-child .location.stop, .board.theme-london2025.responsive trains train stations.calling-at station:last-child time {\n    font-weight: bold;\n  }\n}\n\n.board {\n  --board-border: black;\n  --board-border-width: 10px;\n  --board-border-radius: 4px;\n  --board-bg: #222;\n  --board-text: orange;\n  --board-font: "UkPIDS", monospace, sans-serif;\n  --board-margin: 20px;\n  --board-gap: 4px;\n  --board-content-spacing: 8px 16px;\n  --board-font-size: 12px;\n  --board-line-height: 1.3;\n  --board-header-border-width: 30px;\n  --board-header-display: none;\n  --board-footer-display: none;\n  --board-prefix-display: none;\n  --board-cancel-color: red;\n  /* Navigation controls */\n  --board-nav-button-bg: transparent;\n  --board-nav-button-hover-bg: rgba(0, 0, 0, 0.2);\n  --board-nav-icon-color: var(--board-text);\n  --board-nav-icon-size: 3em;\n  --board-nav-prev-mask: url("data:image/svg+xml,%3Csvg%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22white%22%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%3E%3Cpath%20d%3D%22M15%2018l-6-6%206-6%22/%3E%3C/svg%3E");\n  --board-nav-next-mask: url("data:image/svg+xml,%3Csvg%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22white%22%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%3E%3Cpath%20d%3D%22M9%2018l6-6-6-6%22/%3E%3C/svg%3E");\n  --board-pause-on-hover: false;\n}\n.board.overhead-platform {\n  /* Theme-configurable variables (defaults are provided by the theme/root). */\n  border: var(--board-border-width) solid var(--board-border);\n  border-radius: var(--board-border-radius);\n  background-color: var(--board-bg);\n  margin: var(--board-margin);\n  overflow: hidden;\n  transition: width 0.3s ease;\n  container-type: inline-size;\n  container-name: board;\n  font-family: var(--board-font);\n  color: var(--board-text);\n  font-size: var(--board-font-size, 14px);\n  position: relative;\n  line-height: var(--board-line-height, 1.3);\n}\n.board.overhead-platform * {\n  padding: 0px;\n  margin: 0px;\n}\n.board.overhead-platform stations station {\n  padding: 2px 0px;\n}\n.board.overhead-platform station.stop {\n  padding: 2px 0px;\n}\n.board.overhead-platform h3 {\n  font-weight: normal;\n}\n.board.overhead-platform .board-nav {\n  position: absolute;\n  top: 0.75rem;\n  width: var(--board-nav-icon-size);\n  height: var(--board-nav-icon-size);\n  display: none;\n  border: none;\n  border-radius: 999px;\n  cursor: pointer;\n  padding: 0;\n  background-color: var(--board-nav-button-bg, rgba(0, 0, 0, 0.35));\n  color: var(--board-nav-icon-color, currentColor);\n  text-indent: -9999px;\n  overflow: hidden;\n  z-index: 10;\n}\n.board.overhead-platform .board-nav::after {\n  content: "";\n  position: absolute;\n  inset: 0;\n  margin: auto;\n  width: 60%;\n  height: 60%;\n  background-color: var(--board-nav-icon-color, currentColor);\n  mask: var(--board-nav-icon-mask);\n  -webkit-mask: var(--board-nav-icon-mask);\n  mask-repeat: no-repeat;\n  -webkit-mask-repeat: no-repeat;\n  mask-position: center;\n  -webkit-mask-position: center;\n  mask-size: contain;\n  -webkit-mask-size: contain;\n}\n.board.overhead-platform .board-nav:hover {\n  background-color: var(--board-nav-button-hover-bg, rgba(0, 0, 0, 0.55));\n}\n.board.overhead-platform .board-nav.prev {\n  left: 0.75rem;\n}\n.board.overhead-platform .board-nav.prev::after {\n  mask: var(--board-nav-prev-mask);\n  -webkit-mask: var(--board-nav-prev-mask);\n}\n.board.overhead-platform .board-nav.next {\n  right: 0.75rem;\n}\n.board.overhead-platform .board-nav.next::after {\n  mask: var(--board-nav-next-mask);\n  -webkit-mask: var(--board-nav-next-mask);\n}\n.board.overhead-platform .location.platform {\n  text-transform: capitalize;\n}\n.board.overhead-platform .can-scroll {\n  --scroll-enabled: 1;\n  --scroll-measure-root: 1;\n}\n.board.overhead-platform span.can-scroll,\n.board.overhead-platform station.can-scroll {\n  overflow: hidden;\n  white-space: nowrap;\n}\n.board.overhead-platform span.can-scroll.scroll > .scroller,\n.board.overhead-platform station.can-scroll.scroll > .scroller {\n  position: relative;\n  display: inline-block;\n  animation: text-scroll 5s linear infinite alternate;\n}\n.board.overhead-platform span.can-scroll .scroller,\n.board.overhead-platform station.can-scroll .scroller {\n  width: 0px;\n}\n.board.overhead-platform header {\n  display: var(--board-header-display);\n}\n.board.overhead-platform footer {\n  display: var(--board-footer-display);\n}\n.board.overhead-platform .prefix {\n  display: var(--board-prefix-display);\n}\n.board.overhead-platform trains {\n  display: grid;\n  grid-template-columns: auto auto 1fr auto;\n  gap: var(--board-gap);\n  margin: var(--board-content-spacing);\n}\n.board.overhead-platform trains train {\n  grid-template-columns: subgrid;\n  display: none;\n  grid-column: 1/-1;\n  gap: 4px 8px;\n  opacity: 1;\n}\n.board.overhead-platform trains train time.departure {\n  grid-column: 2;\n}\n.board.overhead-platform trains train [itemprop=departureStation], .board.overhead-platform trains train .platform {\n  display: none;\n}\n.board.overhead-platform trains train:after {\n  content: attr(data-status);\n  display: block;\n  grid-column: 4;\n  grid-row: 1;\n  text-align: right;\n}\n.board.overhead-platform trains train:not(:has(.on-time)):after {\n  color: var(--board-cancel-color);\n}\n.board.overhead-platform trains train > station {\n  display: grid;\n  grid-template-columns: subgrid;\n}\n.board.overhead-platform trains train [itemprop=arrivalStation] {\n  grid-column: 3;\n}\n.board.overhead-platform trains train .calling-at {\n  display: none;\n}\n.board.overhead-platform trains train stations.calling-at {\n  --scroll-enabled: 1;\n  --scroll-measure-root: 1;\n  grid-column: 3/5;\n  overflow: hidden;\n  white-space: nowrap;\n  white-space-collapse: collapse;\n  position: relative;\n  top: 2px;\n}\n.board.overhead-platform trains train stations.calling-at station {\n  --scroll-enabled: 0;\n  --scroll-measure-root: 0;\n  display: inline-block;\n  white-space-collapse: collapse;\n  position: relative;\n  animation-fill-mode: both;\n}\n.board.overhead-platform trains train stations.calling-at station:not(:last-child):after {\n  content: ",";\n  display: inline-block;\n  position: relative;\n  left: -3px;\n}\n.board.overhead-platform trains train stations.calling-at station .estimated:before {\n  content: " (";\n  display: inline-block;\n  padding-left: 5px;\n}\n.board.overhead-platform trains train stations.calling-at station .estimated:after {\n  content: ")";\n  display: inline-block;\n}\n.board.overhead-platform trains train stations.calling-at.scroll station {\n  animation: overhead-platform-calling-at-scroll var(--overhead-platform-calling-at-scroll-duration, 10s) linear 0s infinite forwards;\n}\n.board.overhead-platform trains train[data-overhead-platform-train-role=next-train] {\n  grid-row: 1;\n  display: grid;\n}\n.board.overhead-platform trains train[data-overhead-platform-train-role=next-train]:before {\n  content: "1st";\n  display: block;\n  grid-column: 1;\n}\n.board.overhead-platform trains train[data-overhead-platform-train-role=next-train] h3.calling-at {\n  grid-row: 2;\n  grid-column: 1/3;\n  display: block;\n  text-align: right;\n  font-size: var(--board-font-size, 14px);\n  align-self: center;\n}\n.board.overhead-platform trains train[data-overhead-platform-train-role=next-train] stations.calling-at {\n  display: block;\n}\n.board.overhead-platform trains train:nth-child(2):before {\n  content: "2nd";\n}\n.board.overhead-platform trains train:nth-child(3):before {\n  content: "3rd";\n}\n.board.overhead-platform trains train:nth-child(4):before {\n  content: "4th";\n}\n.board.overhead-platform trains train:nth-child(5):before {\n  content: "5th";\n}\n.board.overhead-platform trains train:nth-child(6):before {\n  content: "6th";\n}\n.board.overhead-platform trains train:nth-child(7):before {\n  content: "7th";\n}\n.board.overhead-platform trains train:nth-child(8):before {\n  content: "8th";\n}\n.board.overhead-platform trains train:nth-child(9):before {\n  content: "9th";\n}\n.board.overhead-platform trains train[data-overhead-platform-train-role=static] {\n  display: grid;\n}\n.board.overhead-platform trains train[data-overhead-platform-train-role=static]:before {\n  display: block;\n  grid-column: 1;\n}\n.board.overhead-platform trains train[data-overhead-platform-train-state=current] {\n  display: grid;\n  position: relative;\n  animation: overhead-platform-show-following-train-scroll 10s linear forwards;\n}\n.board.overhead-platform trains train[data-overhead-platform-train-state=current]:before {\n  display: block;\n  grid-column: 1;\n}\n.board.overhead-platform trains train[data-overhead-platform-train-role=static]:nth-child(2) {\n  grid-row: 2;\n}\n.board.overhead-platform trains train[data-overhead-platform-train-role=static]:nth-child(3) {\n  grid-row: 3;\n}\n.board.overhead-platform trains train[data-overhead-platform-train-role=static]:nth-child(4) {\n  grid-row: 4;\n}\n.board.overhead-platform trains train[data-overhead-platform-train-role=static]:nth-child(5) {\n  grid-row: 5;\n}\n.board.overhead-platform trains train[data-overhead-platform-train-role=static]:nth-child(6) {\n  grid-row: 6;\n}\n.board.overhead-platform trains train[data-overhead-platform-train-role=static]:nth-child(7) {\n  grid-row: 7;\n}\n.board.overhead-platform[data-overhead-platform-overview-row="2"] trains train[data-overhead-platform-train-state=current] {\n  grid-row: 2;\n}\n.board.overhead-platform[data-overhead-platform-overview-row="3"] trains train[data-overhead-platform-train-state=current] {\n  grid-row: 3;\n}\n.board.overhead-platform[data-overhead-platform-overview-row="4"] trains train[data-overhead-platform-train-state=current] {\n  grid-row: 4;\n}\n.board.overhead-platform[data-overhead-platform-overview-row="5"] trains train[data-overhead-platform-train-state=current] {\n  grid-row: 5;\n}\n.board.overhead-platform[data-overhead-platform-overview-row="6"] trains train[data-overhead-platform-train-state=current] {\n  grid-row: 6;\n}\n@keyframes overhead-platform-show-following-train-scroll {\n  0% {\n    top: 2em;\n    opacity: 1;\n  }\n  10% {\n    top: 0;\n    opacity: 1;\n  }\n  90% {\n    top: 0;\n    opacity: 1;\n  }\n  95% {\n    top: 0;\n    opacity: 0;\n  }\n  100% {\n    top: 0;\n    opacity: 0;\n  }\n}\n@keyframes overhead-platform-calling-at-scroll {\n  0% {\n    left: 0;\n    opacity: 0;\n  }\n  5% {\n    left: 0;\n    opacity: 1;\n  }\n  25% {\n    left: 0;\n    opacity: 1;\n  }\n  80% {\n    opacity: 1;\n    left: calc(var(--available-width) - var(--actual-width));\n  }\n  95% {\n    opacity: 1;\n    left: calc(var(--available-width) - var(--actual-width));\n  }\n  100% {\n    opacity: 0;\n    left: calc(var(--available-width) - var(--actual-width));\n  }\n}\n@media (prefers-reduced-motion: reduce) {\n  .board.overhead-platform .board train stations.calling-at {\n    animation: none;\n  }\n}\n.board.single-train {\n  /* Theme-configurable variables (defaults are provided by the theme/root). */\n  border: var(--board-border-width) solid var(--board-border);\n  border-radius: var(--board-border-radius);\n  background-color: var(--board-bg);\n  margin: var(--board-margin);\n  overflow: hidden;\n  transition: width 0.3s ease;\n  container-type: inline-size;\n  container-name: board;\n  font-family: var(--board-font);\n  color: var(--board-text);\n  font-size: var(--board-font-size, 14px);\n  position: relative;\n  line-height: var(--board-line-height, 1.3);\n  /* Allow optional pause-by-hover for controls and auto-rotate */\n  /* Hide nav buttons in multi-column mode (fixed columns, no scrolling) */\n}\n.board.single-train * {\n  padding: 0px;\n  margin: 0px;\n}\n.board.single-train stations station {\n  padding: 2px 0px;\n}\n.board.single-train station.stop {\n  padding: 2px 0px;\n}\n.board.single-train h3 {\n  font-weight: normal;\n}\n.board.single-train .board-nav {\n  position: absolute;\n  top: 0.75rem;\n  width: var(--board-nav-icon-size);\n  height: var(--board-nav-icon-size);\n  display: none;\n  border: none;\n  border-radius: 999px;\n  cursor: pointer;\n  padding: 0;\n  background-color: var(--board-nav-button-bg, rgba(0, 0, 0, 0.35));\n  color: var(--board-nav-icon-color, currentColor);\n  text-indent: -9999px;\n  overflow: hidden;\n  z-index: 10;\n}\n.board.single-train .board-nav::after {\n  content: "";\n  position: absolute;\n  inset: 0;\n  margin: auto;\n  width: 60%;\n  height: 60%;\n  background-color: var(--board-nav-icon-color, currentColor);\n  mask: var(--board-nav-icon-mask);\n  -webkit-mask: var(--board-nav-icon-mask);\n  mask-repeat: no-repeat;\n  -webkit-mask-repeat: no-repeat;\n  mask-position: center;\n  -webkit-mask-position: center;\n  mask-size: contain;\n  -webkit-mask-size: contain;\n}\n.board.single-train .board-nav:hover {\n  background-color: var(--board-nav-button-hover-bg, rgba(0, 0, 0, 0.55));\n}\n.board.single-train .board-nav.prev {\n  left: 0.75rem;\n}\n.board.single-train .board-nav.prev::after {\n  mask: var(--board-nav-prev-mask);\n  -webkit-mask: var(--board-nav-prev-mask);\n}\n.board.single-train .board-nav.next {\n  right: 0.75rem;\n}\n.board.single-train .board-nav.next::after {\n  mask: var(--board-nav-next-mask);\n  -webkit-mask: var(--board-nav-next-mask);\n}\n.board.single-train .location.platform {\n  text-transform: capitalize;\n}\n.board.single-train .can-scroll {\n  --scroll-enabled: 1;\n  --scroll-measure-root: 1;\n}\n.board.single-train span.can-scroll,\n.board.single-train station.can-scroll {\n  overflow: hidden;\n  white-space: nowrap;\n}\n.board.single-train span.can-scroll.scroll > .scroller,\n.board.single-train station.can-scroll.scroll > .scroller {\n  position: relative;\n  display: inline-block;\n  animation: text-scroll 5s linear infinite alternate;\n}\n.board.single-train span.can-scroll .scroller,\n.board.single-train station.can-scroll .scroller {\n  width: 0px;\n}\n.board.single-train {\n  --board-pause-on-hover: true;\n}\n.board.single-train:hover .board-nav {\n  display: block;\n}\n.board.single-train header {\n  display: var(--board-header-display);\n}\n.board.single-train footer {\n  display: var(--board-footer-display);\n}\n.board.single-train .prefix {\n  display: var(--board-prefix-display);\n}\n.board.single-train .board-nav {\n  top: auto;\n  bottom: 0px;\n}\n.board.single-train .board-nav.prev {\n  left: auto;\n  right: 40px;\n}\n.board.single-train .board-nav .board-nav.next {\n  right: 0px;\n}\n.board.single-train trains {\n  /* How many trains to show side-by-side. 1 by default. */\n  --single-train-columns: 1;\n  display: grid;\n  grid-template-columns: repeat(var(--single-train-columns), 1fr);\n  grid-template-rows: auto;\n  gap: var(--board-gap);\n  column-gap: 16px;\n  margin: var(--board-content-spacing);\n  /* Single-column: show only the current train */\n  /* Multi-column: show the first N trains (not based on current) */\n}\n.board.single-train trains train {\n  grid-template-columns: auto auto 1fr;\n  grid-template-rows: auto auto auto auto 1fr auto auto;\n  display: grid;\n  gap: 4px 8px;\n  opacity: 1;\n  display: none;\n}\n.board.single-train trains train:after {\n  content: attr(data-status);\n  display: block;\n  grid-column: 2;\n  grid-row: 1;\n}\n.board.single-train trains train:not(:has(.on-time)):after {\n  color: var(--board-cancel-color);\n}\n.board.single-train trains train:before {\n  content: attr(data-operator);\n  display: block;\n  grid-column: 1/-1;\n  grid-row: 6;\n}\n.board.single-train trains train time.departure {\n  grid-row: 1;\n  grid-column: 1;\n}\n.board.single-train trains train .platform {\n  text-align: right;\n  grid-row: 1;\n  grid-column: 3;\n}\n.board.single-train trains train .platform .prefix {\n  display: inline-block;\n}\n.board.single-train trains train [itemprop=arrivalStation] {\n  display: block;\n  grid-column: 1/-1;\n  grid-row: 2;\n}\n.board.single-train trains train [itemprop=departureStation], .board.single-train trains train .calling-at {\n  display: none;\n}\n.board.single-train trains train h3.calling-at {\n  grid-row: 4;\n  grid-column: 1/-1;\n  font-size: 0.8em;\n}\n.board.single-train trains train h3.calling-at:after {\n  content: ": ";\n  display: inline-block;\n}\n.board.single-train trains train stations.calling-at {\n  grid-row: 5;\n  grid-column: 1/-1;\n  min-height: 200px;\n  max-height: 300px;\n  overflow-y: auto;\n}\n.board.single-train trains train stations.calling-at station {\n  --scroll-enabled: 0;\n  --scroll-measure-root: 0;\n  display: block;\n  font-size: 0.8em;\n}\n.board.single-train trains train stations.calling-at station .estimated:before {\n  content: " (";\n  display: inline-block;\n}\n.board.single-train trains train stations.calling-at station .estimated:after {\n  content: ")";\n  display: inline-block;\n}\n@container board (max-width: 575px) {\n  .board.single-train trains train[data-single-train-state=current] {\n    display: grid;\n  }\n  .board.single-train trains train[data-single-train-state=current] h3.calling-at {\n    display: block;\n  }\n  .board.single-train trains train[data-single-train-state=current] stations.calling-at {\n    display: block;\n  }\n  .board.single-train trains train[data-single-train-state=current] stations.calling-at station .estimated:before {\n    display: inline-block;\n  }\n  .board.single-train trains train[data-single-train-state=current] stations.calling-at station .estimated:after {\n    display: inline-block;\n  }\n}\n@container board (min-width: 576px) {\n  .board.single-train trains {\n    --single-train-columns: 2;\n    /* Hide nav buttons on hover once there is more than one column */\n  }\n  .board.single-train trains train:nth-child(-n+2) {\n    display: grid;\n  }\n  .board.single-train trains train:nth-child(-n+2) h3.calling-at, .board.single-train trains train:nth-child(-n+2) stations.calling-at {\n    display: block;\n  }\n  .board.single-train trains:hover .board-nav {\n    display: none;\n  }\n}\n@container board (min-width: 872px) {\n  .board.single-train trains {\n    --single-train-columns: 3;\n  }\n  .board.single-train trains train:nth-child(-n+3) {\n    display: grid;\n  }\n  .board.single-train trains train:nth-child(-n+3) h3.calling-at, .board.single-train trains train:nth-child(-n+3) stations.calling-at {\n    display: block;\n  }\n}\n@container board (min-width: 1168px) {\n  .board.single-train trains {\n    --single-train-columns: 4;\n  }\n  .board.single-train trains train:nth-child(-n+4) {\n    display: grid;\n  }\n  .board.single-train trains train:nth-child(-n+4) h3.calling-at, .board.single-train trains train:nth-child(-n+4) stations.calling-at {\n    display: block;\n  }\n}\n@container board (min-width: 1464px) {\n  .board.single-train trains {\n    --single-train-columns: 5;\n  }\n  .board.single-train trains train:nth-child(-n+5) {\n    display: grid;\n  }\n  .board.single-train trains train:nth-child(-n+5) h3.calling-at, .board.single-train trains train:nth-child(-n+5) stations.calling-at {\n    display: block;\n  }\n}\n@container board (min-width: 576px) {\n  .board.single-train .board-nav {\n    display: none !important;\n  }\n}\n@container board (max-width: 575px) {\n  .board.single-train {\n    /* Only animate current train in single-column mode */\n  }\n  .board.single-train[data-single-train-animation=true] trains train[data-single-train-state=current] {\n    animation: single-train-fade-cycle 10s linear forwards;\n  }\n}\n@keyframes single-train-fade-cycle {\n  0% {\n    opacity: 0;\n  }\n  5% {\n    opacity: 1;\n  }\n  95% {\n    opacity: 1;\n  }\n  100% {\n    opacity: 0;\n  }\n}\n.board.table {\n  /* Theme-configurable variables (defaults are provided by the theme/root). */\n  border: var(--board-border-width) solid var(--board-border);\n  border-radius: var(--board-border-radius);\n  background-color: var(--board-bg);\n  margin: var(--board-margin);\n  overflow: hidden;\n  transition: width 0.3s ease;\n  container-type: inline-size;\n  container-name: board;\n  font-family: var(--board-font);\n  color: var(--board-text);\n  font-size: var(--board-font-size, 14px);\n  position: relative;\n  line-height: var(--board-line-height, 1.3);\n}\n.board.table * {\n  padding: 0px;\n  margin: 0px;\n}\n.board.table stations station {\n  padding: 2px 0px;\n}\n.board.table station.stop {\n  padding: 2px 0px;\n}\n.board.table h3 {\n  font-weight: normal;\n}\n.board.table .board-nav {\n  position: absolute;\n  top: 0.75rem;\n  width: var(--board-nav-icon-size);\n  height: var(--board-nav-icon-size);\n  display: none;\n  border: none;\n  border-radius: 999px;\n  cursor: pointer;\n  padding: 0;\n  background-color: var(--board-nav-button-bg, rgba(0, 0, 0, 0.35));\n  color: var(--board-nav-icon-color, currentColor);\n  text-indent: -9999px;\n  overflow: hidden;\n  z-index: 10;\n}\n.board.table .board-nav::after {\n  content: "";\n  position: absolute;\n  inset: 0;\n  margin: auto;\n  width: 60%;\n  height: 60%;\n  background-color: var(--board-nav-icon-color, currentColor);\n  mask: var(--board-nav-icon-mask);\n  -webkit-mask: var(--board-nav-icon-mask);\n  mask-repeat: no-repeat;\n  -webkit-mask-repeat: no-repeat;\n  mask-position: center;\n  -webkit-mask-position: center;\n  mask-size: contain;\n  -webkit-mask-size: contain;\n}\n.board.table .board-nav:hover {\n  background-color: var(--board-nav-button-hover-bg, rgba(0, 0, 0, 0.55));\n}\n.board.table .board-nav.prev {\n  left: 0.75rem;\n}\n.board.table .board-nav.prev::after {\n  mask: var(--board-nav-prev-mask);\n  -webkit-mask: var(--board-nav-prev-mask);\n}\n.board.table .board-nav.next {\n  right: 0.75rem;\n}\n.board.table .board-nav.next::after {\n  mask: var(--board-nav-next-mask);\n  -webkit-mask: var(--board-nav-next-mask);\n}\n.board.table .location.platform {\n  text-transform: capitalize;\n}\n.board.table .can-scroll {\n  --scroll-enabled: 1;\n  --scroll-measure-root: 1;\n}\n.board.table span.can-scroll,\n.board.table station.can-scroll {\n  overflow: hidden;\n  white-space: nowrap;\n}\n.board.table span.can-scroll.scroll > .scroller,\n.board.table station.can-scroll.scroll > .scroller {\n  position: relative;\n  display: inline-block;\n  animation: text-scroll 5s linear infinite alternate;\n}\n.board.table span.can-scroll .scroller,\n.board.table station.can-scroll .scroller {\n  width: 0px;\n}\n.board.table header {\n  display: var(--board-header-display);\n}\n.board.table footer {\n  display: var(--board-footer-display);\n}\n.board.table .prefix {\n  display: var(--board-prefix-display);\n}\n.board.table trains {\n  display: grid;\n  grid-template-columns: auto 1fr auto minmax(60px, auto);\n  grid-auto-flow: row;\n  --board-gap: 4px 8px;\n  gap: var(--board-gap);\n  position: relative;\n  padding: var(--board-content-spacing);\n  border-top: var(--board-header-border-width, 30px) solid var(--board-border);\n  min-width: 250px;\n}\n.board.table trains train {\n  display: grid;\n  grid-template-columns: subgrid;\n  grid-column: 1/-1;\n}\n.board.table trains train time.departure {\n  grid-column: 1;\n}\n.board.table trains train [itemprop=arrivalStation] {\n  grid-column: 2;\n}\n.board.table trains train .calling-at, .board.table trains train [itemprop=departureStation] {\n  display: none;\n}\n.board.table trains train .platform, .board.table trains train .status {\n  display: grid;\n  grid-template-columns: subgrid;\n  text-align: right;\n}\n.board.table trains train .platform.platform, .board.table trains train .status.platform {\n  grid-column: 3;\n}\n.board.table trains train .platform.status, .board.table trains train .status.status {\n  grid-column: 4;\n}\n.board.table trains train:not(:has(.on-time)).status {\n  color: var(--board-cancel-color);\n}\n.board.table trains train[data-isCancelled=true] .platform {\n  display: none;\n}\n.board.table trains train[data-isCancelled=true] .status {\n  color: red;\n}\n.board.table trains train:nth-child(1) time.departure::before {\n  font-family: "Roboto", sans-serif;\n  color: white;\n  position: absolute;\n  top: calc(-1em - 12px);\n  grid-column: 1/3;\n  content: "Destination";\n}\n.board.table trains train:nth-child(1) .status::before {\n  font-family: "Roboto", sans-serif;\n  color: white;\n  position: absolute;\n  top: calc(-1em - 12px);\n  grid-column: 4;\n  content: "Due";\n  text-align: left;\n  width: 100%;\n  max-width: 70px;\n  box-sizing: border-box;\n  padding-left: 8px;\n}\n.board.table trains train:nth-child(1) .platform:before {\n  font-family: "Roboto", sans-serif;\n  color: white;\n  position: absolute;\n  top: calc(-1em - 12px);\n  grid-column: 2/4;\n  content: "Platform";\n  width: 100%;\n  left: 0px;\n  text-align: right;\n}\n.board.responsive {\n  /* Theme-configurable variables (defaults are provided by the theme/root). */\n  border: var(--board-border-width) solid var(--board-border);\n  border-radius: var(--board-border-radius);\n  background-color: var(--board-bg);\n  margin: var(--board-margin);\n  overflow: hidden;\n  transition: width 0.3s ease;\n  container-type: inline-size;\n  container-name: board;\n  font-family: var(--board-font);\n  color: var(--board-text);\n  font-size: var(--board-font-size, 14px);\n  position: relative;\n  line-height: var(--board-line-height, 1.3);\n}\n.board.responsive * {\n  padding: 0px;\n  margin: 0px;\n}\n.board.responsive stations station {\n  padding: 2px 0px;\n}\n.board.responsive station.stop {\n  padding: 2px 0px;\n}\n.board.responsive h3 {\n  font-weight: normal;\n}\n.board.responsive .board-nav {\n  position: absolute;\n  top: 0.75rem;\n  width: var(--board-nav-icon-size);\n  height: var(--board-nav-icon-size);\n  display: none;\n  border: none;\n  border-radius: 999px;\n  cursor: pointer;\n  padding: 0;\n  background-color: var(--board-nav-button-bg, rgba(0, 0, 0, 0.35));\n  color: var(--board-nav-icon-color, currentColor);\n  text-indent: -9999px;\n  overflow: hidden;\n  z-index: 10;\n}\n.board.responsive .board-nav::after {\n  content: "";\n  position: absolute;\n  inset: 0;\n  margin: auto;\n  width: 60%;\n  height: 60%;\n  background-color: var(--board-nav-icon-color, currentColor);\n  mask: var(--board-nav-icon-mask);\n  -webkit-mask: var(--board-nav-icon-mask);\n  mask-repeat: no-repeat;\n  -webkit-mask-repeat: no-repeat;\n  mask-position: center;\n  -webkit-mask-position: center;\n  mask-size: contain;\n  -webkit-mask-size: contain;\n}\n.board.responsive .board-nav:hover {\n  background-color: var(--board-nav-button-hover-bg, rgba(0, 0, 0, 0.55));\n}\n.board.responsive .board-nav.prev {\n  left: 0.75rem;\n}\n.board.responsive .board-nav.prev::after {\n  mask: var(--board-nav-prev-mask);\n  -webkit-mask: var(--board-nav-prev-mask);\n}\n.board.responsive .board-nav.next {\n  right: 0.75rem;\n}\n.board.responsive .board-nav.next::after {\n  mask: var(--board-nav-next-mask);\n  -webkit-mask: var(--board-nav-next-mask);\n}\n.board.responsive .location.platform {\n  text-transform: capitalize;\n}\n.board.responsive .can-scroll {\n  --scroll-enabled: 1;\n  --scroll-measure-root: 1;\n}\n.board.responsive span.can-scroll,\n.board.responsive station.can-scroll {\n  overflow: hidden;\n  white-space: nowrap;\n}\n.board.responsive span.can-scroll.scroll > .scroller,\n.board.responsive station.can-scroll.scroll > .scroller {\n  position: relative;\n  display: inline-block;\n  animation: text-scroll 5s linear infinite alternate;\n}\n.board.responsive span.can-scroll .scroller,\n.board.responsive station.can-scroll .scroller {\n  width: 0px;\n}\n@container board (max-width: 500px) {\n  .board.responsive {\n    /* Theme-configurable variables (defaults are provided by the theme/root). */\n    border: var(--board-border-width) solid var(--board-border);\n    border-radius: var(--board-border-radius);\n    background-color: var(--board-bg);\n    margin: var(--board-margin);\n    overflow: hidden;\n    transition: width 0.3s ease;\n    container-type: inline-size;\n    container-name: board;\n    font-family: var(--board-font);\n    color: var(--board-text);\n    font-size: var(--board-font-size, 14px);\n    position: relative;\n    line-height: var(--board-line-height, 1.3);\n    /* Allow optional pause-by-hover for controls and auto-rotate */\n    /* Hide nav buttons in multi-column mode (fixed columns, no scrolling) */\n  }\n  .board.responsive * {\n    padding: 0px;\n    margin: 0px;\n  }\n  .board.responsive stations station {\n    padding: 2px 0px;\n  }\n  .board.responsive station.stop {\n    padding: 2px 0px;\n  }\n  .board.responsive h3 {\n    font-weight: normal;\n  }\n  .board.responsive .board-nav {\n    position: absolute;\n    top: 0.75rem;\n    width: var(--board-nav-icon-size);\n    height: var(--board-nav-icon-size);\n    display: none;\n    border: none;\n    border-radius: 999px;\n    cursor: pointer;\n    padding: 0;\n    background-color: var(--board-nav-button-bg, rgba(0, 0, 0, 0.35));\n    color: var(--board-nav-icon-color, currentColor);\n    text-indent: -9999px;\n    overflow: hidden;\n    z-index: 10;\n  }\n  .board.responsive .board-nav::after {\n    content: "";\n    position: absolute;\n    inset: 0;\n    margin: auto;\n    width: 60%;\n    height: 60%;\n    background-color: var(--board-nav-icon-color, currentColor);\n    mask: var(--board-nav-icon-mask);\n    -webkit-mask: var(--board-nav-icon-mask);\n    mask-repeat: no-repeat;\n    -webkit-mask-repeat: no-repeat;\n    mask-position: center;\n    -webkit-mask-position: center;\n    mask-size: contain;\n    -webkit-mask-size: contain;\n  }\n  .board.responsive .board-nav:hover {\n    background-color: var(--board-nav-button-hover-bg, rgba(0, 0, 0, 0.55));\n  }\n  .board.responsive .board-nav.prev {\n    left: 0.75rem;\n  }\n  .board.responsive .board-nav.prev::after {\n    mask: var(--board-nav-prev-mask);\n    -webkit-mask: var(--board-nav-prev-mask);\n  }\n  .board.responsive .board-nav.next {\n    right: 0.75rem;\n  }\n  .board.responsive .board-nav.next::after {\n    mask: var(--board-nav-next-mask);\n    -webkit-mask: var(--board-nav-next-mask);\n  }\n  .board.responsive .location.platform {\n    text-transform: capitalize;\n  }\n  .board.responsive .can-scroll {\n    --scroll-enabled: 1;\n    --scroll-measure-root: 1;\n  }\n  .board.responsive span.can-scroll,\n  .board.responsive station.can-scroll {\n    overflow: hidden;\n    white-space: nowrap;\n  }\n  .board.responsive span.can-scroll.scroll > .scroller,\n  .board.responsive station.can-scroll.scroll > .scroller {\n    position: relative;\n    display: inline-block;\n    animation: text-scroll 5s linear infinite alternate;\n  }\n  .board.responsive span.can-scroll .scroller,\n  .board.responsive station.can-scroll .scroller {\n    width: 0px;\n  }\n  .board.responsive {\n    --board-pause-on-hover: true;\n  }\n  .board.responsive:hover .board-nav {\n    display: block;\n  }\n  .board.responsive header {\n    display: var(--board-header-display);\n  }\n  .board.responsive footer {\n    display: var(--board-footer-display);\n  }\n  .board.responsive .prefix {\n    display: var(--board-prefix-display);\n  }\n  .board.responsive .board-nav {\n    top: auto;\n    bottom: 0px;\n  }\n  .board.responsive .board-nav.prev {\n    left: auto;\n    right: 40px;\n  }\n  .board.responsive .board-nav .board-nav.next {\n    right: 0px;\n  }\n  .board.responsive trains {\n    /* How many trains to show side-by-side. 1 by default. */\n    --single-train-columns: 1;\n    display: grid;\n    grid-template-columns: repeat(var(--single-train-columns), 1fr);\n    grid-template-rows: auto;\n    gap: var(--board-gap);\n    column-gap: 16px;\n    margin: var(--board-content-spacing);\n    /* Single-column: show only the current train */\n    /* Multi-column: show the first N trains (not based on current) */\n  }\n  .board.responsive trains train {\n    grid-template-columns: auto auto 1fr;\n    grid-template-rows: auto auto auto auto 1fr auto auto;\n    display: grid;\n    gap: 4px 8px;\n    opacity: 1;\n    display: none;\n  }\n  .board.responsive trains train:after {\n    content: attr(data-status);\n    display: block;\n    grid-column: 2;\n    grid-row: 1;\n  }\n  .board.responsive trains train:not(:has(.on-time)):after {\n    color: var(--board-cancel-color);\n  }\n  .board.responsive trains train:before {\n    content: attr(data-operator);\n    display: block;\n    grid-column: 1/-1;\n    grid-row: 6;\n  }\n  .board.responsive trains train time.departure {\n    grid-row: 1;\n    grid-column: 1;\n  }\n  .board.responsive trains train .platform {\n    text-align: right;\n    grid-row: 1;\n    grid-column: 3;\n  }\n  .board.responsive trains train .platform .prefix {\n    display: inline-block;\n  }\n  .board.responsive trains train [itemprop=arrivalStation] {\n    display: block;\n    grid-column: 1/-1;\n    grid-row: 2;\n  }\n  .board.responsive trains train [itemprop=departureStation], .board.responsive trains train .calling-at {\n    display: none;\n  }\n  .board.responsive trains train h3.calling-at {\n    grid-row: 4;\n    grid-column: 1/-1;\n    font-size: 0.8em;\n  }\n  .board.responsive trains train h3.calling-at:after {\n    content: ": ";\n    display: inline-block;\n  }\n  .board.responsive trains train stations.calling-at {\n    grid-row: 5;\n    grid-column: 1/-1;\n    min-height: 200px;\n    max-height: 300px;\n    overflow-y: auto;\n  }\n  .board.responsive trains train stations.calling-at station {\n    --scroll-enabled: 0;\n    --scroll-measure-root: 0;\n    display: block;\n    font-size: 0.8em;\n  }\n  .board.responsive trains train stations.calling-at station .estimated:before {\n    content: " (";\n    display: inline-block;\n  }\n  .board.responsive trains train stations.calling-at station .estimated:after {\n    content: ")";\n    display: inline-block;\n  }\n  @container board (max-width: 575px) {\n    .board.responsive trains train[data-single-train-state=current] {\n      display: grid;\n    }\n    .board.responsive trains train[data-single-train-state=current] h3.calling-at {\n      display: block;\n    }\n    .board.responsive trains train[data-single-train-state=current] stations.calling-at {\n      display: block;\n    }\n    .board.responsive trains train[data-single-train-state=current] stations.calling-at station .estimated:before {\n      display: inline-block;\n    }\n    .board.responsive trains train[data-single-train-state=current] stations.calling-at station .estimated:after {\n      display: inline-block;\n    }\n  }\n  @container board (min-width: 576px) {\n    .board.responsive trains {\n      --single-train-columns: 2;\n      /* Hide nav buttons on hover once there is more than one column */\n    }\n    .board.responsive trains train:nth-child(-n+2) {\n      display: grid;\n    }\n    .board.responsive trains train:nth-child(-n+2) h3.calling-at, .board.responsive trains train:nth-child(-n+2) stations.calling-at {\n      display: block;\n    }\n    .board.responsive trains:hover .board-nav {\n      display: none;\n    }\n  }\n  @container board (min-width: 872px) {\n    .board.responsive trains {\n      --single-train-columns: 3;\n    }\n    .board.responsive trains train:nth-child(-n+3) {\n      display: grid;\n    }\n    .board.responsive trains train:nth-child(-n+3) h3.calling-at, .board.responsive trains train:nth-child(-n+3) stations.calling-at {\n      display: block;\n    }\n  }\n  @container board (min-width: 1168px) {\n    .board.responsive trains {\n      --single-train-columns: 4;\n    }\n    .board.responsive trains train:nth-child(-n+4) {\n      display: grid;\n    }\n    .board.responsive trains train:nth-child(-n+4) h3.calling-at, .board.responsive trains train:nth-child(-n+4) stations.calling-at {\n      display: block;\n    }\n  }\n  @container board (min-width: 1464px) {\n    .board.responsive trains {\n      --single-train-columns: 5;\n    }\n    .board.responsive trains train:nth-child(-n+5) {\n      display: grid;\n    }\n    .board.responsive trains train:nth-child(-n+5) h3.calling-at, .board.responsive trains train:nth-child(-n+5) stations.calling-at {\n      display: block;\n    }\n  }\n  @container board (min-width: 576px) {\n    .board.responsive .board-nav {\n      display: none !important;\n    }\n  }\n  @container board (max-width: 575px) {\n    .board.responsive {\n      /* Only animate current train in single-column mode */\n    }\n    .board.responsive[data-single-train-animation=true] trains train[data-single-train-state=current] {\n      animation: single-train-fade-cycle 10s linear forwards;\n    }\n  }\n  @keyframes single-train-fade-cycle {\n    0% {\n      opacity: 0;\n    }\n    5% {\n      opacity: 1;\n    }\n    95% {\n      opacity: 1;\n    }\n    100% {\n      opacity: 0;\n    }\n  }\n}\n@container board (min-width: 500px) and (max-width: 700px) {\n  .board.responsive {\n    /* Theme-configurable variables (defaults are provided by the theme/root). */\n    border: var(--board-border-width) solid var(--board-border);\n    border-radius: var(--board-border-radius);\n    background-color: var(--board-bg);\n    margin: var(--board-margin);\n    overflow: hidden;\n    transition: width 0.3s ease;\n    container-type: inline-size;\n    container-name: board;\n    font-family: var(--board-font);\n    color: var(--board-text);\n    font-size: var(--board-font-size, 14px);\n    position: relative;\n    line-height: var(--board-line-height, 1.3);\n  }\n  .board.responsive * {\n    padding: 0px;\n    margin: 0px;\n  }\n  .board.responsive stations station {\n    padding: 2px 0px;\n  }\n  .board.responsive station.stop {\n    padding: 2px 0px;\n  }\n  .board.responsive h3 {\n    font-weight: normal;\n  }\n  .board.responsive .board-nav {\n    position: absolute;\n    top: 0.75rem;\n    width: var(--board-nav-icon-size);\n    height: var(--board-nav-icon-size);\n    display: none;\n    border: none;\n    border-radius: 999px;\n    cursor: pointer;\n    padding: 0;\n    background-color: var(--board-nav-button-bg, rgba(0, 0, 0, 0.35));\n    color: var(--board-nav-icon-color, currentColor);\n    text-indent: -9999px;\n    overflow: hidden;\n    z-index: 10;\n  }\n  .board.responsive .board-nav::after {\n    content: "";\n    position: absolute;\n    inset: 0;\n    margin: auto;\n    width: 60%;\n    height: 60%;\n    background-color: var(--board-nav-icon-color, currentColor);\n    mask: var(--board-nav-icon-mask);\n    -webkit-mask: var(--board-nav-icon-mask);\n    mask-repeat: no-repeat;\n    -webkit-mask-repeat: no-repeat;\n    mask-position: center;\n    -webkit-mask-position: center;\n    mask-size: contain;\n    -webkit-mask-size: contain;\n  }\n  .board.responsive .board-nav:hover {\n    background-color: var(--board-nav-button-hover-bg, rgba(0, 0, 0, 0.55));\n  }\n  .board.responsive .board-nav.prev {\n    left: 0.75rem;\n  }\n  .board.responsive .board-nav.prev::after {\n    mask: var(--board-nav-prev-mask);\n    -webkit-mask: var(--board-nav-prev-mask);\n  }\n  .board.responsive .board-nav.next {\n    right: 0.75rem;\n  }\n  .board.responsive .board-nav.next::after {\n    mask: var(--board-nav-next-mask);\n    -webkit-mask: var(--board-nav-next-mask);\n  }\n  .board.responsive .location.platform {\n    text-transform: capitalize;\n  }\n  .board.responsive .can-scroll {\n    --scroll-enabled: 1;\n    --scroll-measure-root: 1;\n  }\n  .board.responsive span.can-scroll,\n  .board.responsive station.can-scroll {\n    overflow: hidden;\n    white-space: nowrap;\n  }\n  .board.responsive span.can-scroll.scroll > .scroller,\n  .board.responsive station.can-scroll.scroll > .scroller {\n    position: relative;\n    display: inline-block;\n    animation: text-scroll 5s linear infinite alternate;\n  }\n  .board.responsive span.can-scroll .scroller,\n  .board.responsive station.can-scroll .scroller {\n    width: 0px;\n  }\n  .board.responsive header {\n    display: var(--board-header-display);\n  }\n  .board.responsive footer {\n    display: var(--board-footer-display);\n  }\n  .board.responsive .prefix {\n    display: var(--board-prefix-display);\n  }\n  .board.responsive trains {\n    display: grid;\n    grid-template-columns: auto 1fr auto minmax(60px, auto);\n    grid-auto-flow: row;\n    --board-gap: 4px 8px;\n    gap: var(--board-gap);\n    position: relative;\n    padding: var(--board-content-spacing);\n    border-top: var(--board-header-border-width, 30px) solid var(--board-border);\n    min-width: 250px;\n  }\n  .board.responsive trains train {\n    display: grid;\n    grid-template-columns: subgrid;\n    grid-column: 1/-1;\n  }\n  .board.responsive trains train time.departure {\n    grid-column: 1;\n  }\n  .board.responsive trains train [itemprop=arrivalStation] {\n    grid-column: 2;\n  }\n  .board.responsive trains train .calling-at, .board.responsive trains train [itemprop=departureStation] {\n    display: none;\n  }\n  .board.responsive trains train .platform, .board.responsive trains train .status {\n    display: grid;\n    grid-template-columns: subgrid;\n    text-align: right;\n  }\n  .board.responsive trains train .platform.platform, .board.responsive trains train .status.platform {\n    grid-column: 3;\n  }\n  .board.responsive trains train .platform.status, .board.responsive trains train .status.status {\n    grid-column: 4;\n  }\n  .board.responsive trains train:not(:has(.on-time)).status {\n    color: var(--board-cancel-color);\n  }\n  .board.responsive trains train[data-isCancelled=true] .platform {\n    display: none;\n  }\n  .board.responsive trains train[data-isCancelled=true] .status {\n    color: red;\n  }\n  .board.responsive trains train:nth-child(1) time.departure::before {\n    font-family: "Roboto", sans-serif;\n    color: white;\n    position: absolute;\n    top: calc(-1em - 12px);\n    grid-column: 1/3;\n    content: "Destination";\n  }\n  .board.responsive trains train:nth-child(1) .status::before {\n    font-family: "Roboto", sans-serif;\n    color: white;\n    position: absolute;\n    top: calc(-1em - 12px);\n    grid-column: 4;\n    content: "Due";\n    text-align: left;\n    width: 100%;\n    max-width: 70px;\n    box-sizing: border-box;\n    padding-left: 8px;\n  }\n  .board.responsive trains train:nth-child(1) .platform:before {\n    font-family: "Roboto", sans-serif;\n    color: white;\n    position: absolute;\n    top: calc(-1em - 12px);\n    grid-column: 2/4;\n    content: "Platform";\n    width: 100%;\n    left: 0px;\n    text-align: right;\n  }\n}\n@container board (min-width: 700px) and (max-width: 840px) {\n  .board.responsive {\n    /* Theme-configurable variables (defaults are provided by the theme/root). */\n    border: var(--board-border-width) solid var(--board-border);\n    border-radius: var(--board-border-radius);\n    background-color: var(--board-bg);\n    margin: var(--board-margin);\n    overflow: hidden;\n    transition: width 0.3s ease;\n    container-type: inline-size;\n    container-name: board;\n    font-family: var(--board-font);\n    color: var(--board-text);\n    font-size: var(--board-font-size, 14px);\n    position: relative;\n    line-height: var(--board-line-height, 1.3);\n  }\n  .board.responsive * {\n    padding: 0px;\n    margin: 0px;\n  }\n  .board.responsive stations station {\n    padding: 2px 0px;\n  }\n  .board.responsive station.stop {\n    padding: 2px 0px;\n  }\n  .board.responsive h3 {\n    font-weight: normal;\n  }\n  .board.responsive .board-nav {\n    position: absolute;\n    top: 0.75rem;\n    width: var(--board-nav-icon-size);\n    height: var(--board-nav-icon-size);\n    display: none;\n    border: none;\n    border-radius: 999px;\n    cursor: pointer;\n    padding: 0;\n    background-color: var(--board-nav-button-bg, rgba(0, 0, 0, 0.35));\n    color: var(--board-nav-icon-color, currentColor);\n    text-indent: -9999px;\n    overflow: hidden;\n    z-index: 10;\n  }\n  .board.responsive .board-nav::after {\n    content: "";\n    position: absolute;\n    inset: 0;\n    margin: auto;\n    width: 60%;\n    height: 60%;\n    background-color: var(--board-nav-icon-color, currentColor);\n    mask: var(--board-nav-icon-mask);\n    -webkit-mask: var(--board-nav-icon-mask);\n    mask-repeat: no-repeat;\n    -webkit-mask-repeat: no-repeat;\n    mask-position: center;\n    -webkit-mask-position: center;\n    mask-size: contain;\n    -webkit-mask-size: contain;\n  }\n  .board.responsive .board-nav:hover {\n    background-color: var(--board-nav-button-hover-bg, rgba(0, 0, 0, 0.55));\n  }\n  .board.responsive .board-nav.prev {\n    left: 0.75rem;\n  }\n  .board.responsive .board-nav.prev::after {\n    mask: var(--board-nav-prev-mask);\n    -webkit-mask: var(--board-nav-prev-mask);\n  }\n  .board.responsive .board-nav.next {\n    right: 0.75rem;\n  }\n  .board.responsive .board-nav.next::after {\n    mask: var(--board-nav-next-mask);\n    -webkit-mask: var(--board-nav-next-mask);\n  }\n  .board.responsive .location.platform {\n    text-transform: capitalize;\n  }\n  .board.responsive .can-scroll {\n    --scroll-enabled: 1;\n    --scroll-measure-root: 1;\n  }\n  .board.responsive span.can-scroll,\n  .board.responsive station.can-scroll {\n    overflow: hidden;\n    white-space: nowrap;\n  }\n  .board.responsive span.can-scroll.scroll > .scroller,\n  .board.responsive station.can-scroll.scroll > .scroller {\n    position: relative;\n    display: inline-block;\n    animation: text-scroll 5s linear infinite alternate;\n  }\n  .board.responsive span.can-scroll .scroller,\n  .board.responsive station.can-scroll .scroller {\n    width: 0px;\n  }\n  .board.responsive header {\n    display: var(--board-header-display);\n  }\n  .board.responsive footer {\n    display: var(--board-footer-display);\n  }\n  .board.responsive .prefix {\n    display: var(--board-prefix-display);\n  }\n  .board.responsive trains {\n    display: grid;\n    grid-template-columns: auto auto 1fr auto;\n    gap: var(--board-gap);\n    margin: var(--board-content-spacing);\n  }\n  .board.responsive trains train {\n    grid-template-columns: subgrid;\n    display: none;\n    grid-column: 1/-1;\n    gap: 4px 8px;\n    opacity: 1;\n  }\n  .board.responsive trains train time.departure {\n    grid-column: 2;\n  }\n  .board.responsive trains train [itemprop=departureStation], .board.responsive trains train .platform {\n    display: none;\n  }\n  .board.responsive trains train:after {\n    content: attr(data-status);\n    display: block;\n    grid-column: 4;\n    grid-row: 1;\n    text-align: right;\n  }\n  .board.responsive trains train:not(:has(.on-time)):after {\n    color: var(--board-cancel-color);\n  }\n  .board.responsive trains train > station {\n    display: grid;\n    grid-template-columns: subgrid;\n  }\n  .board.responsive trains train [itemprop=arrivalStation] {\n    grid-column: 3;\n  }\n  .board.responsive trains train .calling-at {\n    display: none;\n  }\n  .board.responsive trains train stations.calling-at {\n    --scroll-enabled: 1;\n    --scroll-measure-root: 1;\n    grid-column: 3/5;\n    overflow: hidden;\n    white-space: nowrap;\n    white-space-collapse: collapse;\n    position: relative;\n    top: 2px;\n  }\n  .board.responsive trains train stations.calling-at station {\n    --scroll-enabled: 0;\n    --scroll-measure-root: 0;\n    display: inline-block;\n    white-space-collapse: collapse;\n    position: relative;\n    animation-fill-mode: both;\n  }\n  .board.responsive trains train stations.calling-at station:not(:last-child):after {\n    content: ",";\n    display: inline-block;\n    position: relative;\n    left: -3px;\n  }\n  .board.responsive trains train stations.calling-at station .estimated:before {\n    content: " (";\n    display: inline-block;\n    padding-left: 5px;\n  }\n  .board.responsive trains train stations.calling-at station .estimated:after {\n    content: ")";\n    display: inline-block;\n  }\n  .board.responsive trains train stations.calling-at.scroll station {\n    animation: overhead-platform-calling-at-scroll var(--overhead-platform-calling-at-scroll-duration, 10s) linear 0s infinite forwards;\n  }\n  .board.responsive trains train[data-overhead-platform-train-role=next-train] {\n    grid-row: 1;\n    display: grid;\n  }\n  .board.responsive trains train[data-overhead-platform-train-role=next-train]:before {\n    content: "1st";\n    display: block;\n    grid-column: 1;\n  }\n  .board.responsive trains train[data-overhead-platform-train-role=next-train] h3.calling-at {\n    grid-row: 2;\n    grid-column: 1/3;\n    display: block;\n    text-align: right;\n    font-size: var(--board-font-size, 14px);\n    align-self: center;\n  }\n  .board.responsive trains train[data-overhead-platform-train-role=next-train] stations.calling-at {\n    display: block;\n  }\n  .board.responsive trains train:nth-child(2):before {\n    content: "2nd";\n  }\n  .board.responsive trains train:nth-child(3):before {\n    content: "3rd";\n  }\n  .board.responsive trains train:nth-child(4):before {\n    content: "4th";\n  }\n  .board.responsive trains train:nth-child(5):before {\n    content: "5th";\n  }\n  .board.responsive trains train:nth-child(6):before {\n    content: "6th";\n  }\n  .board.responsive trains train:nth-child(7):before {\n    content: "7th";\n  }\n  .board.responsive trains train:nth-child(8):before {\n    content: "8th";\n  }\n  .board.responsive trains train:nth-child(9):before {\n    content: "9th";\n  }\n  .board.responsive trains train[data-overhead-platform-train-role=static] {\n    display: grid;\n  }\n  .board.responsive trains train[data-overhead-platform-train-role=static]:before {\n    display: block;\n    grid-column: 1;\n  }\n  .board.responsive trains train[data-overhead-platform-train-state=current] {\n    display: grid;\n    position: relative;\n    animation: overhead-platform-show-following-train-scroll 10s linear forwards;\n  }\n  .board.responsive trains train[data-overhead-platform-train-state=current]:before {\n    display: block;\n    grid-column: 1;\n  }\n  .board.responsive trains train[data-overhead-platform-train-role=static]:nth-child(2) {\n    grid-row: 2;\n  }\n  .board.responsive trains train[data-overhead-platform-train-role=static]:nth-child(3) {\n    grid-row: 3;\n  }\n  .board.responsive trains train[data-overhead-platform-train-role=static]:nth-child(4) {\n    grid-row: 4;\n  }\n  .board.responsive trains train[data-overhead-platform-train-role=static]:nth-child(5) {\n    grid-row: 5;\n  }\n  .board.responsive trains train[data-overhead-platform-train-role=static]:nth-child(6) {\n    grid-row: 6;\n  }\n  .board.responsive trains train[data-overhead-platform-train-role=static]:nth-child(7) {\n    grid-row: 7;\n  }\n  .board.responsive[data-overhead-platform-overview-row="2"] trains train[data-overhead-platform-train-state=current] {\n    grid-row: 2;\n  }\n  .board.responsive[data-overhead-platform-overview-row="3"] trains train[data-overhead-platform-train-state=current] {\n    grid-row: 3;\n  }\n  .board.responsive[data-overhead-platform-overview-row="4"] trains train[data-overhead-platform-train-state=current] {\n    grid-row: 4;\n  }\n  .board.responsive[data-overhead-platform-overview-row="5"] trains train[data-overhead-platform-train-state=current] {\n    grid-row: 5;\n  }\n  .board.responsive[data-overhead-platform-overview-row="6"] trains train[data-overhead-platform-train-state=current] {\n    grid-row: 6;\n  }\n  @keyframes overhead-platform-show-following-train-scroll {\n    0% {\n      top: 2em;\n      opacity: 1;\n    }\n    10% {\n      top: 0;\n      opacity: 1;\n    }\n    90% {\n      top: 0;\n      opacity: 1;\n    }\n    95% {\n      top: 0;\n      opacity: 0;\n    }\n    100% {\n      top: 0;\n      opacity: 0;\n    }\n  }\n  @keyframes overhead-platform-calling-at-scroll {\n    0% {\n      left: 0;\n      opacity: 0;\n    }\n    5% {\n      left: 0;\n      opacity: 1;\n    }\n    25% {\n      left: 0;\n      opacity: 1;\n    }\n    80% {\n      opacity: 1;\n      left: calc(var(--available-width) - var(--actual-width));\n    }\n    95% {\n      opacity: 1;\n      left: calc(var(--available-width) - var(--actual-width));\n    }\n    100% {\n      opacity: 0;\n      left: calc(var(--available-width) - var(--actual-width));\n    }\n  }\n  @media (prefers-reduced-motion: reduce) {\n    .board.responsive .board train stations.calling-at {\n      animation: none;\n    }\n  }\n}\n@container board (min-width: 840px) {\n  .board.responsive {\n    /* Theme-configurable variables (defaults are provided by the theme/root). */\n    border: var(--board-border-width) solid var(--board-border);\n    border-radius: var(--board-border-radius);\n    background-color: var(--board-bg);\n    margin: var(--board-margin);\n    overflow: hidden;\n    transition: width 0.3s ease;\n    container-type: inline-size;\n    container-name: board;\n    font-family: var(--board-font);\n    color: var(--board-text);\n    font-size: var(--board-font-size, 14px);\n    position: relative;\n    line-height: var(--board-line-height, 1.3);\n    /* Allow optional pause-by-hover for controls and auto-rotate */\n    /* Hide nav buttons in multi-column mode (fixed columns, no scrolling) */\n  }\n  .board.responsive * {\n    padding: 0px;\n    margin: 0px;\n  }\n  .board.responsive stations station {\n    padding: 2px 0px;\n  }\n  .board.responsive station.stop {\n    padding: 2px 0px;\n  }\n  .board.responsive h3 {\n    font-weight: normal;\n  }\n  .board.responsive .board-nav {\n    position: absolute;\n    top: 0.75rem;\n    width: var(--board-nav-icon-size);\n    height: var(--board-nav-icon-size);\n    display: none;\n    border: none;\n    border-radius: 999px;\n    cursor: pointer;\n    padding: 0;\n    background-color: var(--board-nav-button-bg, rgba(0, 0, 0, 0.35));\n    color: var(--board-nav-icon-color, currentColor);\n    text-indent: -9999px;\n    overflow: hidden;\n    z-index: 10;\n  }\n  .board.responsive .board-nav::after {\n    content: "";\n    position: absolute;\n    inset: 0;\n    margin: auto;\n    width: 60%;\n    height: 60%;\n    background-color: var(--board-nav-icon-color, currentColor);\n    mask: var(--board-nav-icon-mask);\n    -webkit-mask: var(--board-nav-icon-mask);\n    mask-repeat: no-repeat;\n    -webkit-mask-repeat: no-repeat;\n    mask-position: center;\n    -webkit-mask-position: center;\n    mask-size: contain;\n    -webkit-mask-size: contain;\n  }\n  .board.responsive .board-nav:hover {\n    background-color: var(--board-nav-button-hover-bg, rgba(0, 0, 0, 0.55));\n  }\n  .board.responsive .board-nav.prev {\n    left: 0.75rem;\n  }\n  .board.responsive .board-nav.prev::after {\n    mask: var(--board-nav-prev-mask);\n    -webkit-mask: var(--board-nav-prev-mask);\n  }\n  .board.responsive .board-nav.next {\n    right: 0.75rem;\n  }\n  .board.responsive .board-nav.next::after {\n    mask: var(--board-nav-next-mask);\n    -webkit-mask: var(--board-nav-next-mask);\n  }\n  .board.responsive .location.platform {\n    text-transform: capitalize;\n  }\n  .board.responsive .can-scroll {\n    --scroll-enabled: 1;\n    --scroll-measure-root: 1;\n  }\n  .board.responsive span.can-scroll,\n  .board.responsive station.can-scroll {\n    overflow: hidden;\n    white-space: nowrap;\n  }\n  .board.responsive span.can-scroll.scroll > .scroller,\n  .board.responsive station.can-scroll.scroll > .scroller {\n    position: relative;\n    display: inline-block;\n    animation: text-scroll 5s linear infinite alternate;\n  }\n  .board.responsive span.can-scroll .scroller,\n  .board.responsive station.can-scroll .scroller {\n    width: 0px;\n  }\n  .board.responsive {\n    --board-pause-on-hover: true;\n  }\n  .board.responsive:hover .board-nav {\n    display: block;\n  }\n  .board.responsive header {\n    display: var(--board-header-display);\n  }\n  .board.responsive footer {\n    display: var(--board-footer-display);\n  }\n  .board.responsive .prefix {\n    display: var(--board-prefix-display);\n  }\n  .board.responsive .board-nav {\n    top: auto;\n    bottom: 0px;\n  }\n  .board.responsive .board-nav.prev {\n    left: auto;\n    right: 40px;\n  }\n  .board.responsive .board-nav .board-nav.next {\n    right: 0px;\n  }\n  .board.responsive trains {\n    /* How many trains to show side-by-side. 1 by default. */\n    --single-train-columns: 1;\n    display: grid;\n    grid-template-columns: repeat(var(--single-train-columns), 1fr);\n    grid-template-rows: auto;\n    gap: var(--board-gap);\n    column-gap: 16px;\n    margin: var(--board-content-spacing);\n    /* Single-column: show only the current train */\n    /* Multi-column: show the first N trains (not based on current) */\n  }\n  .board.responsive trains train {\n    grid-template-columns: auto auto 1fr;\n    grid-template-rows: auto auto auto auto 1fr auto auto;\n    display: grid;\n    gap: 4px 8px;\n    opacity: 1;\n    display: none;\n  }\n  .board.responsive trains train:after {\n    content: attr(data-status);\n    display: block;\n    grid-column: 2;\n    grid-row: 1;\n  }\n  .board.responsive trains train:not(:has(.on-time)):after {\n    color: var(--board-cancel-color);\n  }\n  .board.responsive trains train:before {\n    content: attr(data-operator);\n    display: block;\n    grid-column: 1/-1;\n    grid-row: 6;\n  }\n  .board.responsive trains train time.departure {\n    grid-row: 1;\n    grid-column: 1;\n  }\n  .board.responsive trains train .platform {\n    text-align: right;\n    grid-row: 1;\n    grid-column: 3;\n  }\n  .board.responsive trains train .platform .prefix {\n    display: inline-block;\n  }\n  .board.responsive trains train [itemprop=arrivalStation] {\n    display: block;\n    grid-column: 1/-1;\n    grid-row: 2;\n  }\n  .board.responsive trains train [itemprop=departureStation], .board.responsive trains train .calling-at {\n    display: none;\n  }\n  .board.responsive trains train h3.calling-at {\n    grid-row: 4;\n    grid-column: 1/-1;\n    font-size: 0.8em;\n  }\n  .board.responsive trains train h3.calling-at:after {\n    content: ": ";\n    display: inline-block;\n  }\n  .board.responsive trains train stations.calling-at {\n    grid-row: 5;\n    grid-column: 1/-1;\n    min-height: 200px;\n    max-height: 300px;\n    overflow-y: auto;\n  }\n  .board.responsive trains train stations.calling-at station {\n    --scroll-enabled: 0;\n    --scroll-measure-root: 0;\n    display: block;\n    font-size: 0.8em;\n  }\n  .board.responsive trains train stations.calling-at station .estimated:before {\n    content: " (";\n    display: inline-block;\n  }\n  .board.responsive trains train stations.calling-at station .estimated:after {\n    content: ")";\n    display: inline-block;\n  }\n  @container board (max-width: 575px) {\n    .board.responsive trains train[data-single-train-state=current] {\n      display: grid;\n    }\n    .board.responsive trains train[data-single-train-state=current] h3.calling-at {\n      display: block;\n    }\n    .board.responsive trains train[data-single-train-state=current] stations.calling-at {\n      display: block;\n    }\n    .board.responsive trains train[data-single-train-state=current] stations.calling-at station .estimated:before {\n      display: inline-block;\n    }\n    .board.responsive trains train[data-single-train-state=current] stations.calling-at station .estimated:after {\n      display: inline-block;\n    }\n  }\n  @container board (min-width: 576px) {\n    .board.responsive trains {\n      --single-train-columns: 2;\n      /* Hide nav buttons on hover once there is more than one column */\n    }\n    .board.responsive trains train:nth-child(-n+2) {\n      display: grid;\n    }\n    .board.responsive trains train:nth-child(-n+2) h3.calling-at, .board.responsive trains train:nth-child(-n+2) stations.calling-at {\n      display: block;\n    }\n    .board.responsive trains:hover .board-nav {\n      display: none;\n    }\n  }\n  @container board (min-width: 872px) {\n    .board.responsive trains {\n      --single-train-columns: 3;\n    }\n    .board.responsive trains train:nth-child(-n+3) {\n      display: grid;\n    }\n    .board.responsive trains train:nth-child(-n+3) h3.calling-at, .board.responsive trains train:nth-child(-n+3) stations.calling-at {\n      display: block;\n    }\n  }\n  @container board (min-width: 1168px) {\n    .board.responsive trains {\n      --single-train-columns: 4;\n    }\n    .board.responsive trains train:nth-child(-n+4) {\n      display: grid;\n    }\n    .board.responsive trains train:nth-child(-n+4) h3.calling-at, .board.responsive trains train:nth-child(-n+4) stations.calling-at {\n      display: block;\n    }\n  }\n  @container board (min-width: 1464px) {\n    .board.responsive trains {\n      --single-train-columns: 5;\n    }\n    .board.responsive trains train:nth-child(-n+5) {\n      display: grid;\n    }\n    .board.responsive trains train:nth-child(-n+5) h3.calling-at, .board.responsive trains train:nth-child(-n+5) stations.calling-at {\n      display: block;\n    }\n  }\n  @container board (min-width: 576px) {\n    .board.responsive .board-nav {\n      display: none !important;\n    }\n  }\n  @container board (max-width: 575px) {\n    .board.responsive {\n      /* Only animate current train in single-column mode */\n    }\n    .board.responsive[data-single-train-animation=true] trains train[data-single-train-state=current] {\n      animation: single-train-fade-cycle 10s linear forwards;\n    }\n  }\n  @keyframes single-train-fade-cycle {\n    0% {\n      opacity: 0;\n    }\n    5% {\n      opacity: 1;\n    }\n    95% {\n      opacity: 1;\n    }\n    100% {\n      opacity: 0;\n    }\n  }\n}\n';

// styles/fonts.css
var fonts_default = '@font-face {\n  font-family: "UkPIDS";\n  src: url("../fonts/UkPIDS.woff2") format("woff2"), url("../fonts/UkPIDS.ttf") format("truetype");\n  font-display: swap;\n}\n@font-face {\n  font-family: "Roboto Mono";\n  src: url("../fonts/RobotoMono-Regular.woff2") format("woff2"), url("../fonts/RobotoMono-Regular.ttf") format("truetype");\n  font-weight: 400;\n  font-style: normal;\n  font-display: swap;\n}\n@font-face {\n  font-family: "Roboto Mono";\n  src: url("../fonts/RobotoMono-Bold.woff2") format("woff2"), url("../fonts/RobotoMono-Bold.ttf") format("truetype");\n  font-weight: 700;\n  font-style: normal;\n  font-display: swap;\n}\n';

// scripts/next-train.js
var rootBoards = /* @__PURE__ */ new WeakMap();
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
  };
  that.collectTrains();
  that.ensureNavigationControls();
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
    pluginState.trainIndex = (pluginState.trainIndex + 1) % board.allTrains.length;
    showCurrentTrain(board, pluginState);
  }
  function showPreviousTrain(board) {
    var pluginState = getPluginState(board);
    if (board.allTrains.length === 0) {
      return;
    }
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

// scripts/scrolling.js
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

// src/shared/register-handlebars-helpers.js
function registerHandlebarsHelpers(Handlebars3) {
  Handlebars3.registerHelper("statusText", function(service) {
    return service && (service.etd || service.std) || "";
  });
  Handlebars3.registerHelper("departureClass", function(service) {
    return (service && service.etd || "") === "On time" ? "on-time" : "";
  });
  Handlebars3.registerHelper("isEstimated", function(service) {
    var status = service && service.etd || "";
    var cancelled = !!(service && service.isCancelled) || status === "Cancelled";
    return !cancelled && status !== "On time";
  });
  Handlebars3.registerHelper("isCancelled", function(service) {
    var status = service && service.etd || "";
    return !!(service && service.isCancelled) || status === "Cancelled";
  });
  Handlebars3.registerHelper("firstPlatform", function(trainServices) {
    if (!trainServices || trainServices.length === 0) return "";
    return trainServices[0].platform || "";
  });
  Handlebars3.registerHelper("destinationName", function(service) {
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
  Handlebars3.registerHelper("destinationCode", function(service) {
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
  Handlebars3.registerHelper("callingPoints", function(service) {
    if (!service || !service.subsequentCallingPoints || service.subsequentCallingPoints.length === 0) {
      return [];
    }
    return service.subsequentCallingPoints[0].callingPoint || [];
  });
  Handlebars3.registerHelper("displayTime", function(callingPoint) {
    var estimated = callingPoint && callingPoint.et || "";
    if (isClockTime(estimated)) return estimated;
    var scheduled = callingPoint && callingPoint.st || "";
    if (isClockTime(scheduled)) return scheduled;
    return "--:--";
  });
  Handlebars3.registerHelper("serviceDateTime", function(service, generatedAt) {
    return buildDateTime(service && service.std || "", generatedAt);
  });
  Handlebars3.registerHelper("callingPointDateTime", function(callingPoint, generatedAt) {
    var time = getMachineTime(callingPoint && callingPoint.et || "", callingPoint && callingPoint.st || "");
    return buildDateTime(time, generatedAt);
  });
  Handlebars3.registerHelper("fallback", function(value, defaultValue) {
    if (value === null || value === void 0 || value === "") {
      return defaultValue;
    }
    return value;
  });
  Handlebars3.registerHelper("limit", function(collection, count) {
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

// src/lovelace/ukrailboards-card.js
var WRAPPER_CSS = `
:host {
    display: block;
}

ha-card {
    overflow: hidden;
}

.card-header {
    display: block;
    padding: 16px 16px 0;
    font-size: 1rem;
    font-weight: 600;
}

.card-body {
    padding: 0;
}

.error,
.loading,
.empty {
    padding: 16px;
}
`;
var DEFAULT_FONT_PATH = "/local/i-like-trains";
var DEMO_FONT_PATH = "../fonts";
var RAIL_FONTS_LOADED_CLASS = "rail-fonts-loaded";
var RAIL_FONTS_STYLE_ID = "rail-fonts-style";
function normalizeFontPath(fontPath) {
  const candidate = (fontPath || "").trim();
  const fallback = DEFAULT_FONT_PATH;
  const normalized = candidate || fallback;
  return normalized.replace(/\/$/, "");
}
function ensureRailFontsLoaded(fontPath) {
  if (!document.body || !document.head) return;
  if (document.body.classList.contains(RAIL_FONTS_LOADED_CLASS)) return;
  const existingStyle = document.getElementById(RAIL_FONTS_STYLE_ID);
  if (!existingStyle) {
    const styleTag = document.createElement("style");
    styleTag.id = RAIL_FONTS_STYLE_ID;
    styleTag.textContent = fonts_default.replaceAll(DEMO_FONT_PATH, normalizeFontPath(fontPath));
    document.head.appendChild(styleTag);
  }
  document.body.classList.add(RAIL_FONTS_LOADED_CLASS);
}
var helpersRegistered = false;
function ensureHelpersRegistered() {
  if (helpersRegistered) return;
  registerHandlebarsHelpers(import_runtime2.default);
  helpersRegistered = true;
}
function normalizeTrainServices(boardData) {
  if (!boardData) return null;
  if (Array.isArray(boardData.trainServices)) {
  }
  if (Array.isArray(boardData.trains)) {
    boardData.trainServices = boardData.trains;
  }
  if (boardData.station_name && !boardData.locationName) {
    boardData.locationName = boardData.station_name;
  }
  return boardData;
}
function resolveBoardDataFromAttributes(attributes) {
  if (!attributes) return null;
  let boardData = normalizeTrainServices(attributes);
  if (boardData) return boardData;
  if (attributes.board) {
    boardData = normalizeTrainServices(attributes.board);
    if (boardData) return boardData;
  }
  if (attributes.boardData) {
    boardData = normalizeTrainServices(attributes.boardData);
    if (boardData) return boardData;
  }
  if (attributes.data) {
    boardData = normalizeTrainServices(attributes.data);
    if (boardData) return boardData;
  }
  return null;
}
var UkrailboardsCard = class extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this._hass = null;
    this._config = null;
    this._lastUpdate = 0;
  }
  setConfig(config) {
    this._validateConfig(config);
    this._config = {
      title: config.title || "Train Departures",
      entity: config.entity,
      max_rows: config.max_rows || 9,
      limit: config.limit || 10,
      platform_filter: typeof config.platform_filter === "string" ? config.platform_filter.trim() : config.platform_filter == null ? "" : String(config.platform_filter).trim(),
      hide_delayed: config.hide_delayed ?? (config.show_delayed == null ? false : !config.show_delayed),
      hide_cancelled: config.hide_cancelled ?? (config.show_cancelled == null ? false : !config.show_cancelled),
      hide_platform: config.hide_platform ?? (config.show_platform == null ? false : !config.show_platform),
      hide_operator: config.hide_operator ?? (config.show_operator == null ? false : !config.show_operator),
      refresh_interval: config.refresh_interval || 60,
      layout: config.layout || "responsive",
      theme: config.theme || "",
      font_path: config.font_path || DEFAULT_FONT_PATH,
      ...config
    };
    if (config.limit && !config.max_rows) {
      this._config.max_rows = config.limit;
    }
    if (this._config.max_rows > 9) {
      this._config.max_rows = 9;
    }
    ensureRailFontsLoaded(this._config.font_path);
    this.render();
    this.updateContent();
  }
  static getStubConfig() {
    return {
      entity: "sensor.train_schedule_wat_all",
      title: "Train Departures",
      layout: "responsive",
      theme: "",
      max_rows: 9,
      platform_filter: "",
      hide_delayed: false,
      hide_cancelled: false,
      hide_platform: false,
      hide_operator: false,
      refresh_interval: 60
    };
  }
  static getConfigForm() {
    return {
      schema: [
        {
          name: "entity",
          selector: {
            entity: {
              multiple: false,
              filter: [
                {
                  domain: "sensor",
                  integration: "nationalrailuk"
                }
              ]
            }
          }
        },
        {
          name: "title",
          selector: {
            text: {}
          }
        },
        {
          name: "layout",
          selector: {
            select: {
              options: [
                { value: "responsive", label: "Responsive" },
                { value: "single-train", label: "Single Train" },
                { value: "table", label: "Table" },
                { value: "overhead-platform", label: "Overhead Platform" }
              ]
            }
          }
        },
        {
          name: "theme",
          selector: {
            select: {
              options: [
                { value: "", label: "Default" },
                { value: "theme-london2025", label: "London 2025" }
              ]
            }
          }
        },
        {
          name: "advanced",
          type: "expandable",
          title: "Advanced",
          collapsed: true,
          flatten: true,
          schema: [
            {
              name: "max_rows",
              selector: {
                number: {
                  min: 1,
                  max: 9,
                  mode: "slider"
                }
              }
            },
            {
              name: "platform_filter",
              selector: {
                text: {
                  placeholder: "e.g. 1, 2, 4"
                }
              }
            },
            {
              name: "hide_delayed",
              selector: {
                boolean: {}
              }
            },
            {
              name: "hide_cancelled",
              selector: {
                boolean: {}
              }
            },
            {
              name: "hide_platform",
              selector: {
                boolean: {}
              }
            },
            {
              name: "hide_operator",
              selector: {
                boolean: {}
              }
            },
            {
              name: "refresh_interval",
              selector: {
                number: {
                  min: 1,
                  mode: "box",
                  unit_of_measurement: "seconds"
                }
              }
            }
          ]
        }
      ]
    };
  }
  render() {
    if (!this.shadowRoot) return;
    this.shadowRoot.innerHTML = `
            <style>${WRAPPER_CSS}
${site_default}</style>
            <ha-card>
                <div class="card-header">${this._config ? this._config.title : "Train Departures"}</div>
                <div class="card-body">
                    <div id="content" class="loading">Loading departures...</div>
                </div>
            </ha-card>
        `;
  }
  set hass(hass) {
    this._hass = hass;
    this.updateContent();
  }
  updateContent() {
    if (!this._hass || !this._config || !this.shadowRoot) return;
    const content = this.shadowRoot.getElementById("content");
    if (!content) return;
    const entity = this._hass.states[this._config.entity];
    if (!entity) {
      content.innerHTML = '<div class="error">Entity not found</div>';
      return;
    }
    if (entity.state === "unavailable") {
      content.innerHTML = '<div class="error">Sensor unavailable</div>';
      return;
    }
    const refreshIntervalMs = (this._config.refresh_interval || 60) * 1e3;
    const now = Date.now();
    if (this._lastUpdate > 0 && now - this._lastUpdate < refreshIntervalMs) {
      return;
    }
    const boardData = resolveBoardDataFromAttributes(entity.attributes);
    if (!boardData || !Array.isArray(boardData.trainServices) || boardData.trainServices.length === 0) {
      content.innerHTML = '<div class="empty">No trains available</div>';
      return;
    }
    const filteredBoardData = this._applyConfigToBoardData(boardData);
    if (!filteredBoardData.trainServices.length) {
      content.innerHTML = '<div class="empty">No trains match your filters</div>';
      return;
    }
    const maxRows = this._config.max_rows || 10;
    const model = {
      layout: {
        css: this._config.layout
      },
      theme: {
        css: this._config.theme
      },
      maxRows,
      board: filteredBoardData
    };
    console.log("Rendering board with model:", model);
    content.innerHTML = board_default(model);
    initializeRenderedBoards(this.shadowRoot);
    scheduleInitializeScrolling(this.shadowRoot);
    this._lastUpdate = now;
  }
  _applyConfigToBoardData(boardData) {
    const that = this;
    const platformFilter = (that._config.platform_filter || "").split(",").map(function(value) {
      return value.trim().toLowerCase();
    }).filter(function(value) {
      return value.length > 0;
    });
    const hasPlatformFilter = platformFilter.length > 0;
    const services = boardData.trainServices.filter(function(service) {
      if (hasPlatformFilter) {
        const servicePlatform = (service && service.platform != null ? String(service.platform) : "").trim().toLowerCase();
        if (!platformFilter.includes(servicePlatform)) {
          return false;
        }
      }
      if (that._config.hide_cancelled && that._isCancelled(service)) {
        return false;
      }
      if (that._config.hide_delayed && that._isDelayed(service)) {
        return false;
      }
      return true;
    }).sort(function(a, b) {
      return that._parseTimeToMinutes(a.std) - that._parseTimeToMinutes(b.std);
    }).slice(0, that._config.max_rows).map(function(service) {
      const serviceCopy = { ...service };
      if (that._config.hide_platform) {
        delete serviceCopy.platform;
      }
      if (that._config.hide_operator) {
        serviceCopy.operator = "";
      }
      return serviceCopy;
    });
    return {
      ...boardData,
      trainServices: services
    };
  }
  _isCancelled(service) {
    if (!service) return false;
    return !!service.isCancelled || service.etd === "Cancelled";
  }
  _isDelayed(service) {
    if (!service || !service.std || !service.etd) return false;
    if (service.etd === "On time" || service.etd === "Cancelled") return false;
    if (service.std === service.etd) return false;
    const scheduled = this._parseTimeToMinutes(service.std);
    const expected = this._parseTimeToMinutes(service.etd);
    return expected > scheduled;
  }
  _parseTimeToMinutes(value) {
    if (!/^\d{2}:\d{2}$/.test(value || "")) {
      return 0;
    }
    const parts = value.split(":");
    return parseInt(parts[0], 10) * 60 + parseInt(parts[1], 10);
  }
  _validateConfig(config) {
    if (!config.entity) {
      throw new Error("Entity is required");
    }
    if (config.max_rows && (config.max_rows < 1 || config.max_rows > 9)) {
      throw new Error("max_rows must be between 1 and 9");
    }
    if (config.limit && (config.limit < 1 || config.limit > 50)) {
      throw new Error("limit must be between 1 and 50");
    }
    if (config.refresh_interval && config.refresh_interval < 1) {
      throw new Error("refresh_interval must be at least 1 second");
    }
  }
  getCardSize() {
    return 3;
  }
};
ensureHelpersRegistered();
if (!customElements.get("ukrailboards-card")) {
  customElements.define("ukrailboards-card", UkrailboardsCard);
  window.customCards = window.customCards || [];
  window.customCards.push({
    type: "ukrailboards-card",
    name: "UK Rail Boards",
    description: "Uses the national rail HCAS integration for data, displays trains various layouts mimicking boards seen at UK train stations.",
    preview: true,
    multiple: true
  });
}
