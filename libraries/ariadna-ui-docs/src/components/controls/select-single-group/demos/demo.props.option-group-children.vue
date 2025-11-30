<template>
  <SelectSingleGroup
    v-model="selectSingleGroupValue"
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
import SelectSingleGroup from '@iwyfaf-vue-ui/ariadna-ui/SelectSingleGroup';

// Data
import { options4 } from './data';

const selectSingleGroupValue = ref();
</script>
