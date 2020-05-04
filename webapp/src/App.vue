<template>
  <div id="app">
    <div class="lang_chooser">
      <select class="language" v-model="$i18n.locale">
        <option v-for="(lang, i) in languageArray" :key="`lang${i}`" :value="lang">{{ $t(lang+"_lang")}}</option>
      </select>
    </div>
    <router-view class="pages"/>
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
    margin-top: 2%;
  }

  .lang_chooser {
    position: absolute;
    top: 1%;
    right: 5%;
  }

  .lang_chooser select {
    color: #fff;
    padding: 8% 8% 8% 8%;
    -webkit-appearance: button;
    background: #2A88AD;
    -moz-box-shadow: inset 0 2px 2px 0 rgba(255, 255, 255, 0.17);
    -webkit-box-shadow: inset 0 2px 2px 0 rgba(255, 255, 255, 0.17);
    box-shadow: inset 0 2px 2px 0 rgba(255, 255, 255, 0.17);
    border: 1px solid #257C9E;
  }

  .pages{
    position: relative;
    top: 30px;
  }

</style>
