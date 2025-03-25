<template>
  <h1>Fonts</h1>

  <AShowcaseFonts />
</template>

<script setup lang="ts">
// Components
import AShowcaseFonts from '~/view/atoms/showcases/ShowcaseFonts/view/AShowcaseFonts.vue';

definePageMeta({
  layout: 'default',
});

useHead({
  title: 'Шрифты',
});
</script>
