<template>
  <md-card>
    <md-card-header>
      <div class="md-title">Wyszukaj</div>
    </md-card-header>
    <md-card-content>

      <md-field md-clearable>
        <label for="titleInput">Tytuł</label>
        <md-input name="titleInput" id="titleInput" v-model="title"/>
      </md-field>
      <md-field md-clearable>
        <label for="castInput">Obsada</label>
        <md-input name="castInput" id="castInput" v-model="cast"/>
      </md-field>
      <md-field md-clearable>
        <label for="genreInput">Gatunek</label>
        <md-input name="genreInput" id="genreInput" v-model="genre"/>
      </md-field>
      <md-field md-clearable>
        <label for="yearInput">Rok</label>
        <md-input name="yearInput" type="number" id="yearInput" v-model="year"/>
      </md-field>
    </md-card-content>
    <md-card-actions>
    </md-card-actions>
  </md-card>
</template>

<script>
import { MovieService } from '../services/MovieService'
  export default {
    name: 'MovieSerach',
    props: {
      title: String,
      cast: String,
      genre: String,
      year: Number
    },
    updated () {
      MovieService.setFilter(this.title,this.cast,this.genre,this.year)
    }
  }
</script>

<style scoped>
</style>