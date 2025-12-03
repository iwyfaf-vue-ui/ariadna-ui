<template>
  <SelectSingleFlat
    v-model="selectSingleFlatValue"
    :options="options"
    label="Size is small"
    size="small"
    filter
  />
  <SelectSingleFlat
    v-model="selectSingleFlatValue"
    :options="options"
    label="Size is medium"
    size="medium"
    filter
  />
  <SelectSingleFlat
    v-model="selectSingleFlatValue"
    :options="options"
    label="Size is large"
    size="large"
    filter
  />
</template>

<script setup lang="ts">
// Vue
import { ref } from 'vue';

// Components
import SelectSingleFlat from '@iwyfaf-vue-ui/ariadna-ui/SelectSingleFlat';

// Data
import { options } from './data';

const selectSingleFlatValue = ref([]);
</script>
