import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './plugins/element.js'
import './assets/styles/index.styl'
import './vendor/codemirror'
import './assets/styles/custom.css' // 自定义样式
import 'highlight.js/styles/github.css' //样式文件
import mavonEditor from 'mavon-editor' // 文本编辑器
import 'mavon-editor/dist/css/index.css'

Vue.use(mavonEditor)
Vue.config.productionTip = false;
//引入常量
Vue.prototype.$const = require('./utils/const').default;
Vue.prototype.$utils = require('./utils/index').default;
// Vue.prototype.$store = store

new Vue({
  router,
  store,
  render: function (h) { return h(App) }
}).$mount('#app')
