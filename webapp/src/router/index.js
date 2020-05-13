import Vue from 'vue'
import VueRouter from 'vue-router'
import LoginPage from "../components/LoginPage";
import Register from "../components/Register";
import HomePage from "../components/HomePage";
import ProfilePage from "../components/ProfilePage";

Vue.use(VueRouter)

  const routes = [
    {
      path: "/login",
      name: 'LoginPage',
      component: LoginPage
    },
    {
      path: '/register',
      name: 'Register',
      component: Register
    },
    {
      path: '/home',
      name: 'HomePage',
      component: HomePage
    },
    {
      path: '/home/profile',
      name: 'ProfilePage',
      component: ProfilePage
    }
]

const router = new VueRouter({
  routes
})

export default router
