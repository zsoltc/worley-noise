(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["WorleyNoise"] = factory();
	else
		root["WorleyNoise"] = factory();
})(typeof self !== "undefined" ? self : this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./node_modules/alea/alea.js":
/*!***********************************!*\
  !*** ./node_modules/alea/alea.js ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("(function (root, factory) {\n  if (true) {\n      module.exports = factory();\n  } else {}\n}(this, function () {\n\n  'use strict';\n\n  // From http://baagoe.com/en/RandomMusings/javascript/\n\n  // importState to sync generator states\n  Alea.importState = function(i){\n    var random = new Alea();\n    random.importState(i);\n    return random;\n  };\n\n  return Alea;\n\n  function Alea() {\n    return (function(args) {\n      // Johannes Baagøe <baagoe@baagoe.com>, 2010\n      var s0 = 0;\n      var s1 = 0;\n      var s2 = 0;\n      var c = 1;\n\n      if (args.length == 0) {\n        args = [+new Date];\n      }\n      var mash = Mash();\n      s0 = mash(' ');\n      s1 = mash(' ');\n      s2 = mash(' ');\n\n      for (var i = 0; i < args.length; i++) {\n        s0 -= mash(args[i]);\n        if (s0 < 0) {\n          s0 += 1;\n        }\n        s1 -= mash(args[i]);\n        if (s1 < 0) {\n          s1 += 1;\n        }\n        s2 -= mash(args[i]);\n        if (s2 < 0) {\n          s2 += 1;\n        }\n      }\n      mash = null;\n\n      var random = function() {\n        var t = 2091639 * s0 + c * 2.3283064365386963e-10; // 2^-32\n        s0 = s1;\n        s1 = s2;\n        return s2 = t - (c = t | 0);\n      };\n      random.uint32 = function() {\n        return random() * 0x100000000; // 2^32\n      };\n      random.fract53 = function() {\n        return random() + \n          (random() * 0x200000 | 0) * 1.1102230246251565e-16; // 2^-53\n      };\n      random.version = 'Alea 0.9';\n      random.args = args;\n\n      // my own additions to sync state between two generators\n      random.exportState = function(){\n        return [s0, s1, s2, c];\n      };\n      random.importState = function(i){\n        s0 = +i[0] || 0;\n        s1 = +i[1] || 0;\n        s2 = +i[2] || 0;\n        c = +i[3] || 0;\n      };\n \n      return random;\n\n    } (Array.prototype.slice.call(arguments)));\n  }\n\n  function Mash() {\n    var n = 0xefc8249d;\n\n    var mash = function(data) {\n      data = data.toString();\n      for (var i = 0; i < data.length; i++) {\n        n += data.charCodeAt(i);\n        var h = 0.02519603282416938 * n;\n        n = h >>> 0;\n        h -= n;\n        h *= n;\n        n = h >>> 0;\n        h -= n;\n        n += h * 0x100000000; // 2^32\n      }\n      return (n >>> 0) * 2.3283064365386963e-10; // 2^-32\n    };\n\n    mash.version = 'Mash 0.9';\n    return mash;\n  }\n}));\n\n\n//# sourceURL=webpack://WorleyNoise/./node_modules/alea/alea.js?");

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nvar _worleyNoise = _interopRequireDefault(__webpack_require__(/*! ./worley-noise */ \"./src/worley-noise.js\"));\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\nmodule.exports = _worleyNoise.default;\n\n//# sourceURL=webpack://WorleyNoise/./src/index.js?");

/***/ }),

/***/ "./src/worley-noise.js":
/*!*****************************!*\
  !*** ./src/worley-noise.js ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\nexports.default = void 0;\n\nvar _alea = _interopRequireDefault(__webpack_require__(/*! alea */ \"./node_modules/alea/alea.js\"));\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\nfunction _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (\"value\" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }\n\nfunction _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }\n\nvar WorleyNoise =\n/*#__PURE__*/\nfunction () {\n  function WorleyNoise(config) {\n    _classCallCheck(this, WorleyNoise);\n\n    config = config || {};\n    if (config.dim !== 2 && config.dim !== 3 && config.dim !== undefined) throw '\"dim\" can be 2 or 3';\n    this._dim = config.dim || 2;\n    this._rng = new _alea.default(config.seed || Math.random());\n    this._points = [];\n\n    for (var i = 0; i < config.numPoints; i++) {\n      this._points.push({\n        x: this._rng(),\n        y: this._rng(),\n        z: this._rng()\n      });\n    }\n  }\n\n  _createClass(WorleyNoise, [{\n    key: \"addPoint\",\n    value: function addPoint(coord) {\n      this._points.push(coord);\n    }\n  }, {\n    key: \"getEuclidean\",\n    value: function getEuclidean(coord, k) {\n      return Math.sqrt(this._calculateValue(coord, k, euclidean));\n    }\n  }, {\n    key: \"getManhattan\",\n    value: function getManhattan(coord, k) {\n      return this._calculateValue(coord, k, manhattan);\n    }\n  }, {\n    key: \"renderImage\",\n    value: function renderImage(resolution, config) {\n      var _this = this;\n\n      config = config || {};\n      var step = 1 / (resolution - 1);\n      var img = [];\n\n      var callback = config.callback || function (e, m) {\n        return e(1);\n      };\n\n      var x, y;\n\n      var e = function e(k) {\n        return Math.sqrt(_this._calculateValue({\n          x: x * step,\n          y: y * step,\n          z: config.z || 0\n        }, k, euclidean));\n      };\n\n      var m = function m(k) {\n        return _this._calculateValue({\n          x: x * step,\n          y: y * step,\n          z: config.z || 0\n        }, k, manhattan);\n      };\n\n      for (y = 0; y < resolution; ++y) {\n        for (x = 0; x < resolution; ++x) {\n          img[y * resolution + x] = callback(e, m);\n        }\n      }\n\n      if (!config.normalize) return img;\n      var min = Number.POSITIVE_INFINITY;\n      var max = Number.NEGATIVE_INFINITY;\n      img.forEach(function (v) {\n        min = Math.min(min, v);\n        max = Math.max(max, v);\n      });\n      var scale = 1 / (max - min);\n      return img.map(function (v) {\n        return (v - min) * scale;\n      });\n    }\n  }, {\n    key: \"_calculateValue\",\n    value: function _calculateValue(coord, k, distFn) {\n      var minDist;\n\n      this._points.forEach(function (p) {\n        p.selected = false;\n      });\n\n      for (var j = 0; j < k; ++j) {\n        var minIdx = void 0;\n        minDist = Number.POSITIVE_INFINITY;\n\n        for (var i = 0; i < this._points.length; ++i) {\n          var p = this._points[i];\n          var dz = this._dim === 2 ? 0 : coord.z - p.z;\n          var dist = distFn(coord.x - p.x, coord.y - p.y, dz);\n\n          if (dist < minDist && !p.selected) {\n            minDist = dist;\n            minIdx = i;\n          }\n        }\n\n        this._points[minIdx].selected = true;\n      }\n\n      return minDist;\n    }\n  }]);\n\n  return WorleyNoise;\n}();\n\nvar euclidean = function euclidean(dx, dy, dz) {\n  return dx * dx + dy * dy + dz * dz;\n};\n\nvar manhattan = function manhattan(dx, dy, dz) {\n  return Math.abs(dx) + Math.abs(dy) + Math.abs(dz);\n};\n\nvar _default = WorleyNoise;\nexports.default = _default;\n\n//# sourceURL=webpack://WorleyNoise/./src/worley-noise.js?");

/***/ })

/******/ });
});