<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <button @click="testRoute">TestRoute</button>
  </div>
</template>

<script>
import router from "../router";

export default {
  name: 'HelloWorld',
  props: {
    msg: String
  },
  methods:{
    testRoute() {
      router.push('Register')
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
