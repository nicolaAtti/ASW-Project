<template>
  <div id="app">
    <div class="lang_chooser">
      <select v-model="$i18n.locale">
        <option v-for="(lang, i) in languageArray" :key="`lang${i}`" :value="lang">{{lang}}</option>
      </select>
    </div>
    <router-view/>
  </div>
</template>

<script>

import router from "./router";

export default {
  name: 'App',
  
  data() {
  return {
    languageArray: ['en','it']
  };
},

  beforeMount() {
    router.push('login')
  }
}
</script>

<style>
  #app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin-top: 60px;
  }
  .lang_chooser{

  }
</style>
