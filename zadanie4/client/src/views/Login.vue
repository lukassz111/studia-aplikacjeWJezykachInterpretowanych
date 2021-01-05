<template>
  <div>
    <md-button class="md-primary"  @click="logInAsUser">Zaloguj jako zwykły użytkownik</md-button>
    <md-button class="md-primary"  @click="logInAsAdmin">Zaloguj jako administrator</md-button>
  </div>
</template>

<script>
import router from '../router/index'
import { AuthService } from '../services/AuthService'
export default {
  name: 'Login',
  methods: {
      logInAsUser() {
        AuthService.logInAsUser().then(()=>{
          router.push('/').catch(() => {
            console.log("redirect")
          })
        })
      },
      logInAsAdmin() {
        AuthService.logInAsAdmin().then(()=>{
          router.push('/').catch(() => {
            console.log("redirect")
          })
        })
      }
  },
  created() {
  }
}
</script>