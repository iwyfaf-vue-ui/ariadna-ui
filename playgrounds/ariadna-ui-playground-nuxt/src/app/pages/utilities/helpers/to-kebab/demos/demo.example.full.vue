<template>
  <p>{{ toKebab('camelCase') }}</p>

  <p>{{ camelToKebabComputed }}</p>
</template>

<script setup lang="ts">
// Utils
import toKebab from '@iwyfaf-vue-ui/ariadna-ui/ToKebab';

const camelToKebabComputed = computed(() => toKebab('XmlHttpRequest'));
</script>
