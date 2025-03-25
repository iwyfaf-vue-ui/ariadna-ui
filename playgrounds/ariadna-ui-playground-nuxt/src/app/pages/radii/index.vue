<template>
  <h1>Radii</h1>

  <AShowcaseRadii />
</template>

<script setup lang="ts">
// Components
import AShowcaseRadii from '~/view/atoms/showcases/ShowcaseRadii/view/AShowcaseRadii.vue';

definePageMeta({
  layout: 'default',
});

useHead({
  title: 'Темы',
});
</script>
