<template>
  <div class="app">
    <div class="header">
      <h1>留言板</h1>
    </div>
    <div class="main">
      <el-menu :collapse="isCollapse" :mode="menuMode" style="width: 100vw">
        <el-menu-item index="/">
          <router-link to="/message-board">留言板</router-link>
        </el-menu-item>
        <el-menu-item index="/login" @click="logInOrOut">
          {{ isLoggedIn ? "退出登录" : "登录" }}
        </el-menu-item>
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
import { useStorage } from '@vueuse/core'


export default {
  name: "App",
  setup() {
    const store = useStore();
    const router = useRouter();
    const isCollapse = ref(true);
    const menuMode = ref("horizontal");

    const isLoggedIn = ref(false);

    const handleResize = () => {
      if (window.innerWidth <= 768) {
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
      if (user.value) {
        isLoggedIn.value = true;
      }
      window.addEventListener("resize", handleResize);
    });

    const logout = () => {
      user.value = null;
      store.commit("setUser", null);
      isLoggedIn.value = false;
      router.push("/");
      // 刷新页面
      // window.location.reload();
    };

    const logInOrOut = () => {
      if (isLoggedIn.value) {
        console.log("logout");
        logout();
      } else {
        router.push("/login");
      }
    };

    return {
      isCollapse,
      menuMode,
      isLoggedIn,
      logout,
      logInOrOut,
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
}

.header {
  background-color: #409eff;
  padding: 20px;
  text-align: center;
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
