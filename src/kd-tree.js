class KDTree {
    constructor(points, dim=2) {
        this._dim = dim;
        this._root = this._buildTree(points);
    }

    _buildTree(points) {
        const tree = (pts, depth) => {
            const node = {};
            const midIdx = parseInt(pts.length / 2);
            const prop = 'xyz'[depth % this._dim];

            pts.sort((p1, p2) => p1[prop] - p2[prop]);
            node.value = pts[midIdx];

            node.left = midIdx === 0 ? null :
                midIdx === 1 ? { value: pts[0] } :
                tree(pts.slice(0, midIdx), depth + 1);

            node.right = midIdx === pts.length - 1 ? null :
                midIdx === pts.length - 2 ? { value: pts[pts.length - 1] } :
                tree(pts.slice(midIdx + 1), depth + 1);

            return node;
        };

        return tree(points, 0);
    }
}

const pts = new Array(1000);
for (let i = 0; i < pts.length; i++) {
    pts[i] = { x: Math.random(), y: Math.random() };
}

const tree = new KDTree(pts);


export default KDTree;
