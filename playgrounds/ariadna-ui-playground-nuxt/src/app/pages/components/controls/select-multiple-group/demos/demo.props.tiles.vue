<template>
  <SelectMultipleGroup
    v-model="selectMultipleGroupValue"
    :options="options"
    label="Значение в виде плиток"
    tiles
  />
</template>

<script setup lang="ts">
// Vue
import { ref } from 'vue';

// Components
import SelectMultipleGroup from '@iwyfaf-vue-ui/ariadna-ui/SelectMultipleGroup';

// Data
import { options } from './data';

const selectMultipleGroupValue = ref([]);
</script>
