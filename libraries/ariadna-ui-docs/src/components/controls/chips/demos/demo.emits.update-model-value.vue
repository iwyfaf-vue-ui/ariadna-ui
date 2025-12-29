<template>
  <Chips
    v-model="chipsValue"
    label="Update:model-value emit"
    writable
    @update:model-value="onUpdateModelValue"
  />
</template>

<script setup lang="ts">
// Vue
import { ref } from 'vue';

// Components
import Chips from '@iwyfaf-vue-ui/ariadna-ui/Chips';

// Types
import type { TChipsProps } from '@iwyfaf-vue-ui/ariadna-ui/Chips';

const chipsValue = ref(['Vue', 'React', 'Angular']);

function onUpdateModelValue(event: TChipsProps['modelValue']) {
  console.log(event);
}
</script>
