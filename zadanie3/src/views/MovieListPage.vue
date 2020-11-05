<template>
  <div id="movieListPage">
    <MovieSerach/>
    <MovieList/>
  </div>
</template>

<script>
import MovieList from '../components/MovieList.vue'
import MovieSerach from '../components/MovieSerach.vue'

export default {
  name: 'MovieListPage',
  components: {
    MovieList,
    MovieSerach
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
</style>
