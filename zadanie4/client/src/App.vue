<template>
  <md-app md-mode="reveal">
    <md-app-toolbar class="md-primary">
      <ButtonLinkTo to="/" display="Sklep" v-display-only="'all'"></ButtonLinkTo>
      <ButtonLinkTo to="/products_add" display="Dodaj produkt" v-display-only="'admin'"></ButtonLinkTo>
      <ButtonLinkTo to="/orders_add" display="Koszyk" v-display-only="'user'"></ButtonLinkTo>
      <ButtonLinkTo to="/orders_user" display="Zamówienia" v-display-only="'user'"></ButtonLinkTo>
      <ButtonLinkTo to="/orders_admin" display="Zamówienia" v-display-only="'admin'"></ButtonLinkTo>
      <ButtonLogout></ButtonLogout>
    </md-app-toolbar>
    <md-app-content>
      <router-view/>
      <Snackbar/>
    </md-app-content>
  </md-app>
</template>

<style lang="scss">
@import url('//fonts.googleapis.com/css?family=Roboto:400,500,700,400italic|Material+Icons');
.md-app {
  min-height: 100vh;
}
</style>
<script>
import ButtonLinkTo from './components/ButtonLinkTo'
import Snackbar from './components/Snackbar'
import ButtonLogout from './components/ButtonLogout'
import './directive/DisplayOnly'
export default {
  name: 'App',
  data: () => ({

  }),
  components: {
    ButtonLinkTo,
    Snackbar,
    ButtonLogout
  }
}
</script>