import type {
  TPositionedFunctions,
  TUsePositionOptions,
  TUsePositionReturn,
} from './types/usePosition.types';
import { onMounted, onUnmounted, type Ref } from 'vue';
import { ref } from 'vue';
import { EUsePosition } from './types/usePosition.enums';

export const usePositionDefaultOptions: TUsePositionOptions = {
  container: null,
  threshold: 0,
  disabled: () => false,
  positionOrder: [EUsePosition.BOTTOM, EUsePosition.TOP, EUsePosition.RIGHT, EUsePosition.LEFT],
  indents: {
    [EUsePosition.TOP]: () => [0, 0],
    [EUsePosition.BOTTOM]: () => [0, 0],
    [EUsePosition.RIGHT]: () => [0, 0],
    [EUsePosition.LEFT]: () => [0, 0],
  },
};

export default function usePosition(
  button: Ref<HTMLElement | null>,
  dropbox: Ref<HTMLElement | null>,
  options: TUsePositionOptions = usePositionDefaultOptions,
): TUsePositionReturn {
  const top = ref<number>(0);
  const left = ref<number>(0);
  const cssClass = ref<string>('');
  const secondaryCssClass = ref<string>('');

  const priorityThen = (position: EUsePosition, position2: EUsePosition) => {
    const indexOfPosition = options.positionOrder.indexOf(position);
    const indexOfPosition2 = options.positionOrder.indexOf(position2);

    if (indexOfPosition === -1 || indexOfPosition2 === -1) return false;

    return indexOfPosition < indexOfPosition2;
  };

  const getContainer = () => options.container || document.documentElement;
  const getContainerHeight = () => getContainer().clientHeight;
  const getContainerWidth = () => getContainer().clientWidth;

  const isTopPlace = (threshold = options.threshold) => {
    if (!button.value || !dropbox.value) return false;
    const buttonRect = button.value?.getBoundingClientRect();
    return buttonRect.top > dropbox.value?.offsetHeight + threshold;
  };

  const isBottomPlace = (threshold = options.threshold) => {
    if (!button.value || !dropbox.value) return false;

    const height = getContainerHeight();
    const buttonRect = button.value?.getBoundingClientRect();

    return height - buttonRect.bottom > dropbox.value?.offsetHeight + threshold;
  };

  const isRightPlace = (threshold = options.threshold) => {
    if (!button.value || !dropbox.value) return false;

    const width = getContainerWidth();
    const buttonRect = button.value?.getBoundingClientRect();

    return width - buttonRect.right > dropbox.value?.offsetWidth + threshold;
  };

  const isLeftPlace = (threshold = options.threshold) => {
    if (!button.value || !dropbox.value) return false;

    const buttonRect = button.value?.getBoundingClientRect();
    return buttonRect.left > dropbox.value?.offsetWidth + threshold;
  };

  const positionBottom = () => {
    if (!button.value || !dropbox.value) return 0;
    return (button.value?.offsetHeight - dropbox.value?.offsetHeight) / 2;
  };

  const positionTop = () => {
    return positionBottom() * -1;
  };

  const positionLeft = () => {
    if (!button.value || !dropbox.value) return 0;
    return (button.value?.offsetWidth - dropbox.value?.offsetWidth) / 2;
  };

  const positionRight = () => {
    return positionLeft() * -1;
  };

  const positionedFunctions: TPositionedFunctions = {
    isTopPlace,
    isBottomPlace,
    isRightPlace,
    isLeftPlace,
    positionTop,
    positionBottom,
    positionRight,
    positionLeft,
  };

  const getXIndent = (position: EUsePosition) => {
    if (!button.value || !dropbox.value) return 0;

    return options.indents[position](
      positionedFunctions,
      button.value,
      dropbox.value,
      getContainer(),
    )[0];
  };

  const getYIndent = (position: EUsePosition) => {
    if (!button.value || !dropbox.value) return 0;
    return options.indents[position](
      positionedFunctions,
      button.value,
      dropbox.value,
      getContainer(),
    )[1];
  };

  const setTop = () => {
    if (!button.value || !dropbox.value || !isTopPlace()) return;

    if (priorityThen(EUsePosition.RIGHT, EUsePosition.LEFT) && isRightPlace()) {
      secondaryCssClass.value = 'right';
    } else if (isLeftPlace()) {
      secondaryCssClass.value = 'left';
    } else {
      secondaryCssClass.value = 'center';
    }

    cssClass.value = 'top';
    left.value =
      (button.value?.offsetWidth - dropbox.value?.offsetWidth) / 2 + getXIndent(EUsePosition.TOP);
    top.value = dropbox.value?.offsetHeight * -1 - getYIndent(EUsePosition.TOP);
  };

  const setBottom = () => {
    if (!button.value || !dropbox.value || !isBottomPlace()) return;

    if (priorityThen(EUsePosition.RIGHT, EUsePosition.LEFT) && isRightPlace()) {
      secondaryCssClass.value = 'right';
    } else if (isLeftPlace()) {
      secondaryCssClass.value = 'left';
    } else {
      secondaryCssClass.value = 'center';
    }

    cssClass.value = 'bottom';
    left.value =
      (button.value?.offsetWidth - dropbox.value?.offsetWidth) / 2 +
      getXIndent(EUsePosition.BOTTOM);
    top.value = button.value?.offsetHeight + getYIndent(EUsePosition.BOTTOM);
  };

  const setRight = () => {
    if (!button.value || !dropbox.value || !isRightPlace()) return;

    if (priorityThen(EUsePosition.BOTTOM, EUsePosition.TOP) && isBottomPlace()) {
      secondaryCssClass.value = 'bottom';
    } else if (isTopPlace()) {
      secondaryCssClass.value = 'top';
    } else {
      secondaryCssClass.value = 'center';
    }

    cssClass.value = 'right';
    left.value = button.value?.offsetWidth + getXIndent(EUsePosition.RIGHT);
    top.value =
      (button.value?.offsetHeight - dropbox.value?.offsetHeight) / 2 -
      getYIndent(EUsePosition.RIGHT);
  };

  const setLeft = () => {
    if (!button.value || !dropbox.value || !isLeftPlace()) return;

    if (priorityThen(EUsePosition.BOTTOM, EUsePosition.TOP) && isBottomPlace()) {
      secondaryCssClass.value = 'bottom';
    } else if (isTopPlace()) {
      secondaryCssClass.value = 'top';
    } else {
      secondaryCssClass.value = 'center';
    }

    cssClass.value = 'left';
    left.value = dropbox.value?.offsetWidth * -1 - getXIndent(EUsePosition.LEFT);
    top.value =
      (button.value?.offsetHeight - dropbox.value?.offsetHeight) / 2 -
      getYIndent(EUsePosition.LEFT);
  };

  const calculate = () => {
    if (typeof options.disabled === 'function' && options.disabled()) return;
    if (!button.value || !dropbox.value || options.disabled()) return;

    for (let i = options.positionOrder.length - 1; i >= 0; i--) {
      switch (options.positionOrder[i]) {
        case EUsePosition.TOP:
          setTop();
          break;
        case EUsePosition.BOTTOM:
          setBottom();
          break;
        case EUsePosition.RIGHT:
          setRight();
          break;
        case EUsePosition.LEFT:
          setLeft();
          break;
      }
    }
  };

  const resizeObserver = ref<ResizeObserver | null>(null);

  onMounted(() => {
    calculate();

    resizeObserver.value = new ResizeObserver(calculate);
    if (dropbox.value) resizeObserver.value.observe(dropbox.value);

    const container = options.container || window;

    container.addEventListener('scroll', calculate);
    if (container instanceof Window) {
      container.addEventListener('resize', calculate);
    }
  });

  onUnmounted(() => {
    const container = options.container || window;

    container.removeEventListener('scroll', calculate);
    if (container instanceof Window) {
      container.removeEventListener('resize', calculate);
    }
    resizeObserver.value?.disconnect();
  });

  return {
    top,
    left,
    cssClass,
    secondaryCssClass,
    calculate,
  };
}
