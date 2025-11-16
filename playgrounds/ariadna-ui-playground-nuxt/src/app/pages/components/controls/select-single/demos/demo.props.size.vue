<template>
  <SelectSingle
    v-model="selectSingleValue"
    :options="options"
    label="Size is small"
    size="small"
    :filter="{ filterLabel: [[{ field: 'label' }]] }"
  />
  <SelectSingle
    v-model="selectSingleValue"
    :options="options"
    label="Size is medium"
    size="medium"
    :filter="{ filterLabel: [[{ field: 'label' }]] }"
  />
  <SelectSingle
    v-model="selectSingleValue"
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
import SelectSingle from '@iwyfaf-vue-ui/ariadna-ui/SelectSingle';

// Data
import { options } from './data';

const selectSingleValue = ref();
</script>
