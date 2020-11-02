import Vue from 'vue'
import Router from 'vue-router'
import MovieListPage from '@/components/MovieListPage'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'MovieListPage',
      component: MovieListPage
    }
  ]
})
