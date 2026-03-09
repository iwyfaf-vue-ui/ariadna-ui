import { computed, reactive, watch } from 'vue';
import type { Ref } from 'vue';
import type { TUseToastApiReturn } from './useToastApi.types';
import type { TToastMessageInternal, TToastTimerState } from '../../types/Toast.types';
import { EToastPropsDefault } from '../../types/Toast.enums';
import type { TToastEmits, TToastProps } from '../../Toast';

export default function useToastApi(
  props: TToastProps,
  emits: TToastEmits,
  hovered: Ref<boolean>,
): TUseToastApiReturn {
  const messages = reactive<Array<TToastMessageInternal>>([]);
  const timers = new Map<number, TToastTimerState>();
  let counter = 0;

  const messageClasses = computed(() => (message: TToastMessageInternal): string => {
    const base = props.cssClass;
    const messageBlock = `${base}__message`;

    const modifier = message.modifier ? `${messageBlock}--${message.modifier}` : undefined;

    return [messageBlock, modifier].filter(Boolean).join(' ');
  });

  function startTimer(id: number): void {
    const state = timers.get(id);
    if (!state) {
      return;
    }

    state.startTime = Date.now();
    state.timerId = setTimeout(() => removeByTtl(id), state.remaining);
  }

  function pauseTimer(id: number): void {
    const state = timers.get(id);
    if (!state || state.timerId === null) {
      return;
    }

    clearTimeout(state.timerId);
    state.remaining -= Date.now() - state.startTime;
    state.timerId = null;
  }

  function clearTimer(id: number): void {
    const state = timers.get(id);
    if (state?.timerId) {
      clearTimeout(state.timerId);
    }

    timers.delete(id);
  }

  function removeByTtl(id: number): void {
    const index = messages.findIndex((m) => m._id === id);

    if (index !== -1) {
      emits('ttl-end', { message: { ...messages[index] } });
      messages.splice(index, 1);
      timers.delete(id);
    }
  }

  function remove(id: number): void {
    const index = messages.findIndex((m) => m._id === id);

    if (index !== -1) {
      const { _id, ...messageWithoutId } = messages[index];
      emits('close', { message: messageWithoutId });
      messages.splice(index, 1);
      clearTimer(id);
      hovered.value = false;
    }
  }

  function removeAll(): void {
    timers.forEach((_, id) => clearTimer(id));
    messages.splice(0, messages.length);
    hovered.value = false;
  }

  function add(message: TToastMessageInternal): void {
    const id = ++counter;
    const ttl = message.ttl;
    const closable = message.closable ?? true;

    if (props.max && messages.length >= props.max) {
      clearTimer(messages[0]._id);
      messages.splice(0, 1);
    }

    const newMessage = { ...message, _id: id, ttl, closable };
    messages.push(newMessage);
    emits('add', { message: newMessage });

    if (ttl) {
      timers.set(id, { startTime: Date.now(), remaining: ttl, timerId: null });
      if (!hovered.value) startTimer(id);
    }
  }

  function filterMessagesByGroup(message: TToastMessageInternal): void {
    const messageGroup = message.group ?? EToastPropsDefault.GROUP;

    if (messageGroup !== props.group) {
      return;
    }

    add(message);
  }

  watch(hovered, (isHovered) => {
    timers.forEach((_, id) => {
      isHovered ? pauseTimer(id) : startTimer(id);
    });
  });

  return {
    messages,
    messageClasses,
    remove,
    removeAll,
    add,
    filterMessagesByGroup,
  };
}
