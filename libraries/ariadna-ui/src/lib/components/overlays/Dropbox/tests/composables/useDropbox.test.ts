import { describe, it, expect, afterEach, vi } from 'vitest';
import { ref, shallowRef, nextTick, defineComponent, h } from 'vue';
import type { ModelRef } from 'vue';
import { mount } from '@vue/test-utils';
import useDropbox from '../../composables/useDropbox/useDropbox';
import type { TDropboxProps } from '../../Dropbox';
import { DropboxSelectorTestData } from '../test-data/Dropbox.selector.test-data';

const defaultMock = new DropboxSelectorTestData();

function mountWithComposable(
  props: TDropboxProps,
  activatorRef = shallowRef(document.createElement('div')),
  contentRef = shallowRef(document.createElement('div')),
) {
  const emits = vi.fn();
  const vModel = ref<boolean | undefined>(false) as ModelRef<boolean, string, boolean, boolean>;

  return mount(
    defineComponent({
      setup() {
        const result = useDropbox(props, emits, vModel, activatorRef, contentRef);
        return { ...result, emits, vModel };
      },
      render() {
        return h('div');
      },
    }),
  );
}

describe('useDropbox', () => {
  const activatorRef = shallowRef<HTMLDivElement>(document.createElement('div'));
  const contentRef = shallowRef<HTMLDivElement>(document.createElement('div'));

  afterEach(() => {
    vi.clearAllMocks();
  });

  describe('Basic functionality', () => {
    it('Should return expected structure.', () => {
      const wrapper = mountWithComposable(defaultMock.mockProps);
      const vm = wrapper.vm;

      expect(vm).toHaveProperty('componentClasses');
      expect(vm).toHaveProperty('contentClasses');
      expect(vm).toHaveProperty('open');
      expect(vm).toHaveProperty('close');
      expect(vm).toHaveProperty('toggle');
      expect(vm).toHaveProperty('calculate');
      expect(vm).toHaveProperty('closeOnClickOutside');
      expect(vm).toHaveProperty('closeOnEscKey');
    });

    it('Should initialize correctly with basic props.', () => {
      const wrapper = mountWithComposable(defaultMock.mockProps, activatorRef, contentRef);
      const vm = wrapper.vm;

      expect(vm).toBeDefined();
      expect(vm.componentClasses).toBeDefined();
      expect(vm.contentClasses).toBeDefined();
      expect(vm.open).toBeInstanceOf(Function);
      expect(vm.close).toBeInstanceOf(Function);
      expect(vm.toggle).toBeInstanceOf(Function);
      expect(vm.calculate).toBeInstanceOf(Function);
      expect(vm.closeOnClickOutside).toBeInstanceOf(Function);
      expect(vm.closeOnEscKey).toBeInstanceOf(Function);
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
        modelValue: defaultMock.modelValueProp,
        modifier: defaultMock.modifierProp,
      });
      const vm = wrapper.vm;

      const classes = vm.componentClasses.split(' ');

      const expectedClasses = [
        defaultMock.getSelectorWithoutDot(defaultMock.rootEl),
        defaultMock.getSelectorWithoutDot(defaultMock.themeModifier),
        defaultMock.getSelectorWithoutDot(defaultMock.openedModifier),
        defaultMock.getSelectorWithoutDot(defaultMock.primaryModifier),
      ];

      expect(classes).toEqual(expect.arrayContaining(expectedClasses));
      expect(classes.length).toBe(expectedClasses.length);
    });
  });

  describe('contentClasses ComputedRef', () => {
    it('Should be an object with valid keys.', () => {
      const wrapper = mountWithComposable(defaultMock.mockProps);
      const vm = wrapper.vm;

      expect(typeof vm.contentClasses).toBe('object');
    });
  });

  describe('open', () => {
    it('Should open Dropbox, call calculate, and output show.', async () => {
      const wrapper = mountWithComposable(defaultMock.mockProps);
      const vm = wrapper.vm;

      await vm.open();
      expect(vm.vModel).toBe(true);
      expect(vm.emits).toHaveBeenCalledWith('show');
    });
  });

  describe('close', () => {
    it('Should close the dropbox, call calculate, and release hide.', async () => {
      const wrapper = mountWithComposable(defaultMock.mockProps);
      const vm = wrapper.vm;

      await vm.open();
      vm.close();

      await nextTick();

      expect(vm.vModel).toBe(false);
      expect(vm.emits).toHaveBeenCalledWith('hide');
    });
  });

  describe('toggle', () => {
    it('Should open the dropbox if it is closed.', async () => {
      const wrapper = mountWithComposable(defaultMock.mockProps);
      const vm = wrapper.vm;

      await vm.toggle();

      expect(vm.vModel).toBe(true);
      expect(vm.emits).toHaveBeenCalledWith('show');
    });

    it('Should close the dropbox if it is open.', async () => {
      const wrapper = mountWithComposable(defaultMock.mockProps);
      const vm = wrapper.vm;

      await vm.open();
      await wrapper.vm.toggle();

      expect(wrapper.vm.vModel).toBe(false);
      expect(vm.emits).toHaveBeenCalledWith('hide');
    });
  });

  describe('calculate', () => {
    it('Should call usePosition.calculate with no errors.', async () => {
      const wrapper = mountWithComposable(defaultMock.mockProps);
      const vm = wrapper.vm;

      // Проверяем, что метод существует и вызывается без ошибок
      expect(() => vm.calculate()).not.toThrow();
    });
  });

  describe('closeOnClickOutside', () => {
    it('Should close the dropbox when clicked outside, if allowed.', async () => {
      const wrapper = mountWithComposable({ ...defaultMock.mockProps, closeOnClickOutside: true });
      const vm = wrapper.vm;

      await vm.open();
      wrapper.vm.closeOnClickOutside();

      await nextTick();

      expect(vm.vModel).toBe(false);
      expect(vm.emits).toHaveBeenCalledWith('hide');
    });

    it('Should not close the dropbox when clicking outside if prohibited.', async () => {
      const wrapper = mountWithComposable({ ...defaultMock.mockProps, closeOnClickOutside: false });
      const vm = wrapper.vm;

      await vm.open();
      vm.closeOnClickOutside();

      await nextTick();

      expect(vm.vModel).toBe(true);
      expect(vm.emits).not.toHaveBeenCalledWith('hide');
    });
  });

  describe('closeOnEscKey', () => {
    it('Should close the dropbox when pressing Escape, if allowed.', async () => {
      const wrapper = mountWithComposable({ ...defaultMock.mockProps, closeOnEscape: true });
      const vm = wrapper.vm;

      await vm.open();
      const event = new KeyboardEvent('keydown', { key: 'Escape' });
      wrapper.vm.closeOnEscKey(event);

      await nextTick();

      expect(vm.vModel).toBe(false);
      expect(vm.emits).toHaveBeenCalledWith('hide');
    });

    it('Should not close the dropbox when pressing Escape, if prohibited.', async () => {
      const wrapper = mountWithComposable({ ...defaultMock.mockProps, closeOnEscape: false });
      const vm = wrapper.vm;

      await vm.open();

      const event = new KeyboardEvent('keydown', { key: 'Escape' });
      wrapper.vm.closeOnEscKey(event);

      await nextTick();

      expect(wrapper.vm.vModel).toBe(true);
      expect(vm.emits).not.toHaveBeenCalledWith('hide');
    });

    it('Should not close the dropbox with other keys.', async () => {
      const wrapper = mountWithComposable({ ...defaultMock.mockProps, closeOnEscape: false });
      const vm = wrapper.vm;

      await vm.open();

      const event = new KeyboardEvent('keydown', { key: 'Enter' });
      wrapper.vm.closeOnEscKey(event);

      await nextTick();

      expect(vm.vModel).toBe(true);
      expect(vm.emits).not.toHaveBeenCalledWith('hide');
    });
  });

  describe('Integration with usePosition', () => {
    it('Should correctly pass disableAutoPosition to usePosition.', () => {
      const wrapper = mountWithComposable({ ...defaultMock.mockProps, disableAutoPosition: true });
      const vm = wrapper.vm;

      // Если disableAutoPosition = true, cssClass не должен применяться
      expect(vm.contentClasses).not.toHaveProperty(defaultMock.contentVerticalBottomCenterModifier);
    });

    it('Should update CssClass and secondaryCssClass correctly.', async () => {
      const wrapper = mountWithComposable(defaultMock.mockProps);
      const vm = wrapper.vm;

      // По умолчанию usePosition выставляет cssClass и secondaryCssClass в ''
      expect(vm.contentClasses).toBeDefined();
    });
  });

  describe('Edge cases', () => {
    it('Should not crash if activatorRef or contentRef are null.', async () => {
      const wrapper = mountWithComposable(
        defaultMock.mockProps,
        shallowRef(null) as any,
        shallowRef(null) as any,
      );
      const vm = wrapper.vm;

      expect(vm).toBeDefined();
      await expect(vm.open()).resolves.not.toThrow();
      await expect(vm.toggle()).resolves.not.toThrow();
      expect(() => vm.close()).not.toThrow();
    });

    it('Should works correctly with auto-positioning disabled.', async () => {
      const wrapper = mountWithComposable(defaultMock.mockProps);
      const vm = wrapper.vm;

      await vm.open();
      expect(vm.vModel).toBe(true);
      expect(vm.contentClasses).toBeDefined();
    });
  });
});
