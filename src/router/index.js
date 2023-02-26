import { createRouter, createWebHashHistory } from "vue-router";
import Login from "../views/Login.vue";
import MessageBoard from "../views/MessageBoard.vue";
import About from "../views/About.vue";

const routes = [
  {
    path: "/",
    name: "Welcome",
    component: MessageBoard,
  },
  {
    path: "/login",
    name: "Login",
    component: Login,
  },
  {
    path: "/message-board",
    name: "MessageBoard",
    component: MessageBoard,
  },
  {
    path: "/about",
    name: "About",
    component: About,
  },
];

const router = createRouter({
  // 4. 内部提供了 history 模式的实现。为了简单起见，我们在这里使用 hash 模式。
  history: createWebHashHistory(),
  routes, // `routes: routes` 的缩写
});

export default router;
