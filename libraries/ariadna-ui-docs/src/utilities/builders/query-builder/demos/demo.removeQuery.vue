<template>
  <div>
    <pre>{{ result }}</pre>

    <div>
      <Button @click="queryHandler">Применить query</Button>
      <Button @click="queryRemoveHandler">Удалить query</Button>
    </div>
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
  .setParam('page', '1')
  .setParam('sort', 'name')
  .setArrayParam('categories', ['books', 'electronics'])
  .setParam('limit', '10')
  .buildQueryObject();

function queryHandler() {
  router.replace({ query: result });
}

function queryRemoveHandler() {
  router.replace({ query: query.removeQuery() });
}
</script>
