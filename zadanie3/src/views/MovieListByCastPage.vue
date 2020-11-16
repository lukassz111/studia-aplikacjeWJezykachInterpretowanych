<template>
  <div id="movieListByCastPage">
    <ul>
      <li v-for="(movs, cast) in data" :key="cast">
        <div>
          <p>{{cast}}</p>
          <ol>
            <li v-for="m in movs" v-bind:key="m">
              {{ m.title }}
            </li>
          </ol>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import { chunk, includes, shuffle, union } from 'lodash'
import { MovieService } from '../services/MovieService'
export default {
  name: 'MovieListByCastPage',
  components: {
  },
  data: () => {
    return {
      subscription: null,
      data: {}
    }
  },
  created () {
    this.subscription = MovieService.Update.subscribe(() => {
      let movies = MovieService.Movies
      movies = shuffle(movies)
      movies = chunk(movies,100)[0]
      let casts = []
      movies.forEach((movie)=> {
        casts = union(casts,movie.cast)
      })
      console.log(casts)
      casts.forEach((cast) => {
        let moviesByCast = []
        movies.forEach((movie)=>{
          if(includes(movie.cast,cast)) {
            moviesByCast.push(movie)
          }
        })
        this.data[cast] = moviesByCast
      })
      console.log(this.data)
    })
    MovieService.loadMovies()
  },
  destroyed () {
    this.subscription.unsubscribe()
    this.subscription = null
  }
} 
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
