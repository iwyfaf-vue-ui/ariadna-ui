<template>
  <Teleport :to="props.appendTo">
    <div
      :class="componentClasses"
      v-on="listeners"
      @mouseenter="props.onMouseEnter?.()"
      @mouseleave="props.onMouseLeave?.()"
      @click="props.onClick?.()"
    >
      <TransitionGroup :name="`${cssClass}__${props.transition}`" appear>
        <div
          v-for="message in messages"
          :key="message._id"
          :role="message.modifier === 'danger' ? 'alert' : 'status'"
          :class="messageClasses(message)"
        >
          <div :class="`${props.cssClass}__message-header`">
            <div v-if="activeIconSlot(message.modifier)" :class="`${props.cssClass}__message-icon`">
              <slot v-if="message.modifier === 'info'" name="infoIcon"> ! </slot>
              <slot v-else-if="message.modifier === 'warning'" name="warnIcon"> ! </slot>
              <slot v-else-if="message.modifier === 'danger'" name="dangerIcon"> X </slot>
              <slot v-else-if="message.modifier === 'success'" name="successIcon"> ✓ </slot>
              <slot v-if="!!slots.messageIcon" name="messageIcon"></slot>
            </div>

            <div v-if="message.summary" :class="`${props.cssClass}__message-summary`">
              <slot name="summary" :summary="message.summary">
                {{ message.summary }}
              </slot>
            </div>

            <div :class="`${props.cssClass}__message-aside`">
              <div :class="`${props.cssClass}__message-caption`">
                <slot v-if="message.caption" name="caption" :caption="message.caption">
                  {{ message.caption }}
                </slot>
              </div>

              <slot v-if="message.closable" name="closeIcon" :close="() => remove(message._id)">
                <Button
                  size="small"
                  rounded
                  aria-label="Close"
                  :modifier="message.modifier"
                  @click="remove(message._id)"
                >
                  <template #icon> X </template>
                </Button>
              </slot>
            </div>
          </div>

          <div v-if="message.detail" :class="`${props.cssClass}__message-detail`">
            <slot name="detail" :detail="message.detail"> {{ message.detail }} </slot>
          </div>

          <div
            v-if="!props.hideProgressbar && message.ttl"
            :class="`${props.cssClass}__message-progress`"
          >
            <div
              :class="`${props.cssClass}__message-progress-bar`"
              :style="{
                animationDuration: `${message.ttl}ms`,
                animationPlayState: hovered ? 'paused' : 'running',
              }"
            ></div>
          </div>
        </div>
      </TransitionGroup>
    </div>
  </Teleport>
</template>

<script setup lang="ts">
// Vue
import { computed, inject, onMounted, onUnmounted } from 'vue';

// Types
import { ELibraryConfig } from '@/types/internal';
import type { TToastEmits, TToastProps, TToastSlots } from './Toast';
import { EToastConfig, EToastPropsDefault, EViewerErrors, EToastApi } from './types/Toast.enums';

// Providers
import { ToastApiProviderKey } from './providers/Toast.provider';

// EventBus
import toastEventBus from './event-bus/Toast.event-bus';
import useToastApi from '@/lib/components/overlays/Toast/composables/useToastApi/useToastApi';
import useToast from '@/lib/components/overlays/Toast/composables/useToast/useToast';

// Components
import Button from '@/lib/components/buttons/Button/Button.vue';

const props = withDefaults(defineProps<TToastProps>(), {
  positionY: EToastPropsDefault.POSITION_Y,
  positionX: EToastPropsDefault.POSITION_X,
  group: EToastPropsDefault.GROUP,
  transition: EToastPropsDefault.TRANSITION,
  appendTo: EToastPropsDefault.APPEND_TO,
  cssClass: EToastPropsDefault.CSS_CLASS,
});
const slots = defineSlots<TToastSlots>();
const emits = defineEmits<TToastEmits>();

const toastService = inject(ToastApiProviderKey);

const { hovered, listeners, componentClasses } = useToast(props);
const { messages, messageClasses, remove, removeAll, filterMessagesByGroup } = useToastApi(
  props,
  emits,
  hovered,
);

const activeIconSlot = computed(() => (modifier: string | undefined): boolean => {
  if (!slots.messageIcon && !modifier) {
    return false;
  } else if (slots.messageIcon || !modifier) {
    return true;
  }

  return true;
});

const onAdd = filterMessagesByGroup;
const onRemove = (id: number) => remove(id);
const onRemoveGroup = (group: string) => {
  if (group === props.group) {
    removeAll();
  }
};
const onRemoveAll = () => removeAll();

toastEventBus.on(EToastApi.ADD, onAdd);
toastEventBus.on(EToastApi.REMOVE, onRemove);
toastEventBus.on(EToastApi.REMOVE_GROUP, onRemoveGroup);
toastEventBus.on(EToastApi.REMOVE_ALL, onRemoveAll);

toastEventBus.emit(EToastApi.ON_CREATED, null);

onMounted(() => {
  if (!toastService) {
    throw new Error(
      `${ELibraryConfig.NAME}(${EToastConfig.NAME}): ${EViewerErrors.NOT_INSTALL_SERVICE}`,
    );
  }

  toastEventBus.emit(EToastApi.ON_MOUNTED, null);
});

onUnmounted(() => {
  toastEventBus.emit(EToastApi.ON_UNMOUNTED, null);

  toastEventBus.off(EToastApi.ADD, onAdd);
  toastEventBus.off(EToastApi.REMOVE, onRemove);
  toastEventBus.off(EToastApi.REMOVE_GROUP, onRemoveGroup);
  toastEventBus.off(EToastApi.REMOVE_ALL, onRemoveAll);
});
</script>
