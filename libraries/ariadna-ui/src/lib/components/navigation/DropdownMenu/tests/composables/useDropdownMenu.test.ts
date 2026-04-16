import { describe, expect, it, vi } from 'vitest';
import { mount } from '@vue/test-utils';
import { defineComponent, h, ref } from 'vue';
import useDropdownMenu from '../../composables/useDropdownMenu/useDropdownMenu';
import type {
  TDropdownMenuEmits,
  TDropdownMenuProps,
  TDropdownMenuSlots,
} from '../../DropdownMenu';
import { DropdownMenuSelectorTestData } from '../test-data/DropdownMenu.selector.test-data';

const defaultMock = new DropdownMenuSelectorTestData();

const defaultProps: TDropdownMenuProps = {
  data: [],
  cssClass: defaultMock.mockProps.cssClass,
  disabled: false,
  closeOnClickOutside: true,
  closeOnEscape: true,
};

function mountWithComposable(
  props: TDropdownMenuProps = defaultProps,
  emits: TDropdownMenuEmits = vi.fn() as unknown as TDropdownMenuEmits,
  slots: Partial<TDropdownMenuSlots> = {},
) {
  const activatorRef = ref<HTMLElement | null>(null);
  const listRef = ref<HTMLElement | null>(null);

  return mount(
    defineComponent({
      setup() {
        return useDropdownMenu(props, emits, slots as TDropdownMenuSlots, activatorRef, listRef);
      },
      render() {
        return h('div');
      },
    }),
  );
}

describe('useDropdownMenu', () => {
  describe('Basic functionality', () => {
    it('Should return all expected properties.', () => {
      mount({
        template: '<div></div>',
        setup() {
          const result = useDropdownMenu(
            defaultProps,
            vi.fn() as unknown as TDropdownMenuEmits,
            {} as TDropdownMenuSlots,
            ref(null),
            ref(null),
          );

          expect(result).toHaveProperty('isOpen');
          expect(result).toHaveProperty('open');
          expect(result).toHaveProperty('close');
          expect(result).toHaveProperty('toggle');
          expect(result).toHaveProperty('componentClasses');
          expect(result).toHaveProperty('listClasses');
          expect(result).toHaveProperty('closeOnClickOutside');
          expect(result).toHaveProperty('closeOnEscKey');
        },
      });
    });

    it('Should initialize isOpen as false.', () => {
      const wrapper = mountWithComposable();

      expect(wrapper.vm.isOpen).toBe(false);
    });
  });

  describe('open', () => {
    it('Should set isOpen to true.', async () => {
      const wrapper = mountWithComposable();

      wrapper.vm.open();

      expect(wrapper.vm.isOpen).toBe(true);
    });

    it('Should emit "show" when opened.', async () => {
      const emits = vi.fn() as unknown as TDropdownMenuEmits;
      const wrapper = mountWithComposable(defaultProps, emits);

      wrapper.vm.open();

      expect(emits).toHaveBeenCalledWith('show');
    });

    it('Should do nothing when disabled is true.', async () => {
      const emits = vi.fn() as unknown as TDropdownMenuEmits;
      const wrapper = mountWithComposable({ ...defaultProps, disabled: true }, emits);

      wrapper.vm.open();

      expect(wrapper.vm.isOpen).toBe(false);
      expect(emits).not.toHaveBeenCalledWith('show');
    });

    it('Should do nothing when already open.', async () => {
      const emits = vi.fn() as unknown as TDropdownMenuEmits;
      const wrapper = mountWithComposable(defaultProps, emits);

      wrapper.vm.open();
      wrapper.vm.open();

      expect(emits).toHaveBeenCalledTimes(1);
    });
  });

  describe('close', () => {
    it('Should set isOpen to false.', async () => {
      const wrapper = mountWithComposable();

      wrapper.vm.open();
      wrapper.vm.close();

      expect(wrapper.vm.isOpen).toBe(false);
    });

    it('Should emit "hide" when closed.', async () => {
      const emits = vi.fn() as unknown as TDropdownMenuEmits;
      const wrapper = mountWithComposable(defaultProps, emits);

      wrapper.vm.open();
      wrapper.vm.close();

      expect(emits).toHaveBeenCalledWith('hide');
    });

    it('Should do nothing when already closed.', () => {
      const emits = vi.fn() as unknown as TDropdownMenuEmits;
      const wrapper = mountWithComposable(defaultProps, emits);

      wrapper.vm.close();

      expect(emits).not.toHaveBeenCalledWith('hide');
    });
  });

  describe('toggle', () => {
    it('Should open when closed.', async () => {
      const wrapper = mountWithComposable();

      wrapper.vm.toggle();

      expect(wrapper.vm.isOpen).toBe(true);
    });

    it('Should close when open.', async () => {
      const wrapper = mountWithComposable();

      wrapper.vm.open();
      wrapper.vm.toggle();

      expect(wrapper.vm.isOpen).toBe(false);
    });

    it('Should emit "show" on first toggle and "hide" on second.', async () => {
      const emits = vi.fn() as unknown as TDropdownMenuEmits;
      const wrapper = mountWithComposable(defaultProps, emits);

      wrapper.vm.toggle();
      wrapper.vm.toggle();

      expect(emits).toHaveBeenCalledWith('show');
      expect(emits).toHaveBeenCalledWith('hide');
    });
  });

  describe('closeOnClickOutside', () => {
    it('Should close when closeOnClickOutside is true and menu is open.', async () => {
      const wrapper = mountWithComposable({ ...defaultProps, closeOnClickOutside: true });

      wrapper.vm.open();
      wrapper.vm.closeOnClickOutside();

      expect(wrapper.vm.isOpen).toBe(false);
    });

    it('Should do nothing when closeOnClickOutside is false.', async () => {
      const wrapper = mountWithComposable({ ...defaultProps, closeOnClickOutside: false });

      wrapper.vm.open();
      wrapper.vm.closeOnClickOutside();

      expect(wrapper.vm.isOpen).toBe(true);
    });

    it('Should do nothing when menu is already closed.', () => {
      const emits = vi.fn() as unknown as TDropdownMenuEmits;
      const wrapper = mountWithComposable({ ...defaultProps, closeOnClickOutside: true }, emits);

      wrapper.vm.closeOnClickOutside();

      expect(emits).not.toHaveBeenCalledWith('hide');
    });
  });

  describe('closeOnEscKey', () => {
    it('Should close on "Escape" key when closeOnEscape is true.', async () => {
      const wrapper = mountWithComposable({ ...defaultProps, closeOnEscape: true });

      wrapper.vm.open();
      wrapper.vm.closeOnEscKey(new KeyboardEvent('keydown', { key: 'Escape' }));

      expect(wrapper.vm.isOpen).toBe(false);
    });

    it('Should close on "Esc" key when closeOnEscape is true.', async () => {
      const wrapper = mountWithComposable({ ...defaultProps, closeOnEscape: true });

      wrapper.vm.open();
      wrapper.vm.closeOnEscKey(new KeyboardEvent('keydown', { key: 'Esc' }));

      expect(wrapper.vm.isOpen).toBe(false);
    });

    it('Should do nothing when pressed key is not Escape.', async () => {
      const wrapper = mountWithComposable({ ...defaultProps, closeOnEscape: true });

      wrapper.vm.open();
      wrapper.vm.closeOnEscKey(new KeyboardEvent('keydown', { key: 'Enter' }));

      expect(wrapper.vm.isOpen).toBe(true);
    });

    it('Should do nothing when closeOnEscape is false.', async () => {
      const wrapper = mountWithComposable({ ...defaultProps, closeOnEscape: false });

      wrapper.vm.open();
      wrapper.vm.closeOnEscKey(new KeyboardEvent('keydown', { key: 'Escape' }));

      expect(wrapper.vm.isOpen).toBe(true);
    });
  });

  describe('componentClasses', () => {
    it('Should include base CSS class.', () => {
      const wrapper = mountWithComposable();

      expect(wrapper.vm.componentClasses).toContain(
        defaultMock.getSelectorWithoutDot(defaultMock.rootEl),
      );
    });

    it('Should always include theme modifier.', () => {
      const wrapper = mountWithComposable();

      expect(wrapper.vm.componentClasses).toContain(defaultMock.themeModifier);
    });

    it('Should include open modifier when isOpen is true.', async () => {
      const wrapper = mountWithComposable();

      wrapper.vm.open();

      expect(wrapper.vm.componentClasses).toContain(defaultMock.openModifier);
    });

    it('Should not include open modifier when isOpen is false.', () => {
      const wrapper = mountWithComposable();

      expect(wrapper.vm.componentClasses).not.toContain(defaultMock.openModifier);
    });

    it('Should include disabled modifier when disabled is true.', () => {
      const wrapper = mountWithComposable({ ...defaultProps, disabled: true });

      expect(wrapper.vm.componentClasses).toContain(defaultMock.disabledModifier);
    });

    it('Should not include disabled modifier when disabled is false.', () => {
      const wrapper = mountWithComposable({ ...defaultProps, disabled: false });

      expect(wrapper.vm.componentClasses).not.toContain(defaultMock.disabledModifier);
    });

    it('Should use custom cssClass as base when provided.', () => {
      const customMock = new DropdownMenuSelectorTestData('my-menu');
      const wrapper = mountWithComposable({ ...defaultProps, cssClass: 'my-menu' });

      expect(wrapper.vm.componentClasses).toContain(
        customMock.getSelectorWithoutDot(customMock.rootEl),
      );
    });
  });

  describe('listClasses', () => {
    it('Should include base list class.', () => {
      const wrapper = mountWithComposable();

      expect(wrapper.vm.listClasses).toContain(
        defaultMock.getSelectorWithoutDot(defaultMock.listEl),
      );
    });

    it('Should fall back to vertical-bottom-right when no DOM elements are attached.', () => {
      const wrapper = mountWithComposable();

      expect(wrapper.vm.listClasses).toContain(defaultMock.listVerticalBottomRightModifier);
    });

    it('Should use custom cssClass in list class when provided.', () => {
      const customMock = new DropdownMenuSelectorTestData('my-menu');
      const wrapper = mountWithComposable({ ...defaultProps, cssClass: 'my-menu' });

      expect(wrapper.vm.listClasses).toContain(customMock.getSelectorWithoutDot(customMock.listEl));
    });
  });

  describe('Edge cases', () => {
    it('Should not open when disabled even after multiple calls.', async () => {
      const emits = vi.fn() as unknown as TDropdownMenuEmits;
      const wrapper = mountWithComposable({ ...defaultProps, disabled: true }, emits);

      wrapper.vm.open();
      wrapper.vm.open();
      wrapper.vm.open();

      expect(wrapper.vm.isOpen).toBe(false);
      expect(emits).not.toHaveBeenCalled();
    });

    it('Should not emit "hide" multiple times on repeated close calls.', async () => {
      const emits = vi.fn() as unknown as TDropdownMenuEmits;
      const wrapper = mountWithComposable(defaultProps, emits);

      wrapper.vm.open();
      wrapper.vm.close();
      wrapper.vm.close();

      const hideCalls = (emits as ReturnType<typeof vi.fn>).mock.calls.filter(
        ([event]) => event === 'hide',
      );
      expect(hideCalls).toHaveLength(1);
    });
  });
});
