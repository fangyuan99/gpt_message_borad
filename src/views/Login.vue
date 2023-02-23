<template>
    <div class="login-container">
      <el-form ref="loginForm" :rules="rules" :model="loginForm" label-width="80px">
        <el-form-item label="用户名" prop="username">
          <el-input v-model.trim="loginForm.username" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input v-model.trim="loginForm.password" autocomplete="off" show-password></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="login">登录</el-button>
        </el-form-item>
      </el-form>
    </div>
  </template>
  
  <script>
 //引入api中所有的接口
  import * as api from '../api';
  
  export default {
    name: 'Login',
    data() {
      return {
        loginForm: {
          username: '',
          password: '',
        },
        rules: {
          username: [
            { required: true, message: '请输入用户名', trigger: 'blur' },
          ],
          password: [
            { required: true, message: '请输入密码', trigger: 'blur' },
          ],
        },
      };
    },
    methods: {
      login() {
        this.$refs.loginForm.validate(async valid => {
          if (valid) {
            try {
              const { data } = await api.login(this.loginForm);
              // 登录成功后的逻辑
            } catch (error) {
              // 登录失败后的逻辑
              console.log(api.login);
            }
          } else {
            return false;
          }
        });
      },
    },
  };
  </script>
  
  <style scoped>
  .login-container {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
  }
  </style>
  