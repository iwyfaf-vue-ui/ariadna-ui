<template>
  <SelectSingleFlat
    v-model="selectSingleFlatValue"
    :options="options"
    label="Blur emit"
    @blur="onBlur"
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

function onBlur(event: Event) {
  console.log(event);
}
</script>
