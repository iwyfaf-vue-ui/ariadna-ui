<template>
  <SelectSingle
    v-model="selectSingleValue"
    :options="[]"
    label="Иконка загрузки в контроле"
    placeholder="Загрузка..."
    loading
  >
    <template #loadingIcon>
      <Spinner />
    </template>
  </SelectSingle>
</template>

<script setup lang="ts">
// Vue
import { ref } from 'vue';

// Components
import SelectSingle from '@iwyfaf-vue-ui/ariadna-ui/SelectSingle';
import Spinner from '@iwyfaf-vue-ui/ariadna-ui/Spinner';

const selectSingleValue = ref();
</script>
