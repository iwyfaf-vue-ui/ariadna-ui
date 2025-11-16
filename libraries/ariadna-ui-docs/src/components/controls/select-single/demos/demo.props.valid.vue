<template>
  <SelectSingle v-model="selectSingleValue" :options="options" label="Valid is on" valid />
  <SelectSingle
    v-model="selectSingleValue"
    :options="options"
    label="Valid is off"
    :valid="false"
  />
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
