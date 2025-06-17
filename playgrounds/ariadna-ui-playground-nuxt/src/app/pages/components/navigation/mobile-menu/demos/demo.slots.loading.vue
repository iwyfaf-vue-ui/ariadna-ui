<template>
  <MobileMenu :menu="menus">
    <template #loading="{ opened, item }">
      <Spinner size="small"></Spinner>
    </template>
  </MobileMenu>
</template>

<script setup lang="ts">
// Vue
import { ref } from 'vue';

// Components
import MobileMenu from '@iwyfaf-vue-ui/ariadna-ui/MobileMenu';
import Button from '@iwyfaf-vue-ui/ariadna-ui/Button';
import Spinner from '@iwyfaf-vue-ui/ariadna-ui/Spinner';

// Types
import type { TMobileMenuItem } from '@iwyfaf-vue-ui/ariadna-ui/MobileMenu';

// Composables
import useMenus from './useMenus';

const { themes, components, empty } = useMenus();

const menus = ref<Array<TMobileMenuItem>>([
  {
    label: 'Тема',
    key: 'theme',
    items: [themes],
    loading: false,
  },
  {
    label: 'Компоненты',
    key: 'components',
    items: [],
    loading: false,
    command: async () => {
      const menuDesktopData = menus.value[1];
      menuDesktopData.items = [];
      menuDesktopData.loading = true;

      setTimeout(() => {
        menuDesktopData.items = [components, components];
        menuDesktopData.loading = false;
      }, 2000);
    },
  },
  {
    label: 'Пустое меню',
    key: 'empty',
    items: [empty],
    loading: false,
  },
]);
</script>
