import { describe, it, expect, vi, beforeEach } from 'vitest';
import Observable from '../observable.utils';

describe('Observable', () => {
  let observable: Observable<any>;

  beforeEach(() => {
    observable = new Observable<any>();
  });

  describe('observe', () => {
    it('Should add a single observer.', () => {
      const callback = vi.fn();
      observable.observe(callback);
      observable.notify(1);

      expect(callback).toHaveBeenCalledWith(1);
    });

    it('Should not add the same observer twice.', () => {
      const callback = vi.fn();
      observable.observe(callback);
      observable.observe(callback);
      observable.notify(2);

      expect(callback).toHaveBeenCalledTimes(1);
    });

    it('Should add multiple different observers.', () => {
      const callback1 = vi.fn();
      const callback2 = vi.fn();
      observable.observe(callback1);
      observable.observe(callback2);
      observable.notify('test');

      expect(callback1).toHaveBeenCalledWith('test');
      expect(callback2).toHaveBeenCalledWith('test');
    });
  });

  describe('unobserve', () => {
    it('Should remove an existing observer.', () => {
      const callback = vi.fn();
      observable.observe(callback);
      observable.unobserve(callback);
      observable.notify(3);

      expect(callback).not.toHaveBeenCalled();
    });

    it('Should not throw when removing a non-existent observer.', () => {
      const callback = vi.fn();

      expect(() => observable.unobserve(callback)).not.toThrow();
    });

    it('Should not call observer after it was removed.', () => {
      const callback = vi.fn();
      observable.observe(callback);
      observable.unobserve(callback);
      observable.notify('removed');

      expect(callback).not.toHaveBeenCalled();
    });
  });

  describe('notify', () => {
    it('Should notify a single observer with correct data.', () => {
      const callback = vi.fn();
      observable.observe(callback);
      observable.notify(42);

      expect(callback).toHaveBeenCalledWith(42);
    });

    it('Should notify all observers.', () => {
      const callback1 = vi.fn();
      const callback2 = vi.fn();
      observable.observe(callback1);
      observable.observe(callback2);
      observable.notify('all');

      expect(callback1).toHaveBeenCalledWith('all');
      expect(callback2).toHaveBeenCalledWith('all');
    });

    it('Should not throw if there are no observers.', () => {
      expect(() => observable.notify('no observers')).not.toThrow();
    });

    it('Should notify observers with different data types.', () => {
      const callback = vi.fn();
      observable.observe(callback);
      observable.notify(123);
      observable.notify('string');
      observable.notify({ a: 1 });

      expect(callback).toHaveBeenCalledWith(123);
      expect(callback).toHaveBeenCalledWith('string');
      expect(callback).toHaveBeenCalledWith({ a: 1 });
    });

    it('Should not notify removed observers.', () => {
      const callback = vi.fn();
      observable.observe(callback);
      observable.unobserve(callback);
      observable.notify('should not be called');

      expect(callback).not.toHaveBeenCalled();
    });

    it('Should notify all observers when there are many.', () => {
      const count = 1000;
      const callbacks = Array.from({ length: count }, () => vi.fn());
      callbacks.forEach((cb) => observable.observe(cb));
      observable.notify('bulk');

      callbacks.forEach((cb) => {
        expect(cb).toHaveBeenCalledWith('bulk');
      });
    });

    it('Should notify observers with complex nested objects.', () => {
      const callback = vi.fn();
      const complexObject = { a: { b: { c: [1, 2, 3], d: { e: 'test' } } } };
      observable.observe(callback);
      observable.notify(complexObject);

      expect(callback).toHaveBeenCalledWith(complexObject);
    });

    it('Should preserve "this" context when using bound method as observer.', () => {
      class TestClass {
        public value: number = 0;
        public setValue(data: number) {
          this.value = data;
        }
      }

      const instance = new TestClass();
      observable.observe(instance.setValue.bind(instance));
      observable.notify(99);

      expect(instance.value).toEqual(99);
    });
  });
});
