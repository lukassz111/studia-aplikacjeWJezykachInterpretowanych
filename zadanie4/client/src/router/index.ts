import Vue from 'vue'
import VueRouter, { Route, RouteConfig } from 'vue-router'
import { AuthService } from '@/services/AuthService'
import Home from '../views/Home.vue'
import { Util } from '@/class/Util'
import { ErrorHandler, NavigationGuardNext } from 'vue-router/types/router'

Vue.use(VueRouter)

const routes: Array<RouteConfig> = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    meta: {
      everyone: true
    }
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import(/* webpackChunkName: "products" */ '../views/Login.vue'),
    meta: {
      everyone: true,
    }
  },
  {
    path: '/products',
    name: 'Products',
    component: () => import(/* webpackChunkName: "products" */ '../views/Products.vue'),
    meta: {
      everyone: false,
      mustBeLoggedIn: true
    }
  }
]

const router = new VueRouter({
  routes
})
router.beforeEach((to: Route,from: Route,next:NavigationGuardNext<Vue>) => {
  
  let everyone = Util.getValue<boolean>(to.meta,'everyone',false)
  let mustBeLoggedIn = Util.getValue<boolean>(to.meta,'mustBeLoggedIn',false)
  
  if(everyone) {//If everyone then every can open this page
    next()
    return
  }

  if(mustBeLoggedIn && !AuthService.isUserLoggedIn()) {//I
    next({
      path: '/login',
      params: {
        nextFullPath: to.fullPath
      }
    })
    return
  }

  next()

})


export default router
