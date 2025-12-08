<template>
  <SelectMultipleFlat
    v-model="selectMultipleFlatValue"
    :options="[]"
    label="Custom loadingIcon slot"
    placeholder="Загрузка..."
    loading
  >
    <template #loadingIcon>
      <Spinner />
    </template>
  </SelectMultipleFlat>
</template>

<script setup lang="ts">
// Vue
import { ref } from 'vue';

// Components
import SelectMultipleFlat from '@iwyfaf-vue-ui/ariadna-ui/SelectMultipleFlat';
import Spinner from '@iwyfaf-vue-ui/ariadna-ui/Spinner';

const selectMultipleFlatValue = ref([]);
</script>
