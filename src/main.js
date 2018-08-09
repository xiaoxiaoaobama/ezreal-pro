import Vue from 'vue'
import Antd from 'ant-design-vue'
import router from './router'
import store from './store'
import App from './App.vue'
import 'ant-design-vue/dist/antd.css'
import './index.less'

Vue.use(Antd)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
