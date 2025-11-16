<template>
  <SelectSingle v-model="selectSingleValue" :options="options" label="Default id" />
  <SelectSingle v-model="selectSingleValue" :options="options" label="Custom id" id="custom-id" />
</template>

<script setup lang="ts">
// Vue
import { ref } from 'vue';

// Components
import SelectSingle from '@iwyfaf-vue-ui/ariadna-ui/SelectSingle';

// Data
import { options } from './data';

const selectSingleValue = ref();
</script>
