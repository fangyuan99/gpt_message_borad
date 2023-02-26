import { createRouter, createWebHistory } from 'vue-router'
import Welcome from '../views/Welcome.vue'
import Login from '../views/Login.vue'
import MessageBoard from '../views/MessageBoard.vue'
import About from '../views/About.vue'

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
  }
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

export default router
