import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import adjustmentTextareaHeight from '../../core/adjustment-textarea-height/adjustment-textarea-height.core';

describe('adjustmentTextareaHeight', () => {
  let textarea: HTMLTextAreaElement;

  function mockScrollHeight(value: number) {
    Object.defineProperty(textarea, 'scrollHeight', {
      configurable: true,
      get: () => value,
    });
  }

  beforeEach(() => {
    textarea = document.createElement('textarea');
    document.body.appendChild(textarea);

    // Мокаем getComputedStyle для px-значений
    Object.defineProperty(window, 'getComputedStyle', {
      value: () => ({
        getPropertyValue: (prop: string) => {
          if (prop === 'min-height') return '40px';
          if (prop === 'border-top-width') return '2px';
          return '';
        },
      }),
      writable: true,
    });
  });

  afterEach(() => {
    textarea.remove();
  });

  describe('core logic', () => {
    it('Should set height to min-height + border when scrollHeight is less than min-height.', () => {
      mockScrollHeight(20);
      adjustmentTextareaHeight(textarea);

      expect(textarea.style.height).toEqual('44px');
    });

    it('Should set height to scrollHeight + border when scrollHeight is greater than min-height.', () => {
      mockScrollHeight(100);
      adjustmentTextareaHeight(textarea);

      expect(textarea.style.height).toEqual('104px');
    });

    it('Should set height to min-height + border when scrollHeight equals min-height.', () => {
      mockScrollHeight(40);
      adjustmentTextareaHeight(textarea);

      expect(textarea.style.height).toEqual('44px');
    });

    it('Should set height to border only if min-height and scrollHeight are zero.', () => {
      window.getComputedStyle = () =>
        ({
          getPropertyValue: (prop: string) => {
            if (prop === 'min-height') return '0px';
            if (prop === 'border-top-width') return '2px';
            return '';
          },
        }) as any;

      mockScrollHeight(0);
      adjustmentTextareaHeight(textarea);

      expect(textarea.style.height).toEqual('4px');
    });

    it('Should set height to min-height + border when border-top-width is zero.', () => {
      window.getComputedStyle = () =>
        ({
          getPropertyValue: (prop: string) => {
            if (prop === 'min-height') return '40px';
            if (prop === 'border-top-width') return '0px';
            return '';
          },
        }) as any;

      mockScrollHeight(20);
      adjustmentTextareaHeight(textarea);

      expect(textarea.style.height).toEqual('40px');
    });

    it('Should set height to scrollHeight + border when min-height is zero.', () => {
      window.getComputedStyle = () =>
        ({
          getPropertyValue: (prop: string) => {
            if (prop === 'min-height') return '0px';
            if (prop === 'border-top-width') return '2px';
            return '';
          },
        }) as any;

      mockScrollHeight(50);
      adjustmentTextareaHeight(textarea);

      expect(textarea.style.height).toEqual('54px');
    });

    it('Should set height to 4px when both min-height and scrollHeight are zero and border-top-width is 2px.', () => {
      window.getComputedStyle = () =>
        ({
          getPropertyValue: (prop: string) => {
            if (prop === 'min-height') return '0px';
            if (prop === 'border-top-width') return '2px';
            return '';
          },
        }) as any;

      mockScrollHeight(0);
      adjustmentTextareaHeight(textarea);

      expect(textarea.style.height).toEqual('4px');
    });

    it('Should set height to 0px when all values are zero.', () => {
      window.getComputedStyle = () =>
        ({
          getPropertyValue: () => '0px',
        }) as any;

      mockScrollHeight(0);
      adjustmentTextareaHeight(textarea);

      expect(textarea.style.height).toEqual('0px');
    });

    it('Should always set style.height property (side effect).', () => {
      mockScrollHeight(80);
      adjustmentTextareaHeight(textarea);

      expect(textarea.style.height).toBeDefined();
      expect(textarea.style.height).not.toEqual('');
    });

    it('Should reset height to auto before calculation.', () => {
      textarea.style.height = '200px';

      mockScrollHeight(60);
      adjustmentTextareaHeight(textarea);

      expect(textarea.style.height).toEqual('64px');
    });
  });
});
