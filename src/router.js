import Vue from 'vue'
import Router from 'vue-router'
import AuthLayout from '@/layout/AuthLayout'
import DashboardLayout from '@/layout/DashboardLayout'
Vue.use(Router)
const router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      redirect: 'dashboard',
      component: DashboardLayout,
      children: [
        {
          path: '/',
          name: 'users',
          component: () => import(/* webpackChunkName: "demo" */ './views/Tables.vue'),
          meta: { auth: true },
        },
        {
          path: '/users/new',
          name: 'new',
          component: () => import(/* webpackChunkName: "demo" */ './views/User.vue'),
          meta: { auth: true }
        }
      ]
    },
    {
      path: '/',
      redirect: 'login',
      component: AuthLayout,
      children: [
        {
          path: '/login',
          name: 'login',
          component: () => import(/* webpackChunkName: "demo" */ './views/Login.vue')
        }
      ]
    }
  ]
})
router.beforeEach((to, from, next) => {
  const requiresAuth = to.matched.some(route => route.meta.auth)
  const authed = sessionStorage.getItem('access-token')
  const signInObject = { name: 'login', query: { redirect: to.fullPath } }
  if (requiresAuth && authed === null) {
    next(signInObject)
  } else if (requiresAuth && authed) {
    return next()
  } else {
    next()
  }
})

export default router
