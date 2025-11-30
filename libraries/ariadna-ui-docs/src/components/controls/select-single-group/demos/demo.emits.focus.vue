<template>
  <SelectSingleGroup
    v-model="selectSingleGroupValue"
    :options="options"
    label="Focus emit"
    @focus="onFocus"
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

function onFocus(event: Event) {
  console.log(event);
}
</script>
