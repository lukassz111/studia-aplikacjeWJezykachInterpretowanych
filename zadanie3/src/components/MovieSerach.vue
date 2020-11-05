<template>
  <md-card>
    <md-card-header>
      <div class="md-title">Wyszukaj</div>
    </md-card-header>
    <md-card-content>

      <md-field>
        <label for="titleInput">Tytuł</label>
        <md-input name="titleInput" id="titleInput"/>
      </md-field>
      <md-field>
        <label for="castInput">Obsada</label>
        <md-input name="castInput" id="castInput"/>
      </md-field>
      <md-field>
        <label for="genreInput">Gatunek</label>
        <md-input name="genreInput" id="genreInput"/>
      </md-field>
      <md-field>
        <label for="yearInput">Rok</label>
        <md-input name="yearInput" type="number" id="yearInput"/>
      </md-field>

    </md-card-content>
    <md-card-actions>
    </md-card-actions>
  </md-card>
</template>

<script>
  export default {
    name: 'MovieSerach'
  }
</script>

<style scoped>
</style>