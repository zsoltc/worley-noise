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
                z: dim === 3 ? this._rng() : 0,
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
        const step = 1 / (resolution - 1);
        const map = [];
        let x, y;

        callback = callback || function (e, m) {
            return e(1);
        };

        const e = (k) => Math.sqrt(this._calculateValue(x * step, y * step, k, euclidean));
        const m = (k) => this._calculateValue(x * step, y * step, k, manhattan);

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
        let minDist;

        this._points.forEach(p => {
            p.selected = false;
        });

        for (let j = 0; j < k; ++j) {
            let minIdx;
            minDist = Number.POSITIVE_INFINITY;

            for (let i = 0; i < this._points.length; ++i) {
                const p = this._points[i];
                const dist = distFn(x - p.x, y - p.y);

                if (dist < minDist && !p.selected) {
                    minDist = dist;
                    minIdx = i;
                }
            }

            this._points[minIdx].selected = true;
        }

        return minDist;
    }
}

const euclidean = (dx, dy) => dx * dx + dy * dy;
const manhattan = (dx, dy) => Math.abs(dx) + Math.abs(dy);

export default WorleyNoise;
