<template>
  <Chips v-model="chipsValue" label="Реализация слота chip" writable clearable>
    <template #input="{ id, inputValue }">
      <input :value="inputValue" type="text" :id="id" placeholder="Custom input value" />
    </template>
  </Chips>
</template>

<script setup lang="ts">
// Vue
import { ref } from 'vue';

// Components
import Chips from '@iwyfaf-vue-ui/ariadna-ui/Chips';

const chipsValue = ref(['Vue', 'React', 'Angular']);
</script>
