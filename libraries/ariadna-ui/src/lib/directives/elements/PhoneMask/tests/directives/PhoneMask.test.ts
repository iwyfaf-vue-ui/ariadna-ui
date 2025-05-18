import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { DOMWrapper, mount } from '@vue/test-utils';
import vPhoneMask from '../../PhoneMask';
import { EPhoneMaskErrors } from '../../types/PhoneMask.enum';
import { PhoneMaskSelectorTestData } from '../test-data/PhoneMask.selector.test-data';

describe('vPhoneMask directive with DummyComponent', () => {
  describe('No wrapper.', () => {
    const DummyComponent = {
      template: `
      <div>
        <input 
          type="tel" 
          v-phone-mask="{ 
            clone: true, 
            placeholder: placeholder,
            separator: separator
          }" 
          :placeholder="placeholder"
          :class="defaultMock.getSelectorWithoutDot(defaultMock.inputEl)"
        />
      </div>
    `,
      directives: {
        'phone-mask': vPhoneMask,
      },
      props: {
        placeholder: {
          type: String,
          default: '+7 (___) ___-__-__',
        },
        separator: {
          type: String,
          default: '-',
        },
      },
      setup() {
        const defaultMock = new PhoneMaskSelectorTestData();

        return { defaultMock };
      },
    };

    let wrapper: ReturnType<typeof mount>;

    beforeEach(() => {
      wrapper = mount(DummyComponent);
    });

    afterEach(() => {
      wrapper.unmount();
    });

    it('Should correctly initialize input with default placeholder.', () => {
      const input = wrapper.find(
        DummyComponent.setup().defaultMock.inputEl,
      ) as DOMWrapper<HTMLInputElement>;

      expect(input.attributes('placeholder')).toBe('+7 (___) ___-__-__');
    });

    it('Should format phone number according to Russian standard.', async () => {
      const input = wrapper.find(
        DummyComponent.setup().defaultMock.inputEl,
      ) as DOMWrapper<HTMLInputElement>;

      await input.setValue('9123456789');
      await input.trigger('input');

      expect(input.element.value).toBe('+7 (912) 345-67-89');
    });

    it('Should handle partial phone number input.', async () => {
      const input = wrapper.find(
        DummyComponent.setup().defaultMock.inputEl,
      ) as DOMWrapper<HTMLInputElement>;

      await input.setValue('9');
      expect(input.element.value).toBe('+7 (9');

      await input.setValue('912');
      expect(input.element.value).toBe('+7 (912) ');

      await input.setValue('9123');
      expect(input.element.value).toBe('+7 (912) 3');

      await input.setValue('912345');
      expect(input.element.value).toBe('+7 (912) 345-');

      await input.setValue('9123456');
      expect(input.element.value).toBe('+7 (912) 345-6');
    });

    it('Should respect custom separator.', async () => {
      wrapper = mount(DummyComponent, {
        props: {
          separator: '.',
        },
      });

      const input = wrapper.find(
        DummyComponent.setup().defaultMock.inputEl,
      ) as DOMWrapper<HTMLInputElement>;

      await input.setValue('9123456789');

      expect(input.element.value).toBe('+7 (912) 345.67.89');
    });

    it('Should update cloned input placeholder.', async () => {
      const input = wrapper.find(
        DummyComponent.setup().defaultMock.inputEl,
      ) as DOMWrapper<HTMLInputElement>;
      await input.setValue('912');

      const clonedInput = wrapper.find(
        DummyComponent.setup().defaultMock.inputClonedEl,
      ) as DOMWrapper<HTMLInputElement>;

      expect(clonedInput).toBeTruthy();
      expect(clonedInput.attributes('placeholder')).toContain('912');
    });

    it('Should handle empty input.', async () => {
      const input = wrapper.find(
        DummyComponent.setup().defaultMock.inputEl,
      ) as DOMWrapper<HTMLInputElement>;

      await input.setValue('');

      expect(input.element.value).toBe('');
    });

    it('Should prevent invalid characters.', async () => {
      const input = wrapper.find(
        DummyComponent.setup().defaultMock.inputEl,
      ) as DOMWrapper<HTMLInputElement>;

      await input.setValue('abc');
      expect(input.element.value).toBe('');

      await input.setValue('912abc345');
      expect(input.element.value).toBe('+7 (912) 345-');
    });

    it('Should handle custom placeholder pattern', async () => {
      wrapper = mount(DummyComponent, {
        props: {
          placeholder: '+1 (___) ___-____',
        },
      });

      const input = wrapper.find(
        DummyComponent.setup().defaultMock.inputEl,
      ) as DOMWrapper<HTMLInputElement>;
      await input.setValue('6505551234');

      expect(input.element.value).toBe('+7 (650) 555-12-34');
    });
  });

  describe('With wrapper.', () => {
    const DummyComponent = {
      template: ` 
      <div v-phone-mask="{ 
            clone: true, 
            placeholder: placeholder,
            separator: separator
          }" >
        <input 
          type="tel"
          :placeholder="placeholder"
          :class="defaultMock.getSelectorWithoutDot(defaultMock.inputEl)"
        />
      </div>
    `,
      directives: {
        'phone-mask': vPhoneMask,
      },
      props: {
        placeholder: {
          type: String,
          default: '+7 (___) ___-__-__',
        },
        separator: {
          type: String,
          default: '-',
        },
      },
      setup() {
        const defaultMock = new PhoneMaskSelectorTestData();

        return { defaultMock };
      },
    };

    let wrapper: ReturnType<typeof mount>;

    beforeEach(() => {
      wrapper = mount(DummyComponent);
    });

    afterEach(() => {
      wrapper.unmount();
    });

    it('Should correctly initialize input with default placeholder.', () => {
      const input = wrapper.find(
        DummyComponent.setup().defaultMock.inputEl,
      ) as DOMWrapper<HTMLInputElement>;

      expect(input.attributes('placeholder')).toBe('+7 (___) ___-__-__');
    });

    it('Should format phone number according to Russian standard.', async () => {
      const input = wrapper.find(
        DummyComponent.setup().defaultMock.inputEl,
      ) as DOMWrapper<HTMLInputElement>;

      await input.setValue('9123456789');
      await input.trigger('input');

      expect(input.element.value).toBe('+7 (912) 345-67-89');
    });

    it('Should handle partial phone number input.', async () => {
      const input = wrapper.find(
        DummyComponent.setup().defaultMock.inputEl,
      ) as DOMWrapper<HTMLInputElement>;

      await input.setValue('9');
      expect(input.element.value).toBe('+7 (9');

      await input.setValue('912');
      expect(input.element.value).toBe('+7 (912) ');

      await input.setValue('9123');
      expect(input.element.value).toBe('+7 (912) 3');

      await input.setValue('912345');
      expect(input.element.value).toBe('+7 (912) 345-');

      await input.setValue('9123456');
      expect(input.element.value).toBe('+7 (912) 345-6');
    });

    it('Should respect custom separator.', async () => {
      wrapper = mount(DummyComponent, {
        props: {
          separator: '.',
        },
      });

      const input = wrapper.find(
        DummyComponent.setup().defaultMock.inputEl,
      ) as DOMWrapper<HTMLInputElement>;

      await input.setValue('9123456789');

      expect(input.element.value).toBe('+7 (912) 345.67.89');
    });

    it('Should update cloned input placeholder.', async () => {
      const input = wrapper.find(
        DummyComponent.setup().defaultMock.inputEl,
      ) as DOMWrapper<HTMLInputElement>;
      await input.setValue('912');

      const clonedInput = wrapper.find(
        DummyComponent.setup().defaultMock.inputClonedEl,
      ) as DOMWrapper<HTMLInputElement>;

      expect(clonedInput).toBeTruthy();
      expect(clonedInput.attributes('placeholder')).toContain('912');
    });

    it('Should handle empty input.', async () => {
      const input = wrapper.find(
        DummyComponent.setup().defaultMock.inputEl,
      ) as DOMWrapper<HTMLInputElement>;

      await input.setValue('');

      expect(input.element.value).toBe('');
    });

    it('Should prevent invalid characters.', async () => {
      const input = wrapper.find(
        DummyComponent.setup().defaultMock.inputEl,
      ) as DOMWrapper<HTMLInputElement>;

      await input.setValue('abc');
      expect(input.element.value).toBe('');

      await input.setValue('912abc345');
      expect(input.element.value).toBe('+7 (912) 345-');
    });

    it('Should handle custom placeholder pattern', async () => {
      wrapper = mount(DummyComponent, {
        props: {
          placeholder: '+1 (___) ___-____',
        },
      });

      const input = wrapper.find(
        DummyComponent.setup().defaultMock.inputEl,
      ) as DOMWrapper<HTMLInputElement>;
      await input.setValue('6505551234');

      expect(input.element.value).toBe('+7 (650) 555-12-34');
    });
  });

  describe('Error handling (no input).', () => {
    const DummyComponent = {
      template: ` 
      <div v-phone-mask="{ 
            clone: true, 
            placeholder: placeholder,
            separator: separator
          }" >
      </div>
    `,
      directives: {
        'phone-mask': vPhoneMask,
      },
      props: {
        placeholder: {
          type: String,
          default: '+7 (___) ___-__-__',
        },
        separator: {
          type: String,
          default: '-',
        },
      },
      setup() {
        const defaultMock = new PhoneMaskSelectorTestData();

        return { defaultMock };
      },
    };

    it('Should throw EPhoneMaskErrors.NO_INPUT error when no input element is found.', () => {
      expect(() => mount(DummyComponent)).toThrow(EPhoneMaskErrors.NO_INPUT);
    });
  });
});
