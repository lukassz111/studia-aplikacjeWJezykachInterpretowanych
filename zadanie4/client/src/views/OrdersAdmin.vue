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
        <p>Zmiana statusu</p>
        <md-field class="select">
          <select v-model="state" name="state" id="state">
            <option value="NOT_APPROVED">Nie zatwierdzono</option>
            <option value="APPROVED">Zatwierdzono</option>
            <option value="CANCELED">Anulowane</option>
            <option value="COMPLETED">Zakończone</option>
          </select>
        </md-field>
      </md-dialog-content>
      <md-dialog-actions>
        <md-button :disable="disableDialogBtn" class="md-primary" @click="showDialog = false">Zamknij</md-button>
        <md-button :disabled="!stateChanged || disableDialogBtn" class="md-primary" @click="save()">Zapisz i Zamknij</md-button>
      </md-dialog-actions>
    </md-dialog>
    <md-card-content>
      <md-tabs>
        <md-tab id="tab-home" md-label="Wszystkie w jednej tabelce" exact>
        <TablePaginationOrder
        :pagesObject="allOrdersPagesObject"
        :onElementClick="onElementClick"
        :rerender="rerender">
        </TablePaginationOrder>
      </md-tab>
      <md-tab id="tab-pages" md-label="Wedle stanu">

        <p>Oczekujące na zatwierdzenie</p>
        <TablePaginationOrder
        :pagesObject="notApprovedOrdersPagesObject"
        :onElementClick="onElementClick"
        :rerender="rerender">
        </TablePaginationOrder>
        <p>W trakcie</p>
        <TablePaginationOrder
        :pagesObject="approvedOrdersPagesObject"
        :onElementClick="onElementClick"
        :rerender="rerender">
        </TablePaginationOrder>
        <p>Anulowane</p>
        <TablePaginationOrder
        :pagesObject="canceledOrdersPagesObject"
        :onElementClick="onElementClick"
        :rerender="rerender">
        </TablePaginationOrder>
        <p>Zakończone</p>
        <TablePaginationOrder
        :pagesObject="completedOrdersPagesObject"
        :onElementClick="onElementClick"
        :rerender="rerender">
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
  name: 'OrdersAdmin',
  data: () => ({
    order:'',
    showDialog: false,
    disableClick: false,
    orderDetailProducts: null,
    categoryies: [''],
    state: null,
    stateChanged: false,
    disableDialogBtn: false,
    allOrdersPagesObject: OrderService.AllOrders,
    notApprovedOrdersPagesObject: OrderService.NotApprovedOrders,
    approvedOrdersPagesObject:OrderService.ApprovedOrders,
    canceledOrdersPagesObject:OrderService.CanceledOrders,
    completedOrdersPagesObject:OrderService.CompletedOrders,
    rerender: 0,
  }),
  watch: {
    state() {
      this.stateChanged = (this.state != this.order.state)
    }
  },
  created() {
      this.updatePages()
  },
  methods: {
    updatePages() {
      this.rerender = this.rerender + 1
      this.allOrdersPagesObject = OrderService.AllOrders
      this.notApprovedOrdersPagesObject = OrderService.NotApprovedOrders
      this.approvedOrdersPagesObject = OrderService.ApprovedOrders
      this.canceledOrdersPagesObject = OrderService.CanceledOrders
      this.completedOrdersPagesObject = OrderService.CompletedOrders
    },
    save() {
      this.disableDialogBtn = true
      OrderService.updateState(this.order,this.state).then(()=>{
        this.showDialog = false
        this.disableDialogBtn = false
        this.updatePages()
      })
    },
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
          this.state = this.order.state
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
  components: {
    TablePaginationOrder,
    TablePaginationProduct
  }
}
</script>

<style lang="scss" scoped>

.select {
  font-family:
  'Roboto','Helvetica','Arial',sans-serif;
	position: relative;
	width: 100%;
	appearance: none;
	-webkit-appearance:none
}
.select select {
  position: relative;
  font-family: inherit;
  background-color: transparent;
  width: 100%;
  padding: 10px 10px 10px 0;
  font-size: 18px;
  border-radius: 0;
  border: none;
  border-bottom: 1px solid rgba(0,0,0, 0.12);
  appearance: none;
  -webkit-appearance:none
  &:focus {
      outline: none;
      border-bottom: 1px solid rgba(0,0,0, 0);
      }
  &:after {
      position: absolute;
      top: 18px;
      right: 10px;
      /* Styling the down arrow */
      width: 0;
      height: 0;
      padding: 0;
      content: '';
      border-left: 6px solid transparent;
      border-right: 6px solid transparent;
      border-top: 6px solid rgba(0, 0, 0, 0.12);
      pointer-events: none;
      }
  } 
</style>