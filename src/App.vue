<template>
  <div class="app">
    <div class="main">
      <router-view class="router-view"></router-view>
    </div>
    <div class="nav">
      <el-menu router :default-active="$route.path">
        <el-menu-item index="/">首页</el-menu-item>
        <el-menu-item index="/login">登录</el-menu-item>
        <el-menu-item index="/message-board">留言板</el-menu-item>
      </el-menu>
    </div>
  </div>
</template>

<style>
.app {
  height: 100vh;
  display: flex;
  flex-direction: column;
}

.main {
  flex: 1;
  overflow-y: auto;
}

.nav {
  position: fixed;
  bottom: 0;
  width: 100%;
  background-color: #f5f5f5;
  box-shadow: 0px -1px 2px rgba(0, 0, 0, 0.2);
}

.router-view {
  padding: 20px;
  max-width: 800px;
  margin: 0 auto;
}
</style>
