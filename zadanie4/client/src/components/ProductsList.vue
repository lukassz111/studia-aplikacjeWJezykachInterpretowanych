<template>
    <md-card>
        <md-card-content>
            <md-table>

            </md-table>
        </md-card-content>
    </md-card>
</template>

<script>
import { ProductService } from './../services/ProductService' 
export default {
  name: 'ProductsList',
  props: {
    to: String,
    display: String,
  },
  created: () => {
      ProductService.fetchProducts()
  },
  methods: {
  }
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
