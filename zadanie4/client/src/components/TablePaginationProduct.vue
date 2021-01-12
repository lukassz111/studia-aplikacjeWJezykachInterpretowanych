<template>
    <TablePagination
        :pagesObject="pagesObject"
        :headerTranslations="tableTranslations"
        :hiddenColumns="['id']"
        :transforms="tableTransforms"
        :rerender="rerender"
        :onElementClick="onElementClick">
    </TablePagination>
</template>

<script>
import TablePagination from './TablePagination'
export default {
  name: 'TablePaginationProduct',
  data() { return {
    tableTranslations: {
      id:"ID",
      name:"Nazwa",
      description:"Opis",
      price:"Cena",
      weight:"Waga",
      category:"Kategoria"
    },
    tableTransforms: {
      category: (value) => { return value.id },
      price: (value) => { return value+" zł" },
      weight: (value) => {
        if(value >= 500) {
          return (value/1000)+ " kg"
        } else {
          return value + " g"
        }
      }
    }
  }},
  props: {
      rerender: {
          type: Number,
          required: false,
          default: () => { return 0 }
      },
      onElementClick: {
          type: Function,
          required: false,
          default: null
      },
      /**
       * @type Page<T>
       */
      pagesObject: {
          type: Object,
          required: true
      },
      /**
       * @type Map<string, string>
       */
      //headerTranslations: {
      //    type: Object,
      //    required: true
      //},
      /**
       * @type string[]
       */
      //hiddenColumns: {
      //    type: Array,
      //    required: true
      //},
      //transforms: {
      //    type: Object,
      //    required: false
      //}
  },
  components: {
      TablePagination
  }
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>

