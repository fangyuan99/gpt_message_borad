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
        <el-menu-item index="/login">
          <router-link to="/login">登录</router-link>
        </el-menu-item>
      </el-menu>
      <div style="width: 100%; height: 300px">
        <router-view class="router-view"></router-view>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "App",
  data() {
    return {
      isCollapse: true,
      menuMode: "horizontal",
    };
  },
  created() {
    window.addEventListener("resize", this.handleResize);
    this.handleResize();
  },
  methods: {
    handleResize() {
      if (window.innerWidth <= 768) {
        this.isCollapse = true;
        this.menuMode = "vertical";
      } else {
        this.isCollapse = false;
        this.menuMode = "horizontal";
      }
    },
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
