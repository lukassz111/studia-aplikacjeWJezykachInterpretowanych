<template>
  <div id="movieListPage">
    <MovieList/>
  </div>
</template>

<script>
import MovieList from './MovieList'

export default {
  name: 'MovieListPage',
  components: {
    MovieList
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#movieListPage {
  width: 100%;
  margin: auto;
}
</style>
