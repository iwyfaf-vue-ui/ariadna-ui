import { describe, it, expect, beforeEach, vi, afterEach } from 'vitest';
import { ref, defineComponent, h, nextTick } from 'vue';
import { mount } from '@vue/test-utils';
import usePosition, { usePositionDefaultOptions } from '../../usePosition';

export function createMockElement(rect: Partial<DOMRect> = {}, opts: Partial<HTMLElement> = {}) {
  const el = document.createElement('div');
  Object.assign(el, opts);

  el.getBoundingClientRect = vi.fn(() => ({
    top: rect.top ?? 100,
    left: rect.left ?? 100,
    right: rect.right ?? 200,
    bottom: rect.bottom ?? 200,
    width: rect.width ?? 100,
    height: rect.height ?? 100,
    x: rect.x ?? rect.left ?? 100,
    y: rect.y ?? rect.top ?? 100,
    toJSON: () => ({}),
  }));

  Object.defineProperty(el, 'offsetWidth', {
    configurable: true,
    get: () => rect.width ?? 100,
  });

  Object.defineProperty(el, 'offsetHeight', {
    configurable: true,
    get: () => rect.height ?? 100,
  });

  return el as HTMLElement;
}

function mountWithComposable(
  buttonEl: HTMLElement | null,
  dropboxEl: HTMLElement | null,
  options: any = usePositionDefaultOptions,
  container?: HTMLElement | Window,
) {
  const buttonRef = ref<HTMLElement | null>(buttonEl);
  const dropboxRef = ref<HTMLElement | null>(dropboxEl);

  if (container && options) {
    options = { ...options, container };
  }

  return mount(
    defineComponent({
      setup() {
        const result = usePosition(buttonRef, dropboxRef, options);
        return { ...result };
      },
      render() {
        return h('div');
      },
    }),
  );
}

class ResizeObserverMock {
  observe = vi.fn();
  disconnect = vi.fn();
}
global.ResizeObserver = ResizeObserverMock as any;

describe('usePosition', () => {
  let buttonEl: HTMLElement;
  let dropboxEl: HTMLElement;
  let containerEl: HTMLElement;

  beforeEach(() => {
    buttonEl = createMockElement({
      top: 100,
      left: 100,
      right: 200,
      bottom: 150,
      width: 100,
      height: 50,
    });
    dropboxEl = createMockElement({
      width: 80,
      height: 40,
    });
    containerEl = document.createElement('div');
    Object.defineProperty(containerEl, 'clientWidth', { value: 500 });
    Object.defineProperty(containerEl, 'clientHeight', { value: 500 });
    document.body.appendChild(containerEl);
  });

  afterEach(() => {
    document.body.innerHTML = '';
    vi.clearAllMocks();
  });

  describe('disabled', () => {
    it('Should not calculate position if disabled returns true.', async () => {
      const wrapper = mountWithComposable(buttonEl, dropboxEl, {
        ...usePositionDefaultOptions,
        disabled: () => true,
      });
      const vm = wrapper.vm;

      await nextTick();

      expect(vm.top).toBe(0);
      expect(vm.left).toBe(0);
      expect(vm.cssClass).toBe('');
      expect(vm.secondaryCssClass).toBe('');
    });
  });

  describe('container', () => {
    it('Should work with custom container element', async () => {
      const wrapper = mountWithComposable(
        buttonEl,
        dropboxEl,
        usePositionDefaultOptions,
        containerEl,
      );
      const vm = wrapper.vm;

      await nextTick();

      expect(vm.top).toBeDefined();
      expect(vm.left).toBeDefined();
    });

    it('Should work with window as container', async () => {
      const wrapper = mountWithComposable(buttonEl, dropboxEl, usePositionDefaultOptions, window);
      const vm = wrapper.vm;

      await nextTick();

      expect(vm.top).toBeDefined();
      expect(vm.left).toBeDefined();
    });
  });

  describe('positionOrder', () => {
    it('Should respect custom positionOrder.', async () => {
      const wrapper = mountWithComposable(buttonEl, dropboxEl, {
        ...usePositionDefaultOptions,
        positionOrder: ['TOP', 'RIGHT'],
      });
      const vm = wrapper.vm;

      await nextTick();

      expect(['top', 'right']).toContain(vm.cssClass);
    });

    it('Should try all positions in positionOrder', async () => {
      const wrapper = mountWithComposable(buttonEl, dropboxEl, {
        ...usePositionDefaultOptions,
        positionOrder: ['LEFT', 'RIGHT', 'TOP', 'BOTTOM'],
      });
      const vm = wrapper.vm;

      await nextTick();

      expect(vm.cssClass).toBeDefined();
    });
  });

  describe('nullRefs', () => {
    it('should handle null button ref gracefully', async () => {
      const wrapper = mountWithComposable(null, dropboxEl);
      const vm = wrapper.vm;

      await nextTick();

      expect(vm.top).toBe(0);
      expect(vm.left).toBe(0);
    });

    it('should handle null dropbox ref gracefully', async () => {
      const wrapper = mountWithComposable(buttonEl, null);
      const vm = wrapper.vm;

      await nextTick();

      expect(vm.top).toBe(0);
      expect(vm.left).toBe(0);
    });

    it('should handle both refs null gracefully', async () => {
      const wrapper = mountWithComposable(null, null);
      const vm = wrapper.vm;

      await nextTick();

      expect(vm.top).toBe(0);
      expect(vm.left).toBe(0);
    });
  });
});
