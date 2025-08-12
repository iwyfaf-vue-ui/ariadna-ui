import { describe, it, expect, vi, beforeEach } from 'vitest';
import EventBus from '../event-bus';
import type { EventHandler } from '../types/event-bus.types';

describe('EventBus', () => {
  let bus: EventBus;

  beforeEach(() => {
    bus = new EventBus();
  });

  describe('on', () => {
    it('Should register a handler and call it on emit.', () => {
      const handler = vi.fn();
      bus.on('test', handler);
      bus.emit('test', 123);

      expect(handler).toHaveBeenCalledWith(123);
    });

    it('Should allow multiple handlers for the same event.', () => {
      const handler1 = vi.fn();
      const handler2 = vi.fn();
      bus.on('multi', handler1);
      bus.on('multi', handler2);
      bus.emit('multi', 'payload');

      expect(handler1).toHaveBeenCalledWith('payload');
      expect(handler2).toHaveBeenCalledWith('payload');
    });

    it('Should allow the same handler to be registered multiple times.', () => {
      const handler = vi.fn();
      bus.on('repeat', handler);
      bus.on('repeat', handler);
      bus.emit('repeat', 1);

      expect(handler).toHaveBeenCalledTimes(2);
    });
  });

  describe('off', () => {
    it('Should unregister a handler and not call it after off.', () => {
      const handler = vi.fn();
      bus.on('off', handler);
      bus.off('off', handler);
      bus.emit('off', 42);

      expect(handler).not.toHaveBeenCalled();
    });

    it('Should only remove one instance if handler was registered multiple times.', () => {
      const handler = vi.fn();
      bus.on('dup', handler);
      bus.on('dup', handler);
      bus.off('dup', handler);
      bus.emit('dup', 'x');

      expect(handler).toHaveBeenCalledTimes(1);
    });

    it('Should not throw if trying to remove a handler that was not registered.', () => {
      const handler = vi.fn();

      expect(() => bus.off('none', handler)).not.toThrow();
    });

    it('Should allow a handler to remove itself during emit.', () => {
      const handler = vi.fn(() => {
        bus.off('self', handler);
      });
      bus.on('self', handler);
      bus.emit('self', 'payload');
      bus.emit('self', 'payload2');

      expect(handler).toHaveBeenCalledTimes(1);
    });
  });

  describe('emit', () => {
    it('Should not throw if emitting an event with no handlers.', () => {
      expect(() => bus.emit('empty', 0)).not.toThrow();
    });

    it('Should not call handlers of other events.', () => {
      const handler = vi.fn();
      bus.on('event1', handler);
      bus.emit('event2', 1);

      expect(handler).not.toHaveBeenCalled();
    });

    it('Should pass the correct payload to the handler.', () => {
      const handler = vi.fn();
      bus.on('payload', handler);
      bus.emit('payload', { foo: 'bar' });

      expect(handler).toHaveBeenCalledWith({ foo: 'bar' });
    });
  });

  describe('types', () => {
    it('Should support different payload types for different events.', () => {
      type EventA = { a: number };
      type EventB = string;
      const handlerA: EventHandler<EventA> = vi.fn();
      const handlerB: EventHandler<EventB> = vi.fn();

      bus.on<EventA>('A', handlerA);
      bus.on<EventB>('B', handlerB);

      const payloadA = { a: 123 };
      const payloadB = 'hello';

      bus.emit('A', payloadA);
      bus.emit('B', payloadB);

      expect(handlerA).toHaveBeenCalledWith(payloadA);
      expect(handlerB).toHaveBeenCalledWith(payloadB);
    });
  });

  describe('async', () => {
    it('Should support async handlers (returning Promise).', async () => {
      const handler = vi.fn(async (payload: number) => {
        await new Promise((resolve) => setTimeout(resolve, 10));
        return payload * 2;
      });
      bus.on('async', handler);
      bus.emit('async', 21);
      // Wait for async handler to resolve
      await new Promise((resolve) => setTimeout(resolve, 20));

      expect(handler).toHaveBeenCalledWith(21);
    });
  });

  describe('performance', () => {
    it('Should call 10,000 handlers in less than 1 second.', async () => {
      const COUNT = 10_000;
      let called = 0;
      const handler = () => {
        called++;
      };
      for (let i = 0; i < COUNT; i++) {
        bus.on('perf', handler);
      }
      const start = Date.now();
      bus.emit('perf', null);
      const duration = Date.now() - start;

      expect(called).toEqual(COUNT);
      expect(duration).toBeLessThan(1000);
    });
  });
});
