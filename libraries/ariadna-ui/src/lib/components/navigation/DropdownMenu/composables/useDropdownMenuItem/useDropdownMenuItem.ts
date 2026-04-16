import { computed, getCurrentInstance, ref } from 'vue';
import type { TUseDropdownMenuItemReturn } from './useDropdownMenuItem.types';
import type { TDropdownMenuItemProps } from '../../components/DropdownMenuItem/DropdownMenuItem';
import injectStrict from '@/shared/validators/vue/inject-strict.vue.validator';
import { DropdownMenuProviderKey } from '../../providers/DropdownMenu.provider';

const EXTERNAL_URL_RE = /^https?:\/\//;

/**
 * Composable for `DropdownMenuItem`.
 * Manages sub-menu open state, render strategy, CSS classes and event handlers.
 */
export default function useDropdownMenuItem(
  props: TDropdownMenuItemProps,
): TUseDropdownMenuItemReturn {
  const { cssClass, expandMode, close, emitItemClick, itemSlot } =
    injectStrict(DropdownMenuProviderKey);

  // SSR-safe router detection
  const instance = getCurrentInstance();
  const hasRouter = computed(() => !!instance?.appContext.config.globalProperties.$route);

  const isDisabled = computed(() => !!props.item.disabled);

  const hasChildren = computed(
    () => Array.isArray(props.item.children) && props.item.children.length > 0,
  );

  const isSubOpen = ref(false);

  const renderType = computed(() => {
    if (props.item.action) {
      return 'action' as const;
    }

    if (props.item.href) {
      if (EXTERNAL_URL_RE.test(props.item.href) || !hasRouter.value) return 'external' as const;
      return 'internal' as const;
    }

    if (hasChildren.value) {
      return 'toggle' as const;
    }

    return 'plain' as const;
  });

  const linkAttrs = computed<Record<string, string | undefined>>(() => {
    if (renderType.value === 'external') {
      return {
        href: props.item.href,
        target: props.item.target ?? '_blank',
        rel: 'noopener noreferrer',
      };
    }

    return {};
  });

  const componentClasses = computed(() => {
    const base = `${cssClass}__item`;
    const disabled = isDisabled.value ? `${base}--disabled` : undefined;
    const withChildren = hasChildren.value ? `${base}--has-children` : undefined;
    const subOpen = isSubOpen.value ? `${base}--sub-open` : undefined;
    const level = `${base}--level-${props.level ?? 1}`;

    return [base, disabled, withChildren, subOpen, level].filter(Boolean).join(' ');
  });

  const linkClasses = computed(() =>
    renderType.value === 'plain' ? `${cssClass}__category` : `${cssClass}__link`,
  );

  function clickHandler() {
    if (isDisabled.value) {
      return;
    }

    if (hasChildren.value && expandMode === 'click') {
      isSubOpen.value = !isSubOpen.value;
      return;
    }

    if (props.item.action) {
      props.item.action();
      emitItemClick(props.item);
      close();
      return;
    }

    if (props.item.href) {
      emitItemClick(props.item);
      close();
    }
  }

  function hoverHandler() {
    if (isDisabled.value || !hasChildren.value || expandMode !== 'hover') {
      return;
    }

    isSubOpen.value = true;
  }

  function leaveHandler() {
    if (expandMode !== 'hover' || !hasChildren.value) {
      return;
    }

    isSubOpen.value = false;
  }

  return {
    cssClass,
    isDisabled,
    hasChildren,
    isSubOpen,
    renderType,
    linkAttrs,
    componentClasses,
    linkClasses,
    clickHandler,
    hoverHandler,
    leaveHandler,
    itemSlot,
    close,
  };
}
