call browserify src/worley-noise.js --standalone WorleyNoise > bin/worley-noise.dev.js
call uglifyjs bin/worley-noise.dev.js -o bin/worley-noise.min.js -c -m
