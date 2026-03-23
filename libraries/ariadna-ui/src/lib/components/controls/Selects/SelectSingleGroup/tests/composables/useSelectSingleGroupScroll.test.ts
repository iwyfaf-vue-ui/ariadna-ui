import { describe, it, expect, vi, beforeEach } from 'vitest';
import { ref, computed, defineComponent, h, nextTick, type Ref } from 'vue';
import { mount } from '@vue/test-utils';
import useSelectSingleGroupScroll from '../../composables/useSelectSingleGroupScroll/useSelectSingleGroupScroll';
import type { TSelectSingleGroupProps } from '../../SelectSingleGroup';
import { SelectSingleGroupSelectorTestData } from '../test-data/SelectSingleGroup.selector.test-data';

const defaultMock = new SelectSingleGroupSelectorTestData();

/**
 * Creates a group HTMLElement with a header child (index 0) and option children (index 1+).
 * children[0] = group label, children[foundItemIndex + 1] = option
 */
function createGroupElement(childOffsetTops: number[]): HTMLElement {
  const groupEl = document.createElement('div');

  // children[0] = group header
  groupEl.appendChild(document.createElement('div'));

  // children[1+] = options
  childOffsetTops.forEach((offsetTop) => {
    const optionEl = document.createElement('div');
    Object.defineProperty(optionEl, 'offsetTop', { value: offsetTop, configurable: true });
    groupEl.appendChild(optionEl);
  });

  return groupEl;
}

function createListElement(): HTMLElement & { scrollTo: ReturnType<typeof vi.fn> } {
  const el = document.createElement('div') as unknown as HTMLElement & {
    scrollTo: ReturnType<typeof vi.fn>;
  };
  el.scrollTo = vi.fn();
  return el;
}

function createFilterElement(clientHeightValue: number): HTMLElement {
  const el = document.createElement('div');
  Object.defineProperty(el, 'clientHeight', { value: clientHeightValue, configurable: true });
  return el;
}

type MountParams = {
  propsOverride?: Partial<TSelectSingleGroupProps>;
  vModelValue?: any;
  options?: any[];
  selectedOption?: any;
  groupsInListElements?: (HTMLElement | null)[];
  optionsListElement?: (HTMLElement & { scrollTo: ReturnType<typeof vi.fn> }) | null;
  filterElement?: HTMLElement | null;
};

function mountWithComposable(params: MountParams = {}) {
  const {
    propsOverride = {},
    vModelValue = null,
    options = defaultMock.mockProps.options,
    selectedOption = null,
    groupsInListElements = [],
    optionsListElement = null,
    filterElement = null,
  } = params;

  const props = { ...defaultMock.mockProps, ...propsOverride } as TSelectSingleGroupProps;
  const vModel = ref(vModelValue);
  const opened = ref(false);
  const filterOptions = computed(() => options);
  const isSelected = vi.fn((option: any) => option === selectedOption);

  const groupsInList = ref(groupsInListElements) as Ref<(HTMLElement | null)[]>;
  const optionsListRef = ref(optionsListElement) as Ref<
    (HTMLElement & { scrollTo: ReturnType<typeof vi.fn> }) | null
  >;
  const filterElementRef = ref(filterElement) as Ref<HTMLElement | null>;

  const wrapper = mount(
    defineComponent({
      setup() {
        useSelectSingleGroupScroll(
          props,
          vModel,
          opened,
          filterOptions,
          isSelected,
          groupsInList,
          optionsListRef,
          filterElementRef,
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
  };
}

describe('useSelectSingleGroupScroll', () => {
  let options: TSelectSingleGroupProps['options'];

  beforeEach(() => {
    options = defaultMock.optionsExample();
  });

  describe('Guard conditions (early return)', () => {
    it('Should not scroll when opened becomes false.', async () => {
      const listEl = createListElement();
      const selectedOption = options[0].children[0];

      const { opened } = mountWithComposable({
        vModelValue: selectedOption,
        options,
        selectedOption,
        groupsInListElements: [createGroupElement([100, 200]), createGroupElement([300, 400])],
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
        groupsInListElements: [createGroupElement([100, 200]), createGroupElement([300, 400])],
        optionsListElement: listEl,
      });

      opened.value = true;
      await nextTick();
      await nextTick();

      expect(listEl.scrollTo).not.toHaveBeenCalled();
    });

    it('Should not scroll when no option matches isSelected in any group.', async () => {
      const listEl = createListElement();

      const { opened } = mountWithComposable({
        vModelValue: { label: 'Not in list', value: 999 },
        options,
        selectedOption: null, // isSelected returns false for every option
        groupsInListElements: [createGroupElement([100, 200]), createGroupElement([300, 400])],
        optionsListElement: listEl,
      });

      opened.value = true;
      await nextTick();
      await nextTick();

      expect(listEl.scrollTo).not.toHaveBeenCalled();
    });
  });

  describe('Regular list scrolling', () => {
    it('Should scroll to first option of first group when selected.', async () => {
      const listEl = createListElement();
      const selectedOption = options[0].children[0]; // Group 1, Option 1

      const { opened } = mountWithComposable({
        vModelValue: selectedOption,
        options,
        selectedOption,
        // group 0: children[1] has offsetTop=100, children[2] has offsetTop=200
        groupsInListElements: [createGroupElement([100, 200]), createGroupElement([300, 400])],
        optionsListElement: listEl,
        filterElement: null,
      });

      opened.value = true;
      await nextTick();
      await nextTick();

      expect(listEl.scrollTo).toHaveBeenCalledWith({ top: 100 });
    });

    it('Should scroll to second option of first group when selected.', async () => {
      const listEl = createListElement();
      const selectedOption = options[0].children[1]; // Group 1, Option 2

      const { opened } = mountWithComposable({
        vModelValue: selectedOption,
        options,
        selectedOption,
        groupsInListElements: [createGroupElement([100, 200]), createGroupElement([300, 400])],
        optionsListElement: listEl,
        filterElement: null,
      });

      opened.value = true;
      await nextTick();
      await nextTick();

      expect(listEl.scrollTo).toHaveBeenCalledWith({ top: 200 });
    });

    it('Should scroll to first option of second group when selected.', async () => {
      const listEl = createListElement();
      const selectedOption = options[1].children[0]; // Group 2, Option 3

      const { opened } = mountWithComposable({
        vModelValue: selectedOption,
        options,
        selectedOption,
        groupsInListElements: [createGroupElement([100, 200]), createGroupElement([300, 400])],
        optionsListElement: listEl,
        filterElement: null,
      });

      opened.value = true;
      await nextTick();
      await nextTick();

      expect(listEl.scrollTo).toHaveBeenCalledWith({ top: 300 });
    });

    it('Should subtract filter clientHeight from scrollTop when filter element is present.', async () => {
      const listEl = createListElement();
      const selectedOption = options[0].children[0]; // Group 1, Option 1, offsetTop=100
      const filterEl = createFilterElement(48);

      const { opened } = mountWithComposable({
        vModelValue: selectedOption,
        options,
        selectedOption,
        groupsInListElements: [createGroupElement([100, 200]), createGroupElement([300, 400])],
        optionsListElement: listEl,
        filterElement: filterEl,
      });

      opened.value = true;
      await nextTick();
      await nextTick();

      expect(listEl.scrollTo).toHaveBeenCalledWith({ top: 100 - 48 });
    });

    it('Should use filterHeight = 0 when filterElement clientHeight is 0.', async () => {
      const listEl = createListElement();
      const selectedOption = options[1].children[1]; // Group 2, Option 4, offsetTop=400
      const filterEl = createFilterElement(0);

      const { opened } = mountWithComposable({
        vModelValue: selectedOption,
        options,
        selectedOption,
        groupsInListElements: [createGroupElement([100, 200]), createGroupElement([300, 400])],
        optionsListElement: listEl,
        filterElement: filterEl,
      });

      opened.value = true;
      await nextTick();
      await nextTick();

      expect(listEl.scrollTo).toHaveBeenCalledWith({ top: 400 });
    });

    it('Should not scroll if groupEl at foundGroupIndex is null.', async () => {
      const listEl = createListElement();
      const selectedOption = options[0].children[0];

      const { opened } = mountWithComposable({
        vModelValue: selectedOption,
        options,
        selectedOption,
        groupsInListElements: [null, createGroupElement([300, 400])], // index 0 is null
        optionsListElement: listEl,
      });

      opened.value = true;
      await nextTick();
      await nextTick();

      expect(listEl.scrollTo).not.toHaveBeenCalled();
    });

    it('Should not scroll if optionsListRef is null.', async () => {
      const selectedOption = options[0].children[0];

      const { opened, isSelected } = mountWithComposable({
        vModelValue: selectedOption,
        options,
        selectedOption,
        groupsInListElements: [createGroupElement([100, 200]), createGroupElement([300, 400])],
        optionsListElement: null,
      });

      opened.value = true;
      await nextTick();
      await nextTick();

      // no error thrown, isSelected was called to traverse groups
      expect(isSelected).toHaveBeenCalled();
    });

    it('Should not scroll if option child element is absent in groupEl.children.', async () => {
      const listEl = createListElement();
      const selectedOption = options[0].children[0];

      // Group element with NO option children (only header = children[0])
      const emptyGroupEl = document.createElement('div');
      emptyGroupEl.appendChild(document.createElement('div')); // only header, no options

      const { opened } = mountWithComposable({
        vModelValue: selectedOption,
        options,
        selectedOption,
        groupsInListElements: [emptyGroupEl, createGroupElement([300, 400])],
        optionsListElement: listEl,
      });

      opened.value = true;
      await nextTick();
      await nextTick();

      expect(listEl.scrollTo).not.toHaveBeenCalled();
    });
  });

  describe('Reactivity', () => {
    it('Should scroll again on each subsequent open.', async () => {
      const listEl = createListElement();
      const selectedOption = options[0].children[1]; // Group 1, Option 2

      const { opened } = mountWithComposable({
        vModelValue: selectedOption,
        options,
        selectedOption,
        groupsInListElements: [createGroupElement([100, 200]), createGroupElement([300, 400])],
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
      expect(listEl.scrollTo).toHaveBeenCalledWith({ top: 200 });
    });
  });
});
