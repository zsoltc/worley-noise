!function(e){if("object"==typeof exports&&"undefined"!=typeof module)module.exports=e();else if("function"==typeof define&&define.amd)define([],e);else{var o;"undefined"!=typeof window?o=window:"undefined"!=typeof global?o=global:"undefined"!=typeof self&&(o=self),o.WorleyNoise=e()}}(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
function WorleyNoise(numPoints) {
    this._numPoints = numPoints || 0;
    this._init();
}

WorleyNoise.prototype.addPoint = function (x, y) {
    this._points[this._numPoints++] = {
        x: x,
        y: y
    };
};

WorleyNoise.prototype.getValue = function (x, y, k) {
    var k = k || 1,
        minDist,
        dist,
        minIdx,
        i;

    for (i = 0; i < this._numPoints; ++i) {
        this._points[i].selected = false;
    }

    for (j = 0; j < k; ++j) {
        minDist = Number.POSITIVE_INFINITY

        for (i = 0; i < this._numPoints; ++i) {
            dist = Math.pow(x - this._points[i].x, 2) + Math.pow(y - this._points[i].y, 2);

            if (dist < minDist && !this._points[i].selected) {
                minDist = dist;
                minIdx = i;
            }
        }

        this._points[minIdx].selected = true;
    }

    return Math.sqrt(minDist);
};

WorleyNoise.prototype.getMap = function (resolution) {
    var step = 1 / (resolution - 1),
        map = [],
        x,
        y;

    for (y = 0; y < resolution; ++y) {
        for (x = 0; x < resolution; ++x) {
            map[y * resolution + x] = this.getValue(x * step, y * step, 2);
        }
    }

    return map;
};

WorleyNoise.prototype._init = function () {
    var i;

    this._points = [];

    for (i = 0; i < this._numPoints; ++i) {
        this._points.push({
            x: Math.random(),
            y: Math.random()
        });
    }
};

module.exports = WorleyNoise;

},{}]},{},[1])(1)
});