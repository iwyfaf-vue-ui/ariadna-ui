<template>
  <div>
    <pre>{{ result }}</pre>

    <div>
      <Button @click="queryHandler">Применить query</Button>
      <Button @click="queryRemoveHandler">Очистить query</Button>
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

const query = new QueryBuilder({
  page: '1',
  search: undefined,
  filter: null,
  sort: 'name',
  categories: ['books', 'electronics'],
  limit: '10',
  ids: ['1', '2', undefined, '4'],
  counts: ['1', '2', null, '4'],
  books: [],
});

const result = query.clearQuery().buildQueryObject();

function queryHandler() {
  router.replace({ query: result });
}

function queryRemoveHandler() {
  router.replace({ query: query.removeQuery() });
}
</script>
