<template>
  <md-card id="movieList">
    <md-card-header>
      <div class="md-title">Lista filmów</div>
    </md-card-header>
    <md-card-content>
      <md-toolbar class="md-transparent" md-elevation="0">
        <div class="md-toolbar-row">
          <div class="md-toolbar-section-start">
            <md-button v-on:click="increasePerPage">
              <md-icon>add</md-icon>
            </md-button>
            <md-button disabled>{{perPage}}</md-button>
            <md-button v-on:click="decreasePerPage">
              <md-icon>remove</md-icon>
            </md-button>
          </div>
          <div class="md-toolbar-section-end">
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
          </div>
        </div>
      </md-toolbar>
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
      perPage: 10,
      movies: []
    }
  },
  methods: {
    increasePerPage: () => {
      MovieService.PerPage = MovieService.PerPage + 10
      MovieService.listUpdate();
    },
    decreasePerPage: () => {
      MovieService.PerPage = MovieService.PerPage - 10
      MovieService.listUpdate();
    },
    nextPage: () => {
      MovieService.Page = MovieService.Page + 1
      MovieService.listUpdate()
    },
    prevPage: () => {
      MovieService.Page = MovieService.Page - 1
      MovieService.listUpdate()
    },
    lastPage: () => {
      MovieService.Page = MovieService.getLastPageNumber()
      MovieService.listUpdate()
    },
    firstPage: () => {
      MovieService.Page = 0
      MovieService.listUpdate()
    }
  },
  created () {
    this.subscription = MovieService.Update.subscribe(() => {
      this.movies = MovieService.movieToDisplay
      this.page = MovieService.Page
      this.perPage = MovieService.PerPage
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
