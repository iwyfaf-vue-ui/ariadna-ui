<template>
  <Teleport :to="props.appendTo">
    <Transition mode="out-in" :name="`${props.cssClass}__animation`" @after-leave="onAfterLeave">
      <div v-if="props.visible" :class="componentClasses">
        <div
          :class="`${props.cssClass}__overlay`"
          v-if="props.overlay"
          role="dialog"
          aria-hidden="true"
          tabindex="-1"
        ></div>

        <div
          v-if="props.visible"
          ref="dialogContainer"
          :class="`${props.cssClass}__container`"
          @click.stop="handleOverlayClick"
        >
          <div
            ref="draggableContainer"
            :style="draggableStyles"
            :class="`${props.cssClass}__dialog`"
          >
            <div v-if="!!slots.header" ref="draggableTarget" :class="`${props.cssClass}__header`">
              <slot
                name="header"
                :toggleMaximize="toggleMaximize"
                :hide="requestCloseDialog"
              ></slot>
            </div>

            <div v-if="!!slots.content" :class="`${props.cssClass}__content`">
              <slot name="content"></slot>
            </div>

            <div v-if="!!slots.footer" :class="`${props.cssClass}__footer`">
              <slot name="footer"></slot>
            </div>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup lang="ts">
// Vue
import { useTemplateRef } from 'vue';

// Types
import type { TDialogEmits, TDialogProps, TDialogSlots } from '../Dialog/Dialog';
import { EDialogPropsDefault } from '../Dialog/types/Dialog.enums';

// Composables
import useDialog from './composables/useDialog/useDialog';

const props = withDefaults(defineProps<TDialogProps>(), {
  visible: false,
  overlay: true,
  appendTo: EDialogPropsDefault.APPEND_TO,
  cssClass: EDialogPropsDefault.CSS_CLASS,
});
const slots = defineSlots<TDialogSlots>();
const emits = defineEmits<TDialogEmits>();
const vVisible = defineModel<TDialogProps['visible']>('visible', { required: true });

const dialogContainerRef = useTemplateRef('dialogContainer');
const draggableContainerRef = useTemplateRef('draggableContainer');
const draggableTargetRef = useTemplateRef('draggableTarget');

const {
  componentClasses,
  draggableStyles,
  toggleMaximize,
  requestCloseDialog,
  handleOverlayClick,
  onAfterLeave,
} = useDialog(
  props,
  emits,
  vVisible,
  dialogContainerRef,
  draggableContainerRef,
  draggableTargetRef,
);
</script>
