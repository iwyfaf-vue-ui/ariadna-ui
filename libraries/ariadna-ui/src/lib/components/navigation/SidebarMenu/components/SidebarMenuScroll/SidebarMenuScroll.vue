<template>
  <div :class="componentClasses" @mousemove="onMouseIn" @mouseleave="onMouseLeave">
    <div ref="scrollRef" :class="`${cssClass}__scroll-area`" @scroll="onScroll">
      <slot />
    </div>

    <Transition :name="`${cssClass}__scroll-animation`">
      <div
        v-show="isVisible"
        ref="scrollBarRef"
        :class="`${cssClass}__scroll-bar`"
        @mousedown="onClick"
      >
        <div ref="scrollThumbRef" :class="`${cssClass}__scroll-thumb`" @mousedown="onMouseDown" />
      </div>
    </Transition>
  </div>
</template>

<script setup lang="ts">
// Types
import type { TSidebarMenuScrollSlots } from './SidebarMenuScroll';

// Composables
import useSidebarMenuScroll from '../../composables/useSidebarMenuScroll/useSidebarMenuScroll';

const slots = defineSlots<TSidebarMenuScrollSlots>();

const {
  cssClass,
  isVisible,
  scrollRef,
  scrollBarRef,
  scrollThumbRef,
  componentClasses,
  onMouseIn,
  onMouseLeave,
  onMouseDown,
  onClick,
  onScroll,
} = useSidebarMenuScroll();
</script>
