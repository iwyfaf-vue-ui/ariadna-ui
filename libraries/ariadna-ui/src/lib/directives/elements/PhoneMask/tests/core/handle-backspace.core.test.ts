import { describe, it, expect, beforeEach, vi } from 'vitest';
import backspaceHandler from '../../core/backspace-handler/backspace-handler.core';

describe('stopBackspace', () => {
  let element: HTMLInputElement;
  let mockEvent: KeyboardEvent;

  beforeEach(() => {
    const window = new Window();
    const document = window.document;

    element = document.createElement('input') as HTMLInputElement;

    mockEvent = {
      key: 'Backspace',
      preventDefault: vi.fn(),
    } as unknown as KeyboardEvent;
  });

  describe('Non-Backspace key', () => {
    it('Should do nothing when key is not Backspace.', () => {
      element.value = '+7 (123) 456-78-90';
      const initialValue = element.value;

      backspaceHandler(element, mockEvent);

      expect(element.value).toBe(initialValue);
    });
  });

  describe('Initial state handling', () => {
    it('Should clear value when value is "+7 (".', () => {
      element.value = '+7 (';

      backspaceHandler(element, mockEvent);

      expect(element.value).toBe('');
    });

    it('Should clear value when value is "+7".', () => {
      element.value = '+7';

      backspaceHandler(element, mockEvent);

      expect(element.value).toBe('');
    });
  });

  describe('Specific length handling', () => {
    it('Should remove character at index 7 when length is 9.', () => {
      element.value = '+7 (123) '; // length 9
      const expected = '+7 (123';

      backspaceHandler(element, mockEvent);

      expect(element.value).toBe(expected);
    });

    it('Should remove character at index 11 when length is 13.', () => {
      element.value = '+7 (123) 456-'; // length 13
      const expected = '+7 (123) 45-';

      backspaceHandler(element, mockEvent);

      expect(element.value).toBe(expected);
    });

    it('Should remove character at index 14 when length is 16.', () => {
      element.value = '+7 (123) 456-78-'; // length 16
      const expected = '+7 (123) 456-7-';

      backspaceHandler(element, mockEvent);

      expect(element.value).toBe(expected);
    });
  });

  describe('Other cases', () => {
    it('Should not modify value when length is not 9, 13 or 16 and not initial state.', () => {
      element.value = '+7 (123)'; // length 8
      const initialValue = element.value;

      backspaceHandler(element, mockEvent);

      expect(element.value).toBe(initialValue);
    });

    it('Should handle empty string.', () => {
      element.value = '';

      backspaceHandler(element, mockEvent);

      expect(element.value).toBe('');
    });
  });
});
