<template>
  <div v-on-click-outside="closeOnClickOutside" :class="componentClasses" @keydown="closeOnEscKey">
    <div ref="activator" :class="`${props.cssClass}__activator`">
      <slot name="activator" :opened="isOpen" :open="open" :close="close" :toggle="toggle" />
    </div>

    <Transition :name="`${props.cssClass}__reveal`">
      <DropdownMenuList v-if="isOpen" ref="list" :data="props.data" :class="listClasses" />
    </Transition>
  </div>
</template>

<script setup lang="ts">
// Vue
import { useTemplateRef, defineExpose, computed } from 'vue';
import type { ComponentPublicInstance } from 'vue';

// Types
import type {
  TDropdownMenuEmits,
  TDropdownMenuExposes,
  TDropdownMenuProps,
  TDropdownMenuSlots,
} from './DropdownMenu';
import { EDropdownMenuPropsDefault } from './types/DropdownMenu.enums';

// Components
import DropdownMenuList from './components/DropdownMenuList/DropdownMenuList.vue';

// Composables
import useDropdownMenu from './composables/useDropdownMenu/useDropdownMenu';

// Directives
import vOnClickOutside from '@/lib/directives/sensors/OnClickOutside/OnClickOutside';

const props = withDefaults(defineProps<TDropdownMenuProps>(), {
  expandMode: EDropdownMenuPropsDefault.EXPAND_MODE,
  closeOnClickOutside: true,
  closeOnEscape: true,
  disabled: false,
  cssClass: EDropdownMenuPropsDefault.CSS_CLASS,
});
const slots = defineSlots<TDropdownMenuSlots>();
const emits = defineEmits<TDropdownMenuEmits>();

const activatorRef = useTemplateRef<HTMLElement | null>('activator');
const listComponentRef = useTemplateRef<ComponentPublicInstance | null>('list');
const listRef = computed<HTMLElement | null>(
  () => (listComponentRef.value?.$el as HTMLElement) ?? null,
);

const {
  isOpen,
  open,
  close,
  toggle,
  componentClasses,
  listClasses,
  closeOnClickOutside,
  closeOnEscKey,
} = useDropdownMenu(props, emits, slots, activatorRef, listRef);

defineExpose<TDropdownMenuExposes>({
  open,
  close,
  toggle,
});
</script>
