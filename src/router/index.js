import Vue from 'vue'
import Router from 'vue-router'
import Login from '../views/login'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'login',
      component: Login
    },
    {
      path: '/home',
      name: 'home',
      component: () => import('../views/home')
    },
    {
      path: '/search',
      name: 'search',
      component: () => import('@/views/search')
    },
    {
      path: '/search-result/:q',
      name: 'search-result',
      component: () => import('@/views/search-result')
    },
    {
      path: '/article/:articleId',
      name: 'article',
      component: () => import('@/views/article')
    },
    {
      path: '/my',
      name: 'my',
      component: () => import('@/views/my')
    }
    // {
    //   path: '/about',
    //   name: 'about',
    //   // route level code-splitting
    //   // this generates a separate chunk (about.[hash].js) for this route
    //   // which is lazy-loaded when the route is visited.
    //   component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
    // }
  ]
})
