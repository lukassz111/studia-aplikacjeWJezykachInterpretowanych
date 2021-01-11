<template>
    <div>
        <p></p>
        <md-card>
            <md-card-content>
                <p>Zawartość koszyka:</p>
                <TablePaginationProduct
                    :pagesObject="pagesObject"
                ></TablePaginationProduct>
                <p>Podsumowanie:</p>
                
                <div class="md-layout md-gutter md-alignment-center-right">
                    <div class="md-layout-item md-size-25">
                        <p>Razem: {{}}</p>
                    </div>
                </div>
            </md-card-content>

            <!--<md-card-actions>
                <md-button>Action</md-button>
                <md-button>Action</md-button>
            </md-card-actions>-->
        </md-card>
    </div>
</template>

<script>
import { CartService } from '../services/CartService'
import TablePaginationProduct from './TablePaginationProduct'
export default {
  name: 'OrderAdd',
  data: () => ({}),
  created() {
  },
  computed: {
    pagesObject: () => {
      return CartService;
    }
  },
  methods: {
      ne
  },
  components: {
      TablePaginationProduct
  }
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
