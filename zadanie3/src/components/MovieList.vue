<template>
  <md-card id="movieList">
    <md-card-header>
      <div class="md-title">Lista filmów</div>
    </md-card-header>
    <md-card-content>
      <md-table>
        <md-table-row>
          <md-table-head>Tytuł</md-table-head>
          <md-table-head>Obsada</md-table-head>
          <md-table-head>Gatunek</md-table-head>
          <md-table-head>Rok</md-table-head>
        </md-table-row>
        <MovieListElement v-for="mov in movies" v-bind:key="mov" :movie="mov"></MovieListElement>
      </md-table>
    </md-card-content>
    <md-card-actions>
      <md-button v-on:click="firstPage">
        <md-icon>fast_rewind</md-icon>
      </md-button>
      <md-button v-on:click="prevPage">
        <md-icon>navigate_before</md-icon>
      </md-button>
      <md-button disabled>Strona: {{page}}</md-button>
      <md-button v-on:click="nextPage">
        <md-icon>navigate_next</md-icon>
      </md-button>
      <md-button v-on:click="lastPage">
        <md-icon>fast_forward</md-icon>
      </md-button>
    </md-card-actions>
  </md-card>
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
    this.subscription = MovieService.Update.subscribe(() => {
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

<style scoped>
</style>
