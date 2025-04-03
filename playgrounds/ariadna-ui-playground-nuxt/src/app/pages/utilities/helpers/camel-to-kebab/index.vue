<template>
  <h1>Camel to Kebab</h1>

  <p>{{ camelToKebab('camelCase') }}</p>
  <p>{{ camelToKebabComputed }}</p>
</template>

<script setup lang="ts">
import camelToKebab from '@iwyfaf-vue-ui/ariadna-ui/CamelToKebab';

definePageMeta({
  layout: 'default',
});

useHead({
  title: 'Camel to Kebab',
});

const camelToKebabComputed = computed(() => camelToKebab('xml-http-request'));
</script>
