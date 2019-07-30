import Vue from 'vue'
import Vant, {Lazyload} from 'vant'
import 'vant/lib/index.css'
import 'amfe-flexible'
import VeeValidate from 'vee-validate'
import dayjs from 'dayjs'
import 'dayjs/locale/zh-cn' //加载中文语言包
import relativeTime from 'dayjs/plugin/relativeTime'

import App from './App.vue'
import router from './router'
import store from './store'

import './styles/index.less'
Vue.prototype.$sleep = time => {
  return new Promise((resolve, reject) => {
    window.setTimeout(() => {
      resolve()
    }, time)
  })
}
dayjs.locale('zh-cn')
dayjs.extend(relativeTime)

// 注册一个全局过滤器
Vue.filter('relativeTime', value => {
  return dayjs().from(value)
})

Vue.config.productionTip = false
Vue.use(Vant)
Vue.use(VeeValidate)
Vue.use(Lazyload);
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
