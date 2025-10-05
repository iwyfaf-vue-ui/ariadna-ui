import { describe, it, expect, beforeEach, vi } from 'vitest';
import InputNumberElementCore from '../../core/element/input-number.element.core';
import { EInputNumberConfig, EInputNumberErrors } from '../../types/InputNumber.enums';
import type { IInputNumberElement } from '../../types/InputNumber.types';
import { ELibraryConfig } from '@/types/internal';

function createInputNumberElement(options = {}) {
  const input = document.createElement('input');
  input.type = 'text';

  // Расширяем input до IInputNumberElement
  (input as IInputNumberElement).options = {
    prefix: undefined,
    suffix: undefined,
    locale: undefined,
    min: undefined,
    max: undefined,
    step: 1,
    empty: null,
    ...options,
  };
  (input as IInputNumberElement).masked = '';
  (input as IInputNumberElement).unmasked = '';
  (input as IInputNumberElement).cleanup = () => {};
  return input as IInputNumberElement;
}

describe('InputNumberElementCore', () => {
  let core: InputNumberElementCore;

  beforeEach(() => {
    core = new InputNumberElementCore();
  });

  describe('restoreCaretPosition', () => {
    let input: HTMLInputElement & { options: any };

    beforeEach(() => {
      input = createInputNumberElement({
        prefix: '$',
        suffix: '₽',
      });
      input.setSelectionRange = vi.fn();
    });

    it('Should restore caret to position with same number of digits left.', () => {
      const prevValue = '$1234₽';
      const nextValue = '$12,345₽';
      const prevPos = 3; // after '$1'
      (core as any).restoreCaretPosition(input, prevValue, nextValue, prevPos);
      // 1 digit left of caret in prevValue, so caret should be after first digit in nextValue
      expect(input.setSelectionRange).toHaveBeenCalledWith(3, 3);
    });

    it('Should move caret to before suffix if not enough digits in nextValue.', () => {
      const prevValue = '$1234₽';
      const nextValue = '$12₽';
      const prevPos = 5; // after '$123'
      (core as any).restoreCaretPosition(input, prevValue, nextValue, prevPos);
      // 3 digits left of caret in prevValue, but only 2 in nextValue, so caret before suffix
      expect(input.setSelectionRange).toHaveBeenCalledWith(
        nextValue.length - 1,
        nextValue.length - 1,
      );
    });

    it('Should handle empty prefix and suffix.', () => {
      input.options.prefix = '';
      input.options.suffix = '';
      const prevValue = '1234';
      const nextValue = '12,345';
      const prevPos = 2;
      (core as any).restoreCaretPosition(input, prevValue, nextValue, prevPos);

      expect(input.setSelectionRange).toHaveBeenCalled();
    });

    it('Should handle caret at end of main value.', () => {
      const prevValue = '$1234₽';
      const nextValue = '$12,345₽';
      const prevPos = prevValue.length - 1; // before suffix
      (core as any).restoreCaretPosition(input, prevValue, nextValue, prevPos);

      expect(input.setSelectionRange).toHaveBeenCalled();
    });
  });

  describe('getInputElement', () => {
    it('Should return the input element if passed directly.', () => {
      const input = createInputNumberElement();

      expect(core.getInputElement(input)).toBe(input);
    });

    it('Should return the input element if passed a container.', () => {
      const container = document.createElement('div');
      const input = createInputNumberElement();
      container.appendChild(input);

      expect(core.getInputElement(container)).toBe(input);
    });

    it('Should throw error if input element not found.', () => {
      const container = document.createElement('div');
      expect(() => core.getInputElement(container)).toThrow(
        `${ELibraryConfig.NAME}(${EInputNumberConfig.NAME}): ${EInputNumberErrors.V_INPUT_NUMBER_DIRECTIVE_REQUIRES_INPUT_ELEMENT}`,
      );
    });
  });

  describe('updateInputElementCaret', () => {
    it('Should set the caret position on the input.', () => {
      const input = createInputNumberElement();
      input.setSelectionRange = vi.fn();
      core.updateInputElementCaret(input, 3);

      expect(input.setSelectionRange).toHaveBeenCalledWith(3, 3);
    });

    it('Should call setSelectionRange twice (android fix).', async () => {
      vi.useFakeTimers();
      const input = createInputNumberElement();
      input.setSelectionRange = vi.fn();
      core.updateInputElementCaret(input, 2);

      expect(input.setSelectionRange).toHaveBeenCalledTimes(1);

      vi.runAllTimers();

      expect(input.setSelectionRange).toHaveBeenCalledTimes(2);

      vi.useRealTimers();
    });
  });

  describe('updateValue', () => {
    it('Should format and update masked/unmasked values.', () => {
      const input = createInputNumberElement();
      input.value = '1234';
      core.updateValue(input, null, { emit: false, force: true, validate: false });

      expect(typeof input.masked === 'string' || typeof input.masked === 'number').toBeTruthy();
      expect(typeof input.unmasked === 'string' || typeof input.unmasked === 'number').toBeTruthy();
    });

    it('Should limit value to max if validate is true.', () => {
      const input = createInputNumberElement({ max: 10 });
      input.value = '15';
      core.updateValue(input, null, { emit: false, force: true, validate: true });

      expect(Number(input.unmasked)).toBeLessThanOrEqual(10);
    });

    it('Should limit value to min if validate is true.', () => {
      const input = createInputNumberElement({ min: 5 });
      input.value = '2';
      core.updateValue(input, null, { emit: false, force: true, validate: true });

      expect(Number(input.unmasked)).toBeGreaterThanOrEqual(5);
    });

    it('Should update input.value if masked differs.', () => {
      const input = createInputNumberElement();
      input.value = '1234';
      core.updateValue(input, null, { emit: false, force: true, validate: false });

      // masked должен быть равен input.value после форматирования
      expect(input.value).toBe(input.masked);
    });

    it('Should dispatch input event if emit is true.', () => {
      const input = createInputNumberElement();
      input.value = '1234';
      let dispatched = false;
      input.dispatchEvent = () => {
        dispatched = true;
        return true;
      };
      core.updateValue(input, null, { emit: true, force: true, validate: false });

      expect(dispatched).toBe(true);
    });

    it('Should not dispatch input event if emit is false.', () => {
      const input = createInputNumberElement();
      input.value = '1234';
      let dispatched = false;
      input.dispatchEvent = () => {
        dispatched = true;
        return true;
      };
      core.updateValue(input, null, { emit: false, force: true, validate: false });

      expect(dispatched).toBe(false);
    });

    it('Should use vNode.props.value if provided.', () => {
      const input = createInputNumberElement();
      input.value = 'should-be-overwritten';
      const vNode = { props: { value: '5678' } };
      core.updateValue(input, vNode as any, { emit: false, force: true, validate: false });

      expect(input.masked).toContain('5678');
    });
  });

  describe('clickHandler', () => {
    it('Should update caret and value if no selection.', () => {
      vi.useFakeTimers();

      const input = createInputNumberElement();
      input.value = '1234';
      input.selectionStart = 2;
      input.selectionEnd = 2;
      input.setSelectionRange = vi.fn();
      input.dispatchEvent = vi.fn();
      core.clickHandler({ target: input } as any);

      expect(input.setSelectionRange).not.toHaveBeenCalled();

      vi.runAllTimers();

      expect(input.setSelectionRange).toHaveBeenCalled();

      vi.useRealTimers();
    });

    it('Should not update caret if there is a selection.', () => {
      const input = createInputNumberElement();
      input.value = '1234';
      input.selectionStart = 1;
      input.selectionEnd = 3;
      input.setSelectionRange = vi.fn();
      input.dispatchEvent = vi.fn();
      core.clickHandler({ target: input } as any);

      expect(input.setSelectionRange).not.toHaveBeenCalled();
    });
  });

  describe('inputHandler', () => {
    it('Should do nothing if detail.facade is true.', () => {
      const input = createInputNumberElement();
      input.value = '1234';
      input.selectionStart = 2;
      input.selectionEnd = 2;
      input.setSelectionRange = vi.fn();
      input.dispatchEvent = vi.fn();
      const event = { target: input, detail: { facade: true }, stopPropagation: vi.fn() };
      core.inputHandler(event as any);

      expect(event.stopPropagation).not.toHaveBeenCalled();
    });

    it('Should stop propagation and update value/caret.', () => {
      vi.useFakeTimers();

      const input = createInputNumberElement();
      input.value = '1234';
      input.selectionStart = 2;
      input.selectionEnd = 2;
      input.setSelectionRange = vi.fn();
      let dispatched = false;
      input.dispatchEvent = () => {
        dispatched = true;
        return true;
      };
      const event = { target: input, detail: {}, stopPropagation: vi.fn() };
      core.inputHandler(event as any);

      expect(event.stopPropagation).toHaveBeenCalled();

      vi.runAllTimers();

      expect(dispatched).toBe(true);

      expect(input.setSelectionRange).toHaveBeenCalled();

      vi.useRealTimers();
    });

    it('Should not update if selectionStart/End is null.', () => {
      const input = createInputNumberElement();
      input.value = '1234';
      input.selectionStart = null;
      input.selectionEnd = null;
      input.setSelectionRange = vi.fn();
      input.dispatchEvent = vi.fn();
      const event = { target: input, detail: {}, stopPropagation: vi.fn() };
      core.inputHandler(event as any);

      expect(input.setSelectionRange).not.toHaveBeenCalled();
    });
  });

  describe('blurHandler', () => {
    it('Should update value with no emit, force, validate true.', () => {
      const input = createInputNumberElement();
      input.value = '1234';
      let dispatched = false;
      input.dispatchEvent = () => {
        dispatched = true;
        return true;
      };
      core.blurHandler({ target: input } as any);

      expect(dispatched).toBe(false);
    });
  });
});
