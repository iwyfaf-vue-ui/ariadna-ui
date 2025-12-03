<template>
  <SelectSingleFlat
    v-model="selectSingleFlatValue"
    :options="options"
    label="Иконка открытия списка опций"
  >
    <template #toggleIcon>
      <i class="icon-line-chevron-down"></i>
    </template>
  </SelectSingleFlat>
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
