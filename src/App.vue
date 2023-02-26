<template>
  <div class="app">
    <div class="header">
      <h1>GPT留言板</h1>
      <Welcome :username="isLoggedIn ? JSON.parse(user).username : ''" />
    </div>
    <div class="main">
      <el-menu :collapse="isCollapse" :mode="menuMode" style="width: 100vw">
        <el-menu-item index="/" @click="goToMessageBoard">
          GPT留言板
        </el-menu-item>
        <el-menu-item index="/login" @click="logInOrOut">
          {{ isLoggedIn ? "退出登录" : "登录" }}
        </el-menu-item>
        <el-menu-item index="/about" @click="goToAbout"> 关于 </el-menu-item>
      </el-menu>
      <div style="width: 100%; height: 300px">
        <router-view class="router-view"></router-view>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, watchEffect, onMounted, computed } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import { useStorage } from "@vueuse/core";
import Welcome from "./views/Welcome.vue";

export default {
  name: "App",
  components: {
    Welcome,
  },
  setup() {
    const router = useRouter();
    const isCollapse = ref(true);
    const menuMode = ref("horizontal");

    const isLoggedIn = ref(false);

    const handleResize = () => {
      if (window.innerWidth <= 350) {
        isCollapse.value = true;
        menuMode.value = "vertical";
      } else {
        isCollapse.value = false;
        menuMode.value = "horizontal";
      }
    };
    const user = useStorage("user");

    onMounted(() => {
      handleResize();
      if (user.value !== "undefined") {
        isLoggedIn.value = true;
      }
      window.addEventListener("resize", handleResize);
      document.querySelector("h1").addEventListener("click", () => {
        //跳转到首页
        window.location.href = "/";
      });
    });

    const logout = () => {
      user.value = "undefined";
      isLoggedIn.value = false;
      router.push("/");
      // 刷新页面
      // window.location.reload();
    };

    const goToMessageBoard = () => {
      router.push("/message-board");
    };

    const goToAbout = () => {
      router.push("/about");
    };

    const logInOrOut = () => {
      if (isLoggedIn.value) {
        logout();
      } else {
        router.push("/login");
      }
    };

    return {
      isCollapse,
      menuMode,
      isLoggedIn,
      user,
      logout,
      logInOrOut,
      goToMessageBoard,
      goToAbout,
    };
  },
};
</script>

<style>
.app {
  height: 100%;
  /* display: flex; */
  flex-direction: column;
  margin: 0 auto;
  max-width: 740px;
  width: 100%;
}

.header {
  background-color: #409eff;
  padding: 10px;
  text-align: center;
  position: relative
}

.header h1 {
  margin: 0;
  color: #fff;
  font-size: 24px;
}

.main {
  flex: 1;
  /* display: flex; */
  height: 100%;
}

@media screen and (max-width: 768px) {
  .main {
    flex-direction: column;
  }
}
</style>
