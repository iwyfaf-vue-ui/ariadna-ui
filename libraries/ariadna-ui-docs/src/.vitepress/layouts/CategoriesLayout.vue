<template>
  <section class="grid-section">
    <div class="grid-section__row">
      <VPLink v-for="(category, index) in sidebar" :key="`section_${index}`" :href="category.link">
        <article class="card-link">
          <div class="card-link__info">
            <div class="card-link__title">{{ category.text }}</div>
          </div>
        </article>
      </VPLink>
    </div>
  </section>
</template>

<script setup lang="ts">
// import components
import VPLink from 'vitepress/dist/client/theme-default/components/VPLink.vue';

// Composables
import { useSidebar } from 'vitepress/theme';

const { sidebar } = useSidebar();
</script>
