import { defineComponent, h, type Ref, ref } from 'vue';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { mount } from '@vue/test-utils';
import useSelectsControls from '../useSelectsControls';

function mountWithComposable(
  props: Record<string, any>,
  {
    opened = ref(false),
    selectOptionHandler = vi.fn(),
    optionsBodyRef = ref(null),
    optionsInList = ref([]),
    filterElementRef = ref(null),
    virtualScrollerRef = ref(null),
    focusedOptionIndex = ref(0),
    filterOptions = ref([]),
  }: Partial<{
    opened: Ref<boolean, boolean>;
    selectOptionHandler: (option: any) => void;
    optionsBodyRef: Ref<HTMLDivElement | null>;
    optionsInList: Ref<Array<HTMLElement>>;
    filterElementRef: Ref<HTMLDivElement | null>;
    virtualScrollerRef: ReturnType<typeof ref<any>>;
    focusedOptionIndex: Ref<number>;
    filterOptions: Ref<Array<Record<string, any>>>;
  }> = {},
) {
  const emits = vi.fn();

  return mount(
    defineComponent({
      setup() {
        const result = useSelectsControls(
          props,
          opened,
          selectOptionHandler,
          optionsBodyRef,
          optionsInList,
          filterElementRef,
          virtualScrollerRef,
          focusedOptionIndex,
          filterOptions,
        );
        return {
          ...result,
          emits,
          opened,
          selectOptionHandler,
          optionsBodyRef,
          optionsInList,
          filterElementRef,
          virtualScrollerRef,
          focusedOptionIndex,
          filterOptions,
        };
      },
      render() {
        return h('div');
      },
    }),
  );
}

describe('useSelectsControls', () => {
  let props: Record<string, any>;
  let opened: Ref<boolean>;
  let selectOptionHandler: ReturnType<typeof vi.fn>;
  let optionsBodyRef: Ref<HTMLDivElement | null>;
  let optionsInList: Ref<Array<HTMLElement>>;
  let filterElementRef: Ref<HTMLDivElement | null>;
  let virtualScrollerRef: ReturnType<typeof ref<any>>;
  let focusedOptionIndex: Ref<number>;
  let filterOptions: Ref<Array<Record<string, any>>>;

  beforeEach(() => {
    props = { disabled: false, virtualList: false };
    opened = ref(true);
    selectOptionHandler = vi.fn();
    // Create a fake options body and option elements with offsetTop/clientHeight
    const body = document.createElement('div');
    Object.defineProperty(body, 'scrollHeight', { value: 1000, writable: true });
    Object.defineProperty(body, 'clientHeight', { value: 200, writable: true });
    Object.defineProperty(body, 'scrollTop', { value: 0, writable: true });
    body.scrollTo = vi.fn(function (
      this: HTMLDivElement,
      optionsOrX?: number | ScrollToOptions,
      y?: number,
    ) {
      if (typeof optionsOrX === 'object' && optionsOrX !== null) {
        this.scrollTop = optionsOrX.top ?? 0;
      } else if (typeof optionsOrX === 'number' && typeof y === 'number') {
        this.scrollTop = y;
      }
    });
    optionsBodyRef = ref(body);

    // Create 5 fake option elements
    optionsInList = ref(
      Array.from({ length: 5 }, (_, i) => {
        const el = document.createElement('div');
        Object.defineProperty(el, 'offsetTop', { value: i * 40, writable: true });
        Object.defineProperty(el, 'clientHeight', { value: 40, writable: true });
        return el;
      }),
    );

    // Создание fake filterElementRef с clientHeight
    const filterEl = document.createElement('div');
    Object.defineProperty(filterEl, 'clientHeight', { value: 32, writable: true });
    filterElementRef = ref(filterEl);

    virtualScrollerRef = ref(null);
    focusedOptionIndex = ref(0);
    filterOptions = ref([
      { value: 'a' },
      { value: 'b' },
      { value: 'c' },
      { value: 'd' },
      { value: 'e' },
    ]);
  });

  describe('onKeyDownOrUpHandler', () => {
    it('Should do nothing if select is disabled.', async () => {
      props.disabled = true;
      const wrapper = mountWithComposable(props, {
        opened,
        selectOptionHandler,
        optionsBodyRef,
        optionsInList,
        virtualScrollerRef,
        focusedOptionIndex,
        filterOptions,
      });

      wrapper.vm.onKeyDownOrUpHandler(new KeyboardEvent('keydown', { key: 'ArrowDown' }));
      expect(focusedOptionIndex.value).toEqual(0);
    });

    it('Should do nothing if select is closed.', async () => {
      opened.value = false;
      const wrapper = mountWithComposable(props, {
        opened,
        selectOptionHandler,
        optionsBodyRef,
        optionsInList,
        virtualScrollerRef,
        focusedOptionIndex,
        filterOptions,
      });

      wrapper.vm.onKeyDownOrUpHandler(new KeyboardEvent('keydown', { key: 'ArrowDown' }));
      expect(focusedOptionIndex.value).toEqual(0);
    });

    it('Should focus first option on ArrowDown if no focused index.', async () => {
      focusedOptionIndex.value = undefined as any;
      const wrapper = mountWithComposable(props, {
        opened,
        selectOptionHandler,
        optionsBodyRef,
        optionsInList,
        virtualScrollerRef,
        focusedOptionIndex,
        filterOptions,
      });

      wrapper.vm.onKeyDownOrUpHandler(new KeyboardEvent('keydown', { key: 'ArrowDown' }));
      expect(focusedOptionIndex.value).toEqual(0);
    });

    it('Should focus last option on ArrowUp if no focused index.', async () => {
      focusedOptionIndex.value = undefined as any;
      const wrapper = mountWithComposable(props, {
        opened,
        selectOptionHandler,
        optionsBodyRef,
        optionsInList,
        virtualScrollerRef,
        focusedOptionIndex,
        filterOptions,
      });

      wrapper.vm.onKeyDownOrUpHandler(new KeyboardEvent('keydown', { key: 'ArrowUp' }));
      expect(focusedOptionIndex.value).toEqual(filterOptions.value!.length - 1);
    });

    it('Should wrap to last option when pressing ArrowUp at first option.', async () => {
      focusedOptionIndex.value = 0;
      const wrapper = mountWithComposable(props, {
        opened,
        selectOptionHandler,
        optionsBodyRef,
        optionsInList,
        virtualScrollerRef,
        focusedOptionIndex,
        filterOptions,
      });

      wrapper.vm.onKeyDownOrUpHandler(new KeyboardEvent('keydown', { key: 'ArrowUp' }));
      expect(focusedOptionIndex.value).toEqual(filterOptions.value!.length - 1);
    });

    it('Should wrap to first option when pressing ArrowDown at last option.', async () => {
      focusedOptionIndex.value = filterOptions.value!.length - 1;
      const wrapper = mountWithComposable(props, {
        opened,
        selectOptionHandler,
        optionsBodyRef,
        optionsInList,
        virtualScrollerRef,
        focusedOptionIndex,
        filterOptions,
      });

      wrapper.vm.onKeyDownOrUpHandler(new KeyboardEvent('keydown', { key: 'ArrowDown' }));
      expect(focusedOptionIndex.value).toEqual(0);
    });

    it('Should increment focusedOptionIndex on ArrowDown.', async () => {
      focusedOptionIndex.value = 2;
      const wrapper = mountWithComposable(props, {
        opened,
        selectOptionHandler,
        optionsBodyRef,
        optionsInList,
        virtualScrollerRef,
        focusedOptionIndex,
        filterOptions,
      });

      wrapper.vm.onKeyDownOrUpHandler(new KeyboardEvent('keydown', { key: 'ArrowDown' }));
      expect(focusedOptionIndex.value).toEqual(3);
    });

    it('Should decrement focusedOptionIndex on ArrowUp.', async () => {
      focusedOptionIndex.value = 3;
      const wrapper = mountWithComposable(props, {
        opened,
        selectOptionHandler,
        optionsBodyRef,
        optionsInList,
        virtualScrollerRef,
        focusedOptionIndex,
        filterOptions,
      });

      wrapper.vm.onKeyDownOrUpHandler(new KeyboardEvent('keydown', { key: 'ArrowUp' }));
      expect(focusedOptionIndex.value).toEqual(2);
    });

    it('Should scroll optionsBodyRef to correct position on ArrowUp if needed.', async () => {
      focusedOptionIndex.value = 2;
      optionsBodyRef.value!.scrollTop = 100;
      const wrapper = mountWithComposable(props, {
        opened,
        selectOptionHandler,
        optionsBodyRef,
        optionsInList,
        virtualScrollerRef,
        focusedOptionIndex,
        filterOptions,
      });

      wrapper.vm.onKeyDownOrUpHandler(new KeyboardEvent('keydown', { key: 'ArrowUp' }));
      // Should scroll to the previous item if it's above the visible area
      expect(optionsBodyRef.value!.scrollTop).toBeLessThanOrEqual(40);
    });

    it('Should handle virtual list navigation and call virtualScrollerRef.scrollTo.', async () => {
      props.virtualScroller = true;
      const getVisibleIndexes = vi.fn(() => ({ start: 1, end: 3 }));
      const scrollTo = vi.fn();
      virtualScrollerRef.value = { getVisibleIndexes, scrollTo };
      focusedOptionIndex.value = 0;
      const wrapper = mountWithComposable(props, {
        opened,
        selectOptionHandler,
        optionsBodyRef,
        optionsInList,
        filterElementRef,
        virtualScrollerRef,
        focusedOptionIndex,
        filterOptions,
      });

      wrapper.vm.onKeyDownOrUpHandler(new KeyboardEvent('keydown', { key: 'ArrowUp' }));
      expect(scrollTo).toHaveBeenCalled();
    });
  });

  describe('onKeySpaceOrEnterHandler', () => {
    it('Should do nothing if select is disabled.', async () => {
      props.disabled = true;
      const wrapper = mountWithComposable(props, {
        opened,
        selectOptionHandler,
        optionsBodyRef,
        optionsInList,
        virtualScrollerRef,
        focusedOptionIndex,
        filterOptions,
      });

      wrapper.vm.onKeySpaceOrEnterHandler();
      expect(selectOptionHandler).not.toHaveBeenCalled();
    });

    it('Should open select if not opened.', async () => {
      opened.value = false;
      const wrapper = mountWithComposable(props, {
        opened,
        selectOptionHandler,
        optionsBodyRef,
        optionsInList,
        virtualScrollerRef,
        focusedOptionIndex,
        filterOptions,
      });
      wrapper.vm.onKeySpaceOrEnterHandler();

      expect(opened.value).toBe(true);
      expect(selectOptionHandler).not.toHaveBeenCalled();
    });

    it('Should call selectOptionHandler with currently focused option.', async () => {
      focusedOptionIndex.value = 2;
      const wrapper = mountWithComposable(props, {
        opened,
        selectOptionHandler,
        optionsBodyRef,
        optionsInList,
        virtualScrollerRef,
        focusedOptionIndex,
        filterOptions,
      });
      wrapper.vm.onKeySpaceOrEnterHandler();

      expect(selectOptionHandler).toHaveBeenCalledWith(filterOptions.value![2]);
    });
  });

  describe('Edge cases', () => {
    it('Should not throw if optionsBodyRef is null.', async () => {
      optionsBodyRef.value = null;
      focusedOptionIndex.value = 0;
      const wrapper = mountWithComposable(props, {
        opened,
        selectOptionHandler,
        optionsBodyRef,
        optionsInList,
        virtualScrollerRef,
        focusedOptionIndex,
        filterOptions,
      });

      expect(() =>
        wrapper.vm.onKeyDownOrUpHandler(new KeyboardEvent('keydown', { key: 'ArrowDown' })),
      ).not.toThrow();
    });

    it('Should not throw if optionsInList is empty.', async () => {
      optionsInList.value = [];
      focusedOptionIndex.value = 0;
      const wrapper = mountWithComposable(props, {
        opened,
        selectOptionHandler,
        optionsBodyRef,
        optionsInList,
        virtualScrollerRef,
        focusedOptionIndex,
        filterOptions,
      });

      expect(() =>
        wrapper.vm.onKeyDownOrUpHandler(new KeyboardEvent('keydown', { key: 'ArrowDown' })),
      ).not.toThrow();
    });

    it('Should not throw if filterOptions is empty.', async () => {
      filterOptions.value = [];
      focusedOptionIndex.value = 0;
      const wrapper = mountWithComposable(props, {
        opened,
        selectOptionHandler,
        optionsBodyRef,
        optionsInList,
        virtualScrollerRef,
        focusedOptionIndex,
        filterOptions,
      });

      expect(() =>
        wrapper.vm.onKeyDownOrUpHandler(new KeyboardEvent('keydown', { key: 'ArrowDown' })),
      ).not.toThrow();
    });
  });
});
