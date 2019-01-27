import Alea from 'alea';


class WorleyNoise {
    constructor(numPoints, seed=Math.random(), dim=2) {
        this._dim = dim;
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

    addPoint(x, y, z=this._rng()) {
        this._points.push({ x, y, z });
    }

    getEuclidean(x, y, k) {
        return Math.sqrt(this._calculateValue(x, y, k, euclidean));
    }

    getManhattan(x, y, k) {
        return this._calculateValue(x, y, k, manhattan);
    }

    getMap(resolution, callback) {
        const step = 1 / (resolution - 1);
        const map = [];
        let x, y;

        callback = callback || function (e, m) {
            return e(1);
        };

        const e = (k) => {
            return Math.sqrt(this._calculateValue(x * step, y * step, k, euclidean));
        };

        const m = (k) => {
            return this._calculateValue(x * step, y * step, k, manhattan);
        };

        for (y = 0; y < resolution; ++y) {
            for (x = 0; x < resolution; ++x) {
                map[y * resolution + x] = callback(e, m);
            }
        }

        return map;
    }

    getNormalizedMap(resolution, callback) {
        const map = this.getMap(resolution, callback);
        let min = Number.POSITIVE_INFINITY;
        let max = Number.NEGATIVE_INFINITY;

        map.forEach(v => {
            min = Math.min(min, v);
            max = Math.max(max, v);
        });

        let scale = 1 / (max - min);
        return map.map(v => (v - min) * scale);
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
