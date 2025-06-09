import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { nextTick, defineComponent, h, shallowRef } from 'vue';
import { mount } from '@vue/test-utils';
import useElementSize from '../../useElementSize';

interface ResizeObserverMock extends ResizeObserver {
  callback?: ResizeObserverCallback;
  observe: (target: Element) => void;
  unobserve: (target: Element) => void;
  disconnect: () => void;
}

function mountWithComposable(elementRef: any, timeout = 200, handler?: any) {
  return mount(
    defineComponent({
      setup() {
        const result = useElementSize(elementRef, timeout, handler);
        return { ...result };
      },
      render() {
        return h('div');
      },
    }),
  );
}

describe('useElementSize', () => {
  let element: HTMLDivElement;
  let elementRef: any;
  let resizeObserverMock: any;
  let observeMock: any;
  let unobserveMock: any;

  beforeEach(() => {
    element = document.createElement('div') as HTMLDivElement;
    element.style.width = '100px';
    element.style.height = '50px';

    // Мокаем scrollWidth и scrollHeight через defineProperty, т.к. они readonly
    Object.defineProperty(element, 'scrollWidth', {
      configurable: true,
      get: () => 120,
    });
    Object.defineProperty(element, 'scrollHeight', {
      configurable: true,
      get: () => 60,
    });

    elementRef = shallowRef(element);

    observeMock = vi.fn();
    unobserveMock = vi.fn();

    resizeObserverMock = vi.fn(function (
      this: ResizeObserverMock,
      callback: ResizeObserverCallback,
    ) {
      this.callback = callback;
      this.observe = observeMock;
      this.unobserve = unobserveMock;
      this.disconnect = vi.fn();
    });

    global.ResizeObserver = resizeObserverMock;
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  describe('Initialization', () => {
    it('Should initialize reactive size refs with initial element size.', async () => {
      const wrapper = mountWithComposable(elementRef);
      await nextTick();

      expect(wrapper.vm.width).toBe(element.offsetWidth);
      expect(wrapper.vm.height).toBe(element.offsetHeight);
      expect(wrapper.vm.scrollWidth).toBe(element.scrollWidth);
      expect(wrapper.vm.scrollHeight).toBe(element.scrollHeight);
    });

    it('Should create ResizeObserver and observe the element on mount.', () => {
      mountWithComposable(elementRef);

      expect(resizeObserverMock).toHaveBeenCalledTimes(1);
      expect(observeMock).toHaveBeenCalledWith(element);
    });
  });

  describe('Resize handling', () => {
    it('Should call handler callback with updated sizes if provided.', async () => {
      const handler = vi.fn();
      mountWithComposable(elementRef, 200, handler);
      await nextTick();

      const instance = resizeObserverMock.mock.instances[0];
      instance.callback([{ target: element }], instance);

      await nextTick();

      expect(handler).toHaveBeenCalledTimes(1);
      expect(handler).toHaveBeenCalledWith({
        width: expect.any(Object),
        height: expect.any(Object),
        scrollWidth: expect.any(Object),
        scrollHeight: expect.any(Object),
      });

      const arg = handler.mock.calls[0][0];
      expect(arg.width.value).toBe(element.offsetWidth);
      expect(arg.height.value).toBe(element.offsetHeight);
      expect(arg.scrollWidth.value).toBe(element.scrollWidth);
      expect(arg.scrollHeight.value).toBe(element.scrollHeight);
    });
  });

  describe('ResizeObserver lifecycle', () => {
    it('Should unobserve element on unmount.', async () => {
      const wrapper = mountWithComposable(elementRef);
      await nextTick();

      wrapper.unmount();

      expect(unobserveMock).toHaveBeenCalledWith(element);
    });

    it('Should unobserve old element and observe new element when element ref changes.', async () => {
      mountWithComposable(elementRef);
      await nextTick();

      const newElement = document.createElement('div') as HTMLDivElement;
      newElement.style.width = '300px';
      newElement.style.height = '150px';

      Object.defineProperty(newElement, 'scrollWidth', {
        configurable: true,
        get: () => 320,
      });
      Object.defineProperty(newElement, 'scrollHeight', {
        configurable: true,
        get: () => 160,
      });

      const oldElement = elementRef.value;
      elementRef.value = newElement;

      await nextTick();

      expect(unobserveMock).toHaveBeenCalledWith(oldElement);
      expect(observeMock).toHaveBeenCalledWith(newElement);
    });

    it('Should not unobserve or observe if element ref does not change.', async () => {
      mountWithComposable(elementRef);
      await nextTick();

      unobserveMock.mockClear();
      observeMock.mockClear();

      await nextTick();

      expect(unobserveMock).not.toHaveBeenCalled();
      expect(observeMock).not.toHaveBeenCalled();
    });
  });

  describe('Edge cases', () => {
    it('Should not throw if element ref is null.', async () => {
      const nullRef = shallowRef<HTMLElement | null>(null);
      const wrapper = mountWithComposable(nullRef);
      await nextTick();

      expect(wrapper.vm.width).toBe(0);
      expect(wrapper.vm.height).toBe(0);
      expect(wrapper.vm.scrollWidth).toBe(0);
      expect(wrapper.vm.scrollHeight).toBe(0);
    });

    it('Should handle element becoming null after being set.', async () => {
      mountWithComposable(elementRef);
      await nextTick();

      elementRef.value = null;
      await nextTick();

      expect(unobserveMock).toHaveBeenCalled();
    });
  });
});
