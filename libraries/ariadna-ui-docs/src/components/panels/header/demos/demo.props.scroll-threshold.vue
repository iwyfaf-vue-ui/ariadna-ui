<template>
  <Header :scroll-threshold="100" aria-label="prop-threshold">
    <template #logo>
      <a href="/">💩</a>
    </template>

    После 300px к Header добавиться модификатор `--scrolled`.
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
