<template>
  <SelectMultiple
    v-model="selectMultipleValue"
    :options="options"
    label="Size is small"
    size="small"
    :filter="{ filterLabel: [[{ field: 'label' }]] }"
  />
  <SelectMultiple
    v-model="selectMultipleValue"
    :options="options"
    label="Size is medium"
    size="medium"
    :filter="{ filterLabel: [[{ field: 'label' }]] }"
  />
  <SelectMultiple
    v-model="selectMultipleValue"
    :options="options"
    label="Size is large"
    size="large"
    :filter="{ filterLabel: [[{ field: 'label' }]] }"
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
