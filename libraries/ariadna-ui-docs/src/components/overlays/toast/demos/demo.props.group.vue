<template>
  <Toast group="group-1" />
  <Toast group="group-2" />

  <Button @click="showToastGroup1">Показать Toast группы 1</Button>
  <Button @click="showToastGroup2">Показать Toast группы 2</Button>
</template>

<script setup lang="ts">
// Components
import Toast from '@iwyfaf-vue-ui/ariadna-ui/Toast';
import Button from '@iwyfaf-vue-ui/ariadna-ui/Button';

// Composables
import useToast from '@iwyfaf-vue-ui/ariadna-ui/useToast';

const toastApi = useToast();

function showToastGroup1() {
  toastApi.add({
    summary: 'Group 1',
    detail: 'Toast for group-1',
    ttl: 3000,
    group: 'group-1',
  });
}

function showToastGroup2() {
  toastApi.add({
    summary: 'Group 2',
    detail: 'Toast for group-2',
    ttl: 3000,
    group: 'group-2',
  });
}
</script>
