<template>
  <div class="app-root">
    <div class="app-root__full">
      <Header></Header>

      <div class="app-root__main">
        <Sidebar />

        <div class="app-root__main-content">
          <div class="app-root__main-content--overlay" @click="sidebarCollapsedHandler"></div>
          <slot />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
// Components
import Header from '~/view/organisms/frame/Header';
import Sidebar from '~/view/organisms/frame/Sidebar';

// Composables
import useSidebar from '~/composables/states/useSidebar/useSidebar';

const { sidebarCollapsedHandler } = useSidebar();
</script>
