<template>
  <SelectSingle
    v-model="selectSingleValue"
    :options="options"
    label="Focus emit"
    @focus="onFocus"
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

function onFocus(event: Event) {
  console.log(event);
}
</script>
