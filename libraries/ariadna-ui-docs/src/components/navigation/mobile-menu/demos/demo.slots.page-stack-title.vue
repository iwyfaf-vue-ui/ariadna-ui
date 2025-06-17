<template>
  <MobileMenu :menu="menus">
    <template #pageStackTitle="{ item, opened }">
      <span>{{ item.name }} 💩</span>
    </template>
  </MobileMenu>
</template>

<script setup lang="ts">
// Vue
import { ref } from 'vue';

// Components
import MobileMenu from '@iwyfaf-vue-ui/ariadna-ui/MobileMenu';
import Button from '@iwyfaf-vue-ui/ariadna-ui/Button';

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
    items: [components, components],
    loading: false,
  },
  {
    label: 'Пустое меню',
    key: 'empty',
    items: [empty],
    loading: false,
  },
]);
</script>
