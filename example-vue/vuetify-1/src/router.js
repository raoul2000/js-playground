import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import About from './components/About.vue'
import List from './components/List.vue'
import Settings from './components/Settings.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: About
    },
    {
      path: '/list',
      name: 'list',
      component: List
    },
    {
      path: '/settings',
      name: 'settings',
      component: Settings
    }
  ]
})
