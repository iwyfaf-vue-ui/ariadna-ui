import { mount } from '@vue/test-utils';
import { defineComponent, h, ref, computed, reactive } from 'vue';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import useViewerUX from '../../composables/useViewerUX/useViewerUX';
import type { TViewerProps } from '../../Viewer';

type TViewerSwipeCore = {
  next: () => void;
  prev: () => void;
};

function mountWithComposable(
  props: TViewerProps,
  active = ref(true),
  nextButtonDisabled = computed(() => false),
  prevButtonDisabled = computed(() => false),
  swipeCore = reactive({ next: vi.fn(), prev: vi.fn() }) as any,
  close = vi.fn(),
) {
  return mount(
    defineComponent({
      setup() {
        const result = useViewerUX(
          props,
          active,
          nextButtonDisabled,
          prevButtonDisabled,
          swipeCore,
          close,
        );
        return { ...result, emits: close, swipeCore };
      },
      render() {
        return h('div');
      },
    }),
  );
}

describe('useViewerUX', () => {
  let swipeCore: TViewerSwipeCore;
  let close: ReturnType<typeof vi.fn>;
  let wrapper: ReturnType<typeof mountWithComposable>;

  beforeEach(() => {
    swipeCore = { next: vi.fn(), prev: vi.fn() };
    close = vi.fn();
  });

  afterEach(() => {
    if (wrapper) wrapper.unmount();
    vi.clearAllMocks();
  });

  describe('Basic functionality', () => {
    it('Should return expected structure.', () => {
      wrapper = mountWithComposable(
        {},
        ref(true),
        computed(() => false),
        computed(() => false),
        swipeCore,
        close,
      );
      const vm = wrapper.vm;

      expect(vm).toHaveProperty('onClickNext');
      expect(vm).toHaveProperty('onClickPrev');
      expect(vm).toHaveProperty('closeOnOverlayClick');
      expect(vm).toHaveProperty('onKeyPress');
    });
  });

  describe('onClickNext', () => {
    it('Should call swipeCore.next when nextButtonDisabled is false.', () => {
      wrapper = mountWithComposable(
        {},
        ref(true),
        computed(() => false),
        computed(() => false),
        swipeCore,
        close,
      );
      const vm = wrapper.vm;

      vm.onClickNext();
      expect(swipeCore.next).toHaveBeenCalledTimes(1);
    });

    it('Should not call swipeCore.next when nextButtonDisabled is true.', () => {
      wrapper = mountWithComposable(
        {},
        ref(true),
        computed(() => true),
        computed(() => false),
        swipeCore,
        close,
      );
      const vm = wrapper.vm;

      vm.onClickNext();
      expect(swipeCore.next).not.toHaveBeenCalled();
    });
  });

  describe('onClickPrev', () => {
    it('Should call swipeCore.prev when prevButtonDisabled is false.', () => {
      wrapper = mountWithComposable(
        {},
        ref(true),
        computed(() => false),
        computed(() => false),
        swipeCore,
        close,
      );
      const vm = wrapper.vm;

      vm.onClickPrev();
      expect(swipeCore.prev).toHaveBeenCalledTimes(1);
    });

    it('Should not call swipeCore.prev when prevButtonDisabled is true.', () => {
      wrapper = mountWithComposable(
        {},
        ref(true),
        computed(() => false),
        computed(() => true),
        swipeCore,
        close,
      );
      const vm = wrapper.vm;

      vm.onClickPrev();
      expect(swipeCore.prev).not.toHaveBeenCalled();
    });
  });

  describe('closeOnOverlayClick', () => {
    it('Should call close when noOverlayDismiss is not set.', () => {
      wrapper = mountWithComposable(
        {},
        ref(true),
        computed(() => false),
        computed(() => false),
        swipeCore,
        close,
      );
      const vm = wrapper.vm;

      vm.closeOnOverlayClick();
      expect(close).toHaveBeenCalledTimes(1);
    });

    it('Should not call close when noOverlayDismiss is true.', () => {
      wrapper = mountWithComposable(
        { noOverlayDismiss: true },
        ref(true),
        computed(() => false),
        computed(() => false),
        swipeCore,
        close,
      );
      const vm = wrapper.vm;

      vm.closeOnOverlayClick();
      expect(close).not.toHaveBeenCalled();
    });

    it('Should call close when noOverlayDismiss is false.', () => {
      wrapper = mountWithComposable(
        { noOverlayDismiss: false },
        ref(true),
        computed(() => false),
        computed(() => false),
        swipeCore,
        close,
      );
      const vm = wrapper.vm;

      vm.closeOnOverlayClick();
      expect(close).toHaveBeenCalledTimes(1);
    });
  });

  describe('onKeyPress', () => {
    it('Should do nothing if not active.', () => {
      wrapper = mountWithComposable(
        {},
        ref(false),
        computed(() => false),
        computed(() => false),
        swipeCore,
        close,
      );
      const vm = wrapper.vm;

      vm.onKeyPress(new KeyboardEvent('keydown', { code: 'ArrowLeft' }));
      expect(swipeCore.prev).not.toHaveBeenCalled();

      vm.onKeyPress(new KeyboardEvent('keydown', { code: 'ArrowRight' }));
      expect(swipeCore.next).not.toHaveBeenCalled();

      vm.onKeyPress(new KeyboardEvent('keydown', { code: 'Escape' }));
      expect(close).not.toHaveBeenCalled();
    });

    it('Should call onClickPrev on ArrowLeft.', () => {
      wrapper = mountWithComposable(
        {},
        ref(true),
        computed(() => false),
        computed(() => false),
        swipeCore,
        close,
      );
      const vm = wrapper.vm;

      vm.onKeyPress(new KeyboardEvent('keydown', { code: 'ArrowLeft' }));
      expect(swipeCore.prev).toHaveBeenCalledTimes(1);
    });

    it('Should call onClickNext on ArrowRight.', () => {
      wrapper = mountWithComposable(
        {},
        ref(true),
        computed(() => false),
        computed(() => false),
        swipeCore,
        close,
      );
      const vm = wrapper.vm;

      vm.onKeyPress(new KeyboardEvent('keydown', { code: 'ArrowRight' }));
      expect(swipeCore.next).toHaveBeenCalledTimes(1);
    });

    it('Should call close on Escape if noEscDismiss is not set.', () => {
      wrapper = mountWithComposable(
        {},
        ref(true),
        computed(() => false),
        computed(() => false),
        swipeCore,
        close,
      );
      const vm = wrapper.vm;

      vm.onKeyPress(new KeyboardEvent('keydown', { code: 'Escape' }));
      expect(close).toHaveBeenCalledTimes(1);
    });

    it('Should not call close on Escape if noEscDismiss is true.', () => {
      wrapper = mountWithComposable(
        { noEscDismiss: true },
        ref(true),
        computed(() => false),
        computed(() => false),
        swipeCore,
        close,
      );
      const vm = wrapper.vm;

      vm.onKeyPress(new KeyboardEvent('keydown', { code: 'Escape' }));
      expect(close).not.toHaveBeenCalled();
    });

    it('Should call close on Escape if noEscDismiss is false.', () => {
      wrapper = mountWithComposable(
        { noEscDismiss: false },
        ref(true),
        computed(() => false),
        computed(() => false),
        swipeCore,
        close,
      );
      const vm = wrapper.vm;

      vm.onKeyPress(new KeyboardEvent('keydown', { code: 'Escape' }));
      expect(close).toHaveBeenCalledTimes(1);
    });
  });

  describe('window event listeners', () => {
    let addEventListenerSpy: ReturnType<typeof vi.spyOn>;
    let removeEventListenerSpy: ReturnType<typeof vi.spyOn>;

    beforeEach(() => {
      addEventListenerSpy = vi.spyOn(window, 'addEventListener');
      removeEventListenerSpy = vi.spyOn(window, 'removeEventListener');
    });

    afterEach(() => {
      addEventListenerSpy.mockRestore();
      removeEventListenerSpy.mockRestore();
    });

    it('Should add and remove keydown event listener on mount/unmount.', () => {
      wrapper = mountWithComposable(
        {},
        ref(true),
        computed(() => false),
        computed(() => false),
        swipeCore,
        close,
      );

      expect(addEventListenerSpy).toHaveBeenCalledWith('keydown', expect.any(Function));

      wrapper.unmount();
      expect(removeEventListenerSpy).toHaveBeenCalledWith('keydown', expect.any(Function));
    });
  });
});
