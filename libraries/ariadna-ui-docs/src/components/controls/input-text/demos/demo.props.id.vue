<template>
  <InputText v-model="inputTextValue" label="Default id" />
  <InputText v-model="inputTextValue" label="Custom id" id="custom-id" />
</template>

<script setup lang="ts">
// Vue
import { ref } from 'vue';

// Components
import InputText from '@iwyfaf-vue-ui/ariadna-ui/InputText';

const inputTextValue = ref(null);
</script>
