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
        <md-input name="yearInput" id="yearInput" v-model="year"/>
      </md-field>
      <md-dialog-alert
      :md-active.sync="helpDialpg"
      md-title="Wyszukiwarka"
      md-content="<p>W wyszukiwarce można używać kilku znaków specjalnych</br>* - Zastępuje wiele różnych dowolnych znaków</br>? - Zastępuje jeden dowolny znak</br>Użycie znaku spacji (1 lub więcej pod rząd) działa jak szukanie dowolnej (>=1) ilości białych znaków</p>" md-confirm-text="Rozumiem"/>
    </md-card-content>
    <md-card-actions>
      <md-button class="md-icon-button md-raised md-primary" @click="helpDialpg = true">
        <md-icon>help_outline</md-icon>
      </md-button>
    </md-card-actions>
  </md-card>
</template>

<script>
import { MovieService } from '../services/MovieService.ts'
  export default {
    name: 'MovieSerach',
    data: () => {
      return {
        helpDialpg: false
      }
    },
    props: {
      title: String,
      cast: String,
      genre: String,
      year: Number
    },
    updated () {
      if(this.title == undefined) {
        this.title = ''
      }
      if(this.cast == undefined) {
        this.cast = ''
      }
      if(this.genre == undefined) {
        this.genre = ''
      }
      if(this.year == undefined) {
        this.year = ''
      }
      MovieService.setFilter(this.title,this.cast,this.genre,this.year)
    }
  }
</script>

<style scoped>
</style>