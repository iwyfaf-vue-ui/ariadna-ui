<template>
  <h1>Spinner</h1>

  <Spinner size="small"></Spinner>
  <Spinner size="small" css-class="ar-spinner-atom"></Spinner>
  <Spinner size="medium"></Spinner>
  <Spinner size="medium" css-class="ar-spinner-atom"></Spinner>
  <Spinner size="large"></Spinner>
  <Spinner size="large" css-class="ar-spinner-atom"></Spinner>

  <hr />

  <Spinner size="small" modifier="primary"></Spinner>
  <Spinner size="small" css-class="ar-spinner-atom" modifier="primary"></Spinner>
  <Spinner size="medium" modifier="primary"></Spinner>
  <Spinner size="medium" css-class="ar-spinner-atom" modifier="primary"></Spinner>
  <Spinner size="large" modifier="primary"></Spinner>
  <Spinner size="large" css-class="ar-spinner-atom" modifier="primary"></Spinner>

  <hr />

  <Spinner size="small" modifier="secondary"></Spinner>
  <Spinner size="small" css-class="ar-spinner-atom" modifier="secondary"></Spinner>
  <Spinner size="medium" modifier="secondary"></Spinner>
  <Spinner size="medium" css-class="ar-spinner-atom" modifier="secondary"></Spinner>
  <Spinner size="large" modifier="secondary"></Spinner>
  <Spinner size="large" css-class="ar-spinner-atom" modifier="secondary"></Spinner>

  <hr />

  <Spinner size="small" modifier="success"></Spinner>
  <Spinner size="small" css-class="ar-spinner-atom" modifier="success"></Spinner>
  <Spinner size="medium" modifier="success"></Spinner>
  <Spinner size="medium" css-class="ar-spinner-atom" modifier="success"></Spinner>
  <Spinner size="large" modifier="success"></Spinner>
  <Spinner size="large" css-class="ar-spinner-atom" modifier="success"></Spinner>

  <hr />

  <Spinner size="small" modifier="warning"></Spinner>
  <Spinner size="small" css-class="ar-spinner-atom" modifier="warning"></Spinner>
  <Spinner size="medium" modifier="warning"></Spinner>
  <Spinner size="medium" css-class="ar-spinner-atom" modifier="warning"></Spinner>
  <Spinner size="large" modifier="warning"></Spinner>
  <Spinner size="large" css-class="ar-spinner-atom" modifier="warning"></Spinner>

  <hr />

  <Spinner size="small" modifier="danger"></Spinner>
  <Spinner size="small" css-class="ar-spinner-atom" modifier="danger"></Spinner>
  <Spinner size="medium" modifier="danger"></Spinner>
  <Spinner size="medium" css-class="ar-spinner-atom" modifier="danger"></Spinner>
  <Spinner size="large" modifier="danger"></Spinner>
  <Spinner size="large" css-class="ar-spinner-atom" modifier="danger"></Spinner>

  <hr />

  <Button :loading="loading" @click="loading = !loading">
    Click me
    <template #loading>
      <Spinner size="small"></Spinner>
    </template>
  </Button>

  <Button :loading="loading" modifier="secondary" @click="loading = !loading">
    Click me
    <template #loading>
      <Spinner size="small" css-class="ar-spinner-atom"></Spinner>
    </template>
  </Button>
</template>

<script setup lang="ts">
// Components
import Spinner from '@iwyfaf-vue-ui/ariadna-ui/Spinner';
import Button from '@iwyfaf-vue-ui/ariadna-ui/Button';

definePageMeta({
  layout: 'default',
});

useHead({
  title: 'Spinner',
});

const loading = ref(false);
</script>
