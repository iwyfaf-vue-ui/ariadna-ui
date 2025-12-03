<template>
  <SelectSingleFlat
    v-model="selectSingleFlatValue"
    :options="options"
    label="Disabled is on"
    disabled
  />
  <SelectSingleFlat
    v-model="selectSingleFlatValue"
    :options="options"
    label="Disabled is off"
    :disabled="false"
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
