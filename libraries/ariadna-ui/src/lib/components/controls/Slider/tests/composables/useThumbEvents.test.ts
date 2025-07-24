import { describe, it, expect, vi } from 'vitest';
import { defineComponent, h, shallowRef, ref } from 'vue';
import { mount } from '@vue/test-utils';
import useSlider from '../../composables/useSlider/useSlider';
import useThumbEvents from '../../composables/useThumbEvents/useThumbEvents';
import { SliderSelectorTestData } from '../test-data/Slider.selector.test-data';
import type { TSliderEmits, TSliderProps } from '../../Slider';
import type { TCurrentActivityType } from '../../types/Slider.types';
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
  const emits = vi.fn() as unknown as TSliderEmits;

  const sliderRef = shallowRef(null);
  const currentThumbIndex = ref(-1);
  const currentActivity = ref<TCurrentActivityType | null>(null);
  const thumbsDrag = ref(new Map<string, boolean>());
  const touchActive = ref(false);
  const lastTouchPosition = ref(0);

  // Используем useSlider для получения calculateNewTrackValue и updateValue
  const sliderComposable = useSlider(props, emits, sliderRef, currentThumbIndex);

  return mount(
    defineComponent({
      setup() {
        const thumbEvents = useThumbEvents(
          props,
          emits,
          currentThumbIndex,
          currentActivity,
          thumbsDrag,
          touchActive,
          lastTouchPosition,
          sliderComposable.calculateNewTrackValue,
          sliderComposable.updateValue,
        );
        return {
          ...thumbEvents,
          emits,
          currentThumbIndex,
          currentActivity,
          thumbsDrag,
          touchActive,
          lastTouchPosition,
          sliderComposable,
        };
      },
      render() {
        return h('div');
      },
    }),
  );
}

describe('useThumbEvents', () => {
  describe('onThumbMouseDown Function', () => {
    it('Should return early if touchActive is true.', () => {
      const wrapper = mountWithComposable(defaultMock.mockProps);
      const vm = wrapper.vm;

      vm.touchActive = true;
      const event = { clientX: 50 } as MouseEvent;
      vm.onThumbMouseDown(event, 0, EThumbPosition.LEFT);

      expect(wrapper.vm.currentActivity).toBe(null);
      expect(wrapper.vm.emits).not.toHaveBeenCalled();
    });

    it('Should call thumbPointerDown with correct clientX, index, position.', () => {
      const wrapper = mountWithComposable(defaultMock.mockProps);
      const vm = wrapper.vm;

      vm.touchActive = false;
      const event = { clientX: 30 } as MouseEvent;
      vm.onThumbMouseDown(event, 1, EThumbPosition.RIGHT);

      expect(wrapper.vm.currentActivity).toEqual({
        thumb: true,
        thumbData: { direction: EThumbPosition.RIGHT, index: 1 },
      });
      expect(wrapper.vm.currentThumbIndex).toBe(1);
      expect(wrapper.vm.thumbsDrag.get(`${EThumbPosition.RIGHT}-1`)).toBe(true);
      expect(wrapper.vm.emits).toHaveBeenCalledWith('changeStart', {
        track: defaultMock.mockProps.tracks[1],
        value: expect.anything(),
        index: 1,
      });
    });

    it('Should return early if event.clientX <= 0.', () => {
      const wrapper = mountWithComposable(defaultMock.mockProps);
      const vm = wrapper.vm;

      vm.touchActive = false;
      const event = { clientX: 0 } as MouseEvent;
      vm.onThumbMouseDown(event, 0, EThumbPosition.LEFT);

      expect(vm.currentActivity).toBe(null);
      expect(vm.emits).not.toHaveBeenCalled();
    });
  });

  describe('onThumbTouchStart Function', () => {
    it('Should set touchActive to true.', () => {
      const wrapper = mountWithComposable(defaultMock.mockProps);
      const vm = wrapper.vm;

      const event = { touches: [{ clientX: 40 }] } as unknown as TouchEvent;
      vm.touchActive = false;
      vm.onThumbTouchStart(event, 0, EThumbPosition.LEFT);

      expect(vm.touchActive).toBe(true);
    });

    it('Should return early if event.touches.length !== 1.', () => {
      const wrapper = mountWithComposable(defaultMock.mockProps);
      const vm = wrapper.vm;

      const event = { touches: [{ clientX: 40 }, { clientX: 50 }] } as unknown as TouchEvent;
      vm.touchActive = false;
      vm.onThumbTouchStart(event, 0, EThumbPosition.LEFT);

      expect(vm.emits).not.toHaveBeenCalled();
      expect(vm.currentActivity).toBe(null);
    });

    it('Should call thumbPointerDown with correct clientX, index, position.', () => {
      const wrapper = mountWithComposable(defaultMock.mockProps);
      const vm = wrapper.vm;

      const event = { touches: [{ clientX: 55 }] } as unknown as TouchEvent;
      vm.touchActive = false;
      vm.onThumbTouchStart(event, 1, EThumbPosition.RIGHT);

      expect(wrapper.vm.currentActivity).toEqual({
        thumb: true,
        thumbData: { direction: EThumbPosition.RIGHT, index: 1 },
      });
      expect(wrapper.vm.currentThumbIndex).toBe(1);
      expect(wrapper.vm.thumbsDrag.get(`${EThumbPosition.RIGHT}-1`)).toBe(true);
      expect(wrapper.vm.emits).toHaveBeenCalledWith('changeStart', {
        track: defaultMock.mockProps.tracks[1],
        value: expect.anything(),
        index: 1,
      });
    });

    it('Should return early if touch.clientX <= 0.', () => {
      const wrapper = mountWithComposable(defaultMock.mockProps);
      const vm = wrapper.vm;

      const event = { touches: [{ clientX: 0 }] } as unknown as TouchEvent;
      vm.touchActive = false;
      vm.onThumbTouchStart(event, 0, EThumbPosition.LEFT);

      expect(vm.currentActivity).toBe(null);
      expect(vm.emits).not.toHaveBeenCalled();
    });
  });

  describe('onThumbPointerMove', () => {
    it('Should return early if clientX <= 0.', () => {
      const wrapper = mountWithComposable(defaultMock.mockProps);
      const vm = wrapper.vm;

      vm.onThumbPointerMove(0, 0, EThumbPosition.LEFT);
      expect(vm.emits).not.toHaveBeenCalled();
    });

    it('Should call calculateNewTrackValue, updateValue and emit "change" event with correct params.', () => {
      const wrapper = mountWithComposable(defaultMock.mockProps);
      const vm = wrapper.vm;

      vm.onThumbPointerMove(60, 0, EThumbPosition.LEFT);

      expect(vm.emits).toHaveBeenCalledWith('change', {
        track: defaultMock.mockProps.tracks[0],
        value: expect.anything(),
        index: 0,
      });
    });
  });

  describe('onThumbPointerUp', () => {
    it('Should return early if clientX <= 0.', () => {
      const wrapper = mountWithComposable(defaultMock.mockProps);
      const vm = wrapper.vm;

      vm.onThumbPointerUp(0, 0, EThumbPosition.LEFT);

      expect(vm.emits).not.toHaveBeenCalled();
    });

    it('Should set thumbsDrag for key to false.', () => {
      const wrapper = mountWithComposable(defaultMock.mockProps);
      const vm = wrapper.vm;

      // Сначала установим true
      vm.thumbsDrag.set(`${EThumbPosition.LEFT}-0`, true);
      vm.onThumbPointerUp(70, 0, EThumbPosition.LEFT);

      expect(wrapper.vm.thumbsDrag.get(`${EThumbPosition.LEFT}-0`)).toBe(false);
    });

    it('Should call calculateNewTrackValue, updateValue and emit "changeEnd" event with correct params.', () => {
      const wrapper = mountWithComposable(defaultMock.mockProps);
      const vm = wrapper.vm;

      vm.onThumbPointerUp(70, 1, EThumbPosition.RIGHT);

      expect(vm.emits).toHaveBeenCalledWith('changeEnd', {
        track: defaultMock.mockProps.tracks[1],
        value: expect.anything(),
        index: 1,
      });
    });
  });
});
