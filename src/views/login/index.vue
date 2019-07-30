<template>
  <div class="login-wrap">
    <van-nav-bar title="标题" left-arrow />
    <van-cell-group>
      <van-field
        name="username"
        v-model="user.username"
        v-validate="'required'"
        required
        clearable
        label="手机号"
        right-icon="question-o"
        placeholder="请输入账号"
        :error-message="errors.first('username')"
        @click-right-icon="$toast('请输入账号')"
      />
      <van-field name="password"
        v-validate="'required'"
        v-model="user.password" 
        :error-message="errors.first('password')"
        type="password" label="密码" 
        placeholder="请输入密码" 
        required
      />
      <van-button
        type="info"
        size="large"
        @click="handleLogin"
        loading-type="spinner"
        :loading="loginLoading"
      >登录</van-button>
    </van-cell-group>
  </div>
</template>

<script>
import { login } from "@/api/user";
import axios from "axios";
export default {
  name: "LoginIndex",
  data() {
    return {
      user: {
        username: "admin",
        password: "admin1234"
      },
      loginLoading: false
    };
  },
  created() {
    this.configCustomMessages();
  },
  // admin/admin1234
  // 接口 http://nerisdev.csrc.gov.cn:3059/sys/admin/login
  // json传递username和password
  methods: {
    async handleLogin() {
      this.loginLoading = true;
      try {
        const valid = await this.$validator.validate()
        console.log('验证', valid)
        if(!valid) {
          this.loginLoading = false
          return
        }
        const data = await login(this.user)
        console.log("loginData", data)
        if(data) {
          this.$store.commit('setUser', data)
          this.$router.push('/home')
        } else {
           this.$toast.fail('账号或密码错误')
           this.loginLoading = false
           return false 
        }
      } catch(err) {
        console.log(err)
        this.$toast.fail('登录失败')
      }
      this.loginLoading = false
    },

    configCustomMessages() {
      const dict = {
        custom: {
          username: {
            required: "账号不能为空"
          },
          password: {
            required: "密码不能为空"
          }
        }
      };

      // Validator.localize("en", dict)
      // or use the instance method
      this.$validator.localize("en", dict);
    }
  }
};
</script>

<style lang="less" scoped>
.van-button--large {
  letter-spacing: 20px;
}
</style>
