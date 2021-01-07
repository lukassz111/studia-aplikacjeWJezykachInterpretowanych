import Vue from 'vue'
import VueRouter, { Route, RouteConfig } from 'vue-router'
import { AuthService, UserType } from '@/services/AuthService'
import Home from '../views/Home.vue'
import { Util } from '@/class/Util'
import { ErrorHandler, NavigationGuardNext } from 'vue-router/types/router'
Vue.use(VueRouter)
interface IMeta {
  admin: boolean
  user: boolean
  not_logged: boolean
  redirect: string
  user_redirect: string|null
  admin_redirect: string|null
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
  static everyoneLoggedAdmin(redirect: string = Meta.default_redirect): Meta {
    let x = this.everyoneLogged(redirect);
    x.user = false;
    return x;
  }
  admin: boolean = true;
  user: boolean = true;
  not_logged: boolean = true;
  redirect: string = Meta.default_redirect;
  admin_redirect: string|null = null;
  user_redirect: string|null = null;
  staticObject(): IMeta {
    let x: IMeta = {
      admin: this.admin,
      user: this.user,
      not_logged: this.not_logged,
      redirect: this.redirect,
      admin_redirect: this.admin_redirect,
      user_redirect: this.user_redirect
    }
    console.log(x);
    return x;
  }
}
const routes: Array<RouteConfig> = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    meta: (() => {
      let meta = Meta.everyoneLogged('/login')
      meta.admin_redirect = '/products'
      meta.user_redirect = '/products'
      return meta.staticObject()
    })()
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
  },
  {
    path: '/products_add',
    name: 'Products_Add',
    component: () => import(/* webpackChunkName: "products" */ '../views/AddProduct.vue'),
    meta: Meta.everyoneLoggedAdmin('/').staticObject()
  }
]

const router = new VueRouter({
  routes
})
router.beforeEach((to: Route,from: Route,next:NavigationGuardNext<Vue>) => {
  const redirectFunc = (meta: IMeta, t: Route, f: Route) => {
    //console.log({from:f.fullPath, to: to.fullPath, redirect: meta.redirect})
    next({ path: meta.redirect})
  } 
  let meta: IMeta = to.meta
  let logged = AuthService.isUserLoggedIn();
  if(logged) {
    if(AuthService.user()?.userType == UserType.Admin && meta.admin_redirect != null) {
      next({ path: meta.admin_redirect })
    }
    else if(AuthService.user()?.userType == UserType.User && meta.user_redirect != null) {
      next({ path: meta.user_redirect })
    }
    else if(meta.admin && AuthService.user()?.userType == UserType.Admin) {
      next()
    }
    else if(meta.user && AuthService.user()?.userType == UserType.User) {
      next()
    }
    else {
      redirectFunc(meta,to,from)
    }
  } else {
    if(meta.not_logged) {
      next()
    }
    else {
      redirectFunc(meta,to,from)
    }
  }
})


export default router
