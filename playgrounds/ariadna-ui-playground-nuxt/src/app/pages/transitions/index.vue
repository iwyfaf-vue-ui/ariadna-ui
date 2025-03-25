<template>
  <h1>Transitions</h1>

  <AShowcaseTransitions />
</template>

<script setup lang="ts">
// Components
import AShowcaseTransitions from '~/view/atoms/showcases/ShowcaseTransitions/view/AShowcaseTransitions.vue';

definePageMeta({
  layout: 'default',
});

useHead({
  title: 'Темы',
});
</script>
