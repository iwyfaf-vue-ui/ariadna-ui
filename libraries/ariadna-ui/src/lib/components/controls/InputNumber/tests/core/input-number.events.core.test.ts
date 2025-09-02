import { describe, it, expect } from 'vitest';
import InputNumberEventsCore from '../../core/events/input-number.events.core';

describe('InputNumberEventsCore', () => {
  describe('createBase', () => {
    it('Should return a CustomEvent instance.', () => {
      const event = InputNumberEventsCore.createBase('input-number-focus');

      expect(event).toBeInstanceOf(CustomEvent);
    });

    it('Should set the event type as provided.', () => {
      const eventName = 'input-number-blur';
      const event = InputNumberEventsCore.createBase(eventName);

      expect(event.type).toBe(eventName);
    });

    it('Should set detail to { facade: true }.', () => {
      const event = InputNumberEventsCore.createBase('input-number-input');

      expect(event.detail).toStrictEqual({ facade: true });
    });

    it('Should set bubbles and cancelable to true.', () => {
      const event = InputNumberEventsCore.createBase('input-number-change');

      expect(event.bubbles).toBe(true);
      expect(event.cancelable).toBe(true);
    });
  });

  describe('createBase', () => {
    it('Should return a CustomEvent instance.', () => {
      const event = InputNumberEventsCore.createBase('input-number-focus');

      expect(event).toBeInstanceOf(CustomEvent);
    });

    it('Should set the event type as provided.', () => {
      const eventName = 'input-number-blur';
      const event = InputNumberEventsCore.createBase(eventName);

      expect(event.type).toBe(eventName);
    });

    it('Should set detail to { facade: true }.', () => {
      const event = InputNumberEventsCore.createBase('input-number-input');

      expect(event.detail).toStrictEqual({ facade: true });
    });

    it('Should set bubbles and cancelable to true.', () => {
      const event = InputNumberEventsCore.createBase('input-number-change');

      expect(event.bubbles).toBe(true);
      expect(event.cancelable).toBe(true);
    });
  });

  describe('createCustom', () => {
    it('Should return a CustomEvent instance.', () => {
      const event = InputNumberEventsCore.createCustom('input-number-update', { value: 42 });

      expect(event).toBeInstanceOf(CustomEvent);
    });

    it('Should set the event type as provided.', () => {
      const eventName = 'input-number-step';
      const event = InputNumberEventsCore.createCustom(eventName, { step: 1 });

      expect(event.type).toBe(eventName);
    });

    it('Should set detail to the provided object.', () => {
      const detail = { foo: 'bar', num: 123 };
      const event = InputNumberEventsCore.createCustom('input-number-custom', detail);

      expect(event.detail).toStrictEqual(detail);
    });

    it('Should set bubbles and cancelable to true by default.', () => {
      const event = InputNumberEventsCore.createCustom('input-number-default', { test: true });

      expect(event.bubbles).toBe(true);
      expect(event.cancelable).toBe(true);
    });

    it('Should allow overriding bubbles and cancelable via options.', () => {
      const event = InputNumberEventsCore.createCustom(
        'input-number-override',
        { test: 1 },
        { bubbles: false, cancelable: false },
      );

      expect(event.bubbles).toBe(false);
      expect(event.cancelable).toBe(false);
    });

    it('Should work with empty detail.', () => {
      const event = InputNumberEventsCore.createCustom('input-number-empty', undefined);

      expect(event.detail).toBeNull();
    });

    it('Should work with detail as a string.', () => {
      const event = InputNumberEventsCore.createCustom('input-number-string', 'test-string');

      expect(event.detail).toBe('test-string');
    });

    it('Should work with detail as a number.', () => {
      const event = InputNumberEventsCore.createCustom('input-number-number', 12345);

      expect(event.detail).toBe(12345);
    });

    it('Should work with detail as null.', () => {
      const event = InputNumberEventsCore.createCustom('input-number-null', null);
      expect(event.detail).toBeNull();
    });
  });
});
