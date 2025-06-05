import { describe, it, expect, vi, beforeEach } from 'vitest';
import { ref, shallowRef, defineComponent, h, nextTick, type ShallowRef } from 'vue';
import { mount } from '@vue/test-utils';
import useAccordionItem from '../../composables/useAccordionItem/useAccordionItem';
import { AccordionItemSelectorTestData } from '../test-data/AccordionItem.selector.test-data';
import { EAccordionPropsDefault } from '../../../Accordion/types/Accordion.enums';
import type { TAccordionItemProps } from '../../AccordionItem';

const defaultMock = new AccordionItemSelectorTestData();

function mountWithComposable(
  props: TAccordionItemProps,
  accordions = ref([]),
  updateAccordion = vi.fn(),
  opened = false,
  disabled = false,
  cssClass: string | undefined = EAccordionPropsDefault.CSS_CLASS,
  modifier: string | undefined = undefined,
) {
  const emits = vi.fn();
  const mockDiv = {
    focus: vi.fn(),
    style: {},
  } as unknown as HTMLDivElement;
  const accordionRef: ShallowRef<HTMLDivElement | null> = shallowRef(mockDiv);

  return mount(
    defineComponent({
      setup() {
        const result = useAccordionItem(
          props,
          emits,
          accordionRef,
          accordions,
          updateAccordion,
          opened,
          disabled,
          cssClass,
          modifier,
        );
        return { ...result, accordionRef, updateAccordion, emits };
      },
      render() {
        return h('div');
      },
    }),
  );
}

describe('useAccordionItem', () => {
  let accordions: any;
  let updateAccordion: any;

  beforeEach(() => {
    accordions = ref([]);
    updateAccordion = vi.fn();
  });

  describe('Basic functionality', () => {
    it('Should return expected structure.', () => {
      const wrapper = mountWithComposable(defaultMock.mockProps, accordions);
      const vm = wrapper.vm;

      expect(vm).toHaveProperty('id');
      expect(vm).toHaveProperty('componentClasses');
      expect(vm).toHaveProperty('openedState');
      expect(vm).toHaveProperty('disabledState');
      expect(vm).toHaveProperty('updateAccordionWrapper');
      expect(vm).toHaveProperty('toggle');
      expect(vm).toHaveProperty('open');
      expect(vm).toHaveProperty('close');
      expect(vm).toHaveProperty('onMouseOver');
      expect(vm).toHaveProperty('onMouseLeave');
      expect(vm).toHaveProperty('onKeyDownEcsHandler');
      expect(vm).toHaveProperty('onKeyUpOrDownHandler');
      expect(vm).toHaveProperty('onBlur');
      expect(vm).toHaveProperty('onFocus');
      expect(vm).toHaveProperty('onExpandEnter');
      expect(vm).toHaveProperty('onExpandAfterEnter');
      expect(vm).toHaveProperty('onExpandBeforeLeave');
    });

    it('Should initialize with default states and computed properties.', () => {
      const wrapper = mountWithComposable(defaultMock.mockProps, accordions);
      const vm = wrapper.vm;

      expect(vm.id).toBeDefined();
      expect(typeof vm.id).toBe('string');
      expect(vm.componentClasses).toBeDefined();
      expect(typeof vm.componentClasses).toBe('string');
      expect(vm.openedState).toBeDefined();
      expect(typeof vm.openedState).toBe('boolean');
      expect(vm.disabledState).toBeDefined();
      expect(typeof vm.disabledState).toBe('boolean');
      expect(vm.updateAccordionWrapper).toBeDefined();
      expect(vm.toggle).toBeDefined();
      expect(vm.open).toBeDefined();
      expect(vm.close).toBeDefined();
      expect(vm.onMouseOver).toBeDefined();
      expect(vm.onMouseLeave).toBeDefined();
      expect(vm.onKeyDownEcsHandler).toBeDefined();
      expect(vm.onKeyUpOrDownHandler).toBeDefined();
      expect(vm.onBlur).toBeDefined();
      expect(vm.onFocus).toBeDefined();
      expect(vm.onExpandEnter).toBeDefined();
      expect(vm.onExpandAfterEnter).toBeDefined();
      expect(vm.onExpandBeforeLeave).toBeDefined();
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
        defaultMock.mockProps,
        accordions,
        undefined,
        false,
        false,
        EAccordionPropsDefault.CSS_CLASS,
        defaultMock.modifierProp,
      );
      const vm = wrapper.vm;

      expect(vm.componentClasses).toContain(
        defaultMock.getSelectorWithoutDot(defaultMock.primaryModifier),
      );
    });

    it('Should generate correct componentClasses with modifier.', () => {
      const wrapper = mountWithComposable(
        defaultMock.mockProps,
        accordions,
        undefined,
        false,
        false,
        EAccordionPropsDefault.CSS_CLASS,
        defaultMock.modifierProp,
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

  describe('Initialization', () => {
    it('Should add accordion item to accordions on mounted.', async () => {
      mountWithComposable(
        defaultMock.mockProps,
        accordions,
        undefined,
        false,
        false,
        EAccordionPropsDefault.CSS_CLASS,
        defaultMock.modifierProp,
      );

      await nextTick();

      expect(accordions.value.length).toBe(1);
      expect(accordions.value[0].id).toBe('v-0');
      expect(typeof accordions.value[0].opened).toBe('boolean');
      expect(typeof accordions.value[0].toggle).toBe('function');
      expect(typeof accordions.value[0].open).toBe('function');
      expect(typeof accordions.value[0].close).toBe('function');
    });
  });

  describe('disabledState ComputedRef', () => {
    it('Should include disabled modifier class when disabled is true.', () => {
      const wrapper = mountWithComposable(
        defaultMock.mockProps,
        accordions,
        undefined,
        false,
        true,
        EAccordionPropsDefault.CSS_CLASS,
        defaultMock.modifierProp,
      );

      expect(wrapper.vm.componentClasses).toContain('ar-accordion-item--disabled');
    });
  });

  describe('updateAccordionWrapper Function', () => {
    it('Should call updateAccordion with correct id and value.', () => {
      const wrapper = mountWithComposable(
        defaultMock.mockProps,
        accordions,
        updateAccordion,
        false,
        false,
        EAccordionPropsDefault.CSS_CLASS,
        defaultMock.modifierProp,
      );
      const vm = wrapper.vm;

      vm.updateAccordionWrapper(vm.id, true);
      expect(updateAccordion).toHaveBeenCalledWith(vm.id, true);
    });
  });

  describe('toggle Function', () => {
    it('Should call updateAccordion with toggle opened state.', () => {
      const wrapper = mountWithComposable(
        defaultMock.mockProps,
        accordions,
        updateAccordion,
        false,
        false,
        EAccordionPropsDefault.CSS_CLASS,
        defaultMock.modifierProp,
      );
      const vm = wrapper.vm;

      vm.toggle();
      expect(updateAccordion).toHaveBeenCalledWith(vm.id, true);
    });

    it('Should not toggle if disabled.', () => {
      const wrapper = mountWithComposable(
        defaultMock.mockProps,
        accordions,
        updateAccordion,
        false,
        true,
        EAccordionPropsDefault.CSS_CLASS,
        defaultMock.modifierProp,
      );
      const vm = wrapper.vm;

      vm.toggle();
      expect(updateAccordion).not.toHaveBeenCalled();
    });
  });

  describe('open Function', () => {
    it('Should call updateAccordion with true.', () => {
      const wrapper = mountWithComposable(
        defaultMock.mockProps,
        accordions,
        updateAccordion,
        false,
        false,
        EAccordionPropsDefault.CSS_CLASS,
        defaultMock.modifierProp,
      );
      const vm = wrapper.vm;

      vm.open();
      expect(updateAccordion).toHaveBeenCalledWith(vm.id, true);
    });
  });

  describe('close Function', () => {
    it('Should call updateAccordion with false.', () => {
      const wrapper = mountWithComposable(
        defaultMock.mockProps,
        accordions,
        updateAccordion,
        true,
        false,
        EAccordionPropsDefault.CSS_CLASS,
        defaultMock.modifierProp,
      );
      const vm = wrapper.vm;

      vm.close();
      expect(updateAccordion).toHaveBeenCalledWith(vm.id, false);
    });
  });

  // TODO: Написать тесты
  // describe('focus Function', () => {
  //   it('', () => {});
  // });

  // TODO: Написать тесты
  // describe('onMouseOver Function', () => {
  //   it('', () => {});
  // });

  // TODO: Написать тесты
  // describe('onMouseLeave Function', () => {
  //   it('', () => {});
  // });

  describe('onKeyDownEcsHandler Function', () => {
    it('Should call updateAccordion with false.', () => {
      const wrapper = mountWithComposable(
        defaultMock.mockProps,
        accordions,
        updateAccordion,
        true,
        false,
        EAccordionPropsDefault.CSS_CLASS,
        defaultMock.modifierProp,
      );
      const vm = wrapper.vm;

      vm.onKeyDownEcsHandler();
      expect(updateAccordion).toHaveBeenCalledWith(vm.id, false);
    });
  });

  // TODO: Написать тесты
  // describe('onKeyUpOrDownHandler Function', () => {
  //   it('', () => {});
  // });

  // TODO: Написать тесты
  // describe('onBlur Function', () => {
  //   it('', () => {});
  // });

  // TODO: Написать тесты
  // describe('onFocus Function', () => {
  //   it('', () => {});
  // });

  // TODO: Написать тесты
  // describe('onExpandEnter Function', () => {
  //   it('', () => {});
  // });

  describe('onExpandAfterEnter Function', () => {
    it('Should set height to auto on onExpandAfterEnter.', () => {
      const wrapper = mountWithComposable(defaultMock.mockProps);
      const vm = wrapper.vm;

      const el = document.createElement('div');
      vm.onExpandAfterEnter(el);

      expect(el.style.height).toBe('auto');
    });
  });

  // TODO: Написать тесты
  // describe('onExpandBeforeLeave Function', () => {
  //   it('', () => {});
  // });
});
