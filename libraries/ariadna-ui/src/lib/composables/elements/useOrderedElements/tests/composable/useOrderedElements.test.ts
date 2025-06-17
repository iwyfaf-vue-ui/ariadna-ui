import { describe, it, expect, beforeEach } from 'vitest';
import { defineComponent, h } from 'vue';
import { mount, type VueWrapper } from '@vue/test-utils';
import useOrderedElements from '../../useOrderedElements';

function mountWithComposable<T>() {
  return mount(
    defineComponent({
      setup() {
        const result = useOrderedElements<T>();
        return { ...result };
      },
      render() {
        return h('div');
      },
    }),
  );
}

describe('useOrderedElements', () => {
  let wrapper: VueWrapper<any>;

  beforeEach(() => {
    wrapper = mountWithComposable<HTMLElement>();
  });

  describe('elements Ref', () => {
    it('Should be reactive and reflect changes after fillElements.', async () => {
      const el = document.createElement('div');
      const vm = wrapper.vm;

      vm.fillElements(el, 0);

      expect(vm.elements[0]).toBe(el);
      expect(vm.elements.length).toBe(1);
    });

    it('Should be reactive and reflect changes after clearElements.', async () => {
      const el = document.createElement('div');
      const vm = wrapper.vm;

      vm.fillElements(el, 0);
      expect(vm.elements.length).toBe(1);
      vm.clearElements();
      expect(vm.elements.length).toBe(0);
    });
  });

  describe('fillElements Function', () => {
    it('Should add element at specified index.', () => {
      const el = document.createElement('div');
      const vm = wrapper.vm;

      vm.fillElements(el, 0);

      expect(vm.elements[0]).toBe(el);
      expect(vm.elements.length).toBe(1);
    });

    it('Should overwrite element at existing index.', () => {
      const el1 = document.createElement('div');
      const el2 = document.createElement('span');
      const vm = wrapper.vm;

      vm.fillElements(el1, 0);
      vm.fillElements(el2, 0);

      expect(vm.elements[0]).toBe(el2);
      expect(vm.elements.length).toBe(1);
    });

    it('Should extend array if index is beyond current length.', () => {
      const el = document.createElement('p');
      const vm = wrapper.vm;

      vm.fillElements(el, 3);

      expect(vm.elements.length).toBe(4);
      expect(vm.elements[3]).toBe(el);

      // Intermediate indices should be undefined
      expect(wrapper.vm.elements[0]).toBeUndefined();
      expect(wrapper.vm.elements[1]).toBeUndefined();
      expect(wrapper.vm.elements[2]).toBeUndefined();
    });

    it('Should handle zero index correctly.', () => {
      const el = document.createElement('section');
      const vm = wrapper.vm;

      vm.fillElements(el, 0);

      expect(vm.elements[0]).toBe(el);
    });

    it('Should handle multiple fills at different indices.', () => {
      const el1 = document.createElement('div');
      const el2 = document.createElement('span');
      const vm = wrapper.vm;

      vm.fillElements(el1, 0);
      vm.fillElements(el2, 2);

      expect(vm.elements.length).toBe(3);
      expect(vm.elements[0]).toBe(el1);
      expect(vm.elements[1]).toBeUndefined();
      expect(vm.elements[2]).toBe(el2);
    });

    it('Should accept generic element types.', () => {
      type CustomElement = { id: number };
      const wrapperCustom = mountWithComposable<CustomElement>();
      const customEl = { id: 42 };
      const vm = wrapperCustom.vm;

      vm.fillElements(customEl, 1);

      expect(vm.elements.length).toBe(2);
      expect(vm.elements[1]).toStrictEqual(customEl);
    });
  });

  describe('clearElements Function', () => {
    it('Should clear all elements.', () => {
      const el1 = document.createElement('div');
      const el2 = document.createElement('span');
      const vm = wrapper.vm;

      vm.fillElements(el1, 0);
      vm.fillElements(el2, 1);

      expect(vm.elements.length).toBe(2);

      vm.clearElements();

      expect(vm.elements.length).toBe(0);
    });

    it('Should clear empty array without error.', () => {
      const vm = wrapper.vm;

      expect(vm.elements.length).toBe(0);
      vm.clearElements();
      expect(vm.elements.length).toBe(0);
    });
  });

  describe('onScopeDispose', () => {
    it('Should clear elements when scope is disposed.', () => {
      const el = document.createElement('div');
      const vm = wrapper.vm;

      vm.fillElements(el, 0);
      expect(vm.elements.length).toBe(1);

      // Manually trigger scope disposal
      // We need to mount a component and unmount it to trigger onScopeDispose
      const wrapper2 = mount(
        defineComponent({
          setup() {
            const { elements, fillElements } = useOrderedElements<HTMLElement>();
            fillElements(el, 0);
            return { elements };
          },
          render() {
            return h('div');
          },
        }),
      );

      expect(wrapper2.vm.elements.length).toBe(1);

      wrapper2.unmount();

      expect(wrapper2.vm.elements.length).toBe(0);
    });
  });
});
