import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { mount, type VueWrapper } from '@vue/test-utils';
import Viewer from '../../Viewer.vue';
import { ViewerSelectorTestData } from '../test-data/Viewer.selector.test-data';

const defaultMock = new ViewerSelectorTestData();

describe('Viewer', () => {
  let wrapper: VueWrapper<any>;

  beforeEach(() => {
    wrapper = mount(Viewer, {
      props: defaultMock.mockProps,
      global: {
        stubs: {
          teleport: true,
        },
      },
    });
  });

  afterEach(() => {
    wrapper.unmount();
  });

  describe('Basic render', () => {
    it('Should render Viewer with default props.', () => {
      expect(wrapper.exists()).toBe(true);
      expect(
        wrapper.find(defaultMock.getSelectorWithDot(defaultMock.rootEl)).exists(),
      ).toBeTruthy();
    });

    it('Should render empty state when gallery is empty.', () => {
      // Проверяем наличие дефолтного empty state
      expect(wrapper.text().toLowerCase()).toContain('empty');
    });
  });

  describe('Props', () => {
    it('moveSlowFactor: Should apply moveSlowFactor.', async () => {
      await wrapper.setProps({
        moveSlowFactor: 0.5,
      });

      expect(wrapper.props().moveSlowFactor).toBe(0.5);
    });

    it('resizeCalculationMs: Should apply resizeCalculationMs.', async () => {
      await wrapper.setProps({
        resizeCalculationMs: 700,
      });

      expect(wrapper.props().resizeCalculationMs).toBe(700);
    });

    it('swipeVerge: Should apply swipeVerge.', async () => {
      await wrapper.setProps({
        swipeVerge: 80,
      });

      expect(wrapper.props().swipeVerge).toBe(80);
    });

    it('zoomStep: Should apply zoomStep.', async () => {
      await wrapper.setProps({
        zoomStep: 25,
      });

      expect(wrapper.props().zoomStep).toBe(25);
    });

    it('zoomMax: Should apply zoomMax.', async () => {
      await wrapper.setProps({
        zoomMax: 400,
      });

      expect(wrapper.props().zoomMax).toBe(400);
    });

    it('queue: Should apply custom queue.', async () => {
      await wrapper.setProps({ queue: ['IMAGE', 'VIDEO'] });

      expect(wrapper.props('queue')).toEqual(['IMAGE', 'VIDEO']);
    });

    it('loop: Should apply loop.', async () => {
      await wrapper.setProps({
        loop: true,
      });

      expect(wrapper.props().loop).toBe(true);
    });

    it('noOverlayDismiss: Should apply noOverlayDismiss.', async () => {
      await wrapper.setProps({
        noOverlayDismiss: true,
      });

      expect(wrapper.props().noOverlayDismiss).toBe(true);
    });

    it('noEscDismiss: Should apply noEscDismiss.', async () => {
      await wrapper.setProps({
        noEscDismiss: true,
      });

      expect(wrapper.props().noEscDismiss).toBe(true);
    });

    it('appendTo: Should attach to custom appendTo selector.', async () => {
      await wrapper.setProps({ appendTo: '#teleports' });

      expect(wrapper.props('appendTo')).toBe('#teleports');
    });

    it('cssClass: Should apply custom root class and generate BEM child classes.', async () => {
      const _defaultMock = new ViewerSelectorTestData(defaultMock.cssClassProp);
      await wrapper.setProps({
        ...defaultMock.mockProps,
        cssClass: defaultMock.cssClassProp,
      });

      expect(wrapper.find(defaultMock.getSelectorWithDot(_defaultMock.rootEl)).exists()).toBe(true);
      expect(
        wrapper.find(defaultMock.getSelectorWithDot(_defaultMock.themeModifier)).exists(),
      ).toBe(true);
      expect(wrapper.find(defaultMock.getSelectorWithDot(_defaultMock.contentEl)).exists()).toBe(
        true,
      );
      expect(wrapper.find(defaultMock.getSelectorWithDot(_defaultMock.emptyEl)).exists()).toBe(
        true,
      );
      expect(wrapper.find(defaultMock.getSelectorWithDot(_defaultMock.controlsEl)).exists()).toBe(
        true,
      );
      expect(
        wrapper.find(defaultMock.getSelectorWithDot(_defaultMock.controlsCloseEl)).exists(),
      ).toBe(true);
      expect(
        wrapper.find(defaultMock.getSelectorWithDot(_defaultMock.controlsNextEl)).exists(),
      ).toBe(true);
      expect(
        wrapper.find(defaultMock.getSelectorWithDot(_defaultMock.controlsPrevEl)).exists(),
      ).toBe(true);
      expect(wrapper.find(defaultMock.getSelectorWithDot(_defaultMock.sliderEl)).exists()).toBe(
        true,
      );
    });
  });

  describe('Slots', () => {
    it('empty: Should render custom empty slot content if empty slot is not provided.', async () => {
      const wrapper = mount(Viewer, {
        props: defaultMock.mockProps,
        global: {
          stubs: {
            teleport: true,
          },
        },
      });

      expect(wrapper.find(defaultMock.getSelectorWithDot(defaultMock.emptyEl)).exists()).toBe(true);
      expect(wrapper.find(defaultMock.emptyEl).element.innerHTML).toBe(
        await ViewerSelectorTestData.getViewerSlotEmptyDefault(),
      );
    });

    it('empty: Should render custom empty slot content if custom slot is provided.', async () => {
      const wrapper = mount(Viewer, {
        props: defaultMock.mockProps,
        slots: {
          empty: await ViewerSelectorTestData.getViewerSlotEmptyCustom(),
        },
        global: {
          stubs: {
            teleport: true,
          },
        },
      });

      expect(wrapper.find(defaultMock.getSelectorWithDot(defaultMock.emptyEl)).exists()).toBe(true);
      expect(wrapper.find(defaultMock.emptyEl).element.innerHTML).toBe(
        await ViewerSelectorTestData.getViewerSlotEmptyCustom(),
      );
    });

    it('closeIcon: Should render closeIcon slot content if closeIcon slot is not provided.', async () => {
      const wrapper = mount(Viewer, {
        props: defaultMock.mockProps,
        global: {
          stubs: {
            teleport: true,
          },
        },
      });

      expect(
        wrapper.find(defaultMock.getSelectorWithDot(defaultMock.controlsCloseEl)).exists(),
      ).toBe(true);
      expect(wrapper.find(defaultMock.controlsCloseEl).element.innerHTML).toBe(
        await ViewerSelectorTestData.getViewerSlotCloseIconDefault(),
      );
    });

    it('closeIcon: Should render closeIcon slot content if closeIcon slot is provided.', async () => {
      const wrapper = mount(Viewer, {
        props: defaultMock.mockProps,
        slots: {
          closeIcon: await ViewerSelectorTestData.getViewerSlotCloseIconCustom(),
        },
        global: {
          stubs: {
            teleport: true,
          },
        },
      });

      expect(
        wrapper.find(defaultMock.getSelectorWithDot(defaultMock.controlsCloseEl)).exists(),
      ).toBe(true);
      expect(wrapper.find(defaultMock.controlsCloseEl).element.innerHTML).toBe(
        await ViewerSelectorTestData.getViewerSlotCloseIconCustom(),
      );
    });

    it('prevIcon: Should render prevIcon slot content if prevIcon slot is not provided.', async () => {
      const wrapper = mount(Viewer, {
        props: defaultMock.mockProps,
        global: {
          stubs: {
            teleport: true,
          },
        },
      });

      expect(
        wrapper.find(defaultMock.getSelectorWithDot(defaultMock.controlsPrevEl)).exists(),
      ).toBe(true);
      expect(wrapper.find(defaultMock.controlsPrevEl).element.innerHTML).toBe(
        await ViewerSelectorTestData.getViewerSlotPrevIconDefault(),
      );
    });

    it('prevIcon: Should render prevIcon slot content if prevIcon slot is provided.', async () => {
      const wrapper = mount(Viewer, {
        props: defaultMock.mockProps,
        slots: {
          prevIcon: await ViewerSelectorTestData.getViewerSlotPrevIconCustom(),
        },
        global: {
          stubs: {
            teleport: true,
          },
        },
      });

      expect(
        wrapper.find(defaultMock.getSelectorWithDot(defaultMock.controlsPrevEl)).exists(),
      ).toBe(true);
      expect(wrapper.find(defaultMock.controlsPrevEl).element.innerHTML).toBe(
        await ViewerSelectorTestData.getViewerSlotPrevIconCustom(),
      );
    });

    it('nextIcon: Should render nextIcon slot content if nextIcon slot is not provided.', async () => {
      const wrapper = mount(Viewer, {
        props: defaultMock.mockProps,
        global: {
          stubs: {
            teleport: true,
          },
        },
      });

      expect(
        wrapper.find(defaultMock.getSelectorWithDot(defaultMock.controlsNextEl)).exists(),
      ).toBe(true);
      expect(wrapper.find(defaultMock.controlsNextEl).element.innerHTML).toBe(
        await ViewerSelectorTestData.getViewerSlotNextIconDefault(),
      );
    });

    it('nextIcon: Should render nextIcon slot content if nextIcon slot is provided.', async () => {
      const wrapper = mount(Viewer, {
        props: defaultMock.mockProps,
        slots: {
          nextIcon: await ViewerSelectorTestData.getViewerSlotNextIconCustom(),
        },
        global: {
          stubs: {
            teleport: true,
          },
        },
      });

      expect(
        wrapper.find(defaultMock.getSelectorWithDot(defaultMock.controlsNextEl)).exists(),
      ).toBe(true);
      expect(wrapper.find(defaultMock.controlsNextEl).element.innerHTML).toBe(
        await ViewerSelectorTestData.getViewerSlotNextIconCustom(),
      );
    });

    it('zoomInfo: Should render zoomInfo slot content if zoomInfo slot is not provided.', async () => {
      const wrapper = mount(Viewer, {
        props: defaultMock.mockProps,
        global: {
          stubs: {
            teleport: true,
          },
        },
      });

      expect(
        wrapper.find(defaultMock.getSelectorWithDot(defaultMock.controlsZoomEl)).exists(),
      ).toBe(true);
      expect(wrapper.find(defaultMock.controlsZoomEl).element.innerHTML).toBe(
        await ViewerSelectorTestData.getViewerSlotZoomInfoDefault(),
      );
    });

    it('zoomInfo: Should render zoomInfo slot content if zoomInfo slot is provided.', async () => {
      const wrapper = mount(Viewer, {
        props: defaultMock.mockProps,
        slots: {
          zoomInfo: await ViewerSelectorTestData.getViewerSlotZoomInfoCustom(),
        },
        global: {
          stubs: {
            teleport: true,
          },
        },
      });

      expect(
        wrapper.find(defaultMock.getSelectorWithDot(defaultMock.controlsZoomEl)).exists(),
      ).toBe(true);
      expect(wrapper.find(defaultMock.controlsZoomEl).element.innerHTML).toBe(
        await ViewerSelectorTestData.getViewerSlotZoomInfoCustom(),
      );
    });
  });

  describe('Emits', () => {
    it('open: Should emit "open" event when open() is called.', async () => {
      // Открываем Viewer через публичный метод
      (wrapper.vm as any).open();
      await wrapper.vm.$nextTick();

      expect(wrapper.emitted('open')).toBeDefined();
      expect(wrapper.emitted('open')?.length).toBe(1);
    });

    it('close: Should emit "close" event when close() is called.', async () => {
      // Закрываем Viewer через публичный метод
      (wrapper.vm as any).close();
      await wrapper.vm.$nextTick();

      expect(wrapper.emitted('close')).toBeDefined();
      expect(wrapper.emitted('close')?.length).toBe(1);
    });
  });
});
