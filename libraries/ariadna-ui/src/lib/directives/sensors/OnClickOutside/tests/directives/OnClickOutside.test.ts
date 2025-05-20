import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { ELibraryConfig } from '@/types/internal';
import vOnClickOutside from '../../OnClickOutside';
import { EOnClickOutsideConfig, EOnClickOutsideErrors } from '../../types/OnClickOutside.enum';

describe('OnClickOutside', () => {
  let container: HTMLElement;

  beforeEach(() => {
    container = document.createElement('div');
    document.body.appendChild(container);
  });

  afterEach(() => {
    document.body.innerHTML = '';
    vi.restoreAllMocks();
  });

  describe('Event type detection', () => {
    it('Should use "touchstart" event if "ontouchstart" in document.', () => {
      document.ontouchstart = () => {};
      const el = document.createElement('div');
      const callback = vi.fn();
      const binding = {
        instance: {},
        value: callback,
      };

      vOnClickOutside.mounted(el, binding as any);

      const event = new Event('touchstart', { bubbles: true });
      document.dispatchEvent(event);

      expect(callback).toHaveBeenCalled();

      vOnClickOutside.unmounted(el, binding as any);

      // Удаляем свойство ontouchstart
      delete document.ontouchstart;
    });

    it('Should use "click" event if "ontouchstart" not in document.', () => {
      const el = document.createElement('div');
      const callback = vi.fn();
      const binding = {
        instance: {},
        value: callback,
      };

      vOnClickOutside.mounted(el, binding as any);

      const event = new Event('click', { bubbles: true });
      document.dispatchEvent(event);

      expect(callback).toHaveBeenCalled();

      vOnClickOutside.unmounted(el, binding as any);
    });
  });

  describe('Callback invocation', () => {
    it('Should call callback when clicking outside the element.', () => {
      const el = document.createElement('div');
      container.appendChild(el);

      const callback = vi.fn();
      const binding = {
        instance: {},
        value: callback,
      };

      vOnClickOutside.mounted(el, binding as any);

      const event = new Event('click', { bubbles: true });
      document.dispatchEvent(event);

      expect(callback).toHaveBeenCalled();

      vOnClickOutside.unmounted(el, binding as any);
    });

    it('Should NOT call callback when clicking inside the element.', () => {
      const el = document.createElement('div');
      container.appendChild(el);

      const callback = vi.fn();
      const binding = {
        instance: {},
        value: callback,
      };

      vOnClickOutside.mounted(el, binding as any);

      const event = new Event('click', { bubbles: true });
      el.dispatchEvent(event);

      expect(callback).not.toHaveBeenCalled();

      vOnClickOutside.unmounted(el, binding as any);
    });

    it('Should throw if value is not a function.', () => {
      const el = document.createElement('div');
      const binding = {
        instance: {},
        value: 123,
      };

      expect(() => vOnClickOutside.mounted(el, binding as any)).toThrowError(
        `${ELibraryConfig.NAME}(${EOnClickOutsideConfig.NAME}): ${EOnClickOutsideErrors.EXPECTED_FUNCTION}`,
      );
    });

    it('Should call callback with correct "this" context.', () => {
      const el = document.createElement('div');
      const ctx = { foo: 42 };
      let receivedThis: any = null;
      const callback = function (this: any) {
        receivedThis = this;
      };
      const binding = {
        instance: ctx,
        value: callback,
      };

      vOnClickOutside.mounted(el, binding as any);

      const event = new Event('click', { bubbles: true });
      document.dispatchEvent(event);

      expect(receivedThis).toBe(ctx);

      vOnClickOutside.unmounted(el, binding as any);
    });
  });

  describe('Handler removal', () => {
    it('Should remove event handler on unmounted.', () => {
      const el = document.createElement('div');
      const callback = vi.fn();
      const binding = {
        instance: {},
        value: callback,
      };

      vOnClickOutside.mounted(el, binding as any);
      vOnClickOutside.unmounted(el, binding as any);

      // После удаления обработчика callback не должен вызываться
      const event = new Event('click', { bubbles: true });
      document.dispatchEvent(event);

      expect(callback).not.toHaveBeenCalled();
    });

    it('Should remove and re-add handler on updated with new callback.', () => {
      const el = document.createElement('div');
      const callback1 = vi.fn();
      const callback2 = vi.fn();
      const binding1 = {
        instance: {},
        value: callback1,
        oldValue: undefined,
      };
      const binding2 = {
        instance: {},
        value: callback2,
        oldValue: callback1,
      };

      vOnClickOutside.mounted(el, binding1 as any);

      // Обновляем директиву с новым callback
      vOnClickOutside.updated(el, binding2 as any);

      const event = new Event('click', { bubbles: true });
      document.dispatchEvent(event);

      expect(callback1).not.toHaveBeenCalled();
      expect(callback2).toHaveBeenCalled();

      vOnClickOutside.unmounted(el, binding2 as any);
    });

    it('Should not re-add handler if value did not change on updated.', () => {
      const el = document.createElement('div');
      const callback = vi.fn();
      const binding = {
        instance: {},
        value: callback,
        oldValue: callback,
      };

      vOnClickOutside.mounted(el, binding as any);

      // updated с тем же значением не должен пересоздавать обработчик
      vOnClickOutside.updated(el, binding as any);

      const event = new Event('click', { bubbles: true });
      document.dispatchEvent(event);

      expect(callback).toHaveBeenCalled();

      vOnClickOutside.unmounted(el, binding as any);
    });
  });

  describe('Multiple elements', () => {
    it('Should handle multiple elements independently.', () => {
      const el1 = document.createElement('div');
      const el2 = document.createElement('div');
      container.appendChild(el1);
      container.appendChild(el2);

      const cb1 = vi.fn();
      const cb2 = vi.fn();

      const binding1 = { instance: {}, value: cb1 };
      const binding2 = { instance: {}, value: cb2 };

      vOnClickOutside.mounted(el1, binding1 as any);
      vOnClickOutside.mounted(el2, binding2 as any);

      // Клик вне обоих элементов
      const event = new Event('click', { bubbles: true });
      document.dispatchEvent(event);

      expect(cb1).toHaveBeenCalled();
      expect(cb2).toHaveBeenCalled();

      // Клик по первому элементу
      cb1.mockClear();
      cb2.mockClear();
      el1.dispatchEvent(new Event('click', { bubbles: true }));

      expect(cb1).not.toHaveBeenCalled();
      expect(cb2).toHaveBeenCalled();

      // Клик по второму элементу
      cb1.mockClear();
      cb2.mockClear();
      el2.dispatchEvent(new Event('click', { bubbles: true }));

      expect(cb1).toHaveBeenCalled();
      expect(cb2).not.toHaveBeenCalled();

      vOnClickOutside.unmounted(el1, binding1 as any);
      vOnClickOutside.unmounted(el2, binding2 as any);
    });
  });
});
