<template>
  <SelectMultipleFlat
    v-model="selectMultipleFlatValue"
    :options="optionsStrings"
    label="Максимальное количество отображаемых элементов - 3"
    :max-selected-labels="3"
  />

  <SelectMultipleFlat
    v-model="selectMultipleFlatValue"
    :options="optionsStrings"
    label="Максимальное количество отображаемых элементов - 3"
    tiles
    :max-selected-labels="3"
  />
</template>

<script setup lang="ts">
// Vue
import { ref } from 'vue';

// Components
import SelectMultipleFlat from '@iwyfaf-vue-ui/ariadna-ui/SelectMultipleFlat';

// Data
import { optionsStrings } from './data';

const selectMultipleFlatValue = ref([]);
</script>
