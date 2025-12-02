<template>
  <SelectMultipleGroup
    v-model="selectMultipleGroupValue"
    :options="options"
    label="Переопределение label для отображаемых элементов"
    :max-selected-labels="3"
    selected-items-label="Выбрано элементов: {0}"
  />

  <SelectMultipleGroup
    v-model="selectMultipleGroupValue"
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
import SelectMultipleGroup from '@iwyfaf-vue-ui/ariadna-ui/SelectMultipleGroup';

// Data
import { options } from './data';

const selectMultipleGroupValue = ref([]);
</script>
