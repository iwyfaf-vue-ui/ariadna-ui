<template>
  <div class="app-root">
    <div class="app-root__full">
      <Header aria-label="header">
        <template #logo>
          <Button @click="sidebarCollapsedHandler"> Collapse </Button>

          <NuxtLink to="/">
            <img :src="Logo" alt="Логотип" title="Логотип" />
          </NuxtLink>
        </template>

        <template #title> Ariadna UI </template>
        <template #subtitle> Playground </template>
      </Header>

      <div class="app-root__main">
        <Sidebar />

        <div class="app-root__main-content">
          <div class="app-root__main-content--overlay" @click="sidebarCollapsedHandler"></div>
          <h1>{{ pageTitle }}</h1>

          <slot />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
// Components
import Header from '@iwyfaf-vue-ui/ariadna-ui/Header';
import Button from '@iwyfaf-vue-ui/ariadna-ui/Button';
import Sidebar from '~/view/organisms/frame/Sidebar';

// Composables
import useSidebar from '~/composables/states/useSidebar/useSidebar';
import Logo from 'public/images/logo.svg';

const { sidebarCollapsedHandler } = useSidebar();

const route = useRoute();

const pageTitle = computed(() => route.meta.title || 'Default Title');
</script>
