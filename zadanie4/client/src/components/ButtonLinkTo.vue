<template>
    <md-button class="md-primary" @click="go_route">{{display}}</md-button>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component
export default class ButtonLinkTo extends Vue {
  @Prop() private to!: string;
  @Prop() private display!: string;
  private go_route() {
    this.$router.replace({path: this.to})
  }
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
