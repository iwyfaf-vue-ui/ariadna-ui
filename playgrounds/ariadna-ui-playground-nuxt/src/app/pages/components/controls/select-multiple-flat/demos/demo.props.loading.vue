<template>
  <SelectMultipleFlat
    v-model="selectMultipleFlatValue"
    :options="[]"
    label="Состояние loading"
    placeholder="Загрузка..."
    loading
  >
  </SelectMultipleFlat>
</template>

<script setup lang="ts">
// Vue
import { ref } from 'vue';

// Components
import SelectMultipleFlat from '@iwyfaf-vue-ui/ariadna-ui/SelectMultipleFlat';

const selectMultipleFlatValue = ref([]);
</script>
