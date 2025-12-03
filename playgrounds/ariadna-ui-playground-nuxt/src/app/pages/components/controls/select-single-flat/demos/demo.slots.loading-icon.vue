<template>
  <SelectSingleFlat
    v-model="selectSingleFlatValue"
    :options="[]"
    label="Иконка загрузки в контроле"
    placeholder="Загрузка..."
    loading
  >
    <template #loadingIcon>
      <Spinner />
    </template>
  </SelectSingleFlat>
</template>

<script setup lang="ts">
// Vue
import { ref } from 'vue';

// Components
import SelectSingleFlat from '@iwyfaf-vue-ui/ariadna-ui/SelectSingleFlat';
import Spinner from '@iwyfaf-vue-ui/ariadna-ui/Spinner';

const selectSingleFlatValue = ref(null);
</script>
