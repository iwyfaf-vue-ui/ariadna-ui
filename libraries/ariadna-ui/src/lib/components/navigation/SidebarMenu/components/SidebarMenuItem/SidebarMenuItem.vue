<template>
  <li
    v-if="!isHidden"
    :class="componentClasses"
    @mouseenter="onMouseEnter"
    @mouseleave="onMouseLeave"
  >
    <div :class="`${cssClass}__item-wrapper`">
      <span
        v-show="hasChildren"
        :class="[`${cssClass}__item-dropdown`, { [`${cssClass}__item-dropdown--open`]: isOpen }]"
        :aria-expanded="isOpen"
        @click="onToggle"
      >
        <slot name="dropdownIcon" v-bind="{ isOpen: isOpen }" />
      </span>

      <SidebarMenuItemLink :item="props.item" @click="onToggle">
        <SidebarMenuItemIcon v-if="props.item.icon" :icon="props.item.icon" />

        <span :class="`${cssClass}__item-title`">{{ props.item.title }}</span>

        <SidebarMenuItemBadge v-if="props.item.badge" :badge="props.item.badge" />

        <SidebarMenuItemAction
          v-if="props.item.action"
          :action="props.item.action"
          :action-icon="props.item.actionIcon"
        />
      </SidebarMenuItemLink>
    </div>

    <Transition
      :name="`${cssClass}__item-expand`"
      @enter="onExpandEnter"
      @after-enter="onExpandAfterEnter"
      @before-leave="onExpandBeforeLeave"
    >
      <ul v-if="isOpen" :class="`${cssClass}__items-sub`">
        <SidebarMenuItem
          v-for="(child, idx) in children"
          :key="`${child.title}-${props.level + 1}-${idx}`"
          :item="child"
          :level="props.level + 1"
          :active="isMenuItemActiveComputed(child)"
        >
          <template #dropdownIcon="slotProps">
            <slot name="dropdownIcon" v-bind="slotProps" />
          </template>
        </SidebarMenuItem>
      </ul>
    </Transition>
  </li>
</template>

<script setup lang="ts">
// Components
import SidebarMenuItemLink from '../SidebarMenuItemLink/SidebarMenuItemLink.vue';
import SidebarMenuItemIcon from '../SidebarMenuItemIcon/SidebarMenuItemIcon.vue';
import SidebarMenuItemBadge from '../SidebarMenuItemBadge/SidebarMenuItemBadge.vue';
import SidebarMenuItemAction from '../SidebarMenuItemAction/SidebarMenuItemAction.vue';

// Composables
import useSidebarMenuItem from '../../composables/useSidebarMenuItem/useSidebarMenuItem';

// Types
import type { TSidebarMenuItemProps, TSidebarMenuItemSlots } from './SidebarMenuItem';

const props = withDefaults(defineProps<TSidebarMenuItemProps>(), {
  level: 1,
});
const slots = defineSlots<TSidebarMenuItemSlots>();

const {
  cssClass,
  isOpen,
  isHidden,
  isMenuItemActiveComputed,
  hasChildren,
  children,
  componentClasses,
  onMouseEnter,
  onMouseLeave,
  onToggle,
  onExpandEnter,
  onExpandAfterEnter,
  onExpandBeforeLeave,
} = useSidebarMenuItem(props);
</script>
