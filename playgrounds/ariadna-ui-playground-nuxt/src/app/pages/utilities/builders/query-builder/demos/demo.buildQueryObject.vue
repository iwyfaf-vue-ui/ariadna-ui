<template>
  <pre>{{ result }}</pre>

  <div>
    <Button @click="queryHandler">Применить query</Button>
  </div>
</template>

<script setup lang="ts">
// Vue
import { useRouter } from 'vue-router';

// Components
import Button from '@iwyfaf-vue-ui/ariadna-ui/Button';

// Utilities
import QueryBuilder from '@iwyfaf-vue-ui/ariadna-ui/QueryBuilder';

const router = useRouter();

const query = new QueryBuilder();
const result = query
  .setParam('example', '123')
  .setArrayParam('tags', ['javascript', 'frontend'])
  .buildQueryObject();

function queryHandler() {
  router.replace({ query: result });
}
</script>
