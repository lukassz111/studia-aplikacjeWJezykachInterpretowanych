<template>
  <md-card>
    <md-card-content>
      <md-dialog-confirm
        :md-active.sync="addToCartDialog"
        md-title="Dodać do koszyka?"
        :md-content="addToCartDialogContent"
        md-confirm-text="Tak"
        md-cancel-text="Nie"
        @md-cancel="onCancelAddToCartDialog"
        @md-confirm="onConfirmAddToCartDialog" />
      <TablePaginationProduct :pagesObject="pagesObject" :onElementClick="onElementClick"></TablePaginationProduct>
    </md-card-content>
  </md-card>
</template>

<script>
import { ProductService } from '../services/ProductService'
import { CartService } from '../services/CartService'
import TablePaginationProduct from './../components/TablePaginationProduct'
export default {
  name: 'ProductsUser',
  data: () => ({
    addToCartDialog: false,
    addToCartDialogContent: '',
    product: null
  }),
  methods: {
    onElementClick(item) {
      this.product = item
      this.addToCartDialogContent = this.product.name + " - " + this.product.description + " za " + this.product.price + " zŁ ";
      this.addToCartDialog = true
    },
    onCancelAddToCartDialog() {
      this.product = null
      this.addToCartDialog = false
    },
    onConfirmAddToCartDialog() {
      CartService.addProduct(this.product)
      this.product = null
      this.addToCartDialog = false
    }
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