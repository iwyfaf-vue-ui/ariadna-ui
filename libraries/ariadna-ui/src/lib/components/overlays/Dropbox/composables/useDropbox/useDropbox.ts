import { computed, ref, nextTick, watch } from 'vue';
import type { ModelRef, ShallowRef } from 'vue';
import type { TDropboxEmits, TDropboxProps } from '../../Dropbox';
import type { TUseDropboxReturn } from './useDropbox.types';
import usePosition, {
  usePositionDefaultOptions,
} from '@/lib/composables/elements/usePosition/usePosition';

export default function useDropbox(
  props: TDropboxProps,
  emits: TDropboxEmits,
  vModel: ModelRef<boolean, string, boolean, boolean>,
  activatorRef: Readonly<ShallowRef<HTMLDivElement | null>>,
  contentRef: Readonly<ShallowRef<HTMLDivElement | null>>,
): TUseDropboxReturn {
  const _disableAutoPosition = ref(props.disableAutoPosition!);

  const { calculate, cssClass, secondaryCssClass } = usePosition(activatorRef, contentRef, {
    ...usePositionDefaultOptions,
    disabled: () => _disableAutoPosition.value,
  });

  const componentClasses = computed(() => {
    const base = props.cssClass;

    const theme = `${base}--theme`;
    const opened = props.modelValue ? `${base}--opened` : undefined;
    const modifier = props.modifier ? `${base}--${props.modifier}` : undefined;

    return [base, theme, opened, modifier].filter(Boolean).join(' ');
  });

  const direction = computed(() =>
    cssClass.value === 'top' || cssClass.value === 'bottom' ? 'vertical' : 'horizontal',
  );

  const contentClasses = computed(() => ({
    [`${props.cssClass}__content`]: true,
    [`${props.cssClass}__content--${direction.value}-${cssClass.value}-${secondaryCssClass.value}`]:
      _disableAutoPosition.value !== true,
  }));

  async function open() {
    await nextTick();
    calculate();

    vModel.value = true;
  }

  function close() {
    vModel.value = false;

    calculate();
  }

  async function toggle() {
    await nextTick();
    calculate();

    vModel.value = !vModel.value;
  }

  function closeOnClickOutside() {
    if (!props.closeOnClickOutside) return;

    close();
  }

  function closeOnEscKey(event: KeyboardEvent) {
    if (props.closeOnEscape && (event.key === 'Escape' || event.key === 'Esc')) {
      close();
    }
  }

  watch(
    () => vModel.value,
    (value) => {
      value ? emits('show') : emits('hide');
    },
  );

  return {
    componentClasses,
    contentClasses,
    open,
    close,
    toggle,
    calculate,
    closeOnClickOutside,
    closeOnEscKey,
  };
}
