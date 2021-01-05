<template>
    <md-button v-if="logged" class="md-primary" @click="logout">Wyloguj się</md-button>
</template>

<script>
import router from '../router/index'
import { AuthService } from '../services/AuthService'
export default {
  name: 'ButtonLogout',
  data: () => {
      return {
          logged: false,
          subscription: null
      }
  },
  created() {
      this.logged = AuthService.isUserLoggedIn();
      this.subscription = AuthService.OnUserStateChanged.subscribe(()=> {
          this.logged = AuthService.isUserLoggedIn();
      })
  },
  destroy() {
      if(this.subscription != null) {
          this.subscription.unsubscribe()
          this.subscription = null;
      } 
  },
  methods: {
    logout() {
        AuthService.logout().then(()=>{
            if(router.currentRoute.path != '/login')
                router.push('/login')
            this.logged = false
        })
    },
  },
}
</script>

<style scoped>
</style>
