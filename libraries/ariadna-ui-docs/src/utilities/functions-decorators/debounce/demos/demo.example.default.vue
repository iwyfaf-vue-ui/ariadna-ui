<template>
  <div>
    <InputText
      v-model="inputValue"
      type="text"
      placeholder="Попробуй быстро печатать"
      @update:model-value="handleInput"
    />

    <p>Результат: {{ searchQuery }}</p>
  </div>
</template>

<script setup lang="ts">
// Vue
import { ref } from 'vue';

// Components
import InputText from '@iwyfaf-vue-ui/ariadna-ui/InputText';

// Utilities
import debounce from '@iwyfaf-vue-ui/ariadna-ui/Debounce';

// Types
import type { TInputTextProps } from '@iwyfaf-vue-ui/ariadna-ui/InputText';
import type { Nullable } from '@iwyfaf-vue-ui/ariadna-ui/types';

const inputValue = ref(null);
const searchQuery = ref<Nullable<string>>('');

const handleInput = debounce((payload: TInputTextProps['modelValue']) => {
  searchQuery.value = payload;
}, 500);
</script>
