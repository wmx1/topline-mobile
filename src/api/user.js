/**
 * 用户相关接口封装模块
 * 最佳实践：建议将所有请求都封装成一个一个的小函数，在需要的时候直接调用
 *   好处：1. 好维护，统一管理 2. 可重用
 * 遵循一个原则：不要直接在组件中发请求，都封装成函数进行调用
 */

import request from '@/utils/request'

export const login = ({ username, password }) => {
  return request({
    method: 'POST',
    url: 'http://nerisdev.csrc.gov.cn:3059/sys/admin/login',
    data: {
      username,
      password
    }
  })
}

/**
* 拉黑用户（加入黑名单）
*/
export const addBlacklist = userId => {
  // 指向其他逻辑
  return request({
    method: 'POST',
    url: '/app/v1_0/user/blacklists',
    data: {
      target: userId
    }
  })
}
/* 获取当前登录用户的个人信息 */
export const getCurrentUserInfo = () => {
  return request({
    method: 'GET',
    url: `/app/v1_0/user`
  })  
}
