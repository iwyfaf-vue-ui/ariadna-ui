import { computed, onBeforeUnmount, onMounted, ref } from 'vue';
import type { TUseHeaderScrollReturn } from './useHeaderScroll.types';
import type { THeaderEmits, THeaderProps } from '../../Header';

export default function useHeaderScroll(
  props: THeaderProps,
  emit: THeaderEmits,
): TUseHeaderScrollReturn {
  const isScrolled = ref(false);

  function updateScrolledState(next: boolean) {
    if (next === isScrolled.value) {
      return;
    }

    isScrolled.value = next;
    emit('scrolled', next);
  }

  function handleScroll() {
    if (props.scrollThreshold == null) {
      updateScrolledState(false);
      return;
    }

    const currentScroll = window.scrollY || window.pageYOffset || 0;
    const nextIsScrolled = currentScroll >= props.scrollThreshold;

    updateScrolledState(nextIsScrolled);
  }

  onMounted(() => {
    if (typeof window === 'undefined') {
      return;
    }

    window.addEventListener('scroll', handleScroll, { passive: true });

    handleScroll();
  });

  onBeforeUnmount(() => {
    if (typeof window === 'undefined') {
      return;
    }

    window.removeEventListener('scroll', handleScroll);
  });

  const scrollClasses = computed(() => {
    const base = props.cssClass;

    const scrolled =
      props.scrollThreshold != null && isScrolled.value ? `${base}--scrolled` : undefined;

    return [scrolled].filter(Boolean).join(' ');
  });

  return {
    scrollClasses,
  };
}
