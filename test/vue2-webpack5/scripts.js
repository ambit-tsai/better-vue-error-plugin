const webpack = require('webpack');
const path = require('path');
const VueBetterErrorPlugin = require('../../');


webpack({
    mode: 'development',
    entry: path.resolve(__dirname, '../vue2-webpack4/src/main.js'),
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