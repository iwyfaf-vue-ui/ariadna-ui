<template>
  <SelectMultipleGroup
    v-model="selectMultipleGroupValue"
    :options="options"
    label="Size is small"
    size="small"
    :filter="{ filterLabel: [[{ field: 'children' }, { field: 'label' }]] }"
  />
  <SelectMultipleGroup
    v-model="selectMultipleGroupValue"
    :options="options"
    label="Size is medium"
    size="medium"
    :filter="{ filterLabel: [[{ field: 'children' }, { field: 'label' }]] }"
  />
  <SelectMultipleGroup
    v-model="selectMultipleGroupValue"
    :options="options"
    label="Size is large"
    size="large"
    :filter="{ filterLabel: [[{ field: 'children' }, { field: 'label' }]] }"
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
