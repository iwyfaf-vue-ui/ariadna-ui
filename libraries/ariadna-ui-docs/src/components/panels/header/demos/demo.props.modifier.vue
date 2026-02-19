<template>
  <Header modifier="primary" aria-label="prop-modifier">
    <template #logo>
      <a href="/">💩</a>
    </template>
  </Header>
</template>

<script setup lang="ts">
// Components
import Header from '@iwyfaf-vue-ui/ariadna-ui/Header';
</script>

<style lang="scss" scoped>
$header: '.ar-header';

#{$header} {
  position: relative;
}
</style>
