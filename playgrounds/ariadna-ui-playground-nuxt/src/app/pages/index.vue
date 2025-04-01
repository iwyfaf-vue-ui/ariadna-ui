<template>
  <h1>Главная</h1>

  <ul>
    <li>
      <nuxt-link href="/themes">Themes</nuxt-link>
    </li>

    <li>
      <nuxt-link href="/fonts">Fonts</nuxt-link>
    </li>

    <li>
      <nuxt-link href="/indents">Indents</nuxt-link>
    </li>

    <li>
      <nuxt-link href="/radii">Radii</nuxt-link>
    </li>

    <li>
      <nuxt-link href="/transitions">Transitions</nuxt-link>
    </li>
  </ul>

  <ul>
    <li>
      <nuxt-link href="/utilities/helpers/capitalize">Capitalize</nuxt-link>
    </li>
  </ul>
</template>

<script setup lang="ts">
definePageMeta({
  layout: 'default',
});

useHead({
  title: 'Главная',
});
</script>
