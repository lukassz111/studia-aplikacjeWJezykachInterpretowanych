<template>
  <md-app>
    <md-app-toolbar class="md-primary">
        <ButtonLinkTo display="Wyszukiwarka" to="/"></ButtonLinkTo>
        <ButtonLinkTo display="Lista wg. gatunków" to="/by_genre"></ButtonLinkTo>
        <ButtonLinkTo display="Lista wg. obsady" to="/by_cast"></ButtonLinkTo>
    </md-app-toolbar>
    <md-app-content>
      <div>
      </div>
      <router-view/>
    </md-app-content>
  </md-app>
</template>

<script>
import ButtonLinkTo from './components/ButtonLinkTo'

export default {
  name: 'MovieListByGenrePage',
  components: {
    ButtonLinkTo
  }
}
</script>

<style lang="scss">
@import './scss/theme';
</style>
