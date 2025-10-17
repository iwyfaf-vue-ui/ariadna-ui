<template>
  <InputText
    v-model="filterValue"
    label="Укажите фамилию или возраст или страну рождения человека. Фильтрация с помощью метода Select."
    @update:model-value="filterHandlerSelect"
  />

  <InputText
    v-model="filterValue2"
    label="Укажите фамилию или возраст или страну рождения человека. Фильтрация с помощью метода configureFields."
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
  passport: {
    country: string | null;
  };
};

const data: Array<TData> = [
  {
    name: 'Dean',
    lastname: 'Winchester',
    age: 18,
    gender: 'male',
    passport: {
      country: 'USA',
    },
  },
  {
    name: 'Sam',
    lastname: 'Winchester',
    age: 24,
    gender: 'male',
    passport: {
      country: 'USA',
    },
  },
  {
    name: 'Natalia',
    lastname: 'Oreiro',
    age: 35,
    gender: 'female',
    passport: {
      country: 'Argentina',
    },
  },
  {
    name: 'John',
    lastname: 'Doe',
    age: 99,
    gender: 'male',
    passport: {
      country: null,
    },
  },
];

const filterValue = ref(null);
const filterValue2 = ref(null);
const result: Ref<Array<TData>> = ref([]);

function filterHandlerSelect(payload: string | number) {
  const filterBuilder = new FilterBuilder(data);

  result.value = filterBuilder
    .select('lastname')
    .or()
    .select('age')
    .or()
    .select('passport')
    .select('country')
    .filter<string | number>((item: string | number) => {
      return item.toString().toLowerCase().includes(payload.toString().toLowerCase());
    });
}

function filterHandlerConfigureFields(payload: string | number) {
  const filterBuilder = new FilterBuilder(data);

  result.value = filterBuilder
    .configureFields(
      [[{ field: 'lastname' }], [{ field: 'age' }], [{ field: 'passport' }, { field: 'country' }]],
      'OR',
    )
    .filter<string | number>((item: string | number) => {
      return item.toString().toLowerCase().includes(payload.toString().toLowerCase());
    });
}

filterHandlerSelect('');
filterHandlerConfigureFields('');
</script>
