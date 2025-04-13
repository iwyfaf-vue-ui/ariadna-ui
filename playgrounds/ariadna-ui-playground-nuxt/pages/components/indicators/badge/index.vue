<template>
  <h1>Button</h1>

  <Badge size="small">docs v1.0.0</Badge>
  <Badge size="small" modifier="primary">app v1.12.432</Badge>

  <hr />

  <Badge size="small" modifier="primary" rounded>2</Badge>
  <Badge size="small" modifier="secondary" rounded>4</Badge>
  <Badge size="medium" modifier="success" rounded>6</Badge>
  <Badge size="medium" modifier="warning" rounded>8</Badge>
  <Badge size="large" modifier="danger" rounded>10</Badge>

  <hr />

  <Button size="large" modifier="primary">
    Default Badge
    <Badge size="small">2</Badge>
  </Button>

  <Button size="large" modifier="secondary">
    Primary Badge
    <Badge size="small" modifier="primary" rounded>2</Badge>
  </Button>

  <Button size="large" modifier="success">
    Floating Badge
    <Badge size="small" modifier="success" floating rounded>2</Badge>
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
