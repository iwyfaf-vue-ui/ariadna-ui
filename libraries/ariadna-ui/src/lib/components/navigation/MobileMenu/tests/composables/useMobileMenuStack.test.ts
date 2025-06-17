import { describe, it, expect } from 'vitest';
import { ref, shallowRef, nextTick, defineComponent, h } from 'vue';
import { mount } from '@vue/test-utils';
import useMobileMenuStack from '../../composables/useMobileMenuStack/useMobileMenuStack';
import type { TMobileMenuProps } from '../../MobileMenu';
import type { TMobileMenuItem, TSharedMenu } from '../../MobileMenu';
import { MobileMenuSelectorTestData } from '../test-data/MobileMenu.selector.test-data';

const defaultMock = new MobileMenuSelectorTestData();

function createMockDiv(width: number): HTMLDivElement {
  const div = document.createElement('div');
  Object.defineProperty(div, 'offsetWidth', { get: () => width });
  return div;
}

function mountWithComposable(
  props: TMobileMenuProps,
  pagesRef = shallowRef<Array<HTMLDivElement> | null>(null),
  currentMenuItem = ref<TMobileMenuItem | null>(null),
  route = { path: '/' },
) {
  return mount(
    defineComponent({
      setup() {
        const result = useMobileMenuStack(props, pagesRef, currentMenuItem);
        return { ...result, pagesRef, currentMenuItem };
      },
      render() {
        return h('div');
      },
    }),
    {
      global: {
        config: {
          globalProperties: {
            $route: route,
          },
        },
      },
    },
  );
}

describe('useMobileMenuStack', () => {
  describe('calculateTranslateX', () => {
    it('Should calculate correct translateX with multiple pages and skip=0.', async () => {
      const pagesRef = shallowRef<Array<HTMLDivElement> | null>(null);
      const currentMenuItem = ref<TMobileMenuItem | null>(null);
      const wrapper = mountWithComposable(defaultMock.mockProps, pagesRef, currentMenuItem);
      const vm = wrapper.vm;

      const div1 = createMockDiv(100);
      const div2 = createMockDiv(200);
      const div3 = createMockDiv(300);
      pagesRef.value = [div1, div2, div3];

      vm.calculateTranslateX(0);
      await nextTick();

      expect(vm.pageTranslateX).toBe(300);
    });

    it('Should calculate correct translateX with skip=1.', async () => {
      const pagesRef = shallowRef<Array<HTMLDivElement> | null>(null);
      const currentMenuItem = ref<TMobileMenuItem | null>(null);
      const wrapper = mountWithComposable(defaultMock.mockProps, pagesRef, currentMenuItem);
      const vm = wrapper.vm;

      const div1 = createMockDiv(50);
      const div2 = createMockDiv(75);
      const div3 = createMockDiv(125);
      pagesRef.value = [div1, div2, div3];

      vm.calculateTranslateX(1);
      await nextTick();

      expect(vm.pageTranslateX).toBe(50);
    });

    it('Should set pageTranslateX to 0 if pagesRef.value is null.', () => {
      const pagesRef = shallowRef<Array<HTMLDivElement> | null>(null);
      const currentMenuItem = ref<TMobileMenuItem | null>(null);
      const wrapper = mountWithComposable(defaultMock.mockProps, pagesRef, currentMenuItem);
      const vm = wrapper.vm;

      pagesRef.value = null;

      vm.calculateTranslateX();

      expect(vm.pageTranslateX).toBe(0);
    });

    it('Should set pageTranslateX to 0 if pagesRef.value is empty array.', () => {
      const pagesRef = shallowRef<Array<HTMLDivElement> | null>(null);
      const currentMenuItem = ref<TMobileMenuItem | null>(null);
      const wrapper = mountWithComposable(defaultMock.mockProps, pagesRef, currentMenuItem);
      const vm = wrapper.vm;

      pagesRef.value = [];

      vm.calculateTranslateX();

      expect(vm.pageTranslateX).toBe(0);
    });
  });

  describe('clearStack', () => {
    it('Should clear pageStackWithoutDelay and recalculate translateX.', async () => {
      const pagesRef = shallowRef<Array<HTMLDivElement> | null>(null);
      const currentMenuItem = ref<TMobileMenuItem | null>(null);
      const wrapper = mountWithComposable(defaultMock.mockProps, pagesRef, currentMenuItem);
      const vm = wrapper.vm;

      pagesRef.value = [createMockDiv(100)];

      vm.pageStackWithoutDelay.push({ level: 1, menuItem: null, prevMenuItem: null });

      expect(vm.pageStackWithoutDelay.length).toBe(1);

      vm.clearStack();

      expect(vm.pageStackWithoutDelay.length).toBe(0);

      await nextTick();

      expect(vm.pageTranslateX).toBe(0);
    });
  });

  describe('toHome', () => {
    it('Should keep only first page in stack and recalculate translateX.', async () => {
      const pagesRef = shallowRef<Array<HTMLDivElement> | null>(null);
      const currentMenuItem = ref<TMobileMenuItem | null>(null);
      const wrapper = mountWithComposable(defaultMock.mockProps, pagesRef, currentMenuItem);
      const vm = wrapper.vm;

      pagesRef.value = [createMockDiv(100), createMockDiv(200)];

      vm.pageStackWithoutDelay.push({ level: 1, menuItem: null, prevMenuItem: null });
      vm.pageStackWithoutDelay.push({ level: 2, menuItem: null, prevMenuItem: null });
      vm.pageStackWithoutDelay.push({ level: 3, menuItem: null, prevMenuItem: null });

      expect(vm.pageStackWithoutDelay.length).toBe(3);

      vm.toHome();

      expect(vm.pageStackWithoutDelay.length).toBe(1);

      await nextTick();

      expect(vm.pageTranslateX).toBe(100);
    });

    it('Should handle empty stack gracefully.', async () => {
      const pagesRef = shallowRef<Array<HTMLDivElement> | null>(null);
      const currentMenuItem = ref<TMobileMenuItem | null>(null);
      const wrapper = mountWithComposable(defaultMock.mockProps, pagesRef, currentMenuItem);
      const { toHome, pageStackWithoutDelay } = wrapper.vm;

      expect(pageStackWithoutDelay.length).toBe(0);

      toHome();

      expect(pageStackWithoutDelay.length).toBe(0);

      await nextTick();
    });
  });

  describe('addToStack', () => {
    it('Should add item to pageStackWithoutDelay with correct level and recalc translateX.', async () => {
      const pagesRef = shallowRef<Array<HTMLDivElement> | null>(null);
      const currentMenuItem = ref<TMobileMenuItem | null>(null);
      const wrapper = mountWithComposable(defaultMock.mockProps, pagesRef, currentMenuItem);
      const vm = wrapper.vm;

      pagesRef.value = [createMockDiv(100), createMockDiv(150)];

      const item: TSharedMenu = {
        name: 'Item 1',
        attributes: { url: '', outside: false },
        children: [],
        icon: {
          before: null,
          after: null,
        },
      };

      expect(vm.pageStackWithoutDelay.length).toBe(0);

      vm.addToStack(item);

      expect(vm.pageStackWithoutDelay.length).toBe(1);
      expect(vm.pageStackWithoutDelay[0].item).toStrictEqual(item);
      expect(vm.pageStackWithoutDelay[0].level).toBe(2);

      await nextTick();

      expect(vm.pageTranslateX).toBe(100);
    });
  });

  describe('addToStackMenuItem', () => {
    it('Should add menuItem to pageStackWithoutDelay with correct level and recalc translateX.', async () => {
      const pagesRef = shallowRef<Array<HTMLDivElement> | null>(null);
      const currentMenuItem = ref<TMobileMenuItem | null>(null);
      const wrapper = mountWithComposable(defaultMock.mockProps, pagesRef, currentMenuItem);
      const vm = wrapper.vm;

      pagesRef.value = [createMockDiv(100), createMockDiv(150)];

      const menuItem: TMobileMenuItem = {
        key: 'menu1',
        label: 'Menu 1',
        icon: '',
        loading: false,
        items: [],
      };

      const prevMenuItem: TMobileMenuItem | null = null;

      expect(vm.pageStackWithoutDelay.length).toBe(0);

      vm.addToStackMenuItem(menuItem, prevMenuItem);

      expect(vm.pageStackWithoutDelay.length).toBe(1);
      expect(vm.pageStackWithoutDelay[0].menuItem).toStrictEqual(menuItem);
      expect(vm.pageStackWithoutDelay[0].prevMenuItem).toBe(prevMenuItem);
      expect(vm.pageStackWithoutDelay[0].level).toBe(1);

      await nextTick();

      expect(vm.pageTranslateX).toBe(100);
    });
  });

  describe('backStack', () => {
    it('Should go back in stack and update currentMenuItem and pageStackWithDelay.', async () => {
      const pagesRef = shallowRef<Array<HTMLDivElement> | null>(null);
      const currentMenuItem = ref<TMobileMenuItem | null>(null);
      const wrapper = mountWithComposable(defaultMock.mockProps, pagesRef, currentMenuItem);
      const vm = wrapper.vm;

      pagesRef.value = [createMockDiv(100), createMockDiv(150), createMockDiv(200)];

      const menuItem1: TMobileMenuItem = {
        key: 'menu1',
        label: 'Menu 1',
        icon: '',
        loading: false,
        items: [],
      };

      const menuItem2: TMobileMenuItem = {
        key: 'menu2',
        label: 'Menu 2',
        icon: '',
        loading: false,
        items: [],
      };

      vm.pageStackWithoutDelay.push({ menuItem: menuItem1, level: 1, prevMenuItem: null });
      vm.pageStackWithoutDelay.push({ menuItem: menuItem2, level: 2, prevMenuItem: menuItem1 });

      currentMenuItem.value = menuItem2;

      vm.backStack();

      expect(vm.isBackWithoutDelay).toBe(true);
      expect(vm.currentMenuItem).toStrictEqual(menuItem1);
    });
  });
});
