<template>
  <md-card>
    <md-dialog :md-active.sync="showDialog">
      <md-dialog-title>Zamówienie</md-dialog-title>
      <md-dialog-content>
        <p>Numer zamówienia: {{order.id}}</p>
        <p v-if="order.state != 'NOT_APPROVED'">Data zamówienia: {{order.approveDate}}</p>
        <p>Nr telefonu: {{order.phone_number}}</p>
        <p>Status: {{stateToDisplay(order.state)}}</p>
        <TablePaginationProduct :pagesObject="orderDetailProducts"></TablePaginationProduct>
      </md-dialog-content>
      <md-dialog-actions>
        <md-button class="md-primary" @click="showDialog = false">Zamknij</md-button>
      </md-dialog-actions>
    </md-dialog>
    <md-card-content>
      <md-tabs>
        <md-tab id="tab-home" md-label="Wszystkie w jednej tabelce" exact>
        <TablePaginationOrder
        :pagesObject="allOrdersPagesObject"
        :onElementClick="onElementClick">
        </TablePaginationOrder>
      </md-tab>
      <md-tab id="tab-pages" md-label="Wedle stanu">

        <p>Oczekujące na zatwierdzenie</p>
        <TablePaginationOrder
        :pagesObject="notApprovedOrdersPagesObject"
        :onElementClick="onElementClick">
        </TablePaginationOrder>
        <p>W trakcie</p>
        <TablePaginationOrder
        :pagesObject="approvedOrdersPagesObject"
        :onElementClick="onElementClick">
        </TablePaginationOrder>
        <p>Anulowane</p>
        <TablePaginationOrder
        :pagesObject="canceledOrdersPagesObject"
        :onElementClick="onElementClick">
        </TablePaginationOrder>
        <p>Zakończone</p>
        <TablePaginationOrder
        :pagesObject="completedOrdersPagesObject"
        :onElementClick="onElementClick">
        </TablePaginationOrder>

      </md-tab>
      </md-tabs>
    </md-card-content>
  </md-card>
</template>

<script>
import { OrderService } from '../services/OrderService'
import TablePaginationOrder from './../components/TablePaginationOrder'
import TablePaginationProduct from './../components/TablePaginationProduct'
export default {
  name: 'OrdersUser',
  data: () => ({
    order:'',
    showDialog: false,
    disableClick: false,
    orderDetailProducts: null
  }),
  methods: {
    stateToDisplay(value) {
      switch(value){
        case 'NOT_APPROVED':
          return "Nie zatwierdzono"
        case 'APPROVED':
          return "Zatwierdzono"
        case 'CANCELED':
          return "Anulowano"
        case 'COMPLETED':
          return "Zakończono"
      }
      return value
    },
    onElementClick(item) {
      if(this.disableClick) {
        return
      }
      this.disableClick = true
      console.log(item.id)
      OrderService.DetailedOrder.getPageAsync(item.id).then((detailedOrders)=>{
        if(detailedOrders.length > 0) {
          this.order = detailedOrders[0]
          OrderService.getProductsListForOrder(this.order).then((p)=>{
            this.orderDetailProducts = p
            if(this.order != null && this.item != '') {
              this.showDialog = true
            }
          })
        }
        this.disableClick = false
      })
    },
  },
  computed: {
    allOrdersPagesObject: () => {
      return OrderService.AllOrders
    },
    
    notApprovedOrdersPagesObject: () => {
      return OrderService.NotApprovedOrders
    },
    approvedOrdersPagesObject: () => {
      return OrderService.ApprovedOrders
    },
    canceledOrdersPagesObject: () => {
      return OrderService.CanceledOrders
    },
    completedOrdersPagesObject: () => {
      return OrderService.CompletedOrders
    }
  },
  components: {
    TablePaginationOrder,
    TablePaginationProduct
  }
}
</script>