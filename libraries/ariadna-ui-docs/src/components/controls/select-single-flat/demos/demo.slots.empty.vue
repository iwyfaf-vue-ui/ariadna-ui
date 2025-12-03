<template>
  <SelectSingleFlat v-model="selectSingleFlatValue" :options="[]" label="Реализация vModel">
    <template #empty> Нет данных для рендера. </template>
  </SelectSingleFlat>
</template>

<script setup lang="ts">
// Vue
import { ref } from 'vue';

// Components
import SelectSingleFlat from '@iwyfaf-vue-ui/ariadna-ui/SelectSingleFlat';

const selectSingleFlatValue = ref([]);
</script>
