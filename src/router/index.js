import Vue from 'vue'
import VueRouter from 'vue-router'
import Layout from '../views/Layout'
import Login from '../views/Login'
import Error from '../views/Error/404.vue'

Vue.use(VueRouter)

const routes = [{
    path: '/',
    name: 'Layout',
    component: Layout,
    children: [{
        path: 'product',
        name: 'Product',
        component: () => import('../views/Product/index.vue')
      },
      {
        path: 'params',
        name: 'Params',
        component: () => import('../views/Params/index.vue')
      },
      {
        path: 'advert',
        name: 'Advert',
        component: () => import('../views/Advert/index.vue')
      },
      {
        path: 'center',
        name: 'Center',
        component: () => import('../views/Center/index.vue')
      },

    ],
    meta: {
      isLogin: true
    }
  },
  {
    path: '/login',
    name: 'Login',
    component: Login

  },
  {
    path: '/*',
    name: 'Error',
    component: Error

  }

]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})
import store from '../store'
router.beforeEach((to, from, next) => {
  if (to.matched.length > 0 && !to.matched.some(record => record.meta.isLogin)) {
    next();
  }else{
    if(store.state.loginModule.userinfo.token){
      next();
    }else{
      next('/login');
    }

  }

})

export default router