<template>
  <h1>Button</h1>

  <Badge size="small">0</Badge>
  <Badge size="small" modifier="primary">2</Badge>
  <Badge size="small" modifier="secondary">4</Badge>
  <Badge size="medium" modifier="success">6</Badge>
  <Badge size="medium" modifier="warning">8</Badge>
  <Badge size="large" modifier="danger">10</Badge>

  <Button size="large" modifier="secondary">
    Default Badge
    <Badge size="small">2</Badge>
  </Button>

  <Button size="large" modifier="secondary">
    Primary Badge
    <Badge size="small" modifier="primary">2</Badge>
  </Button>

  <Button size="large" modifier="success">
    Floating Badge
    <Badge size="small" modifier="success" floating>2</Badge>
  </Button>
</template>

<script setup lang="ts">
// Components
import Button from '@iwyfaf-vue-ui/ariadna-ui/Button';
import Badge from '@iwyfaf-vue-ui/ariadna-ui/Badge';

definePageMeta({
  layout: 'default',
});

useHead({
  title: 'Button',
});
</script>
