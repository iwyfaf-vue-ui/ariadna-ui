<template>
  <h1>Themes</h1>

  <ShowcaseColors />
</template>

<script setup lang="ts">
// Components
import ShowcaseColors from '~/view/atoms/showcases/ShowcaseColors/view/AShowcaseColors.vue';

definePageMeta({
  layout: 'default',
});

useHead({
  title: 'Темы',
});
</script>
