<template>
  <Chips v-model="chipsValue" label="Value add emit" writable @add="onAdd" />
</template>

<script setup lang="ts">
// Vue
import { ref } from 'vue';

// Components
import Chips from '@iwyfaf-vue-ui/ariadna-ui/Chips';

// Types
import type { TChipsEmitAddPayload } from '@iwyfaf-vue-ui/ariadna-ui/Chips';

const chipsValue = ref(['Vue', 'React', 'Angular']);

function onAdd(event: TChipsEmitAddPayload) {
  console.log(event);
}
</script>
