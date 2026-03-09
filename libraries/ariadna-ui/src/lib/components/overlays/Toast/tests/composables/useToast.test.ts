import { describe, it, expect, afterEach, vi } from 'vitest';
import { defineComponent, h, nextTick } from 'vue';
import { mount } from '@vue/test-utils';
import useToast from '../../composables/useToast/useToast';
import type { TToastProps } from '../../Toast';
import { ToastSelectorTestData } from '../test-data/Toast.selector.test-data';

const defaultMock = new ToastSelectorTestData();

function mountWithComposable(props: TToastProps) {
  return mount(
    defineComponent({
      setup() {
        const result = useToast(props);
        return { ...result };
      },
      render() {
        return h('div');
      },
    }),
  );
}

describe('useToast', () => {
  afterEach(() => {
    vi.clearAllMocks();
  });

  describe('Basic functionality', () => {
    it('Should return expected structure.', () => {
      const wrapper = mountWithComposable(defaultMock.mockProps);
      const vm = wrapper.vm;

      expect(vm).toHaveProperty('hovered');
      expect(vm).toHaveProperty('listeners');
      expect(vm).toHaveProperty('componentClasses');
    });

    it('Should initialize correctly with default props.', () => {
      const wrapper = mountWithComposable(defaultMock.mockProps);
      const vm = wrapper.vm;

      expect(vm.hovered).toBe(false);
      expect(vm.listeners).toBeDefined();
      expect(vm.componentClasses).toBeDefined();
    });
  });

  describe('hovered Ref', () => {
    it('Should be false on initialization.', () => {
      const wrapper = mountWithComposable(defaultMock.mockProps);

      expect(wrapper.vm.hovered).toBe(false);
    });

    it('Should toggle correctly between mouseover and mouseleave.', async () => {
      const wrapper = mountWithComposable(defaultMock.mockProps);
      const vm = wrapper.vm;

      vm.listeners.mouseover();
      await nextTick();
      expect(vm.hovered).toBe(true);

      vm.listeners.mouseleave();
      await nextTick();
      expect(vm.hovered).toBe(false);

      vm.listeners.mouseover();
      await nextTick();
      expect(vm.hovered).toBe(true);
    });

    it('Should remain true after multiple mouseover calls.', async () => {
      const wrapper = mountWithComposable(defaultMock.mockProps);
      const vm = wrapper.vm;

      vm.listeners.mouseover();
      vm.listeners.mouseover();
      await nextTick();

      expect(vm.hovered).toBe(true);
    });
  });

  describe('componentClasses ComputedRef', () => {
    it('Should include root class and theme modifier by default.', () => {
      const wrapper = mountWithComposable(defaultMock.mockProps);
      const vm = wrapper.vm;

      const classes = vm.componentClasses.split(' ');

      const expectedClasses = [
        defaultMock.getSelectorWithoutDot(defaultMock.rootEl),
        defaultMock.getSelectorWithoutDot(defaultMock.themeModifier),
        defaultMock.getSelectorWithoutDot(defaultMock.positionYTopModifier),
        defaultMock.getSelectorWithoutDot(defaultMock.positionXRightModifier),
      ];

      expect(classes).toEqual(expect.arrayContaining(expectedClasses));
      expect(classes.length).toBe(expectedClasses.length);
    });

    it('Should not include hovered modifier initially.', () => {
      const wrapper = mountWithComposable(defaultMock.mockProps);

      expect(wrapper.vm.componentClasses).not.toContain(
        defaultMock.getSelectorWithoutDot(defaultMock.hoveredModifier),
      );
    });

    it('Should include hovered modifier after mouseover.', async () => {
      const wrapper = mountWithComposable(defaultMock.mockProps);
      const vm = wrapper.vm;

      vm.listeners.mouseover();
      await nextTick();

      expect(vm.componentClasses).toContain(
        defaultMock.getSelectorWithoutDot(defaultMock.hoveredModifier),
      );
    });

    it('Should remove hovered modifier after mouseleave.', async () => {
      const wrapper = mountWithComposable(defaultMock.mockProps);
      const vm = wrapper.vm;

      vm.listeners.mouseover();
      await nextTick();
      vm.listeners.mouseleave();
      await nextTick();

      expect(vm.componentClasses).not.toContain(
        defaultMock.getSelectorWithoutDot(defaultMock.hoveredModifier),
      );
    });

    it('Should include positionY bottom modifier when positionY is bottom.', () => {
      const wrapper = mountWithComposable({
        ...defaultMock.mockProps,
        positionY: defaultMock.positionYProp,
      });

      expect(wrapper.vm.componentClasses).toContain(
        defaultMock.getSelectorWithoutDot(defaultMock.positionYBottomModifier),
      );
      expect(wrapper.vm.componentClasses).not.toContain(
        defaultMock.getSelectorWithoutDot(defaultMock.positionYTopModifier),
      );
    });

    it('Should include positionY center modifier when positionY is center.', () => {
      const wrapper = mountWithComposable({ ...defaultMock.mockProps, positionY: 'center' });

      expect(wrapper.vm.componentClasses).toContain(
        defaultMock.getSelectorWithoutDot(defaultMock.positionYCenterModifier),
      );
    });

    it('Should include positionX left modifier when positionX is left.', () => {
      const wrapper = mountWithComposable({
        ...defaultMock.mockProps,
        positionX: defaultMock.positionXProp,
      });

      expect(wrapper.vm.componentClasses).toContain(
        defaultMock.getSelectorWithoutDot(defaultMock.positionXLeftModifier),
      );
      expect(wrapper.vm.componentClasses).not.toContain(
        defaultMock.getSelectorWithoutDot(defaultMock.positionXRightModifier),
      );
    });

    it('Should include positionX center modifier when positionX is center.', () => {
      const wrapper = mountWithComposable({ ...defaultMock.mockProps, positionX: 'center' });

      expect(wrapper.vm.componentClasses).toContain(
        defaultMock.getSelectorWithoutDot(defaultMock.positionXCenterModifier),
      );
    });

    it('Should use custom cssClass.', () => {
      const wrapper = mountWithComposable({
        ...defaultMock.mockProps,
        cssClass: defaultMock.cssClassProp,
      });

      expect(wrapper.vm.componentClasses).toContain(defaultMock.cssClassProp);
      expect(wrapper.vm.componentClasses).not.toContain(
        defaultMock.getSelectorWithoutDot(defaultMock.rootEl),
      );
    });
  });

  describe('listeners ComputedRef', () => {
    it('Should contain mouseover and mouseleave handlers.', () => {
      const wrapper = mountWithComposable(defaultMock.mockProps);
      const vm = wrapper.vm;

      expect(vm.listeners.mouseover).toBeInstanceOf(Function);
      expect(vm.listeners.mouseleave).toBeInstanceOf(Function);
    });

    it('mouseover handler should set hovered to true.', async () => {
      const wrapper = mountWithComposable(defaultMock.mockProps);
      const vm = wrapper.vm;

      expect(vm.hovered).toBe(false);
      vm.listeners.mouseover();
      await nextTick();

      expect(vm.hovered).toBe(true);
    });

    it('mouseleave handler should set hovered to false.', async () => {
      const wrapper = mountWithComposable(defaultMock.mockProps);
      const vm = wrapper.vm;

      vm.listeners.mouseover();
      await nextTick();
      expect(vm.hovered).toBe(true);

      vm.listeners.mouseleave();
      await nextTick();
      expect(vm.hovered).toBe(false);
    });
  });
});
