<template>
    <tr>
        <td>
            {{movie['title']}}
        </td>
        <td>
            {{movie['year']}}
        </td>
        <td>
            {{JSON.stringify(movie['cast'])}}
        </td>
        <td>
            {{JSON.stringify(movie['genres'])}}
        </td>
    </tr>
</template>

<script>
export default {
  name: 'MovieListElement',
  props: ['movie']
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
