<template>
  <div id="movieListByGenrePage">
    <ul>
      <li v-for="(movs, gen) in data" :key="gen">
        <div>
          <p>{{gen}}</p>
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
  name: 'MovieListByGenrePage',
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
      let genres = []
      movies.forEach((movie)=> {
        genres = union(genres,movie.genres)
      })
      console.log(genres)
      genres.forEach((genre) => {
        let moviesByGenre = []
        movies.forEach((movie)=>{
          if(includes(movie.genres,genre)) {
            moviesByGenre.push(movie)
          }
        })
        this.data[genre] = moviesByGenre
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
