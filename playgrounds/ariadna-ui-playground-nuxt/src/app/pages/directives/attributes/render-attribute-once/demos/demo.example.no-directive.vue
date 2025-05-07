<template>
  <label :for="randomId"></label>
  <input type="text" :id="randomId" />
</template>

<script setup lang="ts">
const randomId = (Math.random() + 1).toString(36).substring(7);
</script>
