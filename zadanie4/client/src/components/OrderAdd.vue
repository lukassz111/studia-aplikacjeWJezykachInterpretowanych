<template>
    <div>
        <md-dialog-alert
        :md-active.sync="failDialog"
        md-content="Złożenie zamówienia się nie powiodło"
        md-confirm-text="Ok" />
        <p></p>
        <md-card>
            <md-card-content>
                <p>Zawartość koszyka:</p>
                <TablePaginationProduct v-if="items > 0"
                    :pagesObject="pagesObject"
                ></TablePaginationProduct>
                <p>Podsumowanie:</p>
                
                <div class="md-layout md-gutter md-alignment-center-right">
                    <div class="md-layout-item md-size-25">
                        <p>Razem: {{summary.price}} zł</p>
                    </div>
                </div>
            </md-card-content>

            <md-card-actions>
                <md-button v-if="!canSend()" disabled>Zamów</md-button>
                <md-button v-if="canSend()" v-on:click="submit">Zamów</md-button>
            </md-card-actions>
        </md-card>
    </div>
</template> 

<script>
import { CartService } from '../services/CartService'
import { OrderService } from '../services/OrderService'
import TablePaginationProduct from './TablePaginationProduct'
export default {
  name: 'OrderAdd',
  data: () => ({
      summary: null,
      subscription: null,
      items: 0,
      failDialog: false,
      pagesObject: CartService
  }),
  created() {
      this.pagesObject = CartService
      this.summary = CartService.getCartSummary()
      this.items = CartService.getList().length
      this.subscription = CartService.getOnCartChanged().subscribe(()=>{
          this.summary = CartService.getCartSummary()
          this.items = CartService.getList().length
      })
  },
  unmounted() {
      if(this.subscription != null) {
          this.subscription.unsubscribe()
          this.subscription = null
      }
  },
  methods: {
      submit() {
          OrderService.addOrder(CartService.getList()).then((pass) => {
              if(!pass) {
                  this.failDialog = true
              }
              CartService.clear()
              this.pagesObject = CartService
          })
      },
      canSend() {
          if(this.summary == null) {
              return false
          }
          if(this.items > 0 && this.summary != null) {
              return true
          }
          return false
      }
  },
  components: {
      TablePaginationProduct
  }
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
