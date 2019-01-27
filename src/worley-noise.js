import Alea from 'alea';


class WorleyNoise {
    constructor(numPoints, seed=Math.random()) {
        this._rng = new Alea(seed);
        this._points = [];

        for (let i = 0; i < numPoints; i++) {
            this._points.push({
                x: this._rng(),
                y: this._rng(),
                z: this._rng(),
            });
        }
    }

    addPoint(x, y, z=0) {
        this._points.push({ x, y, z });
    }

    getEuclidean(x, y, k) {
        return Math.sqrt(this._calculateValue(x, y, k, euclidean));
    }

    getManhattan(x, y, k) {
        return this._calculateValue(x, y, k, manhattan);
    }

    getMap(resolution, callback) {
        var step = 1 / (resolution - 1),
            map = [],
            that = this,
            x,
            y;

        callback = callback || function (e, m) {
            return e(1);
        };

        function e(k) {
            return Math.sqrt(that._calculateValue(x * step, y * step, k, euclidean));
        }

        function m(k) {
            return that._calculateValue(x * step, y * step, k, manhattan);
        }

        for (y = 0; y < resolution; ++y) {
            for (x = 0; x < resolution; ++x) {
                map[y * resolution + x] = callback(e, m);
            }
        }

        return map;
    }

    getNormalizedMap(resolution, callback) {
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
    }

    _calculateValue(x, y, k, distFn) {
        var minDist,
            dist,
            minIdx,
            i,
            j;

        for (i = 0; i < this._points.length; ++i) {
            this._points[i].selected = false;
        }

        for (j = 0; j < k; ++j) {
            minDist = Number.POSITIVE_INFINITY

            for (i = 0; i < this._points.length; ++i) {
                dist = distFn(x - this._points[i].x, y - this._points[i].y);

                if (dist < minDist && !this._points[i].selected) {
                    minDist = dist;
                    minIdx = i;
                }
            }

            this._points[minIdx].selected = true;
        }

        return minDist;
    }
}

function euclidean(dx, dy) {
    return dx * dx + dy * dy;
}

function manhattan(dx, dy) {
    return Math.abs(dx) + Math.abs(dy);
}

export default WorleyNoise;
