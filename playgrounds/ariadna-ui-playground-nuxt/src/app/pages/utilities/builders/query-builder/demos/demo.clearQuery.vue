<template>
  <div>
    <pre>{{ result }}</pre>

    <div>
      <Button @click="queryHandler">Применить query</Button>
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
  .setParam('search', undefined) // будет проигнорировано
  .setParam('filter', null) // будет проигнорировано
  .setParam('sort', 'name')
  .setArrayParam('categories', ['books', 'electronics'])
  .setParam('limit', '10')
  .setParam('user', undefined) // будет проигнорировано
  .setArrayParam('ids', ['1', '2', undefined, '4']) // undefined будет удален
  .setArrayParam('counts', ['1', '2', null, '4']) // null будет удален
  .setArrayParam('books', []); // пустой маасив будет удален

function queryHandler() {
  router.replace({ query: query.clearQuery().buildQueryObject() });
}
</script>
