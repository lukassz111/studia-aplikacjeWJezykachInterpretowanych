<template>
  <div>
    <TablePagination :pagesObject="pagesObject" :headerTranslations="tableTranslations" :hiddenColumns="['id']" :transforms="tableTransforms" :onElementClick="onElementClick"></TablePagination>
  </div>
</template>

<script>
import { ProductService } from '../services/ProductService'
import { AuthService } from '../services/AuthService'
import TablePagination from './../components/TablePagination'
export default {
  name: 'Products',
  data: () => ({
    tableTranslations: {
      id:"ID",
      name:"Nazwa",
      description:"Opis",
      price:"Cena",
      weight:"Waga",
      category:"Kategoria"
    },
    tableTransforms: {
      category: (value) => { return value.id }
    }
  }),
  methods: {
    isUserLoggedIn() {
      return AuthService.isUserLoggedIn()
    },
    onElementClick(item) {
      console.log(item)
    }
  },
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