<template>
  <md-app md-mode="reveal">
    <md-app-toolbar class="md-primary">
      <!--
      <md-button class="md-icon-button" @click="showNavigation = !showNavigation">
        <md-icon>menu</md-icon>
      </md-button>
      -->
      <ButtonLinkTo to="/" display="Sklep" v-display-only="'all'"></ButtonLinkTo>
      <ButtonLinkTo to="/products_add" display="Dodaj produkt" v-display-only="'admin'"></ButtonLinkTo>
      <ButtonLogout></ButtonLogout>
    </md-app-toolbar>

    <!--<md-app-drawer :md-active.sync="showNavigation" md-swipeable></md-app-drawer>-->

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