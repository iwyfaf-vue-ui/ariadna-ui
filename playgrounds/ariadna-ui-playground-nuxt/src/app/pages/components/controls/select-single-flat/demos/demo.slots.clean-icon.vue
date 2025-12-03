<template>
  <SelectSingleFlat
    v-model="selectSingleValue"
    :options="options"
    label="Иконка очистки выбранного значения"
  >
    <template #cleanIcon>
      <i class="icon-line-close"></i>
    </template>
  </SelectSingleFlat>
</template>

<script setup lang="ts">
// Vue
import { ref } from 'vue';

// Components
import SelectSingleFlat from '@iwyfaf-vue-ui/ariadna-ui/SelectSingleFlat';

// Data
import { options } from './data';

const selectSingleValue = ref();
</script>
