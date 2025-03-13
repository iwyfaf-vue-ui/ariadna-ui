<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>

<script setup lang="ts">
useHead({
  htmlAttrs: { lang: 'ru' },
  meta: [
    {
      name: 'viewport',
      content:
        'width=device-width, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0, user-scalable=no',
    },
    { name: 'robots', content: 'noindex, nofollow' },
    { name: 'format-detection', content: 'telephone=no' },
  ],
});
</script>
