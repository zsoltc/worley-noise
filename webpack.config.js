module.exports = {
    entry: './src/worley-noise.js',
    output: {
      libraryTarget: "umd",
      library: "WorleyNoise",
      path: './bin',
      filename: 'worley-noise.dev.js'
    }
};
