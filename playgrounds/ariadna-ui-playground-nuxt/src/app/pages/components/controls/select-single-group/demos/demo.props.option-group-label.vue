<template>
  <SelectSingleGroup
    v-model="selectSingleGroupValue"
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
import SelectSingleGroup from '@iwyfaf-vue-ui/ariadna-ui/SelectSingleGroup';

// Data
import { options3 } from './data';

const selectSingleGroupValue = ref();
</script>
