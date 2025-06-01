<template>
  <div
    v-on-click-outside="closeOnClickOutside"
    :class="componentClasses"
    @keydown.prevent.esc="closeOnEscKey"
  >
    <div v-if="!!slots.activator" ref="activator" :class="`${props.cssClass}__activator`">
      <slot name="activator" :opened="vModel" :open="open" :close="close" :toggle="toggle" />
    </div>

    <div ref="content" :class="contentClasses" tabindex="0" @keydown.prevent.esc="closeOnEscKey">
      <div v-if="!!slots.header" :class="`${props.cssClass}__content-header`">
        <slot name="header" :opened="vModel" :open="open" :close="close" :toggle="toggle" />
      </div>

      <div v-if="!!slots.default" :class="`${props.cssClass}__content-main`">
        <slot :opened="vModel"></slot>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
// Vue
import { useTemplateRef, defineExpose } from 'vue';

// Types
import type {
  TDropboxEmits,
  TDropboxExposes,
  TDropboxProps,
  TDropboxSlots,
} from '../Dropbox/Dropbox';
import { EDropboxPropsDefault } from '../Dropbox/types/Dropbox.enums';

// Composables
import useDropbox from './composables/useDropbox/useDropbox';

// Directives
import vOnClickOutside from '@/lib/directives/sensors/OnClickOutside/OnClickOutside';

const props = withDefaults(defineProps<TDropboxProps>(), {
  modelValue: false,
  closeOnEscape: true,
  cssClass: EDropboxPropsDefault.CSS_CLASS,
});
const slots = defineSlots<TDropboxSlots>();
const emits = defineEmits<TDropboxEmits>();
const vModel = defineModel<TDropboxProps['modelValue']>({ required: true });

const activatorRef = useTemplateRef('activator');
const contentRef = useTemplateRef('content');

const {
  componentClasses,
  contentClasses,
  open,
  close,
  toggle,
  calculate,
  closeOnClickOutside,
  closeOnEscKey,
} = useDropbox(props, emits, vModel, activatorRef, contentRef);

defineExpose<TDropboxExposes>({
  close,
  open,
  toggle,
  calculate,
});
</script>
