<template>
  <Dialog v-model:visible="dialogVisible">
    <template #content>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ab, alias at blanditiis corporis
        cum distinctio dolores, eos exercitationem facilis illo itaque iure laboriosam modi omnis
        quia, recusandae temporibus vero voluptas.
      </p>
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
