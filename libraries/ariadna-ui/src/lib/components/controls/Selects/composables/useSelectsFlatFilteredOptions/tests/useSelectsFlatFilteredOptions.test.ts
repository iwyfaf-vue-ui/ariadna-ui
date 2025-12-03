import { mount } from '@vue/test-utils';
import { defineComponent, h, ref } from 'vue';
import type { Ref } from 'vue';
import { beforeEach, describe, expect, it, vi, afterAll } from 'vitest';
import useSelectsFlatFilteredOptions from '../useSelectsFlatFilteredOptions';

// Тип для тестовых опций
type TestOption = string;

function mountWithComposable(
  onFilterCallback: () => void,
  filterState: Ref<string>,
  options: TestOption[],
) {
  const emits = vi.fn();

  return mount(
    defineComponent({
      setup() {
        const result = useSelectsFlatFilteredOptions<TestOption[]>(
          onFilterCallback,
          filterState,
          options,
        );
        return { ...result, emits };
      },
      render() {
        return h('div');
      },
    }),
  );
}

describe('useSelectsFlatFilteredOptions', () => {
  // Тестовые переменные верхнего уровня
  let onFilterCallback: ReturnType<typeof vi.fn>;
  let filterState: Ref<string>;
  let options: TestOption[];

  beforeEach(() => {
    onFilterCallback = vi.fn();
    filterState = ref('');
    options = ['apple', 'banana', 'cherry', 'date'];
  });

  afterAll(() => {
    vi.clearAllMocks();
  });

  describe('initialization', () => {
    it('Should initialize with all options when filter is empty', async () => {
      const wrapper = mountWithComposable(onFilterCallback, filterState, options);
      const vm = wrapper.vm as any;

      expect(vm.filterOptions).toBeDefined();
      expect(vm.filterOptions).toEqual(options);
      expect(onFilterCallback).not.toHaveBeenCalled();
    });

    it('Should initialize with filtered options when filter has value', async () => {
      filterState.value = 'an';
      const wrapper = mountWithComposable(onFilterCallback, filterState, options);
      const vm = wrapper.vm as any;

      expect(vm.filterOptions).toBeDefined();
      expect(vm.filterOptions).toEqual(['banana']);
      expect(onFilterCallback).toHaveBeenCalled();
    });
  });

  describe('onFilter', () => {
    it('Should return all options when filter is empty', async () => {
      const wrapper = mountWithComposable(onFilterCallback, filterState, options);
      const vm = wrapper.vm as any;

      const result = vm.onFilter('');
      expect(result).toEqual(options);
      expect(onFilterCallback).not.toHaveBeenCalled();
    });

    it('Should filter options case insensitively', async () => {
      const wrapper = mountWithComposable(onFilterCallback, filterState, options);
      const vm = wrapper.vm as any;

      const result = vm.onFilter('APPLE');
      expect(result).toEqual(['apple']);
      expect(onFilterCallback).toHaveBeenCalled();
    });

    it('Should return empty array when no matches found', async () => {
      const wrapper = mountWithComposable(onFilterCallback, filterState, options);
      const vm = wrapper.vm as any;

      const result = vm.onFilter('xyz');
      expect(result).toEqual([]);
      expect(onFilterCallback).toHaveBeenCalled();
    });

    it('Should call onFilterCallback when filter is applied', async () => {
      const wrapper = mountWithComposable(onFilterCallback, filterState, options);
      const vm = wrapper.vm as any;

      vm.onFilter('test');
      expect(onFilterCallback).toHaveBeenCalled();
    });

    it('Should not call onFilterCallback when filter is empty', async () => {
      const wrapper = mountWithComposable(onFilterCallback, filterState, options);
      const vm = wrapper.vm as any;

      vm.onFilter('');
      expect(onFilterCallback).not.toHaveBeenCalled();
    });
  });

  describe('reactivity - filterState changes', () => {
    it('Should update filterOptions when filterState changes', async () => {
      const wrapper = mountWithComposable(onFilterCallback, filterState, options);
      const vm = wrapper.vm as any;

      expect(vm.filterOptions).toEqual(options);

      filterState.value = 'an';
      await wrapper.vm.$nextTick();

      expect(vm.filterOptions).toEqual(['banana']);
      expect(onFilterCallback).toHaveBeenCalled();
    });

    it('Should reset to all options when filterState becomes empty', async () => {
      filterState.value = 'an';
      const wrapper = mountWithComposable(onFilterCallback, filterState, options);
      const vm = wrapper.vm as any;

      expect(vm.filterOptions).toEqual(['banana']);

      filterState.value = '';
      await wrapper.vm.$nextTick();

      expect(vm.filterOptions).toEqual(options);
      expect(onFilterCallback).toHaveBeenCalled();
    });
  });

  describe('edge cases', () => {
    it('Should handle empty options array', async () => {
      const emptyOptions: TestOption[] = [];
      const wrapper = mountWithComposable(onFilterCallback, filterState, emptyOptions);
      const vm = wrapper.vm as any;

      expect(vm.filterOptions).toEqual([]);

      const result = vm.onFilter('test');
      expect(result).toEqual([]);
    });

    it('Should handle special characters in filter', async () => {
      const specialCharOptions = ['a*b', 'c+d', 'e?f'];
      const wrapper = mountWithComposable(onFilterCallback, filterState, specialCharOptions);
      const vm = wrapper.vm as any;

      const result = vm.onFilter('*');
      expect(result).toEqual(['a*b']);
    });

    it('Should handle null or undefined items gracefully', async () => {
      const optionsWithNull = ['apple', null, 'banana', undefined] as any;
      const wrapper = mountWithComposable(onFilterCallback, filterState, optionsWithNull);
      const vm = wrapper.vm as any;

      // Это должно вызвать ошибку в оригинальной реализации, так как она предполагает строки
      expect(() => vm.onFilter('apple')).toThrow();
    });
  });
});
