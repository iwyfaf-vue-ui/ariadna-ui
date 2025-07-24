import { describe, it, expect, vi } from 'vitest';
import { defineComponent, h, shallowRef, ref } from 'vue';
import { mount } from '@vue/test-utils';
import useSlider from '../../composables/useSlider/useSlider';
import { SliderSelectorTestData } from '../test-data/Slider.selector.test-data';
import type { TSliderProps } from '../../Slider';
import { EThumbPosition } from '../../types/Slider.enums';

// Mock всего модуля 'vue' с переопределением useId.
vi.mock('vue', async () => {
  const actual = await vi.importActual<typeof import('vue')>('vue');
  return {
    ...actual,
    useId: () => 'mocked-id',
  };
});

const defaultMock = new SliderSelectorTestData();

function mountWithComposable(props: TSliderProps) {
  const emits = vi.fn();

  const sliderRef = shallowRef(null);
  const currentThumbIndex = ref(-1);

  return mount(
    defineComponent({
      setup() {
        const result = useSlider(props, emits, sliderRef, currentThumbIndex);
        return { ...result, emits, sliderRef, currentThumbIndex };
      },
      render() {
        return h('div');
      },
    }),
  );
}

describe('useSlider', () => {
  describe('uniqueID ComputedRef', () => {
    it('Should return props.id if defined.', () => {
      const wrapper = mountWithComposable({ ...defaultMock.mockProps, id: defaultMock.idProp });
      const vm = wrapper.vm;

      expect(vm.uniqueID).toBe(defaultMock.idProp);
    });

    it('Should return generated id if props.id is undefined.', () => {
      const wrapper = mountWithComposable({ ...defaultMock.mockProps, id: undefined });
      const vm = wrapper.vm;

      expect(typeof vm.uniqueID).toBe('string');
      expect(vm.uniqueID.length).toBeGreaterThan(0);
    });
  });

  describe('componentClasses ComputedRef', () => {
    it('Should generate correct componentClasses for default props.', () => {
      const wrapper = mountWithComposable({ ...defaultMock.mockProps });
      const vm = wrapper.vm;

      const classes = vm.componentClasses.split(' ');

      const expectedClasses = [
        defaultMock.getSelectorWithoutDot(defaultMock.rootEl),
        defaultMock.getSelectorWithoutDot(defaultMock.themeModifier),
      ];

      expect(classes).toEqual(expect.arrayContaining(expectedClasses));
      expect(classes.length).toBe(expectedClasses.length);
    });

    it('Should include disabled class when disabled is true.', () => {
      const wrapper = mountWithComposable({ ...defaultMock.mockProps, disabled: true });
      const vm = wrapper.vm;

      expect(vm.componentClasses).toContain(
        defaultMock.getSelectorWithoutDot(defaultMock.disabledModifier),
      );
    });

    it('Should include points modifier class when points prop is not empty.', () => {
      const wrapper = mountWithComposable({
        ...defaultMock.mockProps,
        points: defaultMock.pointsProp,
      });
      const vm = wrapper.vm;

      expect(vm.componentClasses).toContain(
        defaultMock.getSelectorWithoutDot(defaultMock.pointsModifier),
      );
    });

    it('Should include invalid modifier class when invalid prop is true.', () => {
      const wrapper = mountWithComposable({
        ...defaultMock.mockProps,
        invalid: true,
      });
      const vm = wrapper.vm;

      expect(vm.componentClasses).toContain(
        defaultMock.getSelectorWithoutDot(defaultMock.invalidModifier),
      );
    });
  });

  describe('commonPoints ComputedRef', () => {
    it('Should return props.points if defined.', () => {
      const wrapper = mountWithComposable({
        ...defaultMock.mockProps,
        points: defaultMock.pointsProp,
      });
      const vm = wrapper.vm;

      expect(vm.commonPoints).toStrictEqual(defaultMock.pointsProp);
    });

    it('Should return empty array if no points and no step.', () => {
      const wrapper = mountWithComposable({
        ...defaultMock.mockProps,
        points: null,
        step: null,
      });
      const vm = wrapper.vm;

      expect(vm.commonPoints).toStrictEqual([]);
    });

    it('Should return array of points based on step.', () => {
      const wrapper = mountWithComposable({
        ...defaultMock.mockProps,
        points: null,
        step: 20,
      });
      const vm = wrapper.vm;

      expect(vm.commonPoints).toStrictEqual([0, 20, 40, 60, 80, 100]);
    });
  });

  describe('clamp Function', () => {
    it('Should clamp value within min and max.', () => {
      const wrapper = mountWithComposable({
        ...defaultMock.mockProps,
      });
      const vm = wrapper.vm;

      expect(vm.clamp(0, 50, 100)).toBe(50);
      expect(vm.clamp(0, -10, 100)).toBe(0);
      expect(vm.clamp(0, 150, 100)).toBe(100);
    });
  });

  describe('roundByStep Function', () => {
    it('Should round value to nearest step.', () => {
      const wrapper = mountWithComposable({
        ...defaultMock.mockProps,
        step: 10,
      });
      const vm = wrapper.vm;

      expect(vm.roundByStep(23)).toBe(20);
      expect(vm.roundByStep(27)).toBe(30);
    });

    it('Should return value unchanged if step is null.', () => {
      const wrapper = mountWithComposable({
        ...defaultMock.mockProps,
        step: null,
      });
      const vm = wrapper.vm;

      expect(vm.roundByStep(23)).toBe(23);
    });
  });

  describe('getPercentageByValue Function', () => {
    it('Should calculate correct percentage for value.', () => {
      const wrapper = mountWithComposable({
        ...defaultMock.mockProps,
      });
      const vm = wrapper.vm;

      expect(vm.getPercentageByValue(0)).toBe(0);
      expect(vm.getPercentageByValue(50)).toBe(50);
      expect(vm.getPercentageByValue(100)).toBe(100);
    });
  });

  describe('getAdditionalTrackClasses Function', () => {
    it('Should return correct classes object.', () => {
      const wrapper = mountWithComposable({
        ...defaultMock.mockProps,
      });
      const vm = wrapper.vm;

      const classes = vm.getAdditionalTrackClasses('test');
      expect(classes).toEqual({
        [defaultMock.getSelectorWithoutDot(defaultMock.trackAdditionalEl)]: true,
        [`${defaultMock.getSelectorWithoutDot(defaultMock.trackAdditionalEl)}-test`]: true,
      });
    });
  });

  describe('getThumbClasses Function', () => {
    it('Should return correct classes object for left position and drag.', () => {
      const wrapper = mountWithComposable({
        ...defaultMock.mockProps,
      });
      const vm = wrapper.vm;

      const classes = vm.getThumbClasses('test', true, EThumbPosition.LEFT);
      expect(classes).toEqual({
        [defaultMock.getSelectorWithoutDot(defaultMock.trackAdditionalThumbEl)]: true,
        [`${defaultMock.getSelectorWithoutDot(defaultMock.trackAdditionalThumbEl)}-test`]: true,
        [defaultMock.getSelectorWithoutDot(defaultMock.trackAdditionalThumbDragModifier)]: true,
        [defaultMock.getSelectorWithoutDot(defaultMock.trackAdditionalThumbLeftModifier)]: true,
        [defaultMock.getSelectorWithoutDot(defaultMock.trackAdditionalThumbRightModifier)]: false,
      });
    });

    it('Should return correct classes object for right position and no drag.', () => {
      const wrapper = mountWithComposable({
        ...defaultMock.mockProps,
      });
      const vm = wrapper.vm;

      const classes = vm.getThumbClasses('test', false, EThumbPosition.RIGHT);
      expect(classes).toEqual({
        [defaultMock.getSelectorWithoutDot(defaultMock.trackAdditionalThumbEl)]: true,
        [`${defaultMock.getSelectorWithoutDot(defaultMock.trackAdditionalThumbEl)}-test`]: true,
        [defaultMock.getSelectorWithoutDot(defaultMock.trackAdditionalThumbDragModifier)]: false,
        [defaultMock.getSelectorWithoutDot(defaultMock.trackAdditionalThumbLeftModifier)]: false,
        [defaultMock.getSelectorWithoutDot(defaultMock.trackAdditionalThumbRightModifier)]: true,
      });
    });
  });

  describe('calculateStylesForTrackByValue Function', () => {
    it('Should return correct style string for single value.', () => {
      const wrapper = mountWithComposable({
        ...defaultMock.mockProps,
      });
      const vm = wrapper.vm;

      const style = vm.calculateStylesForTrackByValue(50);
      expect(style).toBe('width: 50%');
    });

    it('Should return correct style string for array value.', () => {
      const wrapper = mountWithComposable({
        ...defaultMock.mockProps,
      });
      const vm = wrapper.vm;

      const style = vm.calculateStylesForTrackByValue([20, 80]);
      expect(style).toBe('width: 60%; left: 20%');
    });
  });

  describe('calculateNewTrackValue Function', () => {
    it('Should return 0 if sliderRef.value is null.', () => {
      const wrapper = mountWithComposable({
        ...defaultMock.mockProps,
      });
      const vm = wrapper.vm;

      const result = vm.calculateNewTrackValue(0, 50, EThumbPosition.LEFT);
      expect(result).toBe(0);
    });

    it('Should calculate new value within bounds for single value.', () => {
      const emits = vi.fn();
      const sliderRef = shallowRef({
        getBoundingClientRect: () => ({ left: 0 }),
        offsetWidth: 100,
      } as unknown as HTMLDivElement);
      const currentThumbIndex = ref(-1);
      const wrapper = mount(
        defineComponent({
          setup() {
            return useSlider(defaultMock.mockProps, emits, sliderRef, currentThumbIndex);
          },
          render() {
            return h('div');
          },
        }),
      );
      const vm = wrapper.vm;

      // clientX = 50, should map to value 50 rounded by step 10
      const result = vm.calculateNewTrackValue(0, 50, EThumbPosition.LEFT);
      expect(result).toBe(50);
    });

    it('Should clamp new value to min and max.', () => {
      const emits = vi.fn();
      const sliderRef = shallowRef({
        getBoundingClientRect: () => ({ left: 0 }),
        offsetWidth: 100,
      } as unknown as HTMLDivElement);
      const currentThumbIndex = ref(-1);
      const wrapper = mount(
        defineComponent({
          setup() {
            return useSlider(defaultMock.mockProps, emits, sliderRef, currentThumbIndex);
          },
          render() {
            return h('div');
          },
        }),
      );
      const vm = wrapper.vm;

      // clientX = -10 (less than 0), clamp to min 0
      let result = vm.calculateNewTrackValue(0, -10, EThumbPosition.LEFT);
      expect(result).toBe(0);

      // clientX = 110 (greater than offsetWidth), clamp to max 100
      result = vm.calculateNewTrackValue(0, 110, EThumbPosition.LEFT);
      expect(result).toBe(100);
    });

    it('Should calculate new value for array value with left thumb.', () => {
      const emits = vi.fn();
      const sliderRef = shallowRef({
        getBoundingClientRect: () => ({ left: 0 }),
        offsetWidth: 100,
      } as unknown as HTMLDivElement);
      const currentThumbIndex = ref(-1);
      const wrapper = mount(
        defineComponent({
          setup() {
            return useSlider(defaultMock.mockProps, emits, sliderRef, currentThumbIndex);
          },
          render() {
            return h('div');
          },
        }),
      );
      const vm = wrapper.vm;

      const value = [20, 80];
      // clientX = 30, newValue = 30 rounded by step 10 = 30
      const result = vm.calculateNewTrackValue(value, 30, EThumbPosition.LEFT);
      expect(result).toStrictEqual([30, 80]);
    });

    it('Should calculate new value for array value with right thumb.', () => {
      const emits = vi.fn();
      const sliderRef = shallowRef({
        getBoundingClientRect: () => ({ left: 0 }),
        offsetWidth: 100,
      } as unknown as HTMLDivElement);
      const currentThumbIndex = ref(-1);
      const wrapper = mount(
        defineComponent({
          setup() {
            return useSlider(defaultMock.mockProps, emits, sliderRef, currentThumbIndex);
          },
          render() {
            return h('div');
          },
        }),
      );
      const vm = wrapper.vm;

      const value = [20, 80];
      // clientX = 70, newValue = 70 rounded by step 10 = 70
      const result = vm.calculateNewTrackValue(value, 70, EThumbPosition.RIGHT);
      expect(result).toStrictEqual([20, 70]);
    });

    it('Should use points prop to find closest point.', () => {
      const emits = vi.fn();
      const sliderRef = shallowRef({
        getBoundingClientRect: () => ({ left: 0 }),
        offsetWidth: 100,
      } as unknown as HTMLDivElement);
      const currentThumbIndex = ref(-1);
      const wrapper = mount(
        defineComponent({
          setup() {
            return useSlider(
              { ...defaultMock.mockProps, points: defaultMock.pointsProp },
              emits,
              sliderRef,
              currentThumbIndex,
            );
          },
          render() {
            return h('div');
          },
        }),
      );
      const vm = wrapper.vm;

      // clientX = 40, value ~40, closest point 50
      const result = vm.calculateNewTrackValue(0, 40, EThumbPosition.LEFT);
      expect(result).toBe(50);
    });

    it('Should clamp array values correctly when new values cross.', () => {
      const emits = vi.fn();
      const sliderRef = shallowRef({
        getBoundingClientRect: () => ({ left: 0 }),
        offsetWidth: 100,
      } as unknown as HTMLDivElement);
      const currentThumbIndex = ref(-1);
      const wrapper = mount(
        defineComponent({
          setup() {
            return useSlider(defaultMock.mockProps, emits, sliderRef, currentThumbIndex);
          },
          render() {
            return h('div');
          },
        }),
      );
      const vm = wrapper.vm;

      const value = [30, 70];
      // Move left thumb to 80 (crosses right thumb)
      const result = vm.calculateNewTrackValue(value, 80, EThumbPosition.LEFT);
      // Should clamp left thumb to right thumb value 70
      expect(result).toStrictEqual([70, 70]);
    });
  });

  describe('calculateFirstWithThumbIndex Function', () => {
    it('Should set currentThumbIndex to first track with thumb.', () => {
      const emits = vi.fn();
      const currentThumbIndex = ref(-1);
      const sliderRef = shallowRef(null);
      const wrapper = mount(
        defineComponent({
          setup() {
            return useSlider(
              {
                ...defaultMock.mockProps,
                tracks: [
                  { key: 'a', thumb: false, label: false, zIndex: 0 },
                  { key: 'b', thumb: true, label: false, zIndex: 0 },
                ],
              },
              emits,
              sliderRef,
              currentThumbIndex,
            );
          },
          render() {
            return h('div');
          },
        }),
      );
      const vm = wrapper.vm;

      vm.calculateFirstWithThumbIndex();
      expect(currentThumbIndex.value).toBe(1);
    });

    it('Should not change currentThumbIndex if already set.', () => {
      const emits = vi.fn();
      const currentThumbIndex = ref(2);
      const sliderRef = shallowRef(null);
      const wrapper = mount(
        defineComponent({
          setup() {
            return useSlider(defaultMock.mockProps, emits, sliderRef, currentThumbIndex);
          },
          render() {
            return h('div');
          },
        }),
      );
      const vm = wrapper.vm;

      vm.calculateFirstWithThumbIndex();
      expect(currentThumbIndex.value).toBe(2);
    });
  });

  describe('calculateFirstWithThumbIndex Function', () => {
    it('Should do nothing if no track with thumb.', () => {
      const emits = vi.fn();
      const currentThumbIndex = ref(-1);
      const sliderRef = shallowRef(null);
      const wrapper = mount(
        defineComponent({
          setup() {
            return useSlider(
              {
                ...defaultMock.mockProps,
                tracks: [{ key: 'a', thumb: false, label: false, zIndex: 0 }],
              },
              emits,
              sliderRef,
              currentThumbIndex,
            );
          },
          render() {
            return h('div');
          },
        }),
      );
      const vm = wrapper.vm;

      vm.calculateFirstWithThumbIndex();
      expect(currentThumbIndex.value).toBe(-1);
    });
  });

  describe('getDirection Function', () => {
    it('Should return RIGHT for single value.', () => {
      const emits = vi.fn();
      const currentThumbIndex = ref(-1);
      const sliderRef = shallowRef({
        offsetWidth: 100,
      } as unknown as HTMLDivElement);
      const wrapper = mount(
        defineComponent({
          setup() {
            return useSlider(defaultMock.mockProps, emits, sliderRef, currentThumbIndex);
          },
          render() {
            return h('div');
          },
        }),
      );
      const vm = wrapper.vm;

      const direction = vm.getDirection(50, 50);
      expect(direction).toBe(EThumbPosition.RIGHT);
    });

    it('Should return LEFT if clientValue less than midpoint for array value.', () => {
      const emits = vi.fn();
      const currentThumbIndex = ref(-1);
      const sliderRef = shallowRef({
        offsetWidth: 100,
      } as unknown as HTMLDivElement);
      const wrapper = mount(
        defineComponent({
          setup() {
            return useSlider(defaultMock.mockProps, emits, sliderRef, currentThumbIndex);
          },
          render() {
            return h('div');
          },
        }),
      );
      const vm = wrapper.vm;

      const value = [20, 80];
      // clientX = 30 maps to clientValue ~30
      const direction = vm.getDirection(value, 30);
      expect(direction).toBe(EThumbPosition.LEFT);
    });

    it('Should return RIGHT if clientValue greater than midpoint for array value.', () => {
      const emits = vi.fn();
      const currentThumbIndex = ref(-1);
      const sliderRef = shallowRef({
        offsetWidth: 100,
      } as unknown as HTMLDivElement);
      const wrapper = mount(
        defineComponent({
          setup() {
            return useSlider(defaultMock.mockProps, emits, sliderRef, currentThumbIndex);
          },
          render() {
            return h('div');
          },
        }),
      );
      const vm = wrapper.vm;

      const value = [20, 80];
      // clientX = 70 maps to clientValue ~70
      const direction = vm.getDirection(value, 70);
      expect(direction).toBe(EThumbPosition.RIGHT);
    });
  });

  describe('findClosestPoint Function', () => {
    it('Should return value if no points defined.', () => {
      const wrapper = mountWithComposable({
        ...defaultMock.mockProps,
      });
      const vm = wrapper.vm;

      expect(vm.findClosestPoint(42)).toBe(42);
    });

    it('Should return closest point from points array.', () => {
      const wrapper = mountWithComposable({
        ...defaultMock.mockProps,
        points: defaultMock.pointsProp,
      });
      const vm = wrapper.vm;

      expect(vm.findClosestPoint(42)).toBe(50);
      expect(vm.findClosestPoint(10)).toBe(0);
      expect(vm.findClosestPoint(90)).toBe(100);
    });
  });

  describe('updateValue Function', () => {
    it('Should emit update:model-value with updated array.', () => {
      const wrapper = mountWithComposable({
        ...defaultMock.mockProps,
        modelValue: [0],
      });
      const vm = wrapper.vm;

      vm.updateValue(50, 0);
      expect(vm.emits).toHaveBeenCalledWith('update:model-value', expect.arrayContaining([50]));
    });
  });

  describe('onMouseOver Function', () => {
    it('Should set hovered to true on onMouseOver.', () => {
      const wrapper = mountWithComposable(defaultMock.mockProps);
      const vm = wrapper.vm;

      vm.onMouseOver();
      expect(wrapper.vm.componentClasses).toContain(defaultMock.hoveredModifier);
    });
  });

  describe('onMouseLeave Function', () => {
    it('Should set hovered to false on onMouseLeave.', () => {
      const wrapper = mountWithComposable(defaultMock.mockProps);
      const vm = wrapper.vm;

      vm.onMouseOver();
      vm.onMouseLeave();
      expect(vm.componentClasses).not.toContain(defaultMock.hoveredModifier);
    });
  });

  describe('onExpandEnter Function', () => {
    it('Should set height on onExpandEnter.', () => {
      const wrapper = mountWithComposable(defaultMock.mockProps);
      const vm = wrapper.vm;

      const el = document.createElement('div');
      Object.defineProperty(el, 'scrollHeight', { value: 123, configurable: true });
      vm.onExpandEnter(el);

      expect(el.style.height).toBe('123px');
    });
  });

  describe('onExpandAfterEnter Function', () => {
    it('Should set height to auto on onExpandAfterEnter.', () => {
      const wrapper = mountWithComposable(defaultMock.mockProps);
      const vm = wrapper.vm;

      const el = document.createElement('div');
      vm.onExpandAfterEnter(el);

      expect(el.style.height).toBe('auto');
    });
  });

  describe('onExpandBeforeLeave Function', () => {
    it('Should set height on onExpandBeforeLeave.', () => {
      const wrapper = mountWithComposable(defaultMock.mockProps);
      const vm = wrapper.vm;

      const el = document.createElement('div');
      Object.defineProperty(el, 'scrollHeight', { value: 456, configurable: true });
      vm.onExpandBeforeLeave(el);

      expect(el.style.height).toBe('456px');
    });
  });
});
