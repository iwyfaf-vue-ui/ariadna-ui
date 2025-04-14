<template>
  <div style="display: flex; gap: 1rem; flex-wrap: wrap">
    <Button>
      Example
      <Badge size="small" floating> 1 </Badge>
    </Button>

    <Button>
      Example
      <Badge size="medium" rounded floating> 5 </Badge>
    </Button>

    <Button>
      Example
      <Badge size="large" rounded floating> ! </Badge>
    </Button>
  </div>
</template>

<script setup lang="ts">
import Badge from '@iwyfaf-vue-ui/ariadna-ui/Badge';
import Button from '@iwyfaf-vue-ui/ariadna-ui/Button';
</script>
