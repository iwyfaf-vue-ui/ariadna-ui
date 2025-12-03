<template>
  <SelectSingleFlat
    v-model="selectSingleFlatValue"
    :options="options"
    label="Props aria-label"
    aria-label="Выпадающий список"
  />
</template>

<script setup lang="ts">
// Vue
import { ref } from 'vue';

// Components
import SelectSingleFlat from '@iwyfaf-vue-ui/ariadna-ui/SelectSingleFlat';

// Data
import { options } from './data';

const selectSingleFlatValue = ref(null);
</script>
