<template>
  <SelectMultipleGroup
    v-model="selectMultipleGroupValue"
    :options="options2"
    option-label="customLabel"
    label="Кастомный option label"
  />
</template>

<script setup lang="ts">
// Vue
import { ref } from 'vue';

// Components
import SelectMultipleGroup from '@iwyfaf-vue-ui/ariadna-ui/SelectMultipleGroup';

// Data
import { options2 } from './data';

const selectMultipleGroupValue = ref([]);
</script>
