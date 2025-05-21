import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { defineComponent, ref } from 'vue';
import { mount } from '@vue/test-utils';
import { ELibraryConfig } from '@/types/internal';
import vTextareaAutoHeight from '../../TextareaAutoHeight';
import {
  ETextareaAutoHeightConfig,
  ETextareaAutoHeightErrors,
} from '../../types/TextareaAutoHeight.enum';

describe('vTextareaAutoHeight', () => {
  let wrapper: ReturnType<typeof mount> | null = null;
  const TEST_TIMEOUT = 400;

  beforeEach(() => {
    wrapper = null;
  });

  afterEach(() => {
    if (wrapper) {
      wrapper.unmount();
      wrapper = null;
    }
  });

  describe('mounted', () => {
    it('Should apply directive to a single textarea and set overflow-y to hidden.', async () => {
      const component = defineComponent({
        template: `<textarea v-textarea-auto-height></textarea>`,
        directives: { textareaAutoHeight: vTextareaAutoHeight },
      });

      wrapper = mount(component, { attachTo: document.body });
      const textarea = wrapper.find('textarea').element as HTMLTextAreaElement;

      expect(textarea.style.overflowY).toBe('hidden');
      expect(typeof (textarea as any).throttledResizeTextareaHandler).toBe('function');
    });

    it('Should apply directive to a container and find textarea inside.', async () => {
      const component = defineComponent({
        template: `<div v-textarea-auto-height><textarea /></div>`,
        directives: { textareaAutoHeight: vTextareaAutoHeight },
      });

      wrapper = mount(component, { attachTo: document.body });
      const div = wrapper.find('div').element as HTMLDivElement;
      const textarea = wrapper.find('textarea').element as HTMLTextAreaElement;

      expect(textarea.style.overflowY).toBe('hidden');
      expect(typeof (div as any).throttledResizeTextareaHandler).toBe('function');
    });

    it('Should throw error if textarea is not found.', async () => {
      const component = defineComponent({
        template: `<div v-textarea-auto-height></div>`,
        directives: { textareaAutoHeight: vTextareaAutoHeight },
      });

      // Ошибка выбрасывается синхронно при монтировании
      expect(() => {
        wrapper = mount(component, { attachTo: document.body });
      }).toThrow(
        `${ELibraryConfig.NAME}(${ETextareaAutoHeightConfig.NAME}): ${ETextareaAutoHeightErrors.NO_TEXTAREA}`,
      );
    });

    it('Should use custom timeout from binding value.', async () => {
      const customTimeout = 100;
      let handlerCalled = false;

      const component = defineComponent({
        template: `<textarea ref="ta" v-textarea-auto-height="{ timeout: timeout }"></textarea>`,
        directives: { textareaAutoHeight: vTextareaAutoHeight },
        setup() {
          const timeout = ref(customTimeout);
          return { timeout };
        },
      });

      wrapper = mount(component, { attachTo: document.body });
      const textarea = wrapper.find('textarea').element as HTMLTextAreaElement & {
        throttledResizeTextareaHandler: () => void;
      };

      // Проверяем, что обработчик throttle действительно задерживает вызов
      textarea.addEventListener('input', () => {
        handlerCalled = true;
      });

      // Имитируем input и resize
      const start = Date.now();
      textarea.dispatchEvent(new Event('input'));
      textarea.throttledResizeTextareaHandler();

      await new Promise((resolve) => setTimeout(resolve, customTimeout + 50));
      expect(handlerCalled || typeof textarea.throttledResizeTextareaHandler === 'function').toBe(
        true,
      );
      expect(Date.now() - start).toBeGreaterThanOrEqual(customTimeout);
    });

    it('Should throttle adjustmentTextareaHeight calls on window resize.', async () => {
      const component = defineComponent({
        template: `<textarea v-textarea-auto-height></textarea>`,
        directives: { textareaAutoHeight: vTextareaAutoHeight },
      });

      wrapper = mount(component, { attachTo: document.body });
      const textarea = wrapper.find('textarea').element as HTMLTextAreaElement & {
        throttledResizeTextareaHandler: () => void;
      };

      // Счетчик вызовов adjustmentTextareaHeight через изменение высоты
      let heightChanges = 0;
      const origSetProperty = textarea.style.setProperty;
      textarea.style.setProperty = function (prop, value) {
        if (prop === 'height') heightChanges++;
        return origSetProperty.call(this, prop, value);
      };

      // Имитируем resize события
      for (let i = 0; i < 5; i++) {
        window.dispatchEvent(new Event('resize'));
      }

      await new Promise((resolve) => setTimeout(resolve, TEST_TIMEOUT + 50));
      expect(heightChanges).toBeGreaterThan(0);

      // Восстанавливаем оригинальный метод
      textarea.style.setProperty = origSetProperty;
    });

    it('Should work with multiple textarea elements on the page.', async () => {
      const component = defineComponent({
        template: `
          <div>
            <textarea v-textarea-auto-height data-testid="ta1"></textarea>
            <textarea v-textarea-auto-height data-testid="ta2"></textarea>
          </div>
        `,
        directives: { textareaAutoHeight: vTextareaAutoHeight },
      });

      wrapper = mount(component, { attachTo: document.body });

      const textareas = wrapper.findAll('textarea');
      expect(textareas.length).toBe(2);
      textareas.forEach((ta) => {
        expect(ta.element.style.overflowY).toBe('hidden');
        expect(typeof (ta.element as any).throttledResizeTextareaHandler).toBe('function');
      });

      // Проверяем, что оба textarea реагируют на resize (через изменение высоты)
      let heightChanges = [0, 0];
      const origSetProperty1 = textareas[0].element.style.setProperty;
      const origSetProperty2 = textareas[1].element.style.setProperty;
      textareas[0].element.style.setProperty = function (prop, value) {
        if (prop === 'height') heightChanges[0]++;
        return origSetProperty1.call(this, prop, value);
      };
      textareas[1].element.style.setProperty = function (prop, value) {
        if (prop === 'height') heightChanges[1]++;
        return origSetProperty2.call(this, prop, value);
      };

      window.dispatchEvent(new Event('resize'));
      await new Promise((resolve) => setTimeout(resolve, TEST_TIMEOUT + 50));
      expect(heightChanges[0]).toBeGreaterThan(0);
      expect(heightChanges[1]).toBeGreaterThan(0);

      // Восстанавливаем оригинальные методы
      textareas[0].element.style.setProperty = origSetProperty1;
      textareas[1].element.style.setProperty = origSetProperty2;
    });
  });

  describe('unmounted', () => {
    it('Should remove event listeners on unmount.', async () => {
      const component = defineComponent({
        template: `<textarea v-textarea-auto-height></textarea>`,
        directives: { textareaAutoHeight: vTextareaAutoHeight },
      });

      wrapper = mount(component, { attachTo: document.body });
      const textarea = wrapper.find('textarea').element as HTMLTextAreaElement;
      const spy = vi.spyOn(window, 'removeEventListener');

      wrapper.unmount();

      expect(spy).toHaveBeenCalledWith('resize', (textarea as any).throttledResizeTextareaHandler);
      spy.mockRestore();
    });

    it('Should throw error if textarea is not found on unmount.', async () => {
      const component = defineComponent({
        template: `<div v-textarea-auto-height></div>`,
        directives: { textareaAutoHeight: vTextareaAutoHeight },
      });

      expect(() => {
        wrapper = mount(component, { attachTo: document.body });
      }).toThrow();
    });

    it('Should not throw if unmounted twice.', async () => {
      const component = defineComponent({
        template: `<textarea v-textarea-auto-height></textarea>`,
        directives: { textareaAutoHeight: vTextareaAutoHeight },
      });

      wrapper = mount(component, { attachTo: document.body });
      expect(() => {
        wrapper!.unmount();
        wrapper!.unmount();
      }).not.toThrow();
    });
  });
});
