<template>
  <div id="movieListPage">
    <MovieList/>
  </div>
</template>

<script>
import MovieList from '../components/MovieList.vue'

export default {
  name: 'MovieListPage',
  components: {
    MovieList
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
@import '../scss/theme.scss';
@import '../scss/functions.scss';
#movieListPage {
  width: 100%;
  margin: 0 auto;
}
</style>
