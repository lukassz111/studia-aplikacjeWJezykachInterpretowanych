import Vue from 'vue'
import VueRouter, { Route, RouteConfig } from 'vue-router'
import { AuthService } from '@/services/AuthService'
import Home from '../views/Home.vue'
import { Util } from '@/class/Util'
import { ErrorHandler, NavigationGuardNext } from 'vue-router/types/router'
Vue.use(VueRouter)
interface IMeta {
  admin: boolean
  user: boolean
  not_logged: boolean
  redirect: string
}
class Meta implements IMeta {
  static default_redirect: string = '/'
  static everyone(): Meta { return new Meta(); }
  static everyoneNotLogged(redirect: string = Meta.default_redirect): Meta {
    let x: Meta = new Meta();
    x.admin = false;
    x.user = false;
    x.not_logged = true;
    x.redirect = redirect;
    return x;
  }
  static everyoneLogged(redirect: string = Meta.default_redirect): Meta {
    let x: Meta = new Meta();
    x.not_logged = false;
    x.admin = true;
    x.user = true;
    x.redirect = redirect;
    return x;
  }
  admin: boolean = true;
  user: boolean = true;
  not_logged: boolean = true;
  redirect: string = Meta.default_redirect;
  staticObject(): IMeta {
    return {
      admin: this.admin,
      user: this.user,
      not_logged: this.not_logged,
      redirect: this.redirect
    }
  }
}
const routes: Array<RouteConfig> = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    meta: Meta.everyoneLogged('/login').staticObject()
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import(/* webpackChunkName: "products" */ '../views/Login.vue'),
    meta: Meta.everyoneNotLogged('/').staticObject()
  },
  {
    path: '/products',
    name: 'Products',
    component: () => import(/* webpackChunkName: "products" */ '../views/Products.vue'),
    meta: Meta.everyoneLogged('/login').staticObject()
  }
]

const router = new VueRouter({
  routes
})
router.beforeEach((to: Route,from: Route,next:NavigationGuardNext<Vue>) => {
  const redirectFucn = (meta: IMeta, t: Route, f: Route) => {
    //console.log({from:f.fullPath, to: to.fullPath, redirect: meta.redirect})
    next({ path: meta.redirect})
  } 
  let meta: IMeta = to.meta
  let logged = AuthService.isUserLoggedIn();
  if(logged) {
    if((meta.admin && meta.user) == false) {
      redirectFucn(meta,to,from)
    }
    //TODO check user or admin
    else {
      next()
    }
  } else {
    if(meta.not_logged) {
      next()
    }
    else {
      redirectFucn(meta,to,from)
    }
  }
})


export default router
