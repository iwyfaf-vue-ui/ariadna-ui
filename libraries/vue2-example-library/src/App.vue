<template>
  <div id="app">
    <Button color="black" />
  </div>
</template>

<script>
import Button from './components/Button.vue';
export default {
  components: {
    Button,
  },
};
</script>

<style>
#app {
  margin-top: 60px;
  font-family: Avenir, Helvetica, Arial, sans-serif;
  color: #2c3e50;
  text-align: center;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>
