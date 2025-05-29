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
        title: 'Controls',
        children: [
          {
            title: 'InputText',
            href: '/components/controls/input-text',
          },
          {
            title: 'Textarea',
            href: '/components/controls/textarea',
          },
          {
            title: 'Checkbox',
            href: '/components/controls/checkbox',
          },
          {
            title: 'Radio',
            href: '/components/controls/radio',
          },
          {
            title: 'Rating',
            href: '/components/controls/rating',
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
      {
        title: 'Panels',
        children: [
          {
            title: 'Card',
            href: '/components/panels/card',
          },
        ],
      },
      {
        title: 'Misc',
        children: [
          {
            title: 'Previewer',
            href: '/components/misc/previewer',
          },
        ],
      },
    ],
  },
  {
    title: 'Composables',
    expand: true,
    children: [
      {
        title: 'Elements',
        children: [
          {
            title: 'usePosition',
            href: '/composables/elements/usePosition',
          },
        ],
      },
    ],
  },
  {
    title: 'Directives',
    expand: true,
    children: [
      {
        title: 'Attributes',
        children: [
          {
            title: 'RenderAttributeOnce',
            href: '/directives/attributes/render-attribute-once',
          },
        ],
      },
      {
        title: 'Elements',
        children: [
          {
            title: 'PhoneMask',
            href: '/directives/elements/phone-mask',
          },
          {
            title: 'TextareaAutoHeight',
            href: '/directives/elements/textarea-auto-height',
          },
        ],
      },
      {
        title: 'Sensors',
        children: [
          {
            title: 'OnClickOutside',
            href: '/directives/sensors/on-click-outside',
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
      {
        title: 'Functions decorators',
        children: [
          {
            title: 'Debounce',
            href: '/utilities/functions-decorators/debounce',
          },
          {
            title: 'Throttle',
            href: '/utilities/functions-decorators/throttle',
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
