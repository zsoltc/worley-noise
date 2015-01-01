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

WorleyNoise.prototype.getValue = function (x, y, cfg) {
    var minDist,
        dist,
        minIdx,
        i,
        j;

    cfg = cfg || {};
    cfg.k = cfg.k || 1;
    cfg.distFn = cfg.distFn || function (dx, dy) {
        return dx * dx + dy * dy;
    };

    for (i = 0; i < this._numPoints; ++i) {
        this._points[i].selected = false;
    }

    for (j = 0; j < cfg.k; ++j) {
        minDist = Number.POSITIVE_INFINITY

        for (i = 0; i < this._numPoints; ++i) {
            dist = cfg.distFn(x - this._points[i].x, y - this._points[i].y);

            if (dist < minDist && !this._points[i].selected) {
                minDist = dist;
                minIdx = i;
            }
        }

        this._points[minIdx].selected = true;
    }

    return minDist;
};

WorleyNoise.prototype.getMap = function (resolution, callback) {
    var step = 1 / (resolution - 1),
        map = [],
        that = this,
        x,
        y;

    callback = callback || function (e, m) {
        return e(1);
    };

    function e(k) {
        return Math.sqrt(that.getValue(x * step, y * step, {
            k: k,
            distFn: function (dx, dy) {
                return dx * dx + dy * dy;
            }
        }));
    }

    function m(k) {
        return that.getValue(x * step, y * step, {
            k: k,
            distFn: function (dx, dy) {
                return Math.abs(dx) + Math.abs(dy);
            }
        });
    }

    for (y = 0; y < resolution; ++y) {
        for (x = 0; x < resolution; ++x) {
            map[y * resolution + x] = callback(e, m);
        }
    }

    return map;
};

WorleyNoise.prototype.getNormalizedMap = function (resolution, callback) {
    var map = this.getMap(resolution, callback),
        min = Number.POSITIVE_INFINITY,
        max = Number.NEGATIVE_INFINITY,
        scale,
        i;

    for (i = 0; i < map.length; ++i) {
        min = Math.min(min, map[i]);
        max = Math.max(max, map[i]);
    }

    scale = 1 / (max - min);

    for (i = 0; i < map.length; ++i) {
        map[i] = (map[i] - min) * scale;
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
