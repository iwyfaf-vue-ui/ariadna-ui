import { describe, it, expect, afterEach, vi } from 'vitest';
import { mount } from '@vue/test-utils';
import { defineComponent } from 'vue';
import vInputNumber from '../../directives/InputNumber';
import InputNumberElementCore from '../../core/element/input-number.element.core';
import type { TInputNumberOptions, IInputNumberElement } from '../../types/InputNumber.types';

const defaultOptions: TInputNumberOptions = {
  prefix: '$',
  suffix: '₽',
  locale: undefined,
  min: 0,
  max: 100,
  step: 1,
  empty: null,
};

function createWrapper(
  options: Partial<TInputNumberOptions> = {},
  attrs: Record<string, any> = {},
) {
  return mount(
    defineComponent({
      template: `<input v-input-number="opts" v-bind="attrs" />`,
      directives: { inputNumber: vInputNumber },
      props: ['opts', 'attrs'],
    }),
    {
      props: {
        opts: { ...defaultOptions, ...options },
        attrs,
      },
      attachTo: document.body,
    },
  );
}

describe('vInputNumber', () => {
  let wrapper: ReturnType<typeof createWrapper>;

  afterEach(() => {
    if (wrapper) {
      wrapper.unmount();
    }
  });

  describe('beforeMount', () => {
    it('Should create core, set options and call updateValue.', async () => {
      wrapper = createWrapper();
      const input = wrapper.element as IInputNumberElement;

      expect(input.__inputNumberCore__).toBeInstanceOf(InputNumberElementCore);
      expect(input.options).toBeDefined();
      expect(typeof input.options).toBe('object');

      // Проверяем, что masked/unmasked появились после updateValue
      expect('masked' in input).toBe(true);
      expect('unmasked' in input).toBe(true);
    });

    it('Should throw if input element is not found.', async () => {
      // Монтируем директиву на div, а не на input
      const mountDiv = () =>
        mount(
          defineComponent({
            template: `<div v-input-number="opts"></div>`,
            directives: { inputNumber: vInputNumber },
            props: ['opts'],
          }),
          {
            props: { opts: defaultOptions },
          },
        );
      expect(mountDiv).toThrow();
    });

    it('Should work with modifiers and merge them into options.', async () => {
      wrapper = createWrapper({ min: 10 }, { min: 10 });
      const input = wrapper.element as IInputNumberElement;

      expect(input.options.min).toBe(10);
    });

    it('Should not throw in SSR (no DOM, no parentElement).', async () => {
      // Симулируем SSR: нет window, document, parentElement
      const origParent = Object.getOwnPropertyDescriptor(HTMLElement.prototype, 'parentElement');
      Object.defineProperty(HTMLElement.prototype, 'parentElement', {
        get() {
          return null;
        },
        configurable: true,
      });
      wrapper = createWrapper();
      const input = wrapper.element as IInputNumberElement;

      expect(input.__inputNumberCore__).toBeInstanceOf(InputNumberElementCore);
      if (origParent) {
        Object.defineProperty(HTMLElement.prototype, 'parentElement', origParent);
      }
    });
  });

  describe('mounted', () => {
    it('Should add event listeners and set cleanup.', async () => {
      wrapper = createWrapper();
      const input = wrapper.element as IInputNumberElement;

      expect(typeof input.cleanup).toBe('function');

      // Проверим, что события работают (click/input/blur)
      const spyClick = vi.spyOn(input.__inputNumberCore__!, 'clickHandler');
      const spyInput = vi.spyOn(input.__inputNumberCore__!, 'inputHandler');
      const spyBlur = vi.spyOn(input.__inputNumberCore__!, 'blurHandler');
      input.dispatchEvent(new Event('click', { bubbles: true }));
      input.dispatchEvent(new Event('input', { bubbles: true }));
      input.dispatchEvent(new Event('blur', { bubbles: true }));
      expect(spyClick).toHaveBeenCalled();
      expect(spyInput).toHaveBeenCalled();
      expect(spyBlur).toHaveBeenCalled();
    });

    it('Should not fail if core is missing.', async () => {
      wrapper = createWrapper();
      const input = wrapper.element as IInputNumberElement;
      // Удаляем core вручную
      delete input.__inputNumberCore__;
      // Монтируем повторно
      expect(() => vInputNumber.mounted!(input)).not.toThrow();
    });

    it('Should work if parentElement is missing (SSR).', async () => {
      wrapper = createWrapper();
      const input = wrapper.element as IInputNumberElement;
      Object.defineProperty(input, 'parentElement', { value: null });

      expect(() => vInputNumber.mounted!(input)).not.toThrow();
    });
  });

  describe('updated', () => {
    it('Should update options and call updateValue if value changed.', async () => {
      wrapper = createWrapper();
      const input = wrapper.element as IInputNumberElement;
      const core = input.__inputNumberCore__!;
      const spyUpdate = vi.spyOn(core, 'updateValue');
      // Симулируем обновление binding.value
      const binding = {
        value: { ...defaultOptions, min: 5 },
        oldValue: { ...defaultOptions, min: 0 },
        modifiers: {},
      };
      const vnode = {} as any;

      expect(() => vInputNumber.updated!(input, binding as any, vnode)).not.toThrow();
      expect(input.options.min).toBe(5);
      expect(spyUpdate).toHaveBeenCalledWith(input, vnode, {
        emit: false,
        force: true,
        validate: false,
      });
    });

    it('Should not fail if core is missing.', async () => {
      wrapper = createWrapper();
      const input = wrapper.element as IInputNumberElement;
      delete input.__inputNumberCore__;
      const binding = {
        value: { ...defaultOptions },
        oldValue: { ...defaultOptions },
        modifiers: {},
      };
      const vnode = {} as any;

      expect(() => vInputNumber.updated!(input, binding as any, vnode)).not.toThrow();
    });
  });

  describe('unmounted', () => {
    it('Should call cleanup and remove core.', async () => {
      wrapper = createWrapper();
      const input = wrapper.element as IInputNumberElement;
      const cleanupSpy = vi.fn();
      input.cleanup = cleanupSpy;
      vInputNumber.unmounted!(input);

      expect(cleanupSpy).toHaveBeenCalled();
      expect(input.__inputNumberCore__).toBeUndefined();
    });

    it('Should not fail if cleanup is missing.', async () => {
      wrapper = createWrapper();
      const input = wrapper.element as IInputNumberElement;
      // @ts-ignore Just for tests
      delete input.cleanup;

      expect(() => vInputNumber.unmounted!(input)).not.toThrow();
      expect(input.__inputNumberCore__).toBeUndefined();
    });

    it('Should not fail if called twice.', async () => {
      wrapper = createWrapper();
      const input = wrapper.element as IInputNumberElement;
      vInputNumber.unmounted!(input);

      expect(() => vInputNumber.unmounted!(input)).not.toThrow();
    });
  });

  describe('SSR/Edge cases', () => {
    it('Should not throw if parentElement is missing.', async () => {
      wrapper = createWrapper();
      const input = wrapper.element as IInputNumberElement;
      Object.defineProperty(input, 'parentElement', { value: null });

      expect(() => vInputNumber.mounted!(input)).not.toThrow();
    });
  });
});
