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

  <h2>Components</h2>
  <ul>
    <li>
      <nuxt-link href="/components/buttons/button">Button</nuxt-link>
    </li>
    <li>
      <nuxt-link href="/components/indicators/badge">Badge</nuxt-link>
    </li>
  </ul>

  <h2>Utilities</h2>
  <ul>
    <li>
      <nuxt-link href="/utilities/helpers/capitalize">Capitalize</nuxt-link>
    </li>
    <li>
      <nuxt-link href="/utilities/helpers/to-kebab">To Kebab</nuxt-link>
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
