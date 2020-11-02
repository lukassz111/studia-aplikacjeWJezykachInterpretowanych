<template>
    <tr>
        <td>
            {{movie['title']}}
        </td>
        <td>
            {{movie['cast'].join(", ")}}
        </td>
        <td>
            {{movie['genres'].join(", ")}}
        </td>
        <td>
            {{movie['year']}}
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
