import { describe, expect, it, vi } from 'vitest';
import { mount } from '@vue/test-utils';
import { defineComponent, h, type ModelRef, ref } from 'vue';
import type { TChipsProps } from '../../Chips';
import useChipsControls from '../../composables/useChipsControls/useChipsControls';
import InputText from '@/lib/components/controls/InputText/InputText.vue';
import { ChipsSelectorTestData } from '../test-data/Chips.selector.test-data';

const defaultMock = new ChipsSelectorTestData();

function mountWithComposable(
  props: TChipsProps,
  vModel: string[] = [],
  inputTextRefValue: InstanceType<typeof InputText> | null = null,
  writableModelValue: string | undefined = undefined,
) {
  const emits = vi.fn();
  const vModelRef = ref(vModel) as unknown as ModelRef<
    TChipsProps['modelValue'],
    string,
    TChipsProps['modelValue'],
    TChipsProps['modelValue']
  >;
  const inputTextRef = ref(inputTextRefValue);
  const writableModelRef = ref(writableModelValue) as unknown as ModelRef<
    string | undefined,
    string,
    string | undefined,
    string | undefined
  >;

  return mount(
    defineComponent({
      setup() {
        const result = useChipsControls(props, emits, vModelRef, inputTextRef, writableModelRef);
        return { ...result, emits, vModel: vModelRef, writableModel: writableModelRef };
      },
      render() {
        return h('div');
      },
    }),
  );
}

describe('useChipsControls', () => {
  describe('addChip', () => {
    it('Should add chip to modelValue when not disabled.', () => {
      const wrapper = mountWithComposable(defaultMock.mockProps);
      wrapper.vm.addChip('New Chip');

      expect(wrapper.vm.vModel).toEqual(['New Chip']);
    });

    it('Should not add empty string chip.', () => {
      const wrapper = mountWithComposable(defaultMock.mockProps);
      wrapper.vm.addChip('   ');

      expect(wrapper.vm.vModel).toEqual([]);
    });

    it('Should emit add event with chip value.', () => {
      const wrapper = mountWithComposable(defaultMock.mockProps);
      wrapper.vm.addChip('Vue');

      expect(wrapper.vm.emits).toHaveBeenCalledWith('add', { value: 'Vue' });
    });

    it('Should clear writableModel when inputTextRef exists.', () => {
      const inputTextInstance = { focus: vi.fn() } as unknown as InstanceType<typeof InputText>;
      const wrapper = mountWithComposable(defaultMock.mockProps, [], inputTextInstance, 'Vue');
      wrapper.vm.addChip('Vue');

      expect(wrapper.vm.writableModel).toBe('');
    });

    it('Should not add chip when disabled.', () => {
      const wrapper = mountWithComposable({ ...defaultMock.mockProps, disabled: true }, [
        'Existing',
      ]);
      wrapper.vm.addChip('New Chip');

      expect(wrapper.vm.vModel).toEqual(['Existing']);
      expect(wrapper.vm.emits).not.toHaveBeenCalled();
    });
  });

  describe('removeChip', () => {
    it('Should remove chip at specified index.', () => {
      const wrapper = mountWithComposable(defaultMock.mockProps, defaultMock.modelValueProp);
      wrapper.vm.removeChip(1);

      expect(wrapper.vm.vModel).toEqual(['Vue', 'Angular']);
    });

    it('Should emit remove event with index and value.', () => {
      const wrapper = mountWithComposable(defaultMock.mockProps, defaultMock.modelValueProp);
      wrapper.vm.removeChip(0);

      expect(wrapper.vm.emits).toHaveBeenCalledWith('remove', {
        idx: 0,
        value: 'Vue',
      });
    });

    it('Should not remove chip when disabled.', () => {
      const wrapper = mountWithComposable({ ...defaultMock.mockProps, disabled: true }, [
        'Vue',
        'React',
      ]);
      wrapper.vm.removeChip(0);

      expect(wrapper.vm.vModel).toEqual(['Vue', 'React']);
      expect(wrapper.vm.emits).not.toHaveBeenCalled();
    });

    it('Should handle invalid index gracefully.', () => {
      const wrapper = mountWithComposable(defaultMock.mockProps, ['Vue']);
      expect(() => wrapper.vm.removeChip(5)).not.toThrow();
    });
  });

  describe('clearChips', () => {
    it('Should clear all chips from modelValue.', () => {
      const wrapper = mountWithComposable(defaultMock.mockProps, ['Vue', 'React']);
      wrapper.vm.clearChips(new Event('click'));

      expect(wrapper.vm.vModel).toEqual([]);
    });

    it('Should emit clear event with original event.', () => {
      const event = new Event('click');
      const wrapper = mountWithComposable(defaultMock.mockProps, ['Vue']);
      wrapper.vm.clearChips(event);

      expect(wrapper.vm.emits).toHaveBeenCalledWith('clear', event);
    });

    it('Should work when modelValue is empty.', () => {
      const wrapper = mountWithComposable(defaultMock.mockProps);

      expect(() => wrapper.vm.clearChips(new Event('click'))).not.toThrow();
    });

    it('Should not clear chips when disabled.', () => {
      const wrapper = mountWithComposable({ ...defaultMock.mockProps, disabled: true }, [
        'Vue',
        'React',
      ]);
      wrapper.vm.clearChips(new Event('click'));

      expect(wrapper.vm.vModel).toEqual(['Vue', 'React']);
      expect(wrapper.vm.emits).not.toHaveBeenCalled();
    });
  });
});
