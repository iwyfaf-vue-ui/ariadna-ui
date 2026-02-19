<template>
  <Header :scroll-threshold="100" @scrolled="onScrolled" aria-label="emit-scrolled">
    <template #logo>
      <a href="/">💩</a>
    </template>
  </Header>
</template>

<script setup lang="ts">
// Components
import Header from '@iwyfaf-vue-ui/ariadna-ui/Header';

function onScrolled(payload: boolean) {
  console.log(payload);
}
</script>

<style lang="scss" scoped>
$header: '.ar-header';

#{$header} {
  position: relative;
}
</style>
