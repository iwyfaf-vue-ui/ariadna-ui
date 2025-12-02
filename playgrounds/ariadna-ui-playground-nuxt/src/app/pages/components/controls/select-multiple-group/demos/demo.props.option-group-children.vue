<template>
  <SelectMultipleGroup
    v-model="selectMultipleGroupValue"
    :options="options4"
    option-label="customLabel"
    option-group-label="groupName"
    option-group-children="items"
    label="Кастомный option label"
  />
</template>

<script setup lang="ts">
// Vue
import { ref } from 'vue';

// Components
import SelectMultipleGroup from '@iwyfaf-vue-ui/ariadna-ui/SelectMultipleGroup';

// Data
import { options4 } from './data';

const selectMultipleGroupValue = ref([]);
</script>
