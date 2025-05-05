<template>
  <Badge size="small" modifier="primary">docs v1.0.0</Badge>
  <Badge size="small" modifier="secondary">docs v2.0.0</Badge>
  <Badge size="small" modifier="success">docs v3.0.0</Badge>
  <Badge size="small" modifier="warning">docs v4.0.0</Badge>
  <Badge size="small" modifier="danger">docs v5.0.0</Badge>
  <Badge size="medium" modifier="primary">docs v1.0.0</Badge>
  <Badge size="medium" modifier="secondary">docs v2.0.0</Badge>
  <Badge size="medium" modifier="success">docs v3.0.0</Badge>
  <Badge size="medium" modifier="warning">docs v4.0.0</Badge>
  <Badge size="medium" modifier="danger">docs v5.0.0</Badge>
  <Badge size="large" modifier="primary">docs v1.0.0</Badge>
  <Badge size="large" modifier="secondary">docs v2.0.0</Badge>
  <Badge size="large" modifier="success">docs v3.0.0</Badge>
  <Badge size="large" modifier="warning">docs v4.0.0</Badge>
  <Badge size="large" modifier="danger">docs v5.0.0</Badge>

  <Badge size="small" modifier="primary" rounded>5</Badge>
  <Badge size="small" modifier="secondary" rounded>5</Badge>
  <Badge size="small" modifier="success" rounded>5</Badge>
  <Badge size="small" modifier="warning" rounded>5</Badge>
  <Badge size="small" modifier="danger" rounded>5</Badge>
  <Badge size="medium" modifier="primary" rounded>5</Badge>
  <Badge size="medium" modifier="secondary" rounded>5</Badge>
  <Badge size="medium" modifier="success" rounded>5</Badge>
  <Badge size="medium" modifier="warning" rounded>5</Badge>
  <Badge size="medium" modifier="danger" rounded>5</Badge>
  <Badge size="large" modifier="primary" rounded>5</Badge>
  <Badge size="large" modifier="secondary" rounded>5</Badge>
  <Badge size="large" modifier="success" rounded>5</Badge>
  <Badge size="large" modifier="warning" rounded>5</Badge>
  <Badge size="large" modifier="danger" rounded>5</Badge>

  <Button size="large">
    Floating Badge
    <Badge size="small" modifier="primary" floating>docs v1.0.0</Badge>
  </Button>

  <Button size="large">
    Floating Badge
    <Badge size="small" modifier="primary" rounded floating>10</Badge>
  </Button>
</template>

<script setup lang="ts">
import Badge from '@iwyfaf-vue-ui/ariadna-ui/Badge';
import Button from '@iwyfaf-vue-ui/ariadna-ui/Button';
</script>
