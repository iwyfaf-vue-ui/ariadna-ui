<template>
  <InputText
    v-model="filterValue"
    label="Укажите этаж и получите список адресов с этажностью больше или равно указанной. Аналог Select."
    @update:model-value="filterHandlerSelect"
  />
  <InputText
    v-model="filterValue"
    label="Укажите имя элемента или этаж и получите список адресов отвечающий одному из введеных вами значений. Аналог Or."
    @update:model-value="filterHandlerOr"
  />
  <InputText
    v-model="filterValue"
    label="Укажите имя элемента или этаж и получите список адресов отвечающий обоим указанным вами значениям. Аналог Or."
    @update:model-value="filterHandlerAnd"
  />

  <pre>{{ result }}</pre>
</template>

<script setup lang="ts">
// Vue
import { type Ref } from 'vue';
import { ref } from 'vue';

// Components
import InputText from '@iwyfaf-vue-ui/ariadna-ui/InputText';

// Utilities
import FilterBuilder from '@iwyfaf-vue-ui/ariadna-ui/FilterBuilder';

// Data
import { arrayWithNestedProperties, type TArrayWithNestedProperties } from './data';

const filterValue = ref(null);
const result: Ref<Array<TArrayWithNestedProperties>> = ref([]);

function filterHandlerSelect(payload: string | number) {
  const filterBuilder = new FilterBuilder(arrayWithNestedProperties);

  result.value = filterBuilder
    .configureFields([[{ field: 'address' }, { field: 'house' }, { field: 'floor' }]])
    .filter<number>((item: number | string) => {
      if (typeof item === 'string' && typeof payload === 'string') {
        return item.toLowerCase().includes(payload.toLowerCase());
      }

      if (typeof item === 'number' && !isNaN(Number(payload))) {
        return item >= Number(payload);
      }

      return false;
    });
}

function filterHandlerOr(payload: string | number) {
  const filterBuilder = new FilterBuilder(arrayWithNestedProperties);

  result.value = filterBuilder
    .configureFields(
      [[{ field: 'name' }], [{ field: 'address' }, { field: 'house' }, { field: 'floor' }]],
      'OR',
    )
    .filter<number>((item: number | string) => {
      if (typeof item === 'string' && typeof payload === 'string') {
        return item.toLowerCase().includes(payload.toLowerCase());
      }

      if (typeof item === 'number' && !isNaN(Number(payload))) {
        return item >= Number(payload);
      }

      return false;
    });
}

function filterHandlerAnd(payload: string | number) {
  const filterBuilder = new FilterBuilder(arrayWithNestedProperties);

  result.value = filterBuilder
    .configureFields(
      [[{ field: 'name' }], [{ field: 'address' }, { field: 'house' }, { field: 'floor' }]],
      'AND',
    )
    .filter<number>((item: number | string) => {
      if (typeof item === 'string' && typeof payload === 'string') {
        return item.toLowerCase().includes(payload.toLowerCase());
      }

      if (typeof item === 'number' && !isNaN(Number(payload))) {
        return item >= Number(payload);
      }

      return false;
    });
}

filterHandlerSelect('');
filterHandlerOr('');
filterHandlerAnd('');
</script>
