<template>
  <h1>To Kebab</h1>

  <p>{{ toKebab('camelCase') }}</p>
  <p>{{ camelToKebabComputed }}</p>
</template>

<script setup lang="ts">
import toKebab from '@iwyfaf-vue-ui/ariadna-ui/CamelToKebab';

definePageMeta({
  layout: 'default',
});

useHead({
  title: 'To Kebab',
});

const camelToKebabComputed = computed(() => toKebab('xml-http-request'));
</script>
