const webpack = require('webpack');
const VueBetterErrorPlugin = require('../../');


webpack({
    mode: 'development',
    entry: `${__dirname}/src/main.js`,
    output: {
        path: `${__dirname}/dist`,
        filename: 'index.js',
    },
    plugins: [
        new VueBetterErrorPlugin(),
    ],
}, (err, stats) => {
    if (err) {
        console.error(err, stats);
    }
});