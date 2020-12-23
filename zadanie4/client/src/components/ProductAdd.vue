<template>
    <md-card>
        <md-card-header>
            Nowy produkt
        </md-card-header>
        <md-card-content>
            <form novalidate class="md-layout" @submit.prevent="submit">
                <md-field :class="getValidationClass('name')">
                    <label for="name">Nazwa</label>
                    <md-input name="name" id="name" v-model="form.name" :disabled="sending" />
                    <span class="md-error" v-if="!$v.form.name.required">Pole wymagane</span>
                    <span class="md-error" v-else-if="!$v.form.name.minlength">Tekst za krótki</span>
                </md-field>
                <md-field :class="getValidationClass('description')">
                    <label for="description">Opis</label>
                    <md-input name="description" id="description" v-model="form.description" :disabled="sending" />
                    <span class="md-error" v-if="!$v.form.description.required">Pole wymagane</span>
                    <span class="md-error" v-else-if="!$v.form.description.minlength">Tekst za krótki</span>
                </md-field>
                <md-field :class="getValidationClass('price')">
                    <label for="price">Cena</label>
                    <md-input name="price" id="price" v-model="form.price" :disabled="sending" />
                    <span class="md-error" v-if="!$v.form.price.required">Pole wymagane</span>
                    <span class="md-error" v-else-if="!$v.form.price.decimal">Musi być liczbą</span>
                    <span class="md-error" v-else-if="!$v.form.price.minValue">Musi być liczbą przynajmniej równą 0 lub większą</span>
                </md-field>
                <md-field :class="getValidationClass('weight')">
                    <label for="weight">Waga</label>
                    <md-input name="weight" id="weight" v-model="form.weight" :disabled="sending" />
                    <span class="md-error" v-if="!$v.form.weight.required">Pole wymagane</span>
                    <span class="md-error" v-else-if="!$v.form.weight.decimal">Musi być liczbą</span>
                    <span class="md-error" v-else-if="!$v.form.weight.minValue">Musi być liczbą przynajmniej równą 0 lub większą</span>
                </md-field>
                <md-autocomplete :class="getValidationClass('category')" name="category" id="category" :md-options="categories" :disabled="sending" v-model="form.category"
                  @md-changed="category_input_changed" 
                  @md-opened="category_input_opened"
                  md-selected="category_input_selected" 
                >
                  <label>Kategoria</label>
                  <span class="md-error" v-if="!$v.form.category.required">Pole wymagane</span>
                  <span class="md-error" v-else-if="!$v.form.category.minlength">Tekst za krótki</span>
                </md-autocomplete>
                
                <md-progress-bar md-mode="indeterminate" v-if="sending" />
            
            <md-button type="submit" class="md-primary" :disabled="sending">Dodaj</md-button>
            </form>
        </md-card-content>
    </md-card>
</template>

<script>
import { validationMixin } from 'vuelidate'
  import {
    required,
    minLength,
    decimal,
    minValue
  } from 'vuelidate/lib/validators'
import { ProductFactory } from './../model/Product'
import { ProductService } from './../services/ProductService' 
import { CategoryService } from './../services/CategoryService'
export default {
  name: 'ProductAdd',
  mixins: [validationMixin],
  data: () => ({
      categoryServiceSubscription: null,
      categories: [],
      sending: false,
      form: {
        name: null,
        description: null,
        price: null,
        weight: null,
        category: ''
      }
    }),
    validations: {
      form: {
        name: {
          required,
          minLength: minLength(3)
        },
        description: {
          required,
          minLength: minLength(3)
        },
        price: {
          required,
          decimal,
          minValue: minValue(0),
        },
        weight: {
          required,
          decimal,
          minValue: minValue(0),
        },
        category: {
            required,
            minLength: minLength(1)
        }
      }
    },
  created() {
      console.log(ProductService)
      CategoryService.Categories.clear()
      CategoryService.Categories.fetchAll().then((_categories)=>{
          this.categories = _categories.map((el)=>{return el.id})
      })
  },
  methods: {
      getValidationClass (fieldName) {
        const field = this.$v.form[fieldName]

        if (field) {
          return {
            'md-invalid': field.$invalid && field.$dirty
          }
        }
      },
      category_input_changed () {},
      category_input_selected () {},
      category_input_opened () {},
      category_input_closed () {},
      clearForm () {
        this.$v.$reset()

        this.form.name = null
        this.form.description = null
        this.form.price = null
        this.form.weight = null
        this.form.category = ''
      },
      send() {
          
        console.log("send")
        this.sending = true
        let category = { 
          "id": this.form.category
        }
        const x = async () => {
          let dbCategory = await CategoryService.addCategory(category)
          console.log(dbCategory)
          if(dbCategory != null && dbCategory != undefined) {
            let product = ProductFactory(null,dbCategory,this.form.name,this.form.description,this.form.price,this.form.weight)
            let dbProduct = await ProductService.addProduct(product)
            console.log(dbProduct)
          }
          else {
            //TODO category do not exist and create of this connot be done
          }
          CategoryService.Categories.clear()
          let _categories = await CategoryService.Categories.fetchAll()
          this.categories = _categories.map((el)=>{return el.id})
          this.clearForm()
          this.sending = false
        }
        x()
      },
      submit () {
        this.$v.$touch()
        
        if (!this.$v.$invalid) {
          this.send()
        }
      }
  }
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
