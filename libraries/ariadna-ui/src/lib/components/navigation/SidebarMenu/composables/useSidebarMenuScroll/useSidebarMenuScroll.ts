import type { TUseSidebarMenuScrollReturn } from './useSidebarMenuScroll.types';
import { ref, nextTick, onMounted, watch, computed } from 'vue';
import injectStrict from '@/shared/validators/vue/inject-strict.vue.validator';
import { SidebarMenuProviderKey } from '../../providers/SidebarMenu.provider';

export default function useSidebarMenuScroll(): TUseSidebarMenuScrollReturn {
  const { cssClass, collapsed } = injectStrict(SidebarMenuProviderKey);

  const isVisible = ref(false);
  const isDraggable = ref(false);
  const scrollRef = ref<HTMLDivElement | null>(null);
  const scrollBarRef = ref<HTMLDivElement | null>(null);
  const scrollThumbRef = ref<HTMLDivElement | null>(null);

  let cursorY = 0;
  let cursorDown = false;

  const componentClasses = computed(() => {
    const base = cssClass;

    const scroll = `${base}__scroll`;
    const draggable = isDraggable.value ? `${scroll}--draggable` : undefined;

    return [scroll, draggable].filter(Boolean).join(' ');
  });

  function updateThumb() {
    if (!scrollRef.value) return;
    if (!scrollThumbRef.value) return;

    const heightPerc = (scrollRef.value.clientHeight * 100) / scrollRef.value.scrollHeight;
    const thumbHeightPerc = heightPerc < 100 ? heightPerc : 0;
    const thumbYPerc = (scrollRef.value.scrollTop * 100) / scrollRef.value.clientHeight || 0;

    scrollThumbRef.value.style.height = `${thumbHeightPerc}%`;
    scrollThumbRef.value.style.transform = `translateY(${thumbYPerc}%)`;
  }

  function updateScrollTop(y: number) {
    if (!scrollBarRef.value) return;
    if (!scrollRef.value) return;

    const scrollPerc = (y * 100) / scrollBarRef.value.offsetHeight;
    scrollRef.value.scrollTop = (scrollPerc * scrollRef.value.scrollHeight) / 100;
  }

  const onScrollUpdate = () => {
    if (!scrollRef.value) return;

    nextTick(() => {
      updateThumb();
    });
  };

  const onMouseIn = () => {
    onScrollUpdate();

    isVisible.value = true;
  };

  const onMouseLeave = () => {
    isVisible.value = false;
    isDraggable.value = false;
  };

  const onMouseMove = (e: MouseEvent) => {
    if (!scrollBarRef.value) return;
    if (!scrollThumbRef.value) return;

    if (!cursorDown) return;

    const offset = e.clientY - scrollBarRef.value.getBoundingClientRect().y;
    const thumbClickPosition = scrollThumbRef.value.offsetHeight - cursorY;
    isVisible.value = true;
    updateScrollTop(offset - thumbClickPosition);
  };

  const onMouseUp = () => {
    cursorDown = false;
    cursorY = 0;
    isVisible.value = false;
    isDraggable.value = false;
    window.removeEventListener('mousemove', onMouseMove);
    window.removeEventListener('mouseup', onMouseUp);
  };

  const onMouseDown = (e: MouseEvent) => {
    if (!scrollThumbRef.value) return;

    e.stopImmediatePropagation();
    cursorDown = true;
    isDraggable.value = true;
    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', onMouseUp);
    cursorY =
      scrollThumbRef.value.offsetHeight -
      (e.clientY - scrollThumbRef.value.getBoundingClientRect().y);
  };

  const onClick = (e: MouseEvent) => {
    if (!scrollBarRef.value) return;
    if (!scrollThumbRef.value) return;

    const offset = Math.abs(scrollBarRef.value.getBoundingClientRect().y - e.clientY);
    const thumbHalf = scrollThumbRef.value.offsetHeight / 2;
    updateScrollTop(offset - thumbHalf);
  };

  const onScroll = () => {
    requestAnimationFrame(onScrollUpdate);
  };

  onMounted(() => {
    onScrollUpdate();
  });

  watch(
    () => collapsed,
    () => {
      onScrollUpdate();
    },
  );

  return {
    cssClass,
    collapsed,
    isVisible,
    isDraggable,
    scrollRef,
    scrollBarRef,
    scrollThumbRef,
    componentClasses,
    onMouseIn,
    onMouseUp,
    onMouseLeave,
    onMouseMove,
    onMouseDown,
    onClick,
    onScroll,
  };
}
