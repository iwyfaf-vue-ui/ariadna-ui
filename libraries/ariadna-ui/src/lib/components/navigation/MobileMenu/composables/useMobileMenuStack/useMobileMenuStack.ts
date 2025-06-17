import { ref, nextTick } from 'vue';
import type { Ref, ShallowRef } from 'vue';
import type { TMobileMenuProps, TSharedMenu } from '../../MobileMenu';
import type { TMobileMenuItem } from '../../types/MobileMenu.types';
import type { TUseMobileMenuStackReturn } from './useMobileMenuStack.types';
import useDelayedValue from '@/lib/composables/reactivity/useDelayedValue/useDelayedValue';

export default function useMobileMenuStack(
  props: TMobileMenuProps,
  pagesRef: Readonly<ShallowRef<Array<HTMLDivElement> | null>>,
  currentMenuItem: Ref<TMobileMenuItem | null, TMobileMenuItem | null>,
): TUseMobileMenuStackReturn {
  const { delayedValue: pageStackWithDelay, immediateValue: pageStackWithoutDelay } =
    useDelayedValue<Array<TMobileMenuItem>>([], props.animationTime);

  const { delayedValue: isBackWithDelay, immediateValue: isBackWithoutDelay } =
    useDelayedValue<boolean>(false, props.animationTime);

  const pageTranslateX = ref<number>(0);

  function calculateTranslateX(skip = 0) {
    if (!pagesRef.value) return;

    pageTranslateX.value = pagesRef.value
      .map((pageRef) => pageRef.offsetWidth)
      .slice(0, pagesRef.value.length - skip)
      .reduce((acc, item, index, array) => acc + (index === array.length - 1 ? 0 : item), 0);
  }

  function clearStack() {
    pageStackWithoutDelay.value = [];

    nextTick(() => {
      calculateTranslateX();
    });
  }

  function toHome() {
    pageStackWithoutDelay.value = [pageStackWithoutDelay.value[0]];

    nextTick(() => {
      calculateTranslateX();
    });
  }

  function addToStack(item: TSharedMenu) {
    pageStackWithoutDelay.value.push({
      item,
      level: pageStackWithoutDelay.value.length + 2,
    });

    nextTick(() => {
      calculateTranslateX();
    });
  }

  const addToStackMenuItem = (menuItem: TMobileMenuItem, prevMenuItem: TMobileMenuItem | null) => {
    pageStackWithoutDelay.value.push({
      menuItem,
      prevMenuItem,
      level: pageStackWithoutDelay.value.length + 1,
    });

    nextTick(() => {
      calculateTranslateX();
    });
  };

  const backStack = () => {
    isBackWithoutDelay.value = true;
    const pageStackLength = pageStackWithoutDelay.value.length;

    if (pageStackWithoutDelay.value[pageStackLength - 2]?.menuItem) {
      currentMenuItem.value = pageStackWithoutDelay.value[pageStackLength - 2]
        .menuItem as TMobileMenuItem;
    }

    pageStackWithDelay.value = pageStackWithoutDelay.value.slice(0, pageStackLength - 1);
    isBackWithDelay.value = false;

    nextTick(() => {
      calculateTranslateX(1);
    });
  };

  return {
    pageTranslateX,
    pageStackWithoutDelay,
    isBackWithoutDelay,
    calculateTranslateX,
    clearStack,
    toHome,
    addToStack,
    addToStackMenuItem,
    backStack,
  };
}
