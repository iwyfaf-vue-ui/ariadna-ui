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
  mother: string;
  father: string;
  children: Array<{
    name: string;
    age: number;
  }>;
};

const data: Array<TData> = [
  {
    mother: 'Margareth Johnson',
    father: 'Benjamin Johnson',
    children: [
      {
        name: 'Angela Johnson',
        age: 17,
      },
      {
        name: 'Michael Johnson',
        age: 6,
      },
    ],
  },
  {
    mother: 'Susan Graham',
    father: 'Bill Graham',
    children: [
      {
        name: 'Bill Graham Jr.',
        age: 23,
      },
      {
        name: 'Kevin Graham',
        age: 2,
      },
    ],
  },
];

const filterValue = ref(null);
const filterValue2 = ref(null);
const result: Ref<Array<TData>> = ref([]);

function filterHandlerSelect(payload: string) {
  const filterBuilder = new FilterBuilder(data);

  result.value = filterBuilder
    .select('mother')
    .or()
    .select('father')
    .or()
    .select('children')
    .select('name')
    .filter<string>((item: string) => {
      return item.toLowerCase().includes(payload.toLowerCase());
    });
}

function filterHandlerConfigureFields(payload: string) {
  const filterBuilder = new FilterBuilder(data);

  result.value = filterBuilder
    .configureFields(
      [[{ field: 'mother' }], [{ field: 'father' }], [{ field: 'children' }, { field: 'name' }]],
      'OR',
    )
    .filter<string>((item: string) => {
      return item.toLowerCase().includes(payload.toLowerCase());
    });
}

filterHandlerSelect('');
filterHandlerConfigureFields('');
</script>
