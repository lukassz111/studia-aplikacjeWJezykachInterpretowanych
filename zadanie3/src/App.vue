<template>
  <div>
    <div id="header">Lista filmów</div>
    <div id="content">
      <router-view/>
    </div>
  </div>
</template>

<style lang="scss">
@import './scss/theme.scss';
@import './scss/functions.scss';
body {
  @include boxSizing(border-box);
  background: $c-background;
  color: $c-foreground;
  font-family: $f-family;
  margin: 0;
  padding: 0;
  border: 0;
  font-size: 15pt;
  #header {
    @include boxSizing(border-box);
    width: 100%;
    padding: 2%;
    font-size: 2rem;
    @include boxShadow(0px,21px,70px,-22px,rgba(0,0,0,0.84));
  }
  #content {
    @include boxSizing(border-box);
    width: 100%;
    padding: 5% 2% 2% 2%;
  }
}
</style>
