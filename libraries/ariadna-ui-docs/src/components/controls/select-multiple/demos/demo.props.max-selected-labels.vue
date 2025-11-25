<template>
  <SelectMultiple
    v-model="selectMultipleValue"
    :options="options"
    label="Максимальное количество отображаемых элементов - 3"
    :max-selected-labels="3"
  />

  <SelectMultiple
    v-model="selectMultipleValue"
    :options="options"
    label="Максимальное количество отображаемых элементов - 3"
    tiles
    :max-selected-labels="3"
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
