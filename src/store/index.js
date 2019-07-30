import Vue from 'vue'
import Vuex from 'vuex'

import { saveUser } from '@/utils/auth'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: {}
  },
  mutations: {
    // 登录成功，调用mutation更新容器中的user状态
    setUser (state, data) {
      console.log('state---data', data)
      state.user = data
      saveUser(state.user)
    }
  },
  actions: {
    
  }
})
