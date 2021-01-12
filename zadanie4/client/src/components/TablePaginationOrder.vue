<template>
    <TablePagination
        :pagesObject="pagesObject"
        :headerTranslations="tableTranslations"
        :hiddenColumns="[]"
        :transforms="tableTransforms"
        :onElementClick="onElementClick">
    </TablePagination>
</template>

<script>
import TablePagination from './TablePagination'
export default {
  name: 'TablePaginationOrder',
  data() { return {
    tableTranslations: {
      id:"Numer zamówienia",
      approveDate:"Data zatwierdzenia",
      phone_number:"Numer telefonu",
      state:"Stan"
    },
    tableTransforms: {
      approveDate: (value) => {
        if(value == null) {
            return "Nie zatwierdzono jeszcze"
        }
        else{
            return value
        }
      },
      state: (value) => {
          switch(value) {
              case 'NOT_APPROVED':
                  return "Nie zatwierdzono"
          }
          return value
      }
    }
  }},
  props: {
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
  },
  components: {
      TablePagination
  }
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>

