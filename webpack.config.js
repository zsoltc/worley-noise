const path = require('path');


module.exports = {
    entry: './src/index.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'worley-noise.dev.js',
        library: 'WorleyNoise',
        libraryTarget: 'umd',
    }
};
