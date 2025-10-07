<template>
  <InputPassword
    v-model="inputPasswordValue"
    label="Update:model-value emit"
    @update:model-value="onUpdateModelValue"
  />
</template>

<script setup lang="ts">
// Vue
import { ref } from 'vue';

// Components
import InputPassword from '@iwyfaf-vue-ui/ariadna-ui/InputPassword';

// Types
import type { Numberish } from '@iwyfaf-vue-ui/ariadna-ui/types';

const inputPasswordValue = ref(null);

function onUpdateModelValue(event: Numberish | undefined) {
  console.log(event);
}
</script>
