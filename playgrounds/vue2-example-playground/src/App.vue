<template>
  <div id="app">
    <Button color="red"/>
  </div>
</template>

<script>
import { Button } from "@example/vue2-example-library";

export default {
  components: {
    Button
  }
}
</script>

<style>
@import '../node_modules/@example/vue2-example-library/dist/style.css';

#app {
  margin-top: 60px;
  font-family: Avenir, Helvetica, Arial, sans-serif;
  color: #2c3e50;
  text-align: center;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>
