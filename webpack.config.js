const path = require('path');


module.exports = {
    entry: './src/index.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'worley-noise.js',
        library: 'WorleyNoise',
        libraryTarget: 'umd',
    }
};
