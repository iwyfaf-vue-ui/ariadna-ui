<template>
  {{ result }}
</template>

<script setup lang="ts">
// Utilities
import QueryBuilder from '@iwyfaf-vue-ui/ariadna-ui/QueryBuilder';

const query = new QueryBuilder();
const result = query
  .setParam('example', '123')
  .setArrayParam('tags', ['javascript', 'frontend'])
  .buildQueryString();
</script>
