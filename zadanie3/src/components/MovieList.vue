<template>
  <div id="movieList">
    <table>
      <thead>
        <tr>
          <th>Tytuł</th>
          <th>Obsada</th>
          <th>Gatunek</th>
          <th>Rok</th>
        </tr>
      </thead>
      <tbody>
        <MovieListElement v-for="mov in movies" v-bind:key="mov" :movie="mov"></MovieListElement>
      </tbody>
    </table>
    <div>
      <button class="btn" v-on:click="firstPage">Początek</button>
      <button class="btn" v-on:click="prevPage">Poprzednia strona</button>
      <label class="btn">Strona: {{page}}</label>
      <button class="btn" v-on:click="nextPage">Następna strona</button>
      <button class="btn" v-on:click="lastPage">Ostania strona</button>
    </div>
    
  </div>
</template>

<script>
import { MovieService } from '../services/MovieService'
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
    nextPage: () => {
      MovieService.page = MovieService.page + 1
      MovieService.listUpdate()
    },
    prevPage: () => {
      MovieService.page = MovieService.page - 1
      MovieService.listUpdate()
    },
    lastPage: () => {
      MovieService.page = MovieService.getLastPageNumber()
      MovieService.listUpdate()
    },
    firstPage: () => {
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
<style scoped lang="scss">
@import '../scss/button';
#movieList {
  width: 100%;
  & > table {
    width: 100%;
    th {
      text-align: left;
      font-weight: bold;
      font-size: 1rem;
    }
  }
  & > div {
    width: 100%;
    padding-top: 30px;
  }
}
</style>
