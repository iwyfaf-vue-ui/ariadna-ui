<template>
  <Dialog v-model:visible="dialogVisible">
    <template #header="{ hide }">
      Заголовок Dialog окна

      <Button size="small" textual @click="hide">✕</Button>
    </template>
  </Dialog>

  <Button @click="dialogVisible = true">Show dialog</Button>
</template>

<script setup lang="ts">
// Vue
import { ref } from 'vue';

// Components
import Dialog from '@iwyfaf-vue-ui/ariadna-ui/Dialog';
import Button from '@iwyfaf-vue-ui/ariadna-ui/Button';

const dialogVisible = ref(false);
</script>
