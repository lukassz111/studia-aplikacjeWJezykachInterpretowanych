<template>
  <div id="movieList">
    <table border="1">
      <tr>
        <td>title</td><td>year</td><td>cast</td><td>genres</td>
      </tr>
      <MovieListElement v-for="mov in movies" v-bind:key="mov" :movie="mov"></MovieListElement>
    </table>
    <div>
      <button v-on:click="prevPage">prev</button><span>{{page}}</span><button v-on:click="nextPage">next</button>
    </div>
  </div>
</template>

<script>
import { MovieService } from '../MovieService'
import MovieListElement from './MovieListElement'

export default {
  name: 'MovieList',
  components: {
    MovieListElement
  },
  data: () => {
    return {
      subscription: null,
      page: 0,
      movies: []
    }
  },
  methods: {
    nextPage: (event) => {
      MovieService.page = MovieService.page + 1
      MovieService.listUpdate()
    },
    prevPage: (event) => {
      MovieService.page = MovieService.page - 1
      MovieService.listUpdate()
    },
    lastPage: (event) => {
      MovieService.page = MovieService.getLastPageNumber()
      MovieService.listUpdate()
    },
    firstPage: (event) => {
      MovieService.page = 0
      MovieService.listUpdate()
    }
  },
  created () {
    this.subscription = MovieService.movieToDisplayObservable.subscribe(() => {
      this.movies = MovieService.movieToDisplay
      this.page = MovieService.page
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
#movieList, #movieList > table, #movieList > div {
  margin: 0 auto;
}
</style>
