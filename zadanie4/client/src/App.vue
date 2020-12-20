<template>
  <md-app md-mode="reveal">
    <md-app-toolbar class="md-primary">
      <!--
      <md-button class="md-icon-button" @click="showNavigation = !showNavigation">
        <md-icon>menu</md-icon>
      </md-button>
      -->
      <ButtonLinkTo to="/" display="Sklep"></ButtonLinkTo>
      <ButtonLinkTo to="/products" display="Produkty"></ButtonLinkTo>
    </md-app-toolbar>

    <!--<md-app-drawer :md-active.sync="showNavigation" md-swipeable></md-app-drawer>-->

    <md-app-content>
      <router-view/>
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
export default {
  name: 'App',
  data: () => ({

  }),
  components: {
    ButtonLinkTo
  }
}
</script>