<template>
  <div>
    <md-snackbar v-for="(message, index) in messages" :key="message" :md-persistent="true" md-position="left" :md-active.sync="show" :style="'bottom: '+(10+(50*index))+'px'">
      <span>{{message}}</span>
      <!--<md-button class="md-primary">Zamknij</md-button>-->
    </md-snackbar>
  </div>
</template>

<script>
import { SnackbarService } from './../services/SnackbarService'
export default {
  name: 'Snackbar',
  data: () => ({
    snacbkarServiceInterval: null,
    show: true,
    messages: []
  }),
  created() {
    let intervalMilliseconds = 1000
    this.snacbkarServiceInterval = window.setInterval(()=>{
      SnackbarService.update(intervalMilliseconds)
      this.messages = SnackbarService.getData().map((el)=>{
        return el.message
      })
    },intervalMilliseconds)
  },
  destroyed() {
    if(this.snacbkarServiceInterval != null) {
      window.clearInterval(this.snacbkarServiceInterval)
      this.snacbkarServiceInterval = null
    }
  }
}
</script>

<style scoped>
</style>
