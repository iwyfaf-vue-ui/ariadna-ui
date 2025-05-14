<template>
  <InputText v-model="inputTextValue" label="Реализация vModel" />

  v-model value = {{ inputTextValue }}
</template>

<script setup lang="ts">
// Components
import InputText from '@iwyfaf-vue-ui/ariadna-ui/InputText';

const inputTextValue = ref(null);
</script>
