<template>
    <md-button class="md-primary" @click="go_route">{{display}}</md-button>
</template>

<script>
import router from '../router/index'
export default {
  name: 'ButtonLinkTo',
  props: {
    to: String,
    display: String,
  },
  methods: {
    go_route() {
      if(router.currentRoute.fullPath != this.to) {
        router.push(this.to).catch(() => {
          //console.log("redirect to: "+this.to)
        })
      }
    },
  }
}
</script>

<style scoped>
</style>
