(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["WorleyNoise"] = factory();
	else
		root["WorleyNoise"] = factory();
})(window, function() {
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

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _worley_noise__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./worley-noise */ \"./src/worley-noise.js\");\n\n\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (_worley_noise__WEBPACK_IMPORTED_MODULE_0__[\"default\"]);\n\n\n//# sourceURL=webpack://WorleyNoise/./src/index.js?");

/***/ }),

/***/ "./src/worley-noise.js":
/*!*****************************!*\
  !*** ./src/worley-noise.js ***!
  \*****************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\nfunction WorleyNoise(numPoints, seed) {\n    this._numPoints = numPoints || 0;\n    this._seed = seed || 10000;\n    this._init();\n}\n\nWorleyNoise.prototype.addPoint = function (x, y) {\n    this._points[this._numPoints++] = {\n        x: x,\n        y: y\n    };\n};\n\nWorleyNoise.prototype.getEuclidean = function (x, y, k) {\n    return Math.sqrt(this._calculateValue(x, y, k, euclidean));\n};\n\nWorleyNoise.prototype.getManhattan = function (x, y, k) {\n    return this._calculateValue(x, y, k, manhattan);\n};\n\nWorleyNoise.prototype.getMap = function (resolution, callback) {\n    var step = 1 / (resolution - 1),\n        map = [],\n        that = this,\n        x,\n        y;\n\n    callback = callback || function (e, m) {\n        return e(1);\n    };\n\n    function e(k) {\n        return Math.sqrt(that._calculateValue(x * step, y * step, k, euclidean));\n    }\n\n    function m(k) {\n        return that._calculateValue(x * step, y * step, k, manhattan);\n    }\n\n    for (y = 0; y < resolution; ++y) {\n        for (x = 0; x < resolution; ++x) {\n            map[y * resolution + x] = callback(e, m);\n        }\n    }\n\n    return map;\n};\n\nWorleyNoise.prototype.getNormalizedMap = function (resolution, callback) {\n    var map = this.getMap(resolution, callback),\n        min = Number.POSITIVE_INFINITY,\n        max = Number.NEGATIVE_INFINITY,\n        scale,\n        i;\n\n    for (i = 0; i < map.length; ++i) {\n        min = Math.min(min, map[i]);\n        max = Math.max(max, map[i]);\n    }\n\n    scale = 1 / (max - min);\n\n    for (i = 0; i < map.length; ++i) {\n        map[i] = (map[i] - min) * scale;\n    }\n\n    return map;\n};\n\nWorleyNoise.prototype._init = function () {\n    var i;\n\n    this._points = [];\n\n    for (i = 0; i < this._numPoints; ++i) {\n        var x = Math.sin(i + 1) * this._seed,\n            y = Math.cos(i + 1) * this._seed;\n        this._points.push({\n            x: x - Math.floor(x),\n            y: y - Math.floor(y)\n        });\n    }\n};\n\nWorleyNoise.prototype._calculateValue = function (x, y, k, distFn) {\n    var minDist,\n        dist,\n        minIdx,\n        i,\n        j;\n\n    for (i = 0; i < this._numPoints; ++i) {\n        this._points[i].selected = false;\n    }\n\n    for (j = 0; j < k; ++j) {\n        minDist = Number.POSITIVE_INFINITY\n\n        for (i = 0; i < this._numPoints; ++i) {\n            dist = distFn(x - this._points[i].x, y - this._points[i].y);\n\n            if (dist < minDist && !this._points[i].selected) {\n                minDist = dist;\n                minIdx = i;\n            }\n        }\n\n        this._points[minIdx].selected = true;\n    }\n\n    return minDist;\n};\n\nfunction euclidean(dx, dy) {\n    return dx * dx + dy * dy;\n}\n\nfunction manhattan(dx, dy) {\n    return Math.abs(dx) + Math.abs(dy);\n}\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (WorleyNoise);\n\n\n//# sourceURL=webpack://WorleyNoise/./src/worley-noise.js?");

/***/ })

/******/ });
});