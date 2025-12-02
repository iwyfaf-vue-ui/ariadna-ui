<template>
  <SelectMultipleGroup v-model="selectMultipleGroupValue" :options="options" label="Default id" />
  <SelectMultipleGroup
    v-model="selectMultipleGroupValue"
    :options="options"
    label="Custom id"
    id="custom-id"
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
