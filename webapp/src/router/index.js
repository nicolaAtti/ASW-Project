import Vue from 'vue'
import VueRouter from 'vue-router'
import LoginPage from "../components/LoginPage";
import Register from "../components/Register";
import HomePage from "../components/HomePage";

Vue.use(VueRouter)

  const routes = [
  {
    path: '/login',
    name: 'LoginPage',
    component: LoginPage
  },
  {
    path: '/register',
    name: 'Register',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: Register
  },
    {
      path: '/home',
      name: 'HomePage',
      component: HomePage
    }

]

const router = new VueRouter({
  routes
})

export default router
