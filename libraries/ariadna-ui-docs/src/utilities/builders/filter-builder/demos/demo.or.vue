<template>
  <InputText
    v-model="filterValue"
    label="Укажите имя элемента или этаж и получите список адресов отвечающий одному из введеных вами значений"
    @update:model-value="filterHandler"
  />

  <pre>{{ result }}</pre>
</template>

<script setup lang="ts">
// Vue
import type { Ref } from 'vue';
import { ref } from 'vue';

// Components
import InputText from '@iwyfaf-vue-ui/ariadna-ui/InputText';

// Utilities
import FilterBuilder from '@iwyfaf-vue-ui/ariadna-ui/FilterBuilder';

// Data
import { arrayWithNestedProperties, type TArrayWithNestedProperties } from './data';

const filterValue = ref(null);
const result: Ref<Array<TArrayWithNestedProperties>> = ref([]);

function filterHandler(payload: string | number) {
  const filterBuilder = new FilterBuilder(arrayWithNestedProperties);

  result.value = filterBuilder
    .select('name')
    .or()
    .select('address')
    .select('house')
    .select('floor')
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

filterHandler('');
</script>
