<template>
  <Button @click="goBack"> Назад </Button>

  <div class="container">
    <slot />
  </div>
</template>

<script setup lang="ts">
import Button from '@iwyfaf-vue-ui/ariadna-ui/Button';

const router = useRouter();

const goBack = () => {
  router.go(-1);
};
</script>
