<template>
  <label for="theme">Выберите тему</label>
  <select v-model="colorMode.preference" id="theme">
    <option value="light">Light</option>
    <option value="dark">Dark</option>
  </select>

  <button type="button" @click="goBack">Go Back</button>

  <slot />
</template>

<script setup lang="ts">
const router = useRouter();
const colorMode = useColorMode();

const goBack = () => {
  router.go(-1);
};
</script>
