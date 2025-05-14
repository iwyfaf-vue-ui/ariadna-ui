<template>
  <InputText v-model="inputTextValue" label="Custom cssClass" css-class="custom-input-text" />
</template>

<script setup lang="ts">
// Components
import InputText from '@iwyfaf-vue-ui/ariadna-ui/InputText';

const inputTextValue = ref(null);
</script>
