import Vue from 'vue';
import App from './App';


Vue.config.devtools = true;
// Vue.config.warnHandler = function name(a,b,c) {
//     console.log(a,b,c);
// }


new Vue({
    el: '#app',
    render: h => h(App),
});
