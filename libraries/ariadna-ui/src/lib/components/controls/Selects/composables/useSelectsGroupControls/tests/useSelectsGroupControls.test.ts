import { describe, it, expect, vi } from 'vitest';
import { defineComponent, h, ref } from 'vue';
import { mount } from '@vue/test-utils';
import useSelectsGroupControls from '../useSelectsGroupControls';

const mockFilterOptions = [
  {
    label: 'Group 1',
    options: [
      { value: 1, label: 'Option 1-1' },
      { value: 2, label: 'Option 1-2' },
      { value: 3, label: 'Option 1-3' },
    ],
  },
  {
    label: 'Group 2',
    options: [
      { value: 4, label: 'Option 2-1' },
      { value: 5, label: 'Option 2-2' },
    ],
  },
  {
    label: 'Group 3',
    options: [{ value: 6, label: 'Option 3-1' }],
  },
];

function createMockHTMLElement(offsetTop: number, clientHeight: number): HTMLElement {
  return {
    offsetTop,
    clientHeight,
  } as HTMLElement;
}

function createMockGroup(optionsCount: number, startOffsetTop: number): HTMLElement {
  const children: HTMLElement[] = [];
  const groupHeader = createMockHTMLElement(startOffsetTop, 30);
  children.push(groupHeader);

  for (let i = 0; i < optionsCount; i++) {
    children.push(createMockHTMLElement(startOffsetTop + 30 + i * 40, 40));
  }

  return {
    children,
  } as unknown as HTMLElement;
}

function mountWithComposable(
  props: Record<string, any> = {},
  openedValue = true,
  filterOptionsValue = mockFilterOptions,
) {
  const opened = ref(openedValue);
  const selectGroupOptionHandler = vi.fn();
  const optionsListRef = ref<HTMLDivElement | null>(null);
  const filterElementRef = ref<HTMLDivElement | null>(null);
  const filterOptions = ref(filterOptionsValue);
  const groupsInList = ref<Array<HTMLElement>>([]);
  const optionsInGroup = ref<number>(0);
  const focusedGroupIndex = ref<number>(undefined as any);
  const focusedGroupOptionIndex = ref<number>(undefined as any);

  const defaultProps = {
    disabled: false,
    optionGroupChildren: 'options',
    ...props,
  };

  // Setup mock groups
  groupsInList.value = [createMockGroup(3, 0), createMockGroup(2, 150), createMockGroup(1, 280)];

  // Setup mock optionsListRef
  optionsListRef.value = {
    scrollTop: 0,
    clientHeight: 200,
    scrollTo: vi.fn(),
  } as unknown as HTMLDivElement;

  // Setup mock filterElementRef
  filterElementRef.value = {
    clientHeight: 50,
  } as HTMLDivElement;

  return mount(
    defineComponent({
      setup() {
        const result = useSelectsGroupControls(
          defaultProps,
          opened,
          selectGroupOptionHandler,
          optionsListRef,
          filterElementRef,
          filterOptions,
          groupsInList,
          optionsInGroup,
          focusedGroupIndex,
          focusedGroupOptionIndex,
        );

        return {
          ...result,
          opened,
          selectGroupOptionHandler,
          optionsListRef,
          filterElementRef,
          filterOptions,
          groupsInList,
          optionsInGroup,
          focusedGroupIndex,
          focusedGroupOptionIndex,
        };
      },
      render() {
        return h('div');
      },
    }),
  );
}

describe('useGroupControls', () => {
  describe('onKeyDownOrUpHandler', () => {
    describe('Initial state navigation', () => {
      it('Should focus first option in first group when ArrowDown is pressed with no focused item.', () => {
        const wrapper = mountWithComposable();
        const event = new KeyboardEvent('keydown', { key: 'ArrowDown' });

        wrapper.vm.onKeyDownOrUpHandler(event);

        expect(wrapper.vm.focusedGroupIndex).toBe(0);
        expect(wrapper.vm.focusedGroupOptionIndex).toBe(0);
        expect(wrapper.vm.optionsInGroup).toBe(3);
      });

      it('Should focus last option in last group when ArrowUp is pressed with no focused item.', () => {
        const wrapper = mountWithComposable();
        const event = new KeyboardEvent('keydown', { key: 'ArrowUp' });

        wrapper.vm.onKeyDownOrUpHandler(event);

        expect(wrapper.vm.focusedGroupIndex).toBe(2);
        expect(wrapper.vm.focusedGroupOptionIndex).toBe(0);
        expect(wrapper.vm.optionsInGroup).toBe(1);
      });

      it('Should call scrollTo when ArrowUp is pressed with no focused item.', () => {
        const wrapper = mountWithComposable();
        const event = new KeyboardEvent('keydown', { key: 'ArrowUp' });

        wrapper.vm.onKeyDownOrUpHandler(event);

        expect(wrapper.vm.optionsListRef?.scrollTo).toHaveBeenCalled();
      });
    });

    describe('Navigation within group', () => {
      it('Should move focus to next option when ArrowDown is pressed within a group.', () => {
        const wrapper = mountWithComposable();
        wrapper.vm.focusedGroupIndex = 0;
        wrapper.vm.focusedGroupOptionIndex = 0;
        wrapper.vm.optionsInGroup = 3;

        const event = new KeyboardEvent('keydown', { key: 'ArrowDown' });
        wrapper.vm.onKeyDownOrUpHandler(event);

        expect(wrapper.vm.focusedGroupIndex).toBe(0);
        expect(wrapper.vm.focusedGroupOptionIndex).toBe(1);
      });

      it('Should move focus to previous option when ArrowUp is pressed within a group.', () => {
        const wrapper = mountWithComposable();
        wrapper.vm.focusedGroupIndex = 0;
        wrapper.vm.focusedGroupOptionIndex = 2;
        wrapper.vm.optionsInGroup = 3;

        const event = new KeyboardEvent('keydown', { key: 'ArrowUp' });
        wrapper.vm.onKeyDownOrUpHandler(event);

        expect(wrapper.vm.focusedGroupIndex).toBe(0);
        expect(wrapper.vm.focusedGroupOptionIndex).toBe(1);
      });

      it('Should handle multiple ArrowDown presses within the same group.', () => {
        const wrapper = mountWithComposable();
        wrapper.vm.focusedGroupIndex = 0;
        wrapper.vm.focusedGroupOptionIndex = 0;
        wrapper.vm.optionsInGroup = 3;

        const event = new KeyboardEvent('keydown', { key: 'ArrowDown' });
        wrapper.vm.onKeyDownOrUpHandler(event);
        wrapper.vm.onKeyDownOrUpHandler(event);

        expect(wrapper.vm.focusedGroupIndex).toBe(0);
        expect(wrapper.vm.focusedGroupOptionIndex).toBe(2);
      });
    });

    describe('Navigation between groups', () => {
      it('Should move to first option of next group when ArrowDown is pressed on last option of current group.', () => {
        const wrapper = mountWithComposable();
        wrapper.vm.focusedGroupIndex = 0;
        wrapper.vm.focusedGroupOptionIndex = 2;
        wrapper.vm.optionsInGroup = 3;

        const event = new KeyboardEvent('keydown', { key: 'ArrowDown' });
        wrapper.vm.onKeyDownOrUpHandler(event);

        expect(wrapper.vm.focusedGroupIndex).toBe(1);
        expect(wrapper.vm.focusedGroupOptionIndex).toBe(0);
        expect(wrapper.vm.optionsInGroup).toBe(2);
      });

      it('Should move to last option of previous group when ArrowUp is pressed on first option of current group.', () => {
        const wrapper = mountWithComposable();
        wrapper.vm.focusedGroupIndex = 1;
        wrapper.vm.focusedGroupOptionIndex = 0;
        wrapper.vm.optionsInGroup = 2;

        const event = new KeyboardEvent('keydown', { key: 'ArrowUp' });
        wrapper.vm.onKeyDownOrUpHandler(event);

        expect(wrapper.vm.focusedGroupIndex).toBe(0);
        expect(wrapper.vm.focusedGroupOptionIndex).toBe(2);
        expect(wrapper.vm.optionsInGroup).toBe(3);
      });

      it('Should update optionsInGroup when moving between groups.', () => {
        const wrapper = mountWithComposable();
        wrapper.vm.focusedGroupIndex = 0;
        wrapper.vm.focusedGroupOptionIndex = 2;
        wrapper.vm.optionsInGroup = 3;

        const event = new KeyboardEvent('keydown', { key: 'ArrowDown' });
        wrapper.vm.onKeyDownOrUpHandler(event);

        expect(wrapper.vm.optionsInGroup).toBe(2);
      });
    });

    describe('Circular navigation', () => {
      it('Should wrap to first group when ArrowDown is pressed on last option of last group.', () => {
        const wrapper = mountWithComposable();
        wrapper.vm.focusedGroupIndex = 2;
        wrapper.vm.focusedGroupOptionIndex = 0;
        wrapper.vm.optionsInGroup = 1;

        const event = new KeyboardEvent('keydown', { key: 'ArrowDown' });
        wrapper.vm.onKeyDownOrUpHandler(event);

        expect(wrapper.vm.focusedGroupIndex).toBe(0);
        expect(wrapper.vm.focusedGroupOptionIndex).toBe(0);
        expect(wrapper.vm.optionsInGroup).toBe(3);
      });

      it('Should wrap to last group when ArrowUp is pressed on first option of first group.', () => {
        const wrapper = mountWithComposable();
        wrapper.vm.focusedGroupIndex = 0;
        wrapper.vm.focusedGroupOptionIndex = 0;
        wrapper.vm.optionsInGroup = 3;

        const event = new KeyboardEvent('keydown', { key: 'ArrowUp' });
        wrapper.vm.onKeyDownOrUpHandler(event);

        expect(wrapper.vm.focusedGroupIndex).toBe(2);
        expect(wrapper.vm.focusedGroupOptionIndex).toBe(0);
        expect(wrapper.vm.optionsInGroup).toBe(1);
      });
    });

    describe('Disabled state', () => {
      it('Should not change focus when disabled and ArrowDown is pressed.', () => {
        const wrapper = mountWithComposable({ disabled: true });
        const event = new KeyboardEvent('keydown', { key: 'ArrowDown' });

        wrapper.vm.onKeyDownOrUpHandler(event);

        expect(wrapper.vm.focusedGroupIndex).toBeUndefined();
        expect(wrapper.vm.focusedGroupOptionIndex).toBeUndefined();
      });

      it('Should not change focus when disabled and ArrowUp is pressed.', () => {
        const wrapper = mountWithComposable({ disabled: true });
        const event = new KeyboardEvent('keydown', { key: 'ArrowUp' });

        wrapper.vm.onKeyDownOrUpHandler(event);

        expect(wrapper.vm.focusedGroupIndex).toBeUndefined();
        expect(wrapper.vm.focusedGroupOptionIndex).toBeUndefined();
      });
    });

    describe('Closed dropdown state', () => {
      it('Should not change focus when dropdown is closed and ArrowDown is pressed.', () => {
        const wrapper = mountWithComposable({}, false);
        const event = new KeyboardEvent('keydown', { key: 'ArrowDown' });

        wrapper.vm.onKeyDownOrUpHandler(event);

        expect(wrapper.vm.focusedGroupIndex).toBeUndefined();
        expect(wrapper.vm.focusedGroupOptionIndex).toBeUndefined();
      });

      it('Should not change focus when dropdown is closed and ArrowUp is pressed.', () => {
        const wrapper = mountWithComposable({}, false);
        const event = new KeyboardEvent('keydown', { key: 'ArrowUp' });

        wrapper.vm.onKeyDownOrUpHandler(event);

        expect(wrapper.vm.focusedGroupIndex).toBeUndefined();
        expect(wrapper.vm.focusedGroupOptionIndex).toBeUndefined();
      });
    });

    describe('Scroll behavior', () => {
      it('Should call scrollTo when navigating to first option of first group.', () => {
        const wrapper = mountWithComposable();
        // Start from a different position
        wrapper.vm.focusedGroupIndex = 1;
        wrapper.vm.focusedGroupOptionIndex = 0;
        wrapper.vm.optionsInGroup = 2;
        wrapper.vm.optionsListRef!.scrollTop = 100;

        // Navigate up to wrap around to first group
        const event = new KeyboardEvent('keydown', { key: 'ArrowUp' });
        wrapper.vm.onKeyDownOrUpHandler(event);

        // Now we're at last option of first group, navigate down to trigger scroll
        const eventDown = new KeyboardEvent('keydown', { key: 'ArrowDown' });
        wrapper.vm.onKeyDownOrUpHandler(eventDown);

        expect(wrapper.vm.optionsListRef!.scrollTo).toHaveBeenCalled();
      });

      it('Should call scrollTo when item is below viewport during navigation down.', () => {
        const wrapper = mountWithComposable();
        wrapper.vm.focusedGroupIndex = 1;
        wrapper.vm.focusedGroupOptionIndex = 0;
        wrapper.vm.optionsInGroup = 2;
        // Set scroll position so next item will be below viewport
        wrapper.vm.optionsListRef!.scrollTop = 0;

        const event = new KeyboardEvent('keydown', { key: 'ArrowDown' });
        wrapper.vm.onKeyDownOrUpHandler(event);

        expect(wrapper.vm.optionsListRef!.scrollTo).toHaveBeenCalled();
      });

      it('Should call scrollTo when navigating up and item is above viewport.', () => {
        const wrapper = mountWithComposable();
        wrapper.vm.focusedGroupIndex = 1;
        wrapper.vm.focusedGroupOptionIndex = 1;
        wrapper.vm.optionsInGroup = 2;
        wrapper.vm.optionsListRef!.scrollTop = 200;

        const event = new KeyboardEvent('keydown', { key: 'ArrowUp' });
        wrapper.vm.onKeyDownOrUpHandler(event);

        expect(wrapper.vm.optionsListRef!.scrollTo).toHaveBeenCalled();
      });

      it('Should call scrollTo when wrapping from last to first group.', () => {
        const wrapper = mountWithComposable();
        wrapper.vm.focusedGroupIndex = 2;
        wrapper.vm.focusedGroupOptionIndex = 0;
        wrapper.vm.optionsInGroup = 1;
        wrapper.vm.optionsListRef!.scrollTop = 300;

        const event = new KeyboardEvent('keydown', { key: 'ArrowDown' });
        wrapper.vm.onKeyDownOrUpHandler(event);

        expect(wrapper.vm.optionsListRef!.scrollTo).toHaveBeenCalled();
      });

      it('Should not call scrollTo when optionsListRef is null.', () => {
        const wrapper = mountWithComposable();
        wrapper.vm.optionsListRef = null;
        wrapper.vm.focusedGroupIndex = 0;
        wrapper.vm.focusedGroupOptionIndex = 0;
        wrapper.vm.optionsInGroup = 3;

        const event = new KeyboardEvent('keydown', { key: 'ArrowDown' });

        expect(() => wrapper.vm.onKeyDownOrUpHandler(event)).not.toThrow();
      });

      it('Should not scroll when item is already visible in viewport.', () => {
        const wrapper = mountWithComposable();
        wrapper.vm.focusedGroupIndex = 0;
        wrapper.vm.focusedGroupOptionIndex = 0;
        wrapper.vm.optionsInGroup = 3;
        // Large viewport that contains all items
        wrapper.vm.optionsListRef!.scrollTop = 0;

        const scrollToSpy = wrapper.vm.optionsListRef!.scrollTo as any;
        scrollToSpy.mockClear();

        const event = new KeyboardEvent('keydown', { key: 'ArrowDown' });
        wrapper.vm.onKeyDownOrUpHandler(event);

        // Should not scroll because item is visible
        expect(scrollToSpy).not.toHaveBeenCalled();
      });
    });

    describe('Edge cases', () => {
      it('Should handle single group with single option correctly.', () => {
        const singleOptionData = [
          {
            label: 'Group 1',
            options: [{ value: 1, label: 'Option 1' }],
          },
        ];
        const wrapper = mountWithComposable({}, true, singleOptionData);
        wrapper.vm.groupsInList = [createMockGroup(1, 0)];

        const eventDown = new KeyboardEvent('keydown', { key: 'ArrowDown' });
        wrapper.vm.onKeyDownOrUpHandler(eventDown);

        expect(wrapper.vm.focusedGroupIndex).toBe(0);
        expect(wrapper.vm.focusedGroupOptionIndex).toBe(0);

        const eventDownAgain = new KeyboardEvent('keydown', { key: 'ArrowDown' });
        wrapper.vm.onKeyDownOrUpHandler(eventDownAgain);

        expect(wrapper.vm.focusedGroupIndex).toBe(0);
        expect(wrapper.vm.focusedGroupOptionIndex).toBe(0);
      });

      it('Should handle navigation when focusedGroupIndex is 0 (falsy but valid).', () => {
        const wrapper = mountWithComposable();
        wrapper.vm.focusedGroupIndex = 0;
        wrapper.vm.focusedGroupOptionIndex = 1;
        wrapper.vm.optionsInGroup = 3;

        const event = new KeyboardEvent('keydown', { key: 'ArrowUp' });
        wrapper.vm.onKeyDownOrUpHandler(event);

        expect(wrapper.vm.focusedGroupIndex).toBe(0);
        expect(wrapper.vm.focusedGroupOptionIndex).toBe(0);
      });
    });
  });

  describe('onKeySpaceOrEnterHandler', () => {
    describe('Opening dropdown', () => {
      it('Should open dropdown when closed and Space or Enter is pressed.', () => {
        const wrapper = mountWithComposable({}, false);

        wrapper.vm.onKeySpaceOrEnterHandler();

        expect(wrapper.vm.opened).toBe(true);
      });

      it('Should not call selectGroupOptionHandler when opening closed dropdown.', () => {
        const wrapper = mountWithComposable({}, false);

        wrapper.vm.onKeySpaceOrEnterHandler();

        expect(wrapper.vm.selectGroupOptionHandler).not.toHaveBeenCalled();
      });
    });

    describe('Selecting option', () => {
      it('Should call selectGroupOptionHandler with correct option when dropdown is open.', () => {
        const wrapper = mountWithComposable();
        wrapper.vm.focusedGroupIndex = 0;
        wrapper.vm.focusedGroupOptionIndex = 1;

        wrapper.vm.onKeySpaceOrEnterHandler();

        expect(wrapper.vm.selectGroupOptionHandler).toHaveBeenCalledWith({
          value: 2,
          label: 'Option 1-2',
        });
      });

      it('Should call selectGroupOptionHandler with first option of first group.', () => {
        const wrapper = mountWithComposable();
        wrapper.vm.focusedGroupIndex = 0;
        wrapper.vm.focusedGroupOptionIndex = 0;

        wrapper.vm.onKeySpaceOrEnterHandler();

        expect(wrapper.vm.selectGroupOptionHandler).toHaveBeenCalledWith({
          value: 1,
          label: 'Option 1-1',
        });
      });

      it('Should call selectGroupOptionHandler with last option of last group.', () => {
        const wrapper = mountWithComposable();
        wrapper.vm.focusedGroupIndex = 2;
        wrapper.vm.focusedGroupOptionIndex = 0;

        wrapper.vm.onKeySpaceOrEnterHandler();

        expect(wrapper.vm.selectGroupOptionHandler).toHaveBeenCalledWith({
          value: 6,
          label: 'Option 3-1',
        });
      });

      it('Should call selectGroupOptionHandler with option from middle group.', () => {
        const wrapper = mountWithComposable();
        wrapper.vm.focusedGroupIndex = 1;
        wrapper.vm.focusedGroupOptionIndex = 1;

        wrapper.vm.onKeySpaceOrEnterHandler();

        expect(wrapper.vm.selectGroupOptionHandler).toHaveBeenCalledWith({
          value: 5,
          label: 'Option 2-2',
        });
      });
    });

    describe('Disabled state', () => {
      it('Should not open dropdown when disabled.', () => {
        const wrapper = mountWithComposable({ disabled: true }, false);

        wrapper.vm.onKeySpaceOrEnterHandler();

        expect(wrapper.vm.opened).toBe(false);
      });

      it('Should not call selectGroupOptionHandler when disabled.', () => {
        const wrapper = mountWithComposable({ disabled: true });
        wrapper.vm.focusedGroupIndex = 0;
        wrapper.vm.focusedGroupOptionIndex = 0;

        wrapper.vm.onKeySpaceOrEnterHandler();

        expect(wrapper.vm.selectGroupOptionHandler).not.toHaveBeenCalled();
      });
    });

    describe('Edge cases', () => {
      it('Should handle selection when focusedGroupIndex is 0 (falsy but valid).', () => {
        const wrapper = mountWithComposable();
        wrapper.vm.focusedGroupIndex = 0;
        wrapper.vm.focusedGroupOptionIndex = 0;

        wrapper.vm.onKeySpaceOrEnterHandler();

        expect(wrapper.vm.selectGroupOptionHandler).toHaveBeenCalledWith({
          value: 1,
          label: 'Option 1-1',
        });
      });

      it('Should handle selection when focusedGroupOptionIndex is 0 (falsy but valid).', () => {
        const wrapper = mountWithComposable();
        wrapper.vm.focusedGroupIndex = 1;
        wrapper.vm.focusedGroupOptionIndex = 0;

        wrapper.vm.onKeySpaceOrEnterHandler();

        expect(wrapper.vm.selectGroupOptionHandler).toHaveBeenCalledWith({
          value: 4,
          label: 'Option 2-1',
        });
      });
    });
  });

  describe('Return type', () => {
    it('Should return object with onKeyDownOrUpHandler function.', () => {
      const wrapper = mountWithComposable();

      expect(wrapper.vm.onKeyDownOrUpHandler).toBeDefined();
      expect(typeof wrapper.vm.onKeyDownOrUpHandler).toBe('function');
    });

    it('Should return object with onKeySpaceOrEnterHandler function.', () => {
      const wrapper = mountWithComposable();

      expect(wrapper.vm.onKeySpaceOrEnterHandler).toBeDefined();
      expect(typeof wrapper.vm.onKeySpaceOrEnterHandler).toBe('function');
    });
  });
});
