<template>
  <button type="button" @click="toggleCollapse">Collapse</button>

  <SidebarMenu v-model:collapsed="collapsedState" :data="data" @update:collapsed="updateCollapsed">
    <template #header> HEADER </template>

    <template #footer> FOOTER </template>
  </SidebarMenu>
</template>

<script setup lang="ts">
// Vue
import { markRaw } from 'vue';

// Components
import Spinner from '@iwyfaf-vue-ui/ariadna-ui/Spinner';
import Button from '@iwyfaf-vue-ui/ariadna-ui/Button';
import SidebarMenu, { type TSidebarMenuItem } from '@iwyfaf-vue-ui/ariadna-ui/SidebarMenu';
import iconComponent from '~/pages/components/navigation/sidebar-menu/_icon.vue';
import badgeComponent from '~/pages/components/navigation/sidebar-menu/_badge.vue';
import actionComponent from '~/pages/components/navigation/sidebar-menu/_action.vue';

const loading = ref(false);

function toggle() {
  loading.value = !loading.value;

  setTimeout(() => {
    loading.value = false;
  }, 1500);
}

const icon = markRaw(iconComponent);
const badge = markRaw(badgeComponent);
const action = markRaw(actionComponent);

const collapsedState = ref(false);
const data = ref<Array<TSidebarMenuItem>>([
  {
    title: 'Text',
    children: [
      {
        title: 'Palettes',
        href: '/themes/palettes',
        action: () => console.log('Action activated!'),
        children: [
          {
            title: 'Sub item 2',
            href: '/',
            children: [
              {
                title: 'Sub item 3',
                href: '/components/navigation/sidebar-menu',
              },
            ],
          },
          {
            title: 'Sub item 2',
            href: '/',
          },
        ],
      },
      {
        title: 'Sub item 2',
        href: '/',
      },
    ],
  },
  {
    title: 'Text with string icon',
    icon: 'fa fa-user',
  },
  {
    title: 'Text with component icon',
    icon: icon,
  },
  {
    title: 'Text with string icon and number badge',
    icon: 'fa fa-user',
    badge: 2,
  },
  {
    title: 'Text with component icon & badge',
    icon: icon,
    badge: badge,
  },
  {
    title: 'Link',
    href: '/',
    expand: true,
    children: [
      {
        title: 'Sub item 1',
        href: '/',
      },
    ],
  },
  {
    title: 'Active link',
    href: '/',
    disabled: true,
    children: [
      {
        title: 'Sub item 1',
        href: '/',
      },
    ],
  },
  {
    title: 'Active link',
    href: '/',
    disabled: true,
    children: [
      {
        title: 'Sub item 1',
        href: '/',
      },
    ],
  },
  {
    title: 'External link',
    href: 'https://ui.iwyfaf.ru',
  },
  {
    title: 'Action link',
    action: () => console.log('Action activated!'),
  },
  {
    title: 'Link with native <a> tag',
    href: '/',
    native: true,
    icon: icon,
    badge: badge,
  },
]);

function toggleCollapse() {
  collapsedState.value = !collapsedState.value;
}

function updateCollapsed(value: boolean) {
  console.log('collapsed state:', value);
}
</script>
