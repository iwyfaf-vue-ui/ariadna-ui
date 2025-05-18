import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import inputCloneCore from '../../core/input-clone/input-clone.core';

describe('inputCloneCore', () => {
  let window: Window;
  let document: Document;
  let originalInput: HTMLInputElement;

  beforeEach(() => {
    // Создаем новое окно и документ для каждого теста
    window = new Window();
    document = window.document;

    // Создаем тестовый input
    originalInput = document.createElement('input');
    originalInput.id = 'test-input';
    originalInput.className = 'test-class';
    originalInput.placeholder = 'Enter phone';
    document.body.appendChild(originalInput);
  });

  afterEach(() => {
    document.body.innerHTML = '';
  });

  describe('Cloning behavior', () => {
    it('Should return a cloned input element.', () => {
      const clonedInput = inputCloneCore(originalInput);

      expect(clonedInput).toBeInstanceOf(HTMLInputElement);
      expect(clonedInput).not.toBe(originalInput);
    });

    it('Should insert cloned input before the original element.', () => {
      const clonedInput = inputCloneCore(originalInput);

      expect(clonedInput.nextSibling).toBe(originalInput);
    });
  });

  describe('Attributes handling', () => {
    it('Should set id attribute with "-cloned" suffix when original has id.', () => {
      const clonedInput = inputCloneCore(originalInput);
      expect(clonedInput.id).toBe('test-input-cloned');
    });

    it('Should set id attribute to "-cloned" when original has no id.', () => {
      originalInput.removeAttribute('id');
      const clonedInput = inputCloneCore(originalInput);

      expect(clonedInput.id).toBe('-cloned');
    });

    it('Should set class attribute with "-cloned" suffix when original has classes.', () => {
      const clonedInput = inputCloneCore(originalInput);

      expect(clonedInput.className).toBe('test-class-cloned');
    });

    it('Should set class attribute to "-cloned" when original has no classes.', () => {
      originalInput.className = '';
      const clonedInput = inputCloneCore(originalInput);

      expect(clonedInput.className).toBe('-cloned');
    });

    it('Should copy placeholder attribute from original.', () => {
      const clonedInput = inputCloneCore(originalInput);

      expect(clonedInput.placeholder).toBe('Enter phone');
    });

    it('Should set aria-hidden attribute to "true".', () => {
      const clonedInput = inputCloneCore(originalInput);

      expect(clonedInput.getAttribute('aria-hidden')).toBe('true');
    });

    it('Should set disabled attribute to "true".', () => {
      const clonedInput = inputCloneCore(originalInput);

      expect(clonedInput.disabled).toBe(true);
    });

    it('Should set readonly attribute to "true".', () => {
      const clonedInput = inputCloneCore(originalInput);

      expect(clonedInput.readOnly).toBe(true);
    });
  });

  describe('DOM positioning', () => {
    it('Should insert cloned element before original.', () => {
      const container = document.createElement('div');
      container.appendChild(originalInput);
      document.body.appendChild(container);

      const clonedInput = inputCloneCore(originalInput);

      expect(container.firstChild).toBe(clonedInput);
      expect(container.childNodes[1]).toBe(originalInput);
    });

    it('Should work when original element has no parent.', () => {
      document.body.removeChild(originalInput);
      const clonedInput = inputCloneCore(originalInput);

      // Проверяем что функция не упала, но элемент не добавлен в DOM
      expect(clonedInput).toBeDefined();
      expect(document.body.contains(clonedInput)).toBe(false);
    });
  });

  describe('Edge cases', () => {
    it('Should handle input with no attributes except type="text".', () => {
      const emptyInput = document.createElement('input');
      document.body.appendChild(emptyInput);

      const clonedInput = inputCloneCore(emptyInput);

      expect(clonedInput.id).toBe('-cloned');
      expect(clonedInput.className).toBe('-cloned');
      expect(clonedInput.placeholder).toBe('');
      expect(clonedInput.getAttribute('aria-hidden')).toBe('true');
      expect(clonedInput.disabled).toBe(true);
      expect(clonedInput.readOnly).toBe(true);
    });

    it('Should preserve other non-standard attributes from original.', () => {
      originalInput.setAttribute('data-custom', 'value');
      const clonedInput = inputCloneCore(originalInput);

      expect(clonedInput.getAttribute('data-custom')).toBe('value');
    });
  });
});
