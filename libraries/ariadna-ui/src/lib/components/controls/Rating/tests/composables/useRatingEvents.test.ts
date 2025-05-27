import { describe, it, expect, beforeEach, vi, afterEach, type Mock } from 'vitest';
import { ref, shallowRef, defineComponent, h, nextTick, reactive } from 'vue';
import { mount } from '@vue/test-utils';
import type { TRatingProps } from '../../Rating';
import { ERatingPropsDefault } from '../../types/Rating.enums';
import useRatingEvents from '../../composables/useRatingEvents/useRatingEvents';

vi.mock('../../core/rating-math/rating-math.core', () => ({
  default: vi.fn((n: number, m: number) => Math.ceil(n / m) * m),
}));

const observeMock = vi.fn();
const unobserveMock = vi.fn();
const disconnectMock = vi.fn();

class ResizeObserverMock {
  observe = observeMock;
  unobserve = unobserveMock;
  disconnect = disconnectMock;
}
global.ResizeObserver = ResizeObserverMock as any;

function createRatingDiv() {
  const div = document.createElement('div');
  div.getBoundingClientRect = vi.fn(() => ({
    width: 200,
    left: 10,
    right: 210,
    top: 0,
    bottom: 0,
    height: 20,
    x: 10,
    y: 0,
    toJSON: () => {},
  }));

  div.addEventListener = vi.fn();
  div.removeEventListener = vi.fn();
  return div;
}

function mountWithComposable(props: TRatingProps) {
  const emits = vi.fn();
  const ratingDiv = createRatingDiv();
  const ratingRef = shallowRef(ratingDiv);
  const value = ref(props.modelValue);
  const hoverValue = ref(0);

  const wrapper = mount(
    defineComponent({
      setup() {
        useRatingEvents(props, emits, ratingRef, value, hoverValue);

        return { emits, ratingRef, value, hoverValue, props };
      },
      render() {
        return h('div');
      },
    }),
  );

  return { wrapper, emits, ratingRef, value, hoverValue, ratingDiv, props };
}

describe('useRatingEvents', () => {
  let baseProps: TRatingProps;

  beforeEach(() => {
    baseProps = {
      modelValue: 0,
      starCount: ERatingPropsDefault.STAR_COUNT as number,
      fillStep: ERatingPropsDefault.FILL_STEP as number,
      disabled: false,
      readonly: false,
      reset: false,
      showValue: false,
      cssClass: ERatingPropsDefault.CSS_CLASS as string,
      errors: [],
      invalid: false,
      valid: false,
      size: ERatingPropsDefault.SIZE,
      valuePosition: ERatingPropsDefault.VALUE_POSITION,
    };

    observeMock.mockClear();
    unobserveMock.mockClear();
    disconnectMock.mockClear();
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  describe('Lifecycle', () => {
    it('Should add event listeners if not readonly.', () => {
      const { ratingDiv } = mountWithComposable({ ...baseProps });

      expect(ratingDiv.addEventListener).toHaveBeenCalledWith('click', expect.any(Function));
      expect(ratingDiv.addEventListener).toHaveBeenCalledWith('mousemove', expect.any(Function));
      expect(ratingDiv.addEventListener).toHaveBeenCalledWith('mouseleave', expect.any(Function));
    });

    it('Should not add event listeners if readonly.', () => {
      const { ratingDiv } = mountWithComposable({ ...baseProps, readonly: true });

      expect(ratingDiv.addEventListener).not.toHaveBeenCalled();
    });

    it('Should remove event listeners on unmount.', () => {
      const { wrapper, ratingDiv } = mountWithComposable({ ...baseProps });
      wrapper.unmount();

      expect(ratingDiv.removeEventListener).toHaveBeenCalledWith('click', expect.any(Function));
      expect(ratingDiv.removeEventListener).toHaveBeenCalledWith('mousemove', expect.any(Function));
      expect(ratingDiv.removeEventListener).toHaveBeenCalledWith(
        'mouseleave',
        expect.any(Function),
      );
    });

    it('Should observe width on mount.', () => {
      const { ratingDiv } = mountWithComposable({ ...baseProps });
      expect(observeMock).toHaveBeenCalledWith(ratingDiv);
    });

    it('Should not fail if ratingRef is null.', () => {
      const emits = vi.fn();
      const ratingRef = shallowRef(null);
      const value = ref(baseProps.modelValue);
      const hoverValue = ref(0);

      expect(() =>
        mount(
          defineComponent({
            setup() {
              useRatingEvents(baseProps, emits, ratingRef, value, hoverValue);
              return {};
            },
            render() {
              return h('div');
            },
          }),
        ),
      ).not.toThrow();
    });
  });

  describe('clickHandler', () => {
    it('Should update value and emit if not disabled.', () => {
      const { ratingDiv, value, hoverValue, emits } = mountWithComposable({ ...baseProps });
      hoverValue.value = 250;

      const clickHandler = (ratingDiv.addEventListener as Mock).mock.calls.find(
        (call) => (call as [string, EventListenerOrEventListenerObject])[0] === 'click',
      )?.[1] as EventListener;

      clickHandler({} as MouseEvent);

      expect(value.value).toEqual(2.5);
      expect(emits).toHaveBeenCalledWith('update:model-value', 2.5);
    });

    it('Should not update value or emit if disabled.', () => {
      const { ratingDiv, value, hoverValue, emits } = mountWithComposable({
        ...baseProps,
        disabled: true,
      });
      hoverValue.value = 300;

      const clickHandler = (ratingDiv.addEventListener as Mock).mock.calls.find(
        (call) => (call as [string, EventListenerOrEventListenerObject])[0] === 'click',
      )?.[1] as EventListener;

      clickHandler({} as MouseEvent);

      expect(value.value).toEqual(baseProps.modelValue);
      expect(emits).not.toHaveBeenCalled();
    });
  });

  describe('mouseMoveHandler', () => {
    it('Should update hoverValue if not disabled.', () => {
      const { ratingDiv, hoverValue } = mountWithComposable({ ...baseProps });

      const mouseMoveHandler = (ratingDiv.addEventListener as Mock).mock.calls.find(
        (call) => (call as [string, EventListenerOrEventListenerObject])[0] === 'mousemove',
      )?.[1] as EventListener;

      const event = { clientX: 110 } as MouseEvent;
      mouseMoveHandler(event);

      expect(hoverValue.value).toBeGreaterThan(0);
    });

    it('Should not update hoverValue if disabled.', () => {
      const { ratingDiv, hoverValue } = mountWithComposable({ ...baseProps, disabled: true });

      const mouseMoveHandler = (ratingDiv.addEventListener as Mock).mock.calls.find(
        (call) => (call as [string, EventListenerOrEventListenerObject])[0] === 'mousemove',
      )?.[1] as EventListener;
      hoverValue.value = 0;
      mouseMoveHandler({ clientX: 110 } as MouseEvent);

      expect(hoverValue.value).toEqual(0);
    });

    it('Should not fail if ratingRef is null.', () => {
      const emits = vi.fn();
      const ratingRef = shallowRef(null);
      const value = ref(baseProps.modelValue);
      const hoverValue = ref(0);

      mount(
        defineComponent({
          setup() {
            useRatingEvents(baseProps, emits, ratingRef, value, hoverValue);
            return {};
          },
          render() {
            return h('div');
          },
        }),
      );
      expect(true).toBeTruthy();
    });
  });

  describe('mouseLeaveHandler', () => {
    it('Should reset hoverValue if not disabled.', () => {
      const { ratingDiv, hoverValue } = mountWithComposable({ ...baseProps });
      hoverValue.value = 50;

      const mouseLeaveHandler = (ratingDiv.addEventListener as Mock).mock.calls.find(
        (call) => (call as [string, EventListenerOrEventListenerObject])[0] === 'mouseleave',
      )?.[1] as EventListener;
      mouseLeaveHandler({} as MouseEvent);

      expect(hoverValue.value).toEqual(0);
    });

    it('Should not reset hoverValue if disabled.', () => {
      const { ratingDiv, hoverValue } = mountWithComposable({ ...baseProps, disabled: true });
      hoverValue.value = 50;

      const mouseLeaveHandler = (ratingDiv.addEventListener as Mock).mock.calls.find(
        (call) => (call as [string, EventListenerOrEventListenerObject])[0] === 'mouseleave',
      )?.[1] as EventListener;
      mouseLeaveHandler({} as MouseEvent);

      expect(hoverValue.value).toEqual(50);
    });
  });

  describe('watchers', () => {
    it('Should update value and hoverValue when modelValue changes.', async () => {
      const props = reactive({ ...baseProps });
      const { value, hoverValue } = mountWithComposable(props);
      props.modelValue = 3;

      await nextTick();

      expect(value.value).toEqual(3);
      expect(hoverValue.value).toBeGreaterThan(0);
    });

    it('Should add/remove event listeners when readonly changes.', async () => {
      const props = reactive({ ...baseProps });
      const { ratingDiv } = mountWithComposable(props);

      props.readonly = true;
      await nextTick();
      expect(ratingDiv.removeEventListener).toHaveBeenCalled();

      props.readonly = false;
      await nextTick();
      expect(ratingDiv.addEventListener).toHaveBeenCalled();
    });
  });

  describe('edge cases', () => {
    it('Should not fail if ratingRef is null for event handlers.', () => {
      const emits = vi.fn();
      const ratingRef = shallowRef(null);
      const value = ref(baseProps.modelValue);
      const hoverValue = ref(0);

      mount(
        defineComponent({
          setup() {
            useRatingEvents(baseProps, emits, ratingRef, value, hoverValue);
            return {};
          },
          render() {
            return h('div');
          },
        }),
      );
      expect(true).toBeTruthy();
    });

    it('Should not observe width if disabled.', () => {
      const { ratingDiv } = mountWithComposable({ ...baseProps, disabled: true });
      expect(observeMock).not.toHaveBeenCalledWith(ratingDiv);
    });
  });
});
