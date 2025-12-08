<template>
  <SelectMultipleFlat
    v-model="selectMultipleFlatValue"
    :options="optionsStrings"
    label="Valid is on"
    valid
  />
  <SelectMultipleFlat
    v-model="selectMultipleFlatValue"
    :options="optionsStrings"
    label="Valid is off"
    :valid="false"
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
