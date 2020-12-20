<template>
  <TablePagination :pagesObject="pagesObject" :headerTranslations="tableTranslations"></TablePagination>
</template>

<script>
import { ProductService } from '../services/ProductService'
import TablePagination from './../components/TablePagination'
export default {
  name: 'App',
  data: () => ({
    tableTranslations: {
      id:"ID",
      name:"Nazwa",
      description:"Opis",
      price:"Cena",
      weight:"Waga"
    }
  }),
  computed: {
    pagesObject: () => {
      return ProductService.Products
    }
  },
  components: {
    TablePagination
  }
}
</script>