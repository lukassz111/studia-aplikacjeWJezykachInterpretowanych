import Vue from 'vue'
import VueRouter from 'vue-router'
import MovieListPage from '../views/MovieListPage.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'MovieListPage',
    component: MovieListPage
  },
  {
    path: '/by_genre',
    name: 'MovieListByGenrePage',
    component: () => import(/* webpackChunkName: "about" */ '../views/MovieListByGenrePage.vue')
  },
  {
    path: '/by_cast',
    name: 'MovieListByCastPage',
    component: () => import(/* webpackChunkName: "about" */ '../views/MovieListByCastPage.vue')
  }
]

const router = new VueRouter({
  mode: 'hash',
  base: process.env.BASE_URL,
  routes
})

export default router
