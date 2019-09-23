/* 插件的作用：
    注册全局组件、自定义指令、过滤器、扩展原型对象成员 */

import store from '@/store'
import { Dialog } from 'vant'
import router from '../router'
// import router from ''
function checkLogin () {
    const { user } = store.state
    // 如果用户已登录
    if(user) {
        return true
    } 

    // 没有登录，提示用户: "该操作需要登录，确定登录吗？"

    Dialog.confirm({
        title: '登录',
        message: '该操作需要登录，确定登录吗？'
    }).then(() => {
        router.push({
            name: 'login',
            query: {
                redirect: router.currentRoute.fullPath
            }
        })
    }).catch(() => {

    })
}

export default {
   install(Vue, option) {
       console.log('install 方法被调用了')
       Vue.prototype.$checkLogin = checkLogin
   }
}

