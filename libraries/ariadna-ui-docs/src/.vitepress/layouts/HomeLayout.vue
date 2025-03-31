<template>
  <div class="ywd-home">
    <Layout>
      <template #home-hero-info>
        <div class="ywd-home__hero">
          <h1 class="ywd-home__hero-title">{{ data.hero.name }}</h1>
          <p class="ywd-home__hero-tagline">{{ data.hero.tagline }}</p>
        </div>
      </template>

      <template #home-features-after>
        <section class="grid-section">
          <div class="iwd-container">
            <h2 class="grid-section__header">Элементы библиотеки</h2>
            <div class="grid-section__row">
              <VPLink v-for="(section, i) in data.sections" :key="i" :href="section.link">
                <article class="card-link">
                  <div class="card-link__info">
                    <div class="card-link__icon">
                      <img :src="section.icon" :alt="section.title" :title="section.title" />
                    </div>
                    <div class="card-link__title">{{ section.title }}</div>
                    <div class="card-link__details">{{ section.details }}</div>
                  </div>
                </article>
              </VPLink>
            </div>
          </div>
        </section>
      </template>
    </Layout>
  </div>
</template>

<script setup lang="ts">
import DefaultTheme from 'vitepress/theme';
import { useData } from 'vitepress';

// Componentss
import VPLink from 'vitepress/dist/client/theme-default/components/VPLink.vue';

const { Layout } = DefaultTheme;

const { frontmatter: data } = useData();
</script>

<style lang="scss">
.ywd-home {
  &__hero {
    text-align: center;

    &-title {
      font-size: 64px;
      font-weight: bold;
      line-height: normal;
    }

    &-tagline {
      font-size: 24px;
      line-height: 36px;
      color: var(--vp-c-text-2);
      white-space: pre-wrap;
    }
  }
}
</style>
