<template>
  <Chips v-model="chipsValue" label="Value remove emit" writable @remove="onRemove" />
</template>

<script setup lang="ts">
// Vue
import { ref } from 'vue';

// Components
import Chips from '@iwyfaf-vue-ui/ariadna-ui/Chips';

// Types
import type { TChipsEmitRemovePayload } from '@iwyfaf-vue-ui/ariadna-ui/Chips';

const chipsValue = ref(['Vue', 'React', 'Angular']);

function onRemove(event: TChipsEmitRemovePayload) {
  console.log(event);
}
</script>
