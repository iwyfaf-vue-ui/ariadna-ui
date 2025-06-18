<template>
  {{ result }}
</template>

<script setup lang="ts">
// Utilities
import QueryBuilder from '@iwyfaf-vue-ui/ariadna-ui/QueryBuilder';

const query = new QueryBuilder();
const result = query.setArrayParam('tags', ['javascript', 'frontend']);
</script>
