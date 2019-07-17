<template>
  <div class="login-wrap">
    <van-nav-bar title="标题" left-arrow />
    <van-cell-group>
      <van-field
        v-model="user.mobile"
        required
        clearable
        label="手机号"
        right-icon="question-o"
        placeholder="请输入手机号"
        @click-right-icon="$toast('请输入手机号')"
      />

      <van-field v-model="user.code" type="code" label="验证码" placeholder="请输入验证码" required />
      <van-button type="info" size="large" @click="handleLogin" loading-type="spinner" :loading="loginLoading">登录</van-button>
    </van-cell-group>
  </div>
</template>

<script>
import { login } from '@/api/user'
export default {
  name: "LoginIndex",
  data() {
    return {
        user: {
            mobile: '18801185985',
            code: '123456'
        },
        loginLoading: false
    }
  },
  methods: {
      handleLogin() {

      }
  }
}
</script>

<style>
.van-button--large {
    letter-spacing: 20px;
}
</style>
