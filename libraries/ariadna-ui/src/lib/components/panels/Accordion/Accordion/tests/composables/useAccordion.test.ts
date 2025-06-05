import { describe, it, expect, vi, beforeEach } from 'vitest';
import { ref, defineComponent, h } from 'vue';
import { mount } from '@vue/test-utils';
import useAccordion from '../../composables/useAccordion/useAccordion';
import type { TAccordionProps } from '../../Accordion';
import type {
  TAccordionItem,
  TAccordionItems,
} from '../../../AccordionItem/types/AccordionItem.types';
import { AccordionSelectorTestData } from '../test-data/Accordion.selector.test-data';
import { ELibraryConfig } from '@/types/internal';
import { EAccordionConfig, EAccordionErrors } from '../../types/Accordion.enums';

const defaultMock = new AccordionSelectorTestData();

function mountWithComposable(props: TAccordionProps, accordions: TAccordionItems) {
  return mount(
    defineComponent({
      setup() {
        const result = useAccordion(props, accordions);
        return {
          ...result,
        };
      },
      render() {
        return h('div');
      },
    }),
  );
}

describe('useAccordion', () => {
  let accordions: any;

  beforeEach(() => {
    accordions = ref([
      {
        id: 'a1',
        open: vi.fn(),
        close: vi.fn(),
      },
      {
        id: 'a2',
        open: vi.fn(),
        close: vi.fn(),
      },
    ]);
  });

  describe('Basic functionality', () => {
    it('Should return expected structure.', () => {
      const wrapper = mountWithComposable(defaultMock.mockProps, accordions);
      const vm = wrapper.vm;

      expect(vm).toHaveProperty('componentClasses');
      expect(vm).toHaveProperty('updateAccordion');
      expect(vm).toHaveProperty('openAll');
      expect(vm).toHaveProperty('closeAll');
      expect(vm).toHaveProperty('updateBy');
    });

    it('Should initialize with default states and computed properties.', () => {
      const wrapper = mountWithComposable(defaultMock.mockProps, accordions);
      const vm = wrapper.vm;

      expect(vm.componentClasses).toBeDefined();
      expect(typeof vm.componentClasses).toBe('string');
      expect(vm.updateAccordion).toBeDefined();
      expect(vm.openAll).toBeDefined();
      expect(vm.closeAll).toBeDefined();
      expect(vm.updateBy).toBeDefined();
    });
  });

  describe('componentClasses ComputedRef', () => {
    it('Should generate correct componentClasses for default props.', () => {
      const wrapper = mountWithComposable(defaultMock.mockProps, accordions);
      const vm = wrapper.vm;

      const classes = vm.componentClasses.split(' ');

      const expectedClasses = [
        defaultMock.getSelectorWithoutDot(defaultMock.rootEl),
        defaultMock.getSelectorWithoutDot(defaultMock.themeModifier),
      ];

      expect(classes).toEqual(expect.arrayContaining(expectedClasses));
      expect(classes.length).toBe(expectedClasses.length);
    });

    it('Should include modifier class when provided.', () => {
      const wrapper = mountWithComposable(
        {
          ...defaultMock.mockProps,
          modifier: defaultMock.modifierProp,
        },
        accordions,
      );
      const vm = wrapper.vm;

      expect(vm.componentClasses).toContain(
        defaultMock.getSelectorWithoutDot(defaultMock.primaryModifier),
      );
    });

    it('Should generate correct componentClasses with modifier.', () => {
      const wrapper = mountWithComposable(
        {
          ...defaultMock.mockProps,
          modifier: defaultMock.modifierProp,
        },
        accordions,
      );
      const vm = wrapper.vm;

      const classes = vm.componentClasses.split(' ');

      const expectedClasses = [
        defaultMock.getSelectorWithoutDot(defaultMock.rootEl),
        defaultMock.getSelectorWithoutDot(defaultMock.themeModifier),
        defaultMock.getSelectorWithoutDot(defaultMock.primaryModifier),
      ];

      expect(classes).toEqual(expect.arrayContaining(expectedClasses));
      expect(classes.length).toBe(expectedClasses.length);
    });

    it('Should include disabled modifier class when disabled is true.', () => {
      const wrapper = mountWithComposable(
        {
          ...defaultMock.mockProps,
          disabled: true,
        },
        accordions,
      );
      const vm = wrapper.vm;

      const classes = vm.componentClasses.split(' ');

      const expectedClasses = [
        defaultMock.getSelectorWithoutDot(defaultMock.rootEl),
        defaultMock.getSelectorWithoutDot(defaultMock.themeModifier),
        defaultMock.getSelectorWithoutDot(defaultMock.disabledModifier),
      ];

      expect(classes).toEqual(expect.arrayContaining(expectedClasses));
      expect(classes.length).toBe(expectedClasses.length);
    });
  });

  describe('updateAccordion', () => {
    it('Should open accordion by id when singleMode is false and value is true.', () => {
      const wrapper = mountWithComposable(defaultMock.mockProps, accordions);
      const vm = wrapper.vm;

      vm.updateAccordion('a1', true);
      expect(accordions.value[0].open).toHaveBeenCalled();
      expect(accordions.value[0].close).not.toHaveBeenCalled();
    });

    it('Should close accordion by id when singleMode is false and value is false.', () => {
      const wrapper = mountWithComposable(defaultMock.mockProps, accordions);
      const vm = wrapper.vm;

      vm.updateAccordion('a1', false);
      expect(accordions.value[0].close).toHaveBeenCalled();
      expect(accordions.value[0].open).not.toHaveBeenCalled();
    });

    it('Should do nothing if id not found.', () => {
      const wrapper = mountWithComposable(defaultMock.mockProps, accordions);
      const vm = wrapper.vm;

      vm.updateAccordion('non-existent', true);
      accordions.value.forEach((accordion: TAccordionItem) => {
        expect(accordion.open).not.toHaveBeenCalled();
        expect(accordion.close).not.toHaveBeenCalled();
      });
    });

    it('Should open only the accordion with matching id and close others when singleMode is true and value is true.', () => {
      const wrapper = mountWithComposable(
        { ...defaultMock.mockProps, singleMode: true },
        accordions,
      );
      const vm = wrapper.vm;

      vm.updateAccordion('a2', true);
      expect(accordions.value[1].open).toHaveBeenCalled();
      expect(accordions.value[0].close).toHaveBeenCalled();
      expect(accordions.value[1].close).not.toHaveBeenCalled();
      expect(accordions.value[0].open).not.toHaveBeenCalled();
    });
  });

  describe('openAll', () => {
    it('Should open all accordions when singleMode is false.', () => {
      const wrapper = mountWithComposable(defaultMock.mockProps, accordions);
      const vm = wrapper.vm;

      vm.openAll();
      accordions.value.forEach((accordion: TAccordionItem) => {
        expect(accordion.open).toHaveBeenCalled();
      });
    });

    it('Should not open any accordion when singleMode is true.', () => {
      const wrapper = mountWithComposable(
        { ...defaultMock.mockProps, singleMode: true },
        accordions,
      );
      const vm = wrapper.vm;

      vm.openAll();
      accordions.value.forEach((accordion: TAccordionItem) => {
        expect(accordion.open).not.toHaveBeenCalled();
      });
    });
  });

  describe('closeAll', () => {
    it('Should close all accordions.', () => {
      const wrapper = mountWithComposable(defaultMock.mockProps, accordions);
      const vm = wrapper.vm;

      vm.closeAll();
      accordions.value.forEach((accordion: TAccordionItem) => {
        expect(accordion.close).toHaveBeenCalled();
      });
    });
  });

  describe('updateBy', () => {
    it('Should update accordion by index with default value true.', () => {
      const wrapper = mountWithComposable(defaultMock.mockProps, accordions);
      const vm = wrapper.vm;

      vm.updateBy(1);
      expect(accordions.value[1].open).toHaveBeenCalled();
      expect(accordions.value[1].close).not.toHaveBeenCalled();
    });

    it('Should update accordion by index with explicit value false.', () => {
      const wrapper = mountWithComposable(defaultMock.mockProps, accordions);
      const vm = wrapper.vm;

      vm.updateBy(0, false);
      expect(accordions.value[0].close).toHaveBeenCalled();
      expect(accordions.value[0].open).not.toHaveBeenCalled();
    });

    it('Should do nothing if index is out of range.', () => {
      const wrapper = mountWithComposable(defaultMock.mockProps, accordions);
      const vm = wrapper.vm;

      vm.updateBy(10);
      accordions.value.forEach((accordion: TAccordionItem) => {
        expect(accordion.open).not.toHaveBeenCalled();
        expect(accordion.close).not.toHaveBeenCalled();
      });
    });
  });

  describe('watchEffect error on opened and singleMode conflict', () => {
    it('Should throw error if opened and singleMode are both true.', () => {
      expect(() => {
        mountWithComposable(
          { ...defaultMock.mockProps, opened: true, singleMode: true },
          accordions,
        );
      }).toThrowError(
        `${ELibraryConfig.NAME}(${EAccordionConfig.NAME}): ${EAccordionErrors.OPENED_SINGLE_MODE_CONFLICT}`,
      );
    });

    it('Should not throw error if opened is true and singleMode is false.', () => {
      expect(() => {
        mountWithComposable(
          { ...defaultMock.mockProps, opened: true, singleMode: false },
          accordions,
        );
      }).not.toThrow();
    });

    it('Should not throw error if opened is false and singleMode is true.', () => {
      expect(() => {
        mountWithComposable(
          { ...defaultMock.mockProps, opened: false, singleMode: true },
          accordions,
        );
      }).not.toThrow();
    });
  });
});
