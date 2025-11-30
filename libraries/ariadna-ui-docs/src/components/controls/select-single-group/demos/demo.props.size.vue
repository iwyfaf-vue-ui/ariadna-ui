<template>
  <SelectSingleGroup
    v-model="selectSingleGroupValue"
    :options="options"
    label="Size is small"
    size="small"
    :filter="{ filterLabel: [[{ field: 'label' }]] }"
  />
  <SelectSingleGroup
    v-model="selectSingleGroupValue"
    :options="options"
    label="Size is medium"
    size="medium"
    :filter="{ filterLabel: [[{ field: 'label' }]] }"
  />
  <SelectSingleGroup
    v-model="selectSingleGroupValue"
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
import SelectSingleGroup from '@iwyfaf-vue-ui/ariadna-ui/SelectSingleGroup';

// Data
import { options } from './data';

const selectSingleGroupValue = ref();
</script>
