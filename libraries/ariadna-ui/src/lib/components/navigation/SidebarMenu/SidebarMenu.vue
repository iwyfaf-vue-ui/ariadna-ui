<template>
  <nav :class="componentClasses">
    <div :class="`${props.cssClass}__wrapper`">
      <div v-if="!!slots.header" :class="`${props.cssClass}__header`">
        <template v-if="!!slots.header">
          <slot name="header" />
        </template>
      </div>

      <SidebarMenuScroll v-if="props.data.length > 0">
        <ul :class="`${props.cssClass}__items`">
          <SidebarMenuItem
            v-for="(item, idx) in props.data"
            :key="`${item.title}-${idx}`"
            :item="item"
            :active="isMenuItemActiveComputed(item)"
          >
            <template #dropdownIcon="{ isOpen }">
              <slot name="dropdownIcon" v-bind="{ isOpen }">
                <span v-if="!isOpen">+</span>
                <span v-else>-</span>
              </slot>
            </template>
          </SidebarMenuItem>
        </ul>
      </SidebarMenuScroll>

      <div v-if="!!slots.footer" :class="`${props.cssClass}__footer`">
        <slot name="footer" />
      </div>
    </div>
  </nav>
</template>

<script setup lang="ts">
// Types
import type { TSidebarMenuEmits, TSidebarMenuProps, TSidebarMenuSlots } from './SidebarMenu';
import { ESidebarMenuPropsDefault } from './types/SidebarMenu.enums';

// Composables
import useSidebarMenu from './composables/useSidebarMenu/useSidebarMenu';

// Components
import SidebarMenuItem from './components/SidebarMenuItem/SidebarMenuItem.vue';
import SidebarMenuScroll from './components/SidebarMenuScroll/SidebarMenuScroll.vue';

const props = withDefaults(defineProps<TSidebarMenuProps>(), {
  cssClass: ESidebarMenuPropsDefault.CSS_CLASS,
  width: ESidebarMenuPropsDefault.WIDTH,
});
const slots = defineSlots<TSidebarMenuSlots>();
const emits = defineEmits<TSidebarMenuEmits>();
const collapsed = defineModel<TSidebarMenuProps['collapsed']>('collapsed');

const { isMenuItemActiveComputed, componentClasses } = useSidebarMenu(props, collapsed, emits);
</script>
