import { describe, it, expect, vi } from 'vitest';
import { defineComponent, h, shallowRef, ref } from 'vue';
import { mount } from '@vue/test-utils';
import useSlider from '../../composables/useSlider/useSlider';
import useSliderEvents from '../../composables/useSliderEvents/useSliderEvents';
import { SliderSelectorTestData } from '../test-data/Slider.selector.test-data';
import type { TSliderEmits, TSliderProps } from '../../Slider';

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

  // Используем useSlider для получения функций getDirection, calculateFirstWithThumbIndex, calculateNewTrackValue, updateValue
  const sliderComposable = useSlider(
    props,
    emits as unknown as TSliderEmits,
    sliderRef,
    currentThumbIndex,
  );

  return mount(
    defineComponent({
      setup() {
        const sliderEvents = useSliderEvents(
          props,
          emits as unknown as TSliderEmits,
          currentThumbIndex,
          ref(null),
          ref(false),
          ref(0),
          sliderComposable.getDirection,
          sliderComposable.calculateFirstWithThumbIndex,
          sliderComposable.calculateNewTrackValue,
          sliderComposable.updateValue,
        );
        return { ...sliderEvents, emits, currentThumbIndex };
      },
      render() {
        return h('div');
      },
    }),
  );
}

describe('useSliderEvents', () => {
  describe('onSliderPointerDown Function', () => {
    it('Should return early if clientX <= 0.', () => {
      const wrapper = mountWithComposable(defaultMock.mockProps);
      const vm = wrapper.vm;

      const result = vm.onSliderPointerDown(0);
      expect(result).toBeUndefined();
    });

    it('Should call calculateFirstWithThumbIndex and emit changeStart.', () => {
      const wrapper = mountWithComposable(defaultMock.mockProps);
      const vm = wrapper.vm;

      vm.onSliderPointerDown(50);
      expect(vm.emits).toHaveBeenCalledWith(
        'changeStart',
        expect.objectContaining({
          track: defaultMock.mockProps.tracks[0],
          value: 0,
          index: 0,
        }),
      );
    });
  });

  describe('onSliderMouseDown Function', () => {
    it('Should call onSliderPointerDown with event.clientX.', () => {
      const wrapper = mountWithComposable(defaultMock.mockProps);
      const vm = wrapper.vm;

      const event = { clientX: 50 } as MouseEvent;
      vm.onSliderMouseDown(event);
      expect(vm.emits).toHaveBeenCalledWith('changeStart', expect.anything());
    });
  });

  describe('onSliderTouchStart Function', () => {
    it('Should return early if touches length !== 1.', () => {
      const wrapper = mountWithComposable(defaultMock.mockProps);
      const vm = wrapper.vm;

      const event = {
        touches: [{ clientX: 30 }, { clientX: 40 }],
      } as unknown as TouchEvent;
      vm.onSliderTouchStart(event);

      expect(vm.emits).not.toHaveBeenCalledWith('changeStart', expect.anything());
    });

    it('Should call onSliderPointerDown with touch.clientX.', () => {
      const wrapper = mountWithComposable(defaultMock.mockProps);
      const vm = wrapper.vm;

      const event = {
        touches: [{ clientX: 55 }],
      } as unknown as TouchEvent;
      vm.onSliderTouchStart(event);

      expect(vm.emits).toHaveBeenCalledWith(
        'changeStart',
        expect.objectContaining({
          track: expect.any(Object),
          value: expect.anything(),
          index: expect.any(Number),
        }),
      );
    });
  });

  describe('onSliderPointerMove Function', () => {
    it('Should return early if clientX <= 0.', () => {
      const wrapper = mountWithComposable(defaultMock.mockProps);
      const vm = wrapper.vm;

      const result = vm.onSliderPointerMove(0);
      expect(result).toBeUndefined();
    });

    it('Should call calculateFirstWithThumbIndex, updateValue and emit change.', () => {
      const wrapper = mountWithComposable(defaultMock.mockProps);
      const vm = wrapper.vm;

      vm.onSliderPointerMove(50);
      expect(vm.emits).toHaveBeenCalledWith(
        'change',
        expect.objectContaining({
          track: expect.any(Object),
          value: expect.anything(),
          index: expect.any(Number),
        }),
      );
    });
  });

  describe('onSliderPointerUp Function', () => {
    it('Should return early if clientX <= 0.', () => {
      const wrapper = mountWithComposable(defaultMock.mockProps);
      const vm = wrapper.vm;

      const result = vm.onSliderPointerUp(0);
      expect(result).toBeUndefined();
    });

    it('Should call calculateFirstWithThumbIndex, updateValue and emit changeEnd.', () => {
      const wrapper = mountWithComposable(defaultMock.mockProps);
      const vm = wrapper.vm;

      vm.onSliderPointerUp(50);
      expect(vm.emits).toHaveBeenCalledWith(
        'changeEnd',
        expect.objectContaining({
          track: expect.any(Object),
          value: expect.anything(),
          index: expect.any(Number),
        }),
      );
    });
  });
});
