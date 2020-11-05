<template>
  <md-app>
    <md-app-toolbar class="md-primary">
        <span class="md-title">Baza filmów</span>
      </md-app-toolbar>
    <md-app-content>
      <router-view/>
    </md-app-content>
  </md-app>
</template>

<style lang="scss">
@import './scss/theme';
* {
  font-family: $f-family;
}
</style>
