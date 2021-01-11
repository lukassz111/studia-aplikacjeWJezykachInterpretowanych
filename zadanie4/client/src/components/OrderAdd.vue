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
                <form novalidate class="md-layout" @submit.prevent="submit">
                    <p>Dane kontaktowe</p>
                    <md-field :class="getValidationClass('phoneNumber')">
                        <label for="phoneNumber">Numer telefonu</label>
                        <md-input name="phoneNumber" id="phoneNumber" v-model="form.phoneNumber" :disabled="sending" />
                        <span class="md-error" v-if="!$v.form.phoneNumber.required">Pole wymagane</span>
                        <span class="md-error" v-else-if="!$v.form.phoneNumber.minlength">Podaj 9 cyfr</span>
                        <span class="md-error" v-else-if="!$v.form.phoneNumber.maxLength">Podaj 9 cyfr</span>
                        <span class="md-error" v-else-if="!$v.form.phoneNumber.decimal">Tylko cyfry</span>
                        <span class="md-error" v-else-if="!$v.form.phoneNumber.minValue">Nie może być liczbą ujemną</span>
                    </md-field>
                    <p>Podsumowanie:</p>
                    <div class="md-layout md-gutter md-alignment-center-right">
                        <div class="md-layout-item md-size-25">
                            <p>Razem: {{summary.price}} zł</p>
                        </div>
                    </div>
                    <md-progress-bar md-mode="indeterminate" v-if="sending" />
                    <md-button type="submit" class="md-primary" :disabled="sending">Dodaj</md-button>
                </form>
            </md-card-content>

            <!--<md-card-actions>
                <md-button v-if="!canSend()" disabled>Zamów</md-button>
                <md-button v-if="canSend()" v-on:click="submit">Zamów</md-button>
            </md-card-actions>-->
        </md-card>
    </div>
</template> 

<script>
import { validationMixin } from 'vuelidate'
  import {
    //required,
    minLength,
    decimal,
    minValue,
    maxLength,
  } from 'vuelidate/lib/validators'
import { CartService } from '../services/CartService'
import { OrderService } from '../services/OrderService'
import TablePaginationProduct from './TablePaginationProduct'
export default {
  name: 'OrderAdd',
  mixins: [validationMixin],
  data: () => ({
      summary: null,
      subscription: null,
      items: 0,
      failDialog: false,
      pagesObject: CartService,
      sending: false,
      form: {
        phoneNumber: null,
      }
  }),
  validations: {
      form: {
        phoneNumber: {
          //required: required,
          decimal,
          minValue: minValue(0),
          minLength: minLength(9),
          maxLength: maxLength(9),
        },
      }
    },
  created() {
    this.init()
  },
  mounted() {
    this.init()
    this.subscription = CartService.getOnCartChanged().subscribe(()=>{
        this.init()
    })
  },
  unmounted() {
      if(this.subscription != null) {
          this.subscription.unsubscribe()
          this.subscription = null
      }
  },
  methods: {
      init() {
        this.pagesObject = CartService
        this.summary = CartService.getCartSummary()
        this.items = CartService.getList().length
      },
      getValidationClass (fieldName) {
        const field = this.$v.form[fieldName]

        if (field) {
          return {
            'md-invalid': field.$invalid && field.$dirty
          }
        }
      },
      clearForm () {
        this.$v.$reset()
        this.form.phoneNumber = null
      },
      submit() {
        this.$v.$touch()
        
        if (!this.$v.$invalid) {
            if(this.canSend())
                this.send()
        }
      },
      send() {
        this.sending = true
        OrderService.addOrder(CartService.getList(),this.form.phoneNumber).then((pass) => {
            if(!pass) {
                this.failDialog = true
            }
            CartService.clear()
            this.clearForm()
            this.pagesObject = CartService
            this.sending = false
        })
      },
      canSend() {
          if(this.summary == null || this.sending) {
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
