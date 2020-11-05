<template>
    <md-table-row>
        <md-table-cell>
            {{movie['title']}}
        </md-table-cell>
        <md-table-cell>
            {{movie['cast'].join(", ")}}
        </md-table-cell>
        <md-table-cell>
            {{movie['genres'].join(", ")}}
        </md-table-cell>
        <md-table-cell>
            {{movie['year']}}
        </md-table-cell>
    </md-table-row>
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
