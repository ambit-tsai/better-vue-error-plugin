const path = require('path');


module.exports = class Plugin {
    options = {
        moduleName: 'vue',
    };

    constructor(options = {}) {
        Object.assign(this.options, options);
    }

    apply(compiler) {
        // Inject a loader
        compiler.options.module.rules.push({
            test: /\.js$/,
            loader: path.resolve(__dirname, './loader.js'),
            options: this.options,
        });
    }
}
