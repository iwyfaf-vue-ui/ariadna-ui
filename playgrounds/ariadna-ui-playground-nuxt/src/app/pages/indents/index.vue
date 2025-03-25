<template>
  <h1>Indents</h1>

  <AShowcaseIndents />
</template>

<script setup lang="ts">
// Components
import AShowcaseIndents from '~/view/atoms/showcases/ShowcaseIndents/view/AShowcaseIndents.vue';

definePageMeta({
  layout: 'default',
});

useHead({
  title: 'Темы',
});
</script>
