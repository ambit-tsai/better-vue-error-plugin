# Better Vue Error Plugin
🔌 A Webpack plugin make the errors of Vue concise

## Effect
### Before
![before](https://raw.githubusercontent.com/ambit-tsai/better-vue-error-plugin/main/imgs/before.png)

### After
Concise message

![after01](https://raw.githubusercontent.com/ambit-tsai/better-vue-error-plugin/main/imgs/after01.png)

Expand to view details

![after02](https://raw.githubusercontent.com/ambit-tsai/better-vue-error-plugin/main/imgs/after02.png)

## Installation
```
npm i -D better-vue-error-plugin
```

## Usage
```javascript
// "webpack.config.js"
const BetterVueErrorPlugin = require('better-vue-error-plugin');

module.exports = {
    // ...
    plugins: [
        new BetterVueErrorPlugin(),
        // ...
    ],
}
```

## Dependency
1. **@babel/traverse**: ^7.0.0
1. **webpack**: >=4.0.0
1. **vue**: >2.4.0

## Parameter
|Property|Type|Default|Explanation|
|-|-|-|-|
|moduleName|string|"vue"|The name of the target module|
Example
```javascript
new BetterVueErrorPlugin({
    moduleName: 'vue',
});
```

## Contact
1. *WeChat*: ambit_tsai
1. *QQ Group*: 663286147
1. *E-mail*: ambit_tsai@qq.com