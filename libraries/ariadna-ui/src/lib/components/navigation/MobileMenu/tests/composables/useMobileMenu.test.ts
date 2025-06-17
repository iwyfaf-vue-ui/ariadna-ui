import { describe, it, expect, beforeEach, vi } from 'vitest';
import { ref } from 'vue';
import type { Ref } from 'vue';
import useMobileMenu from '../../composables/useMobileMenu/useMobileMenu';
import type { TMobileMenuProps, TMobileMenuEmits } from '../../MobileMenu';
import type { TMobileMenuItem } from '../../types/MobileMenu.types';
import { MobileMenuSelectorTestData } from '../test-data/MobileMenu.selector.test-data';

const defaultMock = new MobileMenuSelectorTestData();

function mountWithComposable(
  props: TMobileMenuProps,
  emits: TMobileMenuEmits,
  currentMenuItem: Ref<TMobileMenuItem | null, TMobileMenuItem | null>,
  menuResizeWithoutDelay: ReturnType<typeof ref>,
  pageStackWithoutDelay: ReturnType<typeof ref>,
) {
  // Вызов composable напрямую, без монтирования компонента, т.к. composable не зависит от DOM
  return useMobileMenu(
    props,
    emits,
    currentMenuItem,
    menuResizeWithoutDelay,
    pageStackWithoutDelay,
  );
}

describe('useMobileMenu', () => {
  let emits: TMobileMenuEmits;
  const currentMenuItem = ref<TMobileMenuItem | null>(null);
  let menuResizeWithoutDelay: ReturnType<typeof ref>;
  let pageStackWithoutDelay: ReturnType<typeof ref>;

  beforeEach(() => {
    emits = vi.fn() as unknown as TMobileMenuEmits;
    menuResizeWithoutDelay = ref(false);
    pageStackWithoutDelay = ref([]);
  });

  describe('componentClasses ComputedRef', () => {
    it('Should generate correct componentClasses for default props.', () => {
      const { componentClasses } = mountWithComposable(
        defaultMock.mockProps,
        emits,
        currentMenuItem,
        menuResizeWithoutDelay,
        pageStackWithoutDelay,
      );

      const classes = componentClasses.value.split(' ');

      const expectedClasses = [
        defaultMock.getSelectorWithoutDot(defaultMock.rootEl),
        defaultMock.getSelectorWithoutDot(defaultMock.themeModifier),
      ];

      expect(classes).toEqual(expect.arrayContaining(expectedClasses));
      expect(classes.length).toBe(expectedClasses.length);
    });

    it('Should include loading modifier class when data prop is empty.', () => {
      const { componentClasses, opened } = mountWithComposable(
        defaultMock.mockProps,
        emits,
        currentMenuItem,
        menuResizeWithoutDelay,
        pageStackWithoutDelay,
      );

      opened.value = true;

      expect(componentClasses.value).toContain(
        defaultMock.getSelectorWithoutDot(defaultMock.openedModifier),
      );
    });
  });

  describe('menuClasses ComputedRef', () => {
    it('Should include resize class when menuResizeWithoutDelay is true', () => {
      menuResizeWithoutDelay.value = true;
      const { menuClasses } = mountWithComposable(
        defaultMock.mockProps,
        emits,
        currentMenuItem,
        menuResizeWithoutDelay,
        pageStackWithoutDelay,
      );

      expect(menuClasses.value).toHaveProperty(defaultMock.menuEl, true);
      expect(menuClasses.value).toHaveProperty(defaultMock.menuResizeModifier, true);
    });

    it('Should not include resize class when menuResizeWithoutDelay is false', () => {
      menuResizeWithoutDelay.value = false;
      const { menuClasses } = mountWithComposable(
        defaultMock.mockProps,
        emits,
        currentMenuItem,
        menuResizeWithoutDelay,
        pageStackWithoutDelay,
      );

      expect(menuClasses.value).toHaveProperty(defaultMock.menuEl, true);
      expect(menuClasses.value).toHaveProperty(defaultMock.menuResizeModifier, false);
    });
  });

  describe('backClasses ComputedRef', () => {
    it('Should include visible class when pageStackWithoutDelay length > 1', () => {
      pageStackWithoutDelay.value = [
        { key: '1', label: 'Menu 1', icon: '', loading: false, items: [] },
        { key: '2', label: 'Menu 2', icon: '', loading: false, items: [] },
      ];

      const { backClasses } = mountWithComposable(
        defaultMock.mockProps,
        emits,
        currentMenuItem,
        menuResizeWithoutDelay,
        pageStackWithoutDelay,
      );

      expect(backClasses.value).toHaveProperty(defaultMock.headerBackEl, true);
      expect(backClasses.value).toHaveProperty(defaultMock.headerBackVisibleModifier, true);
    });

    it('Should not include visible class when pageStackWithoutDelay length <= 1', () => {
      pageStackWithoutDelay.value = [
        { key: '1', label: 'Menu 1', icon: '', loading: false, items: [] },
      ];

      const { backClasses } = mountWithComposable(
        defaultMock.mockProps,
        emits,
        currentMenuItem,
        menuResizeWithoutDelay,
        pageStackWithoutDelay,
      );

      expect(backClasses.value).toHaveProperty(defaultMock.headerBackEl, true);
      expect(backClasses.value).toHaveProperty(defaultMock.headerBackVisibleModifier, false);
    });
  });

  describe('open Function', () => {
    it('Should set opened to true and emit open event', () => {
      const { opened, open } = mountWithComposable(
        defaultMock.mockProps,
        emits,
        currentMenuItem,
        menuResizeWithoutDelay,
        pageStackWithoutDelay,
      );

      expect(opened.value).toBe(false);

      open();

      expect(opened.value).toBe(true);
      expect(emits).toHaveBeenCalledWith('open');
    });
  });

  describe('toggle Function', () => {
    it('Should open menu if closed and emit open event', () => {
      const { opened, toggle } = mountWithComposable(
        defaultMock.mockProps,
        emits,
        currentMenuItem,
        menuResizeWithoutDelay,
        pageStackWithoutDelay,
      );

      expect(opened.value).toBe(false);

      toggle();

      expect(opened.value).toBe(true);
      expect(emits).toHaveBeenCalledWith('open');
    });

    it('Should close menu if opened, reset currentMenuItem and emit close event', () => {
      currentMenuItem.value = { key: '1', label: 'Menu 1', icon: '', loading: false, items: [] };
      const { opened, toggle } = mountWithComposable(
        defaultMock.mockProps,
        emits,
        currentMenuItem,
        menuResizeWithoutDelay,
        pageStackWithoutDelay,
      );

      toggle();

      expect(opened.value).toBe(true);

      toggle();

      expect(opened.value).toBe(false);
      expect(currentMenuItem.value).toBeNull();
      expect(emits).toHaveBeenCalledWith('close');
    });
  });

  describe('close Function', () => {
    it('Should set opened to false, reset currentMenuItem and emit close event', () => {
      currentMenuItem.value = { key: '1', label: 'Menu 1', icon: '', loading: false, items: [] };

      const { opened, close } = mountWithComposable(
        defaultMock.mockProps,
        emits,
        currentMenuItem,
        menuResizeWithoutDelay,
        pageStackWithoutDelay,
      );

      close();

      expect(opened.value).toBe(false);
      expect(currentMenuItem.value).toBeNull();
      expect(emits).toHaveBeenCalledWith('close');
    });
  });
});
