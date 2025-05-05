import { describe, expect, it, vi, beforeEach, afterEach } from 'vitest';
import { defineComponent, h, nextTick } from 'vue';
import { mount } from '@vue/test-utils';
import { PreviewerSelectorTestData } from '../test-data/Previewer.selector.test-data';
import usePreviewer from '../../composables/usePreviewer/usePreviewer';
import type { TPreviewerProps } from '../../Previewer';
import { EPreviewerPropsDefault } from '../../types/Previewer.enums';

vi.mock('@/shared/client/copy-to-clipboard', () => ({
  default: vi.fn().mockResolvedValue(undefined),
}));
import copyToClipboard from '@/shared/client/copy-to-clipboard';

const defaultMock = new PreviewerSelectorTestData();

const mockProps: TPreviewerProps = {
  component: {},
  componentSource: '<div></div>',
  cssClass: EPreviewerPropsDefault.CSS_CLASS,
};

function mountWithComposable(props: TPreviewerProps) {
  return mount(
    defineComponent({
      setup() {
        const result = usePreviewer(props);
        return { ...result };
      },
      render() {
        return h('div');
      },
    }),
  );
}

describe('usePreviewer.ts: Basic functionality.', () => {
  it('Should return expected structure.', () => {
    const wrapper = mountWithComposable(mockProps);
    const vm = wrapper.vm;

    expect(vm).toHaveProperty('showCode');
    expect(vm).toHaveProperty('isCopied');
    expect(vm).toHaveProperty('componentClasses');
    expect(vm).toHaveProperty('toggleCode');
    expect(vm).toHaveProperty('handleCopy');
    expect(vm).toHaveProperty('onExpandEnter');
    expect(vm).toHaveProperty('onExpandAfterEnter');
    expect(vm).toHaveProperty('onExpandBeforeLeave');
  });
});

describe('usePreviewer.ts: showCode ComputedRef.', () => {
  it('Should initialize showCode as false if no props.componentSource and props.showCode are false.', () => {
    const { showCode } = usePreviewer({
      ...mockProps,
      componentSource: undefined,
      showCode: false,
    });

    expect(showCode.value).toBe(false);
  });

  it('Should initialize showCode as false if no props.componentSource and props.showCode are true', () => {
    const { showCode } = usePreviewer({
      ...mockProps,
      componentSource: undefined,
      showCode: true,
    });

    expect(showCode.value).toBe(false);
  });

  it('Should toggle showCode when toggleCode is called.', () => {
    const { showCode, toggleCode } = usePreviewer(mockProps);

    expect(showCode.value).toBe(false);

    toggleCode();
    expect(showCode.value).toBe(true);

    toggleCode();
    expect(showCode.value).toBe(false);
  });

  it('Should toggle showCode to true as true if props.componentSource are true and showCode are false.', () => {
    const { showCode, toggleCode } = usePreviewer({ ...mockProps, showCode: false });

    toggleCode();
    expect(showCode.value).toBe(true);
  });

  it('Should toggle showCode to false if props.componentSource are true and showCode are true.', () => {
    const { showCode, toggleCode } = usePreviewer({ ...mockProps, showCode: true });

    toggleCode();
    expect(showCode.value).toBe(false);
  });
});

describe('usePreviewer.ts: componentClasses ComputedRef.', () => {
  it('Should generate correct componentClasses for default props.', () => {
    const wrapper = mountWithComposable(mockProps);
    const vm = wrapper.vm;

    expect(vm.componentClasses).toBe(
      `${defaultMock.getSelectorWithoutDot(defaultMock.rootEl)} ${defaultMock.getSelectorWithoutDot(defaultMock.themeModifier)}`,
    );
  });
});

describe('usePreviewer.ts: toggleCode Function.', () => {
  beforeEach(() => {
    vi.useFakeTimers();
    vi.clearAllMocks();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('Should handle copy: call copyToClipboard, set isCopied true, then false after timeout.', async () => {
    const { handleCopy, isCopied } = usePreviewer(mockProps);

    expect(isCopied.value).toBe(false);

    await handleCopy();
    expect(copyToClipboard).toHaveBeenCalledWith(mockProps.componentSource);
    expect(isCopied.value).toBe(true);

    vi.advanceTimersByTime(1500);
    await nextTick();
    expect(isCopied.value).toBe(false);
  });
});

describe('usePreviewer.ts: onExpandEnter Function.', () => {
  it('Should set height on onExpandEnter.', () => {
    const { onExpandEnter } = usePreviewer(mockProps);

    const el = document.createElement('div');
    Object.defineProperty(el, 'scrollHeight', { value: 123, configurable: true });
    onExpandEnter(el);

    expect(el.style.height).toBe('123px');
  });
});

describe('usePreviewer.ts: onExpandAfterEnter Function.', () => {
  it('Should set height to auto on onExpandAfterEnter.', () => {
    const { onExpandAfterEnter } = usePreviewer(mockProps);

    const el = document.createElement('div');
    onExpandAfterEnter(el);

    expect(el.style.height).toBe('auto');
  });
});

describe('usePreviewer.ts: onExpandBeforeLeave Function.', () => {
  it('Should set height on onExpandBeforeLeave.', () => {
    const { onExpandBeforeLeave } = usePreviewer(mockProps);

    const el = document.createElement('div');
    Object.defineProperty(el, 'scrollHeight', { value: 456, configurable: true });
    onExpandBeforeLeave(el);

    expect(el.style.height).toBe('456px');
  });
});
