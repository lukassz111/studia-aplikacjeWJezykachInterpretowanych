<template>
  <md-card>
    <md-card-content>
      <TablePaginationProduct :pagesObject="pagesObject"></TablePaginationProduct>
    </md-card-content>
  </md-card>
</template>

<script>
import { ProductService } from '../services/ProductService'
import TablePaginationProduct from './../components/TablePaginationProduct'
export default {
  name: 'Products',
  data: () => ({
  }),
  methods: {
  },
  computed: {
    pagesObject: () => {
      return ProductService.Products
    }
  },
  components: {
    TablePaginationProduct
  }
}
</script>