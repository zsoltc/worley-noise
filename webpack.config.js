const path = require('path');


module.exports = {
    entry: './src/index.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'worley-noise.js',
        library: 'WorleyNoise',
        libraryTarget: 'umd',
        globalObject: 'typeof self !== "undefined" ? self : this',
    },
    module: {
        rules: [{
            test: /\.js$/,
            exclude: /node_modules/,
            use: {
                loader: 'babel-loader'
            }
        }]
    }
};
