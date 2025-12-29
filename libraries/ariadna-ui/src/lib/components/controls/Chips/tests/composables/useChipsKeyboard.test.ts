import { describe, expect, it, vi } from 'vitest';
import { mount } from '@vue/test-utils';
import { defineComponent, h, type ModelRef, ref } from 'vue';
import type { TChipsProps } from '../../Chips';
import useChipsKeyboard from '../../composables/useChipsKeyboard/useChipsKeyboard';
import { ChipsSelectorTestData } from '../test-data/Chips.selector.test-data';

const defaultMock = new ChipsSelectorTestData();

function mountWithComposable(
  props: TChipsProps,
  vModel: string[] = [],
  focusedIdx: number | null = null,
) {
  const emits = vi.fn();
  const vModelRef = ref(vModel) as unknown as ModelRef<
    TChipsProps['modelValue'],
    string,
    TChipsProps['modelValue'],
    TChipsProps['modelValue']
  >;
  const focusedIdxRef = ref(focusedIdx);
  const addChip = vi.fn();
  const removeChip = vi.fn();
  const clearChips = vi.fn();

  return mount(
    defineComponent({
      setup() {
        const result = useChipsKeyboard(
          props,
          vModelRef,
          focusedIdxRef,
          addChip,
          removeChip,
          clearChips,
        );
        return {
          ...result,
          emits,
          vModel: vModelRef,
          focusedIdx: focusedIdxRef,
          addChip,
          removeChip,
          clearChips,
        };
      },
      render() {
        return h('div');
      },
    }),
  );
}

describe('useChipsKeyboard', () => {
  describe('onInputKeyDown', () => {
    it('Should call addChip on Enter/NumpadEnter with input value.', () => {
      const wrapper = mountWithComposable(defaultMock.mockProps);
      const inputEvent = {
        key: 'Enter',
        target: { value: 'New Chip' },
      } as unknown as KeyboardEvent;

      wrapper.vm.onInputKeyDown(inputEvent);
      expect(wrapper.vm.addChip).toHaveBeenCalledWith('New Chip');

      const numpadEvent = {
        key: 'NumpadEnter',
        target: { value: 'New Chip' },
      } as unknown as KeyboardEvent;

      wrapper.vm.onInputKeyDown(numpadEvent);
      expect(wrapper.vm.addChip).toHaveBeenCalledWith('New Chip');
    });

    it('Should not call addChip if target has no value.', () => {
      const wrapper = mountWithComposable(defaultMock.mockProps);
      const event = {
        key: 'Enter',
        target: null,
      } as unknown as KeyboardEvent;

      wrapper.vm.onInputKeyDown(event);
      expect(wrapper.vm.addChip).not.toHaveBeenCalled();
    });

    it('Should call removeChip on Backspace when input is empty and chips exist.', () => {
      const wrapper = mountWithComposable(defaultMock.mockProps, ['Vue', 'React']);
      const event = {
        key: 'Backspace',
        target: { value: '' },
      } as unknown as KeyboardEvent;

      wrapper.vm.onInputKeyDown(event);
      expect(wrapper.vm.removeChip).toHaveBeenCalledWith(1);
    });

    it('Should not call removeChip on Backspace when input is not empty.', () => {
      const wrapper = mountWithComposable(defaultMock.mockProps, ['Vue']);
      const event = {
        key: 'Backspace',
        target: { value: 'React' },
      } as unknown as KeyboardEvent;

      wrapper.vm.onInputKeyDown(event);
      expect(wrapper.vm.removeChip).not.toHaveBeenCalled();
    });
  });

  describe('onRootWrapperKeyDown', () => {
    it('Should move focus left with ArrowLeft and handle boundaries.', () => {
      const wrapper = mountWithComposable(defaultMock.mockProps, ['Vue', 'React', 'Angular'], 1);

      // Move left from middle
      wrapper.vm.onRootWrapperKeyDown({
        key: 'ArrowLeft',
        target: { value: 'Vue' },
      } as unknown as KeyboardEvent);
      expect(wrapper.vm.focusedIdx).toBe(0);

      // Don't go below 0
      wrapper.vm.onRootWrapperKeyDown({
        key: 'ArrowLeft',
        target: { value: 'Vue' },
      } as unknown as KeyboardEvent);
      expect(wrapper.vm.focusedIdx).toBe(0);

      // Start from null
      wrapper.vm.focusedIdx = null;
      wrapper.vm.onRootWrapperKeyDown({
        key: 'ArrowLeft',
        target: { value: 'Vue' },
      } as unknown as KeyboardEvent);
      expect(wrapper.vm.focusedIdx).toBe(2);
    });

    it('Should move focus right with ArrowRight and handle boundaries.', () => {
      const wrapper = mountWithComposable(defaultMock.mockProps, ['Vue', 'React', 'Angular'], 1);

      // Move right from middle
      wrapper.vm.onRootWrapperKeyDown({
        key: 'ArrowRight',
        target: { value: 'Vue' },
      } as unknown as KeyboardEvent);
      expect(wrapper.vm.focusedIdx).toBe(2);

      // Don't go beyond last index
      wrapper.vm.onRootWrapperKeyDown({
        key: 'ArrowRight',
        target: { value: 'Vue' },
      } as unknown as KeyboardEvent);
      expect(wrapper.vm.focusedIdx).toBe(2);

      // Start from null
      wrapper.vm.focusedIdx = null;
      wrapper.vm.onRootWrapperKeyDown({
        key: 'ArrowRight',
        target: { value: 'Vue' },
      } as unknown as KeyboardEvent);
      expect(wrapper.vm.focusedIdx).toBe(0);
    });

    it('Should call clearChips on Enter when clear element is target.', () => {
      const wrapper = mountWithComposable(defaultMock.mockProps, ['Vue']);
      const event = {
        key: 'Enter',
        target: { classList: { contains: () => true } },
      } as unknown as KeyboardEvent;

      wrapper.vm.onRootWrapperKeyDown(event);
      expect(wrapper.vm.clearChips).toHaveBeenCalledWith(event);
    });

    it('Should call removeChip on Space when chip is focused.', () => {
      const wrapper = mountWithComposable(defaultMock.mockProps, ['Vue', 'React'], 0);
      const event = {
        key: ' ',
        target: { classList: { contains: () => false } },
      } as unknown as KeyboardEvent;

      wrapper.vm.onRootWrapperKeyDown(event);
      expect(wrapper.vm.removeChip).toHaveBeenCalledWith(0);
    });

    it('Should do nothing for unsupported keys.', () => {
      const wrapper = mountWithComposable(defaultMock.mockProps, ['Vue'], 0);
      const event = { key: 'Escape' } as KeyboardEvent;

      wrapper.vm.onRootWrapperKeyDown(event);
      expect(wrapper.vm.removeChip).not.toHaveBeenCalled();
      expect(wrapper.vm.clearChips).not.toHaveBeenCalled();
      expect(wrapper.vm.focusedIdx).toBe(0);
    });
  });
});
