import Alea from 'alea';


class WorleyNoise {
    constructor(config) {
        config = config || {};
        if (config.dim !== 2 && config.dim !== 3 && config.dim !== undefined)
            throw '"dim" can be 2 or 3';

        this._dim = config.dim || 2;
        this._rng = new Alea(config.seed || Math.random());
        this._points = [];

        for (let i = 0; i < config.numPoints; i++) {
            this._points.push({
                x: this._rng(),
                y: this._rng(),
                z: this._rng(),
            });
        }
    }

    addPoint(coord) {
        this._points.push(coord);
    }

    getEuclidean(coord, k) {
        return Math.sqrt(this._calculateValue(coord, k, euclidean));
    }

    getManhattan(coord, k) {
        return this._calculateValue(coord, k, manhattan);
    }

    renderImage(resolution, config) {
        config = config || {};
        const step = 1 / (resolution - 1);
        const img = [];
        const callback = config.callback || ((e, m) => e(1));
        let x, y;

        const e = k => Math.sqrt(this._calculateValue({
            x: x * step,
            y: y * step,
            z: config.z || 0,
        }, k, euclidean));

        const m = k => this._calculateValue({
            x: x * step,
            y: y * step,
            z: config.z || 0,
        }, k, manhattan);

        for (y = 0; y < resolution; ++y) {
            for (x = 0; x < resolution; ++x) {
                img[y * resolution + x] = callback(e, m);
            }
        }

        if (!config.normalize)
            return img;

        let min = Number.POSITIVE_INFINITY;
        let max = Number.NEGATIVE_INFINITY;

        img.forEach(v => {
            min = Math.min(min, v);
            max = Math.max(max, v);
        });

        let scale = 1 / (max - min);
        return img.map(v => (v - min) * scale);
    }

    _calculateValue(coord, k, distFn) {
        let minDist;
        this._points.forEach(p => { p.selected = false; });

        for (let j = 0; j < k; ++j) {
            let minIdx;
            minDist = Number.POSITIVE_INFINITY;

            for (let i = 0; i < this._points.length; ++i) {
                const p = this._points[i];
                const dz = this._dim === 2 ? 0 : coord.z - p.z;
                const dist = distFn(coord.x - p.x, coord.y - p.y, dz);

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

const euclidean = (dx, dy, dz) => dx * dx + dy * dy + dz * dz;
const manhattan = (dx, dy, dz) => Math.abs(dx) + Math.abs(dy) + Math.abs(dz);

export default WorleyNoise;
