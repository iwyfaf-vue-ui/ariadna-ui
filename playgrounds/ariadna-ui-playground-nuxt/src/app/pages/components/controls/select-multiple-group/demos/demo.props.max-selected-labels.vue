<template>
  <SelectMultipleGroup
    v-model="selectMultipleGroupValue"
    :options="options"
    label="Максимальное количество отображаемых элементов - 3"
    :max-selected-labels="3"
  />

  <SelectMultipleGroup
    v-model="selectMultipleGroupValue"
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
import SelectMultipleGroup from '@iwyfaf-vue-ui/ariadna-ui/SelectMultipleGroup';

// Data
import { options } from './data';

const selectMultipleGroupValue = ref([]);
</script>
