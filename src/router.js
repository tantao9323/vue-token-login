import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import store from './store'

Vue.use(Router)

const router = new Router({
  mode: 'history',
  routes: [{
      path: '/login',
      name: 'login',
      component: () =>
        import ('./views/Login.vue'),
      meta: {
        auth: false,
        title: 'Login'
      }
    },
    {
      path: '/',
      name: 'home',
      component: Home,
      meta: {
        title: 'Home'
      }
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () =>
        import ( /* webpackChunkName: "about" */ './views/About.vue'),
      meta: {
        title: 'About'
      }
    },
    {
      path: '*',
      name: 'notfound',
      component: () =>
        import ('./views/NotFound.vue'),
      meta: {
        title: '404-NotFound'
      }
    }
  ]
})

router.beforeEach((to, from, next) => {
  const {
    auth = true
  } = to.meta;
  if (to.meta.title) {
    document.title = to.meta.title;
  }
  const isLogin = Boolean(store.state.token);
  if (auth && !isLogin) {
    store.dispatch('logout')
    next({
      path: '/login',
      query: {
        redirect: to.fullPath
      }
    })
  } else if (!auth && isLogin) {
    next({
      path: from.fullPath
    })
  } else {
    next()
  }
})

export default router;