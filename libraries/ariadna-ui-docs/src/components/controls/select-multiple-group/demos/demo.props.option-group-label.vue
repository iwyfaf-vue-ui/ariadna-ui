<template>
  <SelectMultipleGroup
    v-model="selectMultipleGroupValue"
    :options="options3"
    option-label="customLabel"
    option-group-label="groupName"
    label="Кастомный option label"
  />
</template>

<script setup lang="ts">
// Vue
import { ref } from 'vue';

// Components
import SelectMultipleGroup from '@iwyfaf-vue-ui/ariadna-ui/SelectMultipleGroup';

// Data
import { options3 } from './data';

const selectMultipleGroupValue = ref([]);
</script>
