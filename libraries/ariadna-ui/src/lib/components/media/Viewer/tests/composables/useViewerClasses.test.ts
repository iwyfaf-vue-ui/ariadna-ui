import { describe, it, expect } from 'vitest';
import { ref, computed, reactive, defineComponent, h } from 'vue';
import { mount } from '@vue/test-utils';
import useViewerClasses from '../../composables/useViewerClasses/useViewerClasses';
import type { TViewerProps } from '../../Viewer';
import { ViewerSelectorTestData } from '../test-data/Viewer.selector.test-data';

const defaultMock = new ViewerSelectorTestData();

describe('useViewerClasses', () => {
  function mountWithComposable(
    props: TViewerProps,
    {
      isDragging = false,
      sliderIsResize = false,
      sliderIsCalculating = false,
      nextButtonDisabled = false,
      prevButtonDisabled = false,
      isScaled = false,
    } = {},
  ) {
    const sliderIsResizeRef = ref(sliderIsResize);
    const sliderIsCalculatingRef = ref(sliderIsCalculating);
    const nextButtonDisabledComputed = computed(() => nextButtonDisabled);
    const prevButtonDisabledComputed = computed(() => prevButtonDisabled);

    const swipeCore = reactive({
      isDragging,
    }) as any;

    const zoomCore = reactive({
      isScaled,
    }) as any;

    let composableResult: ReturnType<typeof useViewerClasses> | null = null;

    const wrapper = mount(
      defineComponent({
        setup() {
          composableResult = useViewerClasses(
            props,
            sliderIsResizeRef,
            sliderIsCalculatingRef,
            nextButtonDisabledComputed,
            prevButtonDisabledComputed,
            swipeCore,
            zoomCore,
          );
          return { ...composableResult };
        },
        render() {
          return h('div');
        },
      }),
    );

    return {
      wrapper,
      ...composableResult!,
    };
  }

  describe('Basic functionality', () => {
    it('Should return expected structure.', () => {
      const { wrapper } = mountWithComposable(defaultMock.mockProps);
      const vm = wrapper.vm;

      expect(vm).toHaveProperty('sliderClasses');
      expect(vm).toHaveProperty('nextButtonClasses');
      expect(vm).toHaveProperty('prevButtonClasses');
      expect(vm).toHaveProperty('contentClasses');
    });
  });

  describe('sliderClasses', () => {
    it('Should always include base slider class.', () => {
      const { sliderClasses } = mountWithComposable(defaultMock.mockProps);

      expect(sliderClasses.value).toHaveProperty(
        defaultMock.getSelectorWithDot(defaultMock.sliderEl),
        true,
      );
    });

    it('Should include --no-transition if isDragging is true.', () => {
      const { sliderClasses } = mountWithComposable(defaultMock.mockProps, { isDragging: true });

      expect(sliderClasses.value).toHaveProperty(
        defaultMock.getSelectorWithDot(defaultMock.sliderNoTransitionModifier),
        true,
      );
    });

    it('Should include --no-transition if sliderIsResize is true.', () => {
      const { sliderClasses } = mountWithComposable(defaultMock.mockProps, {
        sliderIsResize: true,
      });

      expect(sliderClasses.value).toHaveProperty(
        defaultMock.getSelectorWithDot(defaultMock.sliderNoTransitionModifier),
        true,
      );
    });

    it('Should not include --no-transition if both isDragging and sliderIsResize are false.', () => {
      const { sliderClasses } = mountWithComposable(defaultMock.mockProps, {
        isDragging: false,
        sliderIsResize: false,
      });

      expect(
        sliderClasses.value[defaultMock.getSelectorWithDot(defaultMock.sliderNoTransitionModifier)],
      ).toBeFalsy();
    });

    it('Should include --is-calculating if sliderIsCalculating is true.', () => {
      const { sliderClasses } = mountWithComposable(defaultMock.mockProps, {
        sliderIsCalculating: true,
      });
      expect(sliderClasses.value).toHaveProperty(
        defaultMock.getSelectorWithDot(defaultMock.sliderIsCalculatingModifier),
        true,
      );
    });

    it('Should not include --is-calculating if sliderIsCalculating is false.', () => {
      const { sliderClasses } = mountWithComposable(defaultMock.mockProps, {
        sliderIsCalculating: false,
      });

      expect(
        sliderClasses.value[
          defaultMock.getSelectorWithDot(defaultMock.sliderIsCalculatingModifier)
        ],
      ).toBeFalsy();
    });
  });

  describe('nextButtonClasses', () => {
    it('Should always include base next button class.', () => {
      const { nextButtonClasses } = mountWithComposable(defaultMock.mockProps);

      expect(nextButtonClasses.value).toHaveProperty(
        defaultMock.getSelectorWithDot(defaultMock.controlsNextEl),
        true,
      );
    });

    it('Should include --disabled if nextButtonDisabled is true.', () => {
      const { nextButtonClasses } = mountWithComposable(defaultMock.mockProps, {
        nextButtonDisabled: true,
      });

      expect(nextButtonClasses.value).toHaveProperty(
        defaultMock.getSelectorWithDot(defaultMock.controlsNextDisabledModifier),
        true,
      );
    });

    it('Should not include --disabled if nextButtonDisabled is false.', () => {
      const { nextButtonClasses } = mountWithComposable(defaultMock.mockProps, {
        nextButtonDisabled: false,
      });

      expect(
        nextButtonClasses.value[
          defaultMock.getSelectorWithDot(defaultMock.controlsNextDisabledModifier)
        ],
      ).toBeFalsy();
    });
  });

  describe('prevButtonClasses', () => {
    it('Should always include base prev button class.', () => {
      const { prevButtonClasses } = mountWithComposable(defaultMock.mockProps);

      expect(prevButtonClasses.value).toHaveProperty(
        defaultMock.getSelectorWithDot(defaultMock.controlsPrevEl),
        true,
      );
    });

    it('Should include --disabled if prevButtonDisabled is true.', () => {
      const { prevButtonClasses } = mountWithComposable(defaultMock.mockProps, {
        prevButtonDisabled: true,
      });

      expect(prevButtonClasses.value).toHaveProperty(
        defaultMock.getSelectorWithDot(defaultMock.controlsPrevDisabledModifier),
        true,
      );
    });

    it('Should not include --disabled if prevButtonDisabled is false.', () => {
      const { prevButtonClasses } = mountWithComposable(defaultMock.mockProps, {
        prevButtonDisabled: false,
      });

      expect(
        prevButtonClasses.value[
          defaultMock.getSelectorWithDot(defaultMock.controlsPrevDisabledModifier)
        ],
      ).toBeFalsy();
    });
  });

  describe('contentClasses', () => {
    it('Should always include base content class.', () => {
      const { contentClasses } = mountWithComposable(defaultMock.mockProps);

      expect(contentClasses.value).toHaveProperty(
        defaultMock.getSelectorWithDot(defaultMock.contentEl),
        true,
      );
    });

    it('Should include --zoom if isScaled is true.', () => {
      const { contentClasses } = mountWithComposable(defaultMock.mockProps, { isScaled: true });

      expect(contentClasses.value).toHaveProperty(
        defaultMock.getSelectorWithDot(defaultMock.contentZoomModifier),
        true,
      );
    });

    it('Should not include --zoom if isScaled is false.', () => {
      const { contentClasses } = mountWithComposable(defaultMock.mockProps, { isScaled: false });

      expect(
        contentClasses.value[defaultMock.getSelectorWithDot(defaultMock.contentZoomModifier)],
      ).toBeFalsy();
    });
  });
});
