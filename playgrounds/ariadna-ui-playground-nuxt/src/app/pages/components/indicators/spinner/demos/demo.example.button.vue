<template>
  <Button :loading="loading" @click="toggle">
    Click me
    <template #loading>
      <Spinner size="small"></Spinner>
    </template>
  </Button>

  <Button :loading="loading" modifier="secondary" @click="toggle">
    Click me
    <template #loading>
      <Spinner size="small" css-class="ar-spinner-atom"></Spinner>
    </template>
  </Button>
</template>

<script setup lang="ts">
import Spinner from '@iwyfaf-vue-ui/ariadna-ui/Spinner';
import Button from '@iwyfaf-vue-ui/ariadna-ui/Button';

const loading = ref(false);

function toggle() {
  loading.value = !loading.value;

  setTimeout(() => {
    loading.value = false;
  }, 1500);
}
</script>
