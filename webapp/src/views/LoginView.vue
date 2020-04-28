<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png">
    <Login msg="This is a placeholder for the login page"/>
  </div>
</template>

<script>
// @ is an alias to /src
import Login from '@/components/Login.vue'

export default {
  name: 'login',
  components: {
    Login
  }
}
</script>
