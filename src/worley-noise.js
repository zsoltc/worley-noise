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
