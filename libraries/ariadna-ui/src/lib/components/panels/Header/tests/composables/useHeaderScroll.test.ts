import { describe, it, expect, beforeEach, afterAll, vi } from 'vitest';
import { defineComponent, h, nextTick } from 'vue';
import { mount } from '@vue/test-utils';
import useHeaderScroll from '../../composables/useHeaderScroll/useHeaderScroll';
import type { THeaderEmits, THeaderProps } from '../../Header';
import { HeaderSelectorTestData } from '../test-data/Header.selector.test-data';

const defaultMock = new HeaderSelectorTestData();

function mountWithComposable(props: THeaderProps) {
  const emits = vi.fn<THeaderEmits>();

  return mount(
    defineComponent({
      setup() {
        const result = useHeaderScroll(props, emits);
        return { ...result, emits };
      },
      render() {
        return h('div');
      },
    }),
  );
}

describe('useHeaderScroll', () => {
  const originalWindow = globalThis.window;

  beforeEach(async () => {
    vi.restoreAllMocks();
    // Восстанавливаем window, если он был изменён в SSR-тестах
    if (!globalThis.window && originalWindow) {
      globalThis.window = originalWindow;
    }
  });

  afterAll(async () => {
    // Восстанавливаем исходное значение window после всех тестов
    if (originalWindow) {
      globalThis.window = originalWindow;
    }
  });

  describe('scrollClasses ComputedRef', () => {
    it('Should return empty string when scrollThreshold is not provided.', async () => {
      const wrapper = mountWithComposable({ ...defaultMock.mockProps, scrollThreshold: undefined });
      const vm = wrapper.vm;

      expect(vm).toBeDefined();
      expect(vm.scrollClasses).toBeDefined();
      expect(vm.scrollClasses).toEqual('');
    });

    it('Should keep scrollClasses empty when scroll is below threshold.', async () => {
      // Устанавливаем скролл ниже порога до монтирования
      Object.defineProperty(window, 'scrollY', {
        value: 50,
        writable: true,
        configurable: true,
      });

      const wrapper = mountWithComposable({
        ...defaultMock.mockProps,
        scrollThreshold: defaultMock.scrollThresholdProp,
      });
      const vm = wrapper.vm;

      expect(vm.scrollClasses).toEqual('');

      // Имитируем событие scroll при значении ниже порога
      (window as any).scrollY = 80;
      window.dispatchEvent(new Event('scroll'));
      await nextTick();

      expect(vm.scrollClasses).toEqual('');
    });

    it('Should set scrolled class when scroll position equals threshold.', async () => {
      Object.defineProperty(window, 'scrollY', {
        value: 100,
        writable: true,
        configurable: true,
      });

      const wrapper = mountWithComposable({
        ...defaultMock.mockProps,
        scrollThreshold: defaultMock.scrollThresholdProp,
      });
      const vm = wrapper.vm;

      expect(vm.scrollClasses).toEqual(
        defaultMock.getSelectorWithoutDot(defaultMock.scrolledModifier),
      );
    });

    it('Should set scrolled class when scroll position is above threshold.', async () => {
      Object.defineProperty(window, 'scrollY', {
        value: 150,
        writable: true,
        configurable: true,
      });

      const wrapper = mountWithComposable({
        ...defaultMock.mockProps,
        scrollThreshold: defaultMock.scrollThresholdProp,
      });
      const vm = wrapper.vm;

      expect(vm.scrollClasses).toEqual(
        defaultMock.getSelectorWithoutDot(defaultMock.scrolledModifier),
      );
    });

    it('Should toggle scrolled class when crossing threshold up and down.', async () => {
      Object.defineProperty(window, 'scrollY', {
        value: 0,
        writable: true,
        configurable: true,
      });

      const wrapper = mountWithComposable({
        ...defaultMock.mockProps,
        scrollThreshold: defaultMock.scrollThresholdProp,
      });
      const vm = wrapper.vm;

      // Изначально ниже порога
      expect(vm.scrollClasses).toEqual('');

      // Поднимаемся выше порога
      (window as any).scrollY = 150;
      window.dispatchEvent(new Event('scroll'));
      await nextTick();

      expect(vm.scrollClasses).toEqual(
        defaultMock.getSelectorWithoutDot(defaultMock.scrolledModifier),
      );

      // Опускаемся ниже порога
      (window as any).scrollY = 50;
      window.dispatchEvent(new Event('scroll'));
      await nextTick();

      expect(vm.scrollClasses).toEqual('');
    });
  });

  describe('Scroll behavior', () => {
    it('Should emit scrolled=true on mount when scroll is already above threshold.', async () => {
      Object.defineProperty(window, 'scrollY', {
        value: 150,
        writable: true,
        configurable: true,
      });

      const wrapper = mountWithComposable({
        ...defaultMock.mockProps,
        scrollThreshold: defaultMock.scrollThresholdProp,
      });
      const vm = wrapper.vm;

      expect(vm.emits).toBeDefined();
      expect(vm.emits.mock.calls.length).toEqual(1);
      expect(vm.emits.mock.calls[0]).toStrictEqual(['scrolled', true]);
    });

    it('Should not emit on mount when scroll is below threshold.', async () => {
      Object.defineProperty(window, 'scrollY', {
        value: 50,
        writable: true,
        configurable: true,
      });

      const wrapper = mountWithComposable({
        ...defaultMock.mockProps,
        scrollThreshold: defaultMock.scrollThresholdProp,
      });
      const vm = wrapper.vm;

      expect(vm.emits.mock.calls.length).toEqual(0);
    });

    it('Should emit scrolled=true when crossing threshold upwards.', async () => {
      Object.defineProperty(window, 'scrollY', {
        value: 0,
        writable: true,
        configurable: true,
      });

      const wrapper = mountWithComposable({
        ...defaultMock.mockProps,
        scrollThreshold: defaultMock.scrollThresholdProp,
      });
      const vm = wrapper.vm;

      expect(vm.emits.mock.calls.length).toEqual(0);

      (window as any).scrollY = 150;
      window.dispatchEvent(new Event('scroll'));
      await nextTick();

      expect(vm.emits.mock.calls.length).toEqual(1);
      expect(vm.emits.mock.calls[0]).toStrictEqual(['scrolled', true]);
    });

    it('Should emit scrolled=false when crossing threshold downwards.', async () => {
      Object.defineProperty(window, 'scrollY', {
        value: 150,
        writable: true,
        configurable: true,
      });

      const wrapper = mountWithComposable({
        ...defaultMock.mockProps,
        scrollThreshold: defaultMock.scrollThresholdProp,
      });
      const vm = wrapper.vm;

      // На монтировании уже был emit(true)
      expect(vm.emits.mock.calls.length).toEqual(1);

      // Опускаемся ниже порога
      (window as any).scrollY = 50;
      window.dispatchEvent(new Event('scroll'));
      await nextTick();

      expect(vm.emits.mock.calls.length).toEqual(2);
      expect(vm.emits.mock.calls[1]).toStrictEqual(['scrolled', false]);
    });

    it('Should not emit multiple times when staying below threshold.', async () => {
      Object.defineProperty(window, 'scrollY', {
        value: 0,
        writable: true,
        configurable: true,
      });

      const wrapper = mountWithComposable({
        ...defaultMock.mockProps,
        scrollThreshold: defaultMock.scrollThresholdProp,
      });
      const vm = wrapper.vm;

      expect(vm.emits.mock.calls.length).toEqual(0);

      (window as any).scrollY = 50;
      window.dispatchEvent(new Event('scroll'));
      await nextTick();

      (window as any).scrollY = 80;
      window.dispatchEvent(new Event('scroll'));
      await nextTick();

      expect(vm.emits.mock.calls.length).toEqual(0);
    });

    it('Should not emit multiple times when staying above threshold.', async () => {
      Object.defineProperty(window, 'scrollY', {
        value: 150,
        writable: true,
        configurable: true,
      });

      const wrapper = mountWithComposable({
        ...defaultMock.mockProps,
        scrollThreshold: defaultMock.scrollThresholdProp,
      });
      const vm = wrapper.vm;

      // На монтировании emit(true)
      expect(vm.emits.mock.calls.length).toEqual(1);

      (window as any).scrollY = 200;
      window.dispatchEvent(new Event('scroll'));
      await nextTick();

      (window as any).scrollY = 250;
      window.dispatchEvent(new Event('scroll'));
      await nextTick();

      // Дополнительных эмитов быть не должно
      expect(vm.emits.mock.calls.length).toEqual(1);
    });

    it('Should not emit when scrollThreshold is null or undefined.', async () => {
      Object.defineProperty(window, 'scrollY', {
        value: 150,
        writable: true,
        configurable: true,
      });

      const wrapper = mountWithComposable(defaultMock.mockProps);
      const vm = wrapper.vm;

      // На монтировании emit не должен происходить
      expect(vm.emits.mock.calls.length).toEqual(0);

      window.dispatchEvent(new Event('scroll'));
      await nextTick();

      // И при скролле emit не должен происходить
      expect(vm.emits.mock.calls.length).toEqual(0);
    });

    it('Should register and unregister scroll event listener on mount and beforeUnmount.', async () => {
      const addEventListenerSpy = vi.spyOn(window, 'addEventListener');
      const removeEventListenerSpy = vi.spyOn(window, 'removeEventListener');

      Object.defineProperty(window, 'scrollY', {
        value: 0,
        writable: true,
        configurable: true,
      });

      const wrapper = mountWithComposable({
        ...defaultMock.mockProps,
        scrollThreshold: defaultMock.scrollThresholdProp,
      });

      expect(addEventListenerSpy).toHaveBeenCalledTimes(1);
      expect(addEventListenerSpy).toHaveBeenCalledWith('scroll', expect.any(Function), {
        passive: true,
      });

      wrapper.unmount();

      expect(removeEventListenerSpy).toHaveBeenCalledTimes(1);
      expect(removeEventListenerSpy).toHaveBeenCalledWith('scroll', expect.any(Function));
    });
  });
});
