<template>
  <SelectMultipleGroup
    v-model="selectMultipleGroupValue"
    :options="options"
    label="Custom cssClass"
    css-class="custom-input-text"
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
