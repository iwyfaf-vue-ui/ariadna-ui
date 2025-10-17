<template>
  <InputText
    v-model="filterValue"
    label="Укажите фамилию человека. Фильтрация с помощью метода Select."
    @update:model-value="filterHandlerSelect"
  />

  <InputText
    v-model="filterValue2"
    label="Укажите фамилию человека. Фильтрация с помощью метода configureFields."
    @update:model-value="filterHandlerConfigureFields"
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

type TData = {
  name: string;
  lastname: string;
  age: number;
  gender: 'male' | 'female';
};

const data: Array<TData> = [
  { name: 'Dean', lastname: 'Winchester', age: 18, gender: 'male' },
  { name: 'Sam', lastname: 'Winchester', age: 24, gender: 'male' },
  { name: 'Natalia', lastname: 'Oreiro', age: 35, gender: 'female' },
];

const filterValue = ref(null);
const filterValue2 = ref(null);
const result: Ref<Array<TData>> = ref([]);

function filterHandlerSelect(payload: string) {
  const filterBuilder = new FilterBuilder(data);

  result.value = filterBuilder.select('lastname').filter<string>((item: string) => {
    return item.toLowerCase().includes(payload.toLowerCase());
  });
}

function filterHandlerConfigureFields(payload: string) {
  const filterBuilder = new FilterBuilder(data);

  result.value = filterBuilder
    .configureFields([[{ field: 'lastname' }]])
    .filter<string>((item: string) => {
      return item.toLowerCase().includes(payload.toLowerCase());
    });
}

filterHandlerSelect('');
filterHandlerConfigureFields('');
</script>
