<template>
  <div :class="sidebarClasses.base">
    <SidebarMenu
      v-model:collapsed="sidebarCollapsed"
      :data="data"
      remember-expanded
      css-class="playground-sidebar-menu"
    >
      <template #footer> FOOTER </template>
    </SidebarMenu>
  </div>
</template>

<script setup lang="ts">
// Components
import SidebarMenu from '@iwyfaf-vue-ui/ariadna-ui/SidebarMenu';
import type { TSidebarMenuItem } from '@iwyfaf-vue-ui/ariadna-ui/SidebarMenu';

// Composables
import useSidebar from '~/composables/states/useSidebar/useSidebar';

const { sidebarCollapsed } = useSidebar();

const sidebarClasses = computed(() => {
  const baseClass = 'sidebar';

  return {
    base: [baseClass],
  };
});

const data = ref<Array<TSidebarMenuItem>>([
  {
    title: 'Theme',
    children: [
      {
        title: 'Палитры',
        href: '/themes/palettes',
      },
      {
        title: 'Шрифты',
        href: '/themes/fonts',
      },
      {
        title: 'Отступы',
        href: '/themes/indents',
      },
      {
        title: 'Радиусы',
        href: '/themes/radii',
      },
      {
        title: 'Переходы',
        href: '/themes/transitions',
      },
    ],
  },
  {
    title: 'Components',
    expand: true,
    children: [
      {
        title: 'Indicators',
        children: [
          {
            title: 'Badge',
            href: '/components/indicators/badge',
          },
          {
            title: 'Spinner',
            href: '/components/indicators/spinner',
          },
        ],
      },
      {
        title: 'Buttons',
        children: [
          {
            title: 'Button',
            href: '/components/buttons/button',
          },
        ],
      },
      {
        title: 'Navigation',
        children: [
          {
            title: 'SidebarMenu',
            href: '/components/navigation/sidebar-menu',
          },
        ],
      },
    ],
  },
  {
    title: 'Utilities',
    expand: true,
    children: [
      {
        title: 'Helpers',
        children: [
          {
            title: 'Capitalize',
            href: '/utilities/helpers/capitalize',
          },
          {
            title: 'ToKebab',
            href: '/utilities/helpers/to-kebab',
          },
        ],
      },
    ],
  },
]);
</script>

<style lang="scss">
.sidebar {
  position: fixed;
  height: 100%;
  z-index: 999;
}
</style>
