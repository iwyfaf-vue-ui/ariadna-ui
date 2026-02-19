<template>
  <Header aria-label="slot-right">
    <template #logo>
      <a href="/">💩</a>
    </template>

    <template #right> Right slot content </template>
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
