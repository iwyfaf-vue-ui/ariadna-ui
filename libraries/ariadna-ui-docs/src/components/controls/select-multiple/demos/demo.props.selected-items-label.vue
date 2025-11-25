<template>
  <SelectMultiple
    v-model="selectMultipleValue"
    :options="options"
    label="Переопределение label для отображаемых элементов"
    :max-selected-labels="3"
    selected-items-label="Выбрано элементов: {0}"
  />

  <SelectMultiple
    v-model="selectMultipleValue"
    :options="options"
    label="Переопределение label для отображаемых элементов"
    tiles
    :max-selected-labels="3"
    selected-items-label="Выбрано элементов: {0}"
  />
</template>

<script setup lang="ts">
// Vue
import { ref } from 'vue';

// Components
import SelectMultiple from '@iwyfaf-vue-ui/ariadna-ui/SelectMultiple';

// Data
import { options } from './data';

const selectMultipleValue = ref();
</script>
