import { describe, it, expect, vi } from 'vitest';
import { ref, nextTick, defineComponent, h, shallowRef } from 'vue';
import type { ModelRef } from 'vue';
import { mount } from '@vue/test-utils';
import useDialog from '../../composables/useDialog/useDialog';
import type { TDialogProps } from '../../Dialog';
import { DialogSelectorTestData } from '../test-data/Dialog.selector.test-data';

const defaultMock = new DialogSelectorTestData();

function mountWithComposable(props: TDialogProps) {
  const emits = vi.fn();
  const vVisible = ref<boolean | undefined>(false) as ModelRef<boolean, string, boolean, boolean>;

  const dialogContainerRef = shallowRef<HTMLDivElement>(document.createElement('div'));
  const draggableContainerRef = shallowRef<HTMLDivElement>(document.createElement('div'));
  const draggableTargetRef = shallowRef<HTMLDivElement>(document.createElement('div'));

  return mount(
    defineComponent({
      setup() {
        const result = useDialog(
          props,
          emits,
          vVisible,
          dialogContainerRef,
          draggableContainerRef,
          draggableTargetRef,
        );
        return {
          ...result,
          emits,
          vVisible,
          dialogContainerRef,
          draggableContainerRef,
          draggableTargetRef,
        };
      },
      render() {
        return h('div');
      },
    }),
  );
}

describe('useDialog', () => {
  describe('Basic functionality', () => {
    it('Should return expected structure.', () => {
      const wrapper = mountWithComposable(defaultMock.mockProps);
      const vm = wrapper.vm;

      expect(vm).toHaveProperty('componentClasses');
      expect(vm).toHaveProperty('draggableStyles');
      expect(vm).toHaveProperty('toggleMaximize');
      expect(vm).toHaveProperty('requestCloseDialog');
      expect(vm).toHaveProperty('handleOverlayClick');
      expect(vm).toHaveProperty('onAfterLeave');
    });

    it('Should initialize with default states and computed properties.', () => {
      const wrapper = mountWithComposable(defaultMock.mockProps);
      const vm = wrapper.vm;

      expect(vm.componentClasses).toBeDefined();
      expect(typeof vm.componentClasses).toBe('string');
      expect(vm.draggableStyles).toBeDefined();
      expect(typeof vm.draggableStyles).toBe('object');
      expect(vm.toggleMaximize).toBeDefined();
      expect(vm.requestCloseDialog).toBeDefined();
      expect(vm.handleOverlayClick).toBeDefined();
      expect(vm.onAfterLeave).toBeDefined();
    });
  });

  describe('componentClasses ComputedRef', () => {
    it('Should generate correct componentClasses for default props.', () => {
      const wrapper = mountWithComposable(defaultMock.mockProps);
      const vm = wrapper.vm;

      const classes = vm.componentClasses.split(' ');

      const expectedClasses = [
        defaultMock.getSelectorWithoutDot(defaultMock.rootEl),
        defaultMock.getSelectorWithoutDot(defaultMock.themeModifier),
      ];

      expect(classes).toEqual(expect.arrayContaining(expectedClasses));
      expect(classes.length).toBe(expectedClasses.length);
    });

    it('Should include modifier class when provided.', () => {
      const wrapper = mountWithComposable({
        ...defaultMock.mockProps,
        modifier: defaultMock.modifierProp,
      });
      const vm = wrapper.vm;

      expect(vm.componentClasses).toContain(
        defaultMock.getSelectorWithoutDot(defaultMock.primaryModifier),
      );
    });

    it('Should generate correct componentClasses with modifier.', () => {
      const wrapper = mountWithComposable({
        ...defaultMock.mockProps,
        visible: defaultMock.visibleProp,
        modifier: defaultMock.modifierProp,
      });
      const vm = wrapper.vm;

      const classes = vm.componentClasses.split(' ');

      const expectedClasses = [
        defaultMock.getSelectorWithoutDot(defaultMock.rootEl),
        defaultMock.getSelectorWithoutDot(defaultMock.themeModifier),
        defaultMock.getSelectorWithoutDot(defaultMock.primaryModifier),
      ];

      expect(classes).toEqual(expect.arrayContaining(expectedClasses));
      expect(classes.length).toBe(expectedClasses.length);
    });
  });

  describe('toggleMaximize Function', () => {
    it('Should toggle maximizedState and emit correct events.', async () => {
      const wrapper = mountWithComposable({ ...defaultMock.mockProps, maximized: false });
      const vm = wrapper.vm;

      expect(vm.componentClasses).toContain(defaultMock.getSelectorWithoutDot(defaultMock.rootEl));

      vm.toggleMaximize(new Event('click'));
      await nextTick();

      expect(vm.emits).toHaveBeenCalledWith('maximized', expect.any(Event));
      expect(vm.componentClasses).toContain(defaultMock.maximizedModifier);

      vm.toggleMaximize(new Event('click'));
      await nextTick();

      expect(vm.emits).toHaveBeenCalledWith('unMaximized', expect.any(Event));
      expect(vm.componentClasses).not.toContain(defaultMock.maximizedModifier);
    });
  });

  describe('requestCloseDialog Function', () => {
    it('Should set vVisible to false and emit hide event.', async () => {
      const wrapper = mountWithComposable({ ...defaultMock.mockProps, visible: true });
      const vm = wrapper.vm;

      vm.vVisible = true;
      vm.requestCloseDialog(new Event('close'));
      await nextTick();

      expect(vm.vVisible).toBe(false);
      expect(vm.emits).toHaveBeenCalledWith('hide', expect.any(Event));
    });
  });

  describe('handleOverlayClick Function', () => {
    it('Should call requestCloseDialog (hide) if clicked on overlay and not persistent or noOverlayDismiss.', async () => {
      const wrapper = mountWithComposable({
        ...defaultMock.mockProps,
        persistent: false,
        noOverlayDismiss: false,
        visible: true,
      });
      const vm = wrapper.vm;

      const overlayElement = document.createElement('div');
      vm.dialogContainerRef = overlayElement;

      const event = new Event('click');
      Object.defineProperty(event, 'target', { value: overlayElement, writable: false });

      vm.handleOverlayClick(event);
      await nextTick();

      expect(vm.vVisible).toBe(false);
      expect(vm.emits).toHaveBeenCalledWith('hide', event);
    });

    it('Should not call handleHideDialog if clicked outside overlay.', async () => {
      const wrapper = mountWithComposable(defaultMock.mockProps);
      const vm = wrapper.vm;

      vm.dialogContainerRef = document.createElement('div');

      // Создаём событие с target, не совпадающим с dialogContainerRef.value
      const outsideElement = document.createElement('div');
      const event = new Event('click');
      Object.defineProperty(event, 'target', { value: outsideElement, writable: false });

      vm.handleOverlayClick(event);
      await nextTick();

      expect(vm.vVisible).toBe(defaultMock.mockProps.visible);
      expect(vm.emits).not.toHaveBeenCalledWith('hide', event);
    });

    it('Should trigger shake effect if persistent or noOverlayDismiss and shake is true.', async () => {
      const wrapper = mountWithComposable({
        ...defaultMock.mockProps,
        persistent: true,
        noOverlayDismiss: true,
        shake: true,
        visible: true,
      });
      const vm = wrapper.vm;

      const overlayElement = document.createElement('div');
      vm.dialogContainerRef = overlayElement;

      const event = new Event('click');
      Object.defineProperty(event, 'target', { value: overlayElement, writable: false });

      // Поскольку triggerShakeEffect не доступен напрямую, проверим через класс компонента
      vm.handleOverlayClick(event);
      await nextTick();

      // Проверяем, что класс тряски добавлен (componentClasses содержит модификатор shake)
      expect(vm.componentClasses).toContain(defaultMock.shakeModifier);
    });
  });

  describe('onAfterLeave Function', () => {
    it('Should emit after-hide event.', () => {
      const wrapper = mountWithComposable(defaultMock.mockProps);
      const vm = wrapper.vm;

      vm.onAfterLeave();

      expect(vm.emits).toHaveBeenCalledWith('after-hide');
    });
  });

  describe('Lifecycle hooks', () => {
    it('Should add keydown listener on mounted and remove on beforeUnmount.', async () => {
      const addEventListenerSpy = vi.spyOn(window, 'addEventListener');
      const removeEventListenerSpy = vi.spyOn(window, 'removeEventListener');

      const wrapper = mountWithComposable(defaultMock.mockProps);

      expect(addEventListenerSpy).toHaveBeenCalledWith('keydown', expect.any(Function));

      await wrapper.unmount();

      expect(removeEventListenerSpy).toHaveBeenCalledWith('keydown', expect.any(Function));

      addEventListenerSpy.mockRestore();
      removeEventListenerSpy.mockRestore();
    });
  });
});
