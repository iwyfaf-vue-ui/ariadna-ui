<template>
  <SelectSingleFlat v-model="selectSingleFlatValue" :options="options" label="Реализация vModel" />

  v-model value = {{ selectSingleFlatValue }}
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
