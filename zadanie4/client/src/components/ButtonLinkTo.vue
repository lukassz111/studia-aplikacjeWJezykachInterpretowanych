<template>
    <md-button class="md-primary" @click="go_route">{{display}}</md-button>
</template>

<script>
export default {
  name: 'ButtonLinkTo',
  props: {
    to: String,
    display: String,
  },
  methods: {
    go_route() {
      this.$router.replace({path: this.to})
    },
  }
}
</script>

<style scoped>
</style>
