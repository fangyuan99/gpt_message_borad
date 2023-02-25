<template>
  <div class="login-container">
    <el-form
      ref="loginForm"
      :rules="rules"
      :model="loginForm"
      label-width="80px"
    >
      <el-form-item label="用户名" prop="username">
        <el-input
          v-model.trim="loginForm.username"
          autocomplete="off"
        ></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input
          v-model.trim="loginForm.password"
          autocomplete="off"
          show-password
        ></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="login">登录</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import { mapMutations } from "vuex";

import { login } from "../api";

export default {
  name: "Login",
  data() {
    return {
      loginForm: {
        username: "",
        password: "",
      },
      rules: {
        username: [
          { required: true, message: "请输入用户名", trigger: "blur" },
        ],
        password: [{ required: true, message: "请输入密码", trigger: "blur" }],
      },
    };
  },
  methods: {
    ...mapMutations(["setUser"]),
    async login() {
      this.$refs.loginForm.validate(async (valid) => {
        if (valid) {
          try {
            const { data } = await login(
              this.loginForm.username,
              this.loginForm.password
            );
            this.setUser({
              username: this.loginForm.username,
              password: this.loginForm.password,
            });
            this.$router.push("/");
          } catch (error) {
            console.log(error);
            alert("登录失败，请检查用户名和密码");
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
  height: 40vh;
}

.el-form {
  max-width: 400px;
  margin: 0 auto;
  background-color: #fff;
  padding: 20px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.2);
  border-radius: 5px;
}

.el-form-item__label {
  font-weight: bold;
}

.el-input {
  width: 100%;
  border-radius: 5px;
}

.el-button {
  width: 100%;
  margin-top: 20px;
  border-radius: 5px;
}

</style>
