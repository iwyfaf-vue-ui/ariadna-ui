<template>
  <div style="display: flex; gap: 1rem; flex-wrap: wrap">
    <Spinner modifier="primary"> </Spinner>
    <Spinner modifier="secondary"> </Spinner>
    <Spinner modifier="success"> </Spinner>
    <Spinner modifier="warning"> </Spinner>
    <Spinner modifier="danger"> </Spinner>

    <Spinner css-class="ar-spinner-atom" modifier="primary"> </Spinner>
    <Spinner css-class="ar-spinner-atom" modifier="secondary"> </Spinner>
    <Spinner css-class="ar-spinner-atom" modifier="success"> </Spinner>
    <Spinner css-class="ar-spinner-atom" modifier="warning"> </Spinner>
    <Spinner css-class="ar-spinner-atom" modifier="danger"> </Spinner>
  </div>
</template>

<script setup lang="ts">
import Spinner from '@iwyfaf-vue-ui/ariadna-ui/Spinner';
</script>
