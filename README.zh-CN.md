简体中文 | [English](https://github.com/ambit-tsai/better-vue-error-plugin)


# Better Vue Error Plugin
🔌 使 Vue 错误变得简洁的 Webpack 插件


## 效果
### 使用前
![before](https://gitee.com/ambit/better-vue-error-plugin/raw/main/imgs/before.png)

### 使用后
简洁的信息

![after01](https://gitee.com/ambit/better-vue-error-plugin/raw/main/imgs/after01.png)

展开以查看详情

![after02](https://gitee.com/ambit/better-vue-error-plugin/raw/main/imgs/after02.png)


## 安装
```
npm i -D better-vue-error-plugin
```


## 用法
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


## 依赖
1. **@babel/traverse**: ^7.0.0
1. **webpack**: >=4.0.0
1. **vue**: >2.4.0


## 参数
|属性|类型|默认值|说明|
|-|-|-|-|
|moduleName|string|"vue"|目标模块的名称|

示例
```javascript
new BetterVueErrorPlugin({
    moduleName: 'vue',
});
```


## 联系
1. *微信*: ambit_tsai
1. *QQ群*: 663286147
1. *邮箱*: ambit_tsai@qq.com
