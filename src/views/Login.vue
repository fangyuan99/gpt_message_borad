<template>
  <div class="login-container">
    <el-form
      ref="loginFormRef"
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
import { onMounted } from "vue";
import { useStore } from "vuex";
import * as api from "../api";
import router from "../router";
import { useStorage } from "@vueuse/core";

export default {
  name: "Login",
  setup() {
    const user = useStorage("user");
    //当前组件可见的时候，如果localStorage中有user，就直接跳转到首页
    onMounted(() => {
      if (user.value!=="undefined") {
        console.log("已登录", user.value);
        router.push("/");
      }
    });
    const store = useStore();

    const loginForm = {
      username: "",
      password: "",
    };

    const rules = {
      username: [{ required: true, message: "请输入用户名", trigger: "blur" }],
      password: [{ required: true, message: "请输入密码", trigger: "blur" }],
    };

    const login = async () => {
      try {
        const { data } = await api.login(
          loginForm.username,
          loginForm.password
        );
        store.commit("setUser", {
          username: loginForm.username,
          password: loginForm.password,
        });
        user.value=  JSON.stringify({
            username: loginForm.username,
            password: loginForm.password,
          })
        router.push("/");
        window.location.reload();
      } catch (error) {
        console.log(error);
        alert("登录失败，请检查用户名和密码");
      }
    };

    return {
      loginForm,
      rules,
      login,
    };
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
