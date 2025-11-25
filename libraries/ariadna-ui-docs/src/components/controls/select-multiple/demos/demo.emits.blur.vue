<template>
  <SelectMultiple
    v-model="selectMultipleValue"
    :options="options"
    label="Blur emit"
    @blur="onBlur"
  />
</template>

<script setup lang="ts">
// Vue
import { ref } from 'vue';

// Components
import SelectMultiple from '@iwyfaf-vue-ui/ariadna-ui/SelectMultiple';

// Data
import { options } from './data';

const selectMultipleValue = ref();

function onBlur(event: Event) {
  console.log(event);
}
</script>
