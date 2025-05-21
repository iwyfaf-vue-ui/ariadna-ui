import { describe, it, beforeEach, afterEach, vi, expect } from 'vitest';
import handleEventListeners from '../../core/event-listeners-handler/event-listeners-handler.core';

describe('event-listeners-handler.core', () => {
  let textarea: HTMLTextAreaElement;
  let handler: ReturnType<typeof vi.fn>;

  const EVENTS: Array<keyof HTMLElementEventMap> = [
    'click',
    'input',
    'change',
    'cut',
    'paste',
    'drop',
  ];

  beforeEach(() => {
    textarea = document.createElement('textarea');
    document.body.appendChild(textarea);
    handler = vi.fn();
  });

  afterEach(() => {
    // Очищаем DOM после каждого теста
    textarea.remove();
    vi.clearAllMocks();
  });

  describe('handleEventListeners', () => {
    it('Should add all event listeners to textarea.', () => {
      handleEventListeners(textarea, handler, 'add');

      EVENTS.forEach((event) => {
        // Генерируем событие
        const evt = new Event(event, { bubbles: true, cancelable: true });
        textarea.dispatchEvent(evt);
      });

      // Обработчик должен быть вызван столько раз, сколько событий
      expect(handler).toHaveBeenCalledTimes(EVENTS.length);
      // Проверяем, что обработчик был вызван с объектом события
      EVENTS.forEach((event, idx) => {
        expect(handler.mock.calls[idx][0].type).toEqual(event);
      });
    });

    it('Should remove all event listeners from textarea.', () => {
      // Сначала добавляем, затем удаляем обработчики
      handleEventListeners(textarea, handler, 'add');
      handleEventListeners(textarea, handler, 'remove');

      EVENTS.forEach((event) => {
        const evt = new Event(event, { bubbles: true, cancelable: true });
        textarea.dispatchEvent(evt);
      });

      // Обработчик не должен быть вызван ни разу
      expect(handler).not.toHaveBeenCalled();
    });

    it('Should not call handler for events not in EVENTS.', () => {
      handleEventListeners(textarea, handler, 'add');

      // Генерируем событие, которого нет в EVENTS
      const evt = new Event('keydown', { bubbles: true, cancelable: true });
      textarea.dispatchEvent(evt);

      // Обработчик не должен быть вызван
      expect(handler).not.toHaveBeenCalled();
    });

    it('Should work correctly if called multiple times with add/remove.', () => {
      handleEventListeners(textarea, handler, 'add');
      handleEventListeners(textarea, handler, 'remove');
      handleEventListeners(textarea, handler, 'add');

      EVENTS.forEach((event) => {
        const evt = new Event(event, { bubbles: true, cancelable: true });
        textarea.dispatchEvent(evt);
      });

      // Обработчик должен быть вызван EVENTS.length раз
      expect(handler).toHaveBeenCalledTimes(EVENTS.length);
    });

    it('Should not throw if called with empty textarea.', () => {
      expect(() => handleEventListeners(textarea, handler, 'add')).not.toThrow();
      expect(() => handleEventListeners(textarea, handler, 'remove')).not.toThrow();
    });
  });
});
