const webpack = require('webpack');
const BetterVueErrorPlugin = require('../../');


webpack({
    mode: 'development',
    entry: `${__dirname}/src/main.js`,
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