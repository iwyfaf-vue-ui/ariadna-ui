<template>
  <SelectSingleGroup
    v-model="selectSingleGroupValue"
    :options="options"
    label="Invalid is on"
    invalid
  />
  <SelectSingleGroup
    v-model="selectSingleGroupValue"
    :options="options"
    label="Invalid is off"
    :invalid="false"
  />
</template>

<script setup lang="ts">
// Vue
import { ref } from 'vue';

// Components
import SelectSingleGroup from '@iwyfaf-vue-ui/ariadna-ui/SelectSingleGroup';

// Data
import { options } from './data';

const selectSingleGroupValue = ref();
</script>
