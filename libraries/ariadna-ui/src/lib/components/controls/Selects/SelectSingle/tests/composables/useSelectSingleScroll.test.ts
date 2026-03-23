import { describe, it, expect, vi, beforeEach } from 'vitest';
import { ref, computed, defineComponent, h, nextTick, type Ref } from 'vue';
import { mount } from '@vue/test-utils';
import useSelectSingleScroll from '../../composables/useSelectSingleScroll/useSelectSingleScroll';
import type { TSelectSingleProps } from '../../SelectSingle';
import { SelectSingleSelectorTestData } from '../test-data/SelectSingle.selector.test-data';
import type { TVirtualScrollerExposes } from '@/lib/components/data/VirtualScroller/VirtualScroller';

const defaultMock = new SelectSingleSelectorTestData();

function createOptionElement(offsetTopValue: number): HTMLElement {
  const el = document.createElement('div');
  Object.defineProperty(el, 'offsetTop', { value: offsetTopValue, configurable: true });
  return el;
}

function createListElement(): HTMLElement & { scrollTo: ReturnType<typeof vi.fn> } {
  const el = document.createElement('div') as unknown as HTMLElement & {
    scrollTo: ReturnType<typeof vi.fn>;
  };
  el.scrollTo = vi.fn();
  return el;
}

function createVirtualScrollerRef(
  value: { scrollTo?: (index: number) => void } | null,
): Ref<TVirtualScrollerExposes | null> {
  return ref(value) as unknown as Ref<TVirtualScrollerExposes | null>;
}

function createFilterElement(clientHeightValue: number): HTMLElement {
  const el = document.createElement('div');
  Object.defineProperty(el, 'clientHeight', {
    value: clientHeightValue,
    configurable: true,
  });
  return el;
}

type MountParams = {
  propsOverride?: Partial<TSelectSingleProps>;
  vModelValue?: any;
  options?: any[];
  selectedOption?: any;
  optionsInListElements?: (HTMLElement | null)[];
  optionsListElement?: (HTMLElement & { scrollTo: ReturnType<typeof vi.fn> }) | null;
  filterElement?: HTMLElement | null;
  virtualScrollerRef?: Ref<TVirtualScrollerExposes | null>;
};

function mountWithComposable(params: MountParams = {}) {
  const {
    propsOverride = {},
    vModelValue = null,
    options = defaultMock.mockProps.options,
    selectedOption = null,
    optionsInListElements = [],
    optionsListElement = null,
    filterElement = null,
    virtualScrollerRef = ref(null),
  } = params;

  const props = { ...defaultMock.mockProps, ...propsOverride } as TSelectSingleProps;
  const vModel = ref(vModelValue);
  const opened = ref(false);
  const filterOptions = computed(() => options);
  const isSelected = vi.fn((option: any) => option === selectedOption);

  const optionsInList = ref(optionsInListElements) as Ref<(HTMLElement | null)[]>;
  const optionsListRef = ref(optionsListElement) as Ref<
    (HTMLElement & { scrollTo: ReturnType<typeof vi.fn> }) | null
  >;
  const filterElementRef = ref(filterElement) as Ref<HTMLElement | null>;

  const wrapper = mount(
    defineComponent({
      setup() {
        useSelectSingleScroll(
          props,
          vModel,
          opened,
          filterOptions,
          isSelected,
          optionsInList,
          optionsListRef,
          filterElementRef,
          virtualScrollerRef,
        );
        return { opened, vModel };
      },
      render() {
        return h('div');
      },
    }),
  );

  return {
    wrapper,
    vModel,
    opened,
    isSelected,
    optionsListRef,
    virtualScrollerRef,
  };
}

describe('useSelectSingleScroll', () => {
  let options: TSelectSingleProps['options'];

  beforeEach(() => {
    options = [...defaultMock.mockProps.options];
  });

  describe('Guard conditions (early return)', () => {
    it('Should not scroll when opened becomes false.', async () => {
      const listEl = createListElement();
      const selectedOption = options[1];

      const { opened } = mountWithComposable({
        vModelValue: selectedOption,
        options,
        selectedOption,
        optionsInListElements: [
          createOptionElement(0),
          createOptionElement(100),
          createOptionElement(200),
        ],
        optionsListElement: listEl,
      });

      opened.value = false;
      await nextTick();
      await nextTick();

      expect(listEl.scrollTo).not.toHaveBeenCalled();
    });

    it('Should not scroll when opened becomes true but vModel is null.', async () => {
      const listEl = createListElement();

      const { opened } = mountWithComposable({
        vModelValue: null,
        options,
        selectedOption: null,
        optionsInListElements: [
          createOptionElement(0),
          createOptionElement(100),
          createOptionElement(200),
        ],
        optionsListElement: listEl,
      });

      opened.value = true;
      await nextTick();
      await nextTick();

      expect(listEl.scrollTo).not.toHaveBeenCalled();
    });

    it('Should not scroll when no option matches isSelected (selectedIndex === -1).', async () => {
      const listEl = createListElement();

      const { opened } = mountWithComposable({
        vModelValue: { label: 'Not in list', value: 999 },
        options,
        selectedOption: null, // isSelected returns false for every option
        optionsInListElements: [
          createOptionElement(0),
          createOptionElement(100),
          createOptionElement(200),
        ],
        optionsListElement: listEl,
      });

      opened.value = true;
      await nextTick();
      await nextTick();

      expect(listEl.scrollTo).not.toHaveBeenCalled();
    });
  });

  describe('Regular list scrolling', () => {
    it('Should scroll to selected option offsetTop when filter is absent.', async () => {
      const listEl = createListElement();
      const selectedOption = options[1];

      const { opened } = mountWithComposable({
        vModelValue: selectedOption,
        options,
        selectedOption,
        optionsInListElements: [
          createOptionElement(0),
          createOptionElement(100),
          createOptionElement(200),
        ],
        optionsListElement: listEl,
        filterElement: null,
      });

      opened.value = true;
      await nextTick();
      await nextTick();

      expect(listEl.scrollTo).toHaveBeenCalledWith({ top: 100 });
    });

    it('Should subtract filter clientHeight from scrollTop when filter element is present.', async () => {
      const listEl = createListElement();
      const selectedOption = options[2];
      const filterEl = createFilterElement(48);

      const { opened } = mountWithComposable({
        vModelValue: selectedOption,
        options,
        selectedOption,
        optionsInListElements: [
          createOptionElement(0),
          createOptionElement(100),
          createOptionElement(200),
        ],
        optionsListElement: listEl,
        filterElement: filterEl,
      });

      opened.value = true;
      await nextTick();
      await nextTick();

      expect(listEl.scrollTo).toHaveBeenCalledWith({ top: 200 - 48 });
    });

    it('Should use filterHeight = 0 when filterElement clientHeight is 0.', async () => {
      const listEl = createListElement();
      const selectedOption = options[0];
      const filterEl = createFilterElement(0);

      const { opened } = mountWithComposable({
        vModelValue: selectedOption,
        options,
        selectedOption,
        optionsInListElements: [
          createOptionElement(50),
          createOptionElement(100),
          createOptionElement(150),
        ],
        optionsListElement: listEl,
        filterElement: filterEl,
      });

      opened.value = true;
      await nextTick();
      await nextTick();

      expect(listEl.scrollTo).toHaveBeenCalledWith({ top: 50 });
    });

    it('Should not scroll if element at selectedIndex is null/undefined.', async () => {
      const listEl = createListElement();
      const selectedOption = options[1];

      const { opened } = mountWithComposable({
        vModelValue: selectedOption,
        options,
        selectedOption,
        optionsInListElements: [createOptionElement(0), null, createOptionElement(200)], // index 1 is null
        optionsListElement: listEl,
      });

      opened.value = true;
      await nextTick();
      await nextTick();

      expect(listEl.scrollTo).not.toHaveBeenCalled();
    });

    it('Should not scroll if optionsListRef is null.', async () => {
      const selectedOption = options[0];

      const { opened, isSelected } = mountWithComposable({
        vModelValue: selectedOption,
        options,
        selectedOption,
        optionsInListElements: [createOptionElement(0), createOptionElement(100)],
        optionsListElement: null,
      });

      opened.value = true;
      await nextTick();
      await nextTick();

      // no error thrown, isSelected was called to find the index
      expect(isSelected).toHaveBeenCalled();
    });

    it('Should scroll to first option when selectedIndex is 0.', async () => {
      const listEl = createListElement();
      const selectedOption = options[0];

      const { opened } = mountWithComposable({
        vModelValue: selectedOption,
        options,
        selectedOption,
        optionsInListElements: [
          createOptionElement(0),
          createOptionElement(100),
          createOptionElement(200),
        ],
        optionsListElement: listEl,
      });

      opened.value = true;
      await nextTick();
      await nextTick();

      expect(listEl.scrollTo).toHaveBeenCalledWith({ top: 0 });
    });
  });

  describe('Virtual scroller scrolling', () => {
    it('Should call virtualScrollerRef.scrollTo with selectedIndex when virtualScroller prop is set.', async () => {
      const scrollTo = vi.fn();
      const selectedOption = options[1];

      const { opened } = mountWithComposable({
        propsOverride: {
          virtualScroller: { itemHeight: 40 } as TSelectSingleProps['virtualScroller'],
        },
        vModelValue: selectedOption,
        options,
        selectedOption,
        virtualScrollerRef: createVirtualScrollerRef({ scrollTo }),
      });

      opened.value = true;
      await nextTick();
      await nextTick();

      expect(scrollTo).toHaveBeenCalledWith(1);
    });

    it('Should call virtualScrollerRef.scrollTo with correct index for last option.', async () => {
      const scrollTo = vi.fn();
      const selectedOption = options[2];

      const { opened } = mountWithComposable({
        propsOverride: {
          virtualScroller: { itemHeight: 40 } as TSelectSingleProps['virtualScroller'],
        },
        vModelValue: selectedOption,
        options,
        selectedOption,
        virtualScrollerRef: createVirtualScrollerRef({ scrollTo }),
      });

      opened.value = true;
      await nextTick();
      await nextTick();

      expect(scrollTo).toHaveBeenCalledWith(2);
    });

    it('Should not throw when virtualScroller prop is set but scrollTo method is absent.', async () => {
      const selectedOption = options[0];

      const { opened } = mountWithComposable({
        propsOverride: {
          virtualScroller: { itemHeight: 40 } as TSelectSingleProps['virtualScroller'],
        },
        vModelValue: selectedOption,
        options,
        selectedOption,
        virtualScrollerRef: createVirtualScrollerRef({}), // no scrollTo method
      });

      await expect(async () => {
        opened.value = true;
        await nextTick();
        await nextTick();
      }).not.toThrow();
    });

    it('Should not scroll regular list when virtualScroller prop is set.', async () => {
      const scrollTo = vi.fn();
      const listEl = createListElement();
      const selectedOption = options[0];

      const { opened } = mountWithComposable({
        propsOverride: {
          virtualScroller: { itemHeight: 40 } as TSelectSingleProps['virtualScroller'],
        },
        vModelValue: selectedOption,
        options,
        selectedOption,
        optionsInListElements: [createOptionElement(0), createOptionElement(100)],
        optionsListElement: listEl,
        virtualScrollerRef: createVirtualScrollerRef({ scrollTo }),
      });

      opened.value = true;
      await nextTick();
      await nextTick();

      expect(listEl.scrollTo).not.toHaveBeenCalled();
      expect(scrollTo).toHaveBeenCalledWith(0);
    });
  });

  describe('Reactivity', () => {
    it('Should scroll again on each subsequent open.', async () => {
      const listEl = createListElement();
      const selectedOption = options[1];

      const { opened } = mountWithComposable({
        vModelValue: selectedOption,
        options,
        selectedOption,
        optionsInListElements: [
          createOptionElement(0),
          createOptionElement(100),
          createOptionElement(200),
        ],
        optionsListElement: listEl,
      });

      opened.value = true;
      await nextTick();
      await nextTick();
      opened.value = false;
      await nextTick();
      opened.value = true;
      await nextTick();
      await nextTick();

      expect(listEl.scrollTo).toHaveBeenCalledTimes(2);
    });
  });
});
