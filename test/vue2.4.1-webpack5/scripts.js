const webpack = require('webpack');
const path = require('path');
const BetterVueErrorPlugin = require('../../');


webpack({
    mode: 'development',
    entry: path.resolve(__dirname, '../vue2.4.1-webpack4/src/main.js'),
    output: {
        path: `${__dirname}/dist`,
        filename: 'index.js',
    },
    plugins: [
        new BetterVueErrorPlugin(),
    ],
}, (err, stats) => {
    if (err) {
        console.error(err, stats);
    }
});