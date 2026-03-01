import { describe, expect, it } from 'vitest';
import { mount } from '@vue/test-utils';
import Header from '../../Header.vue';
import { HeaderSelectorTestData } from '../test-data/Header.selector.test-data';
import { nextTick } from 'vue';

const defaultMock = new HeaderSelectorTestData();

describe('Header.vue', () => {
  describe('Basic render', () => {
    const wrapper = mount(Header, {
      props: {},
    });

    it('Should render component without errors.', () => {
      expect(wrapper.exists()).toBe(true);
    });

    it('Should apply default root CSS class.', () => {
      expect(wrapper.classes()).toContain(defaultMock.getSelectorWithoutDot(defaultMock.rootEl));
    });

    it('Should render header element.', () => {
      expect(wrapper.find('header').exists()).toBe(true);
      expect(wrapper.find(defaultMock.getSelectorWithDot(defaultMock.rootEl)).exists()).toBe(true);
    });
  });

  describe('Props', () => {
    it('tag: Should render as header tag by default.', () => {
      const wrapper = mount(Header, {
        props: {},
      });

      expect(wrapper.find(defaultMock.rootEl).element.tagName).toEqual('HEADER');
    });

    it('tag: Should render as div tag.', () => {
      const wrapper = mount(Header, {
        props: {
          tag: 'div',
        },
      });

      expect(wrapper.find(defaultMock.rootEl).element.tagName).toEqual('DIV');
    });

    it('scrollThreshold: Should not add scrolled class when scrollThreshold is not provided.', async () => {
      const wrapper = mount(Header, {
        props: {},
      });

      const root = wrapper.find(defaultMock.rootEl);

      expect(root.classes()).not.toContain(
        defaultMock.getSelectorWithoutDot(defaultMock.scrolledModifier),
      );

      // Имитация скролла не должна ничего менять без scrollThreshold
      (window as any).scrollY = 200;
      window.dispatchEvent(new Event('scroll'));

      await wrapper.vm.$nextTick();

      expect(root.classes()).not.toContain(
        defaultMock.getSelectorWithoutDot(defaultMock.scrolledModifier),
      );
    });

    it('scrollThreshold: Should keep scrolled class absent when scroll is below threshold.', async () => {
      Object.defineProperty(window, 'scrollY', {
        value: 0,
        writable: true,
        configurable: true,
      });

      const wrapper = mount(Header, {
        props: {
          scrollThreshold: defaultMock.scrollThresholdProp,
        },
      });

      const root = wrapper.find(defaultMock.rootEl);

      expect(root.classes()).not.toContain(
        defaultMock.getSelectorWithoutDot(defaultMock.scrolledModifier),
      );

      (window as any).scrollY = defaultMock.scrollThresholdProp! - 10;
      window.dispatchEvent(new Event('scroll'));

      await wrapper.vm.$nextTick();

      expect(root.classes()).not.toContain(
        defaultMock.getSelectorWithoutDot(defaultMock.scrolledModifier),
      );
    });

    it('scrollThreshold: Should add scrolled class when scroll position equals threshold.', async () => {
      Object.defineProperty(window, 'scrollY', {
        value: defaultMock.scrollThresholdProp,
        writable: true,
        configurable: true,
      });

      const wrapper = mount(Header, {
        props: {
          scrollThreshold: defaultMock.scrollThresholdProp,
        },
      });

      await nextTick();

      const root = wrapper.find(defaultMock.rootEl);

      expect(root.classes()).toContain(
        defaultMock.getSelectorWithoutDot(defaultMock.scrolledModifier),
      );
    });

    it('scrollThreshold: Should add scrolled class when scroll position is above threshold.', async () => {
      Object.defineProperty(window, 'scrollY', {
        value: defaultMock.scrollThresholdProp! + 50,
        writable: true,
        configurable: true,
      });

      const wrapper = mount(Header, {
        props: {
          scrollThreshold: defaultMock.scrollThresholdProp,
        },
      });

      await nextTick();

      const root = wrapper.find(defaultMock.rootEl);

      expect(root.classes()).toContain(
        defaultMock.getSelectorWithoutDot(defaultMock.scrolledModifier),
      );
    });

    it('scrollThreshold: Should toggle scrolled class when crossing threshold up and down.', async () => {
      Object.defineProperty(window, 'scrollY', {
        value: 0,
        writable: true,
        configurable: true,
      });

      const wrapper = mount(Header, {
        props: {
          scrollThreshold: defaultMock.scrollThresholdProp,
        },
      });

      const root = wrapper.find(defaultMock.rootEl);

      // Изначально ниже порога
      expect(root.classes()).not.toContain(
        defaultMock.getSelectorWithoutDot(defaultMock.scrolledModifier),
      );

      // Поднимаемся выше порога
      (window as any).scrollY = defaultMock.scrollThresholdProp! + 20;
      window.dispatchEvent(new Event('scroll'));
      await wrapper.vm.$nextTick();

      expect(root.classes()).toContain(
        defaultMock.getSelectorWithoutDot(defaultMock.scrolledModifier),
      );

      // Опускаемся ниже порога
      (window as any).scrollY = defaultMock.scrollThresholdProp! - 20;
      window.dispatchEvent(new Event('scroll'));
      await wrapper.vm.$nextTick();

      expect(root.classes()).not.toContain(
        defaultMock.getSelectorWithoutDot(defaultMock.scrolledModifier),
      );
    });

    it('cssClass: Should apply custom root class and generate BEM child classes.', async () => {
      const _defaultMock = new HeaderSelectorTestData(defaultMock.cssClassProp);

      const wrapper = mount(Header, {
        props: {
          cssClass: defaultMock.cssClassProp,
          modifier: defaultMock.modifierProp,
        },
        slots: {
          logo: await HeaderSelectorTestData.getHeaderLogoSlotCustom(),
          title: await HeaderSelectorTestData.getHeaderTitleSlotCustom(),
          subtitle: await HeaderSelectorTestData.getHeaderSubtitleSlotCustom(),
          default: await HeaderSelectorTestData.getHeaderDefaultSlotCustom(),
          right: await HeaderSelectorTestData.getHeaderRightSlotCustom(),
        },
      });

      expect(wrapper.find(defaultMock.getSelectorWithDot(_defaultMock.rootEl)).exists()).toBe(true);
      expect(wrapper.find(defaultMock.getSelectorWithDot(_defaultMock.headEl)).exists()).toBe(true);
      expect(wrapper.find(defaultMock.getSelectorWithDot(_defaultMock.headLogoEl)).exists()).toBe(
        true,
      );
      expect(wrapper.find(defaultMock.getSelectorWithDot(_defaultMock.headTitleEl)).exists()).toBe(
        true,
      );
      expect(
        wrapper.find(defaultMock.getSelectorWithDot(_defaultMock.headSubtitleEl)).exists(),
      ).toBe(true);
      expect(wrapper.find(defaultMock.getSelectorWithDot(_defaultMock.contentEl)).exists()).toBe(
        true,
      );
      expect(wrapper.find(defaultMock.getSelectorWithDot(_defaultMock.rightEl)).exists()).toBe(
        true,
      );
      expect(
        wrapper.find(defaultMock.getSelectorWithDot(_defaultMock.themeModifier)).exists(),
      ).toBe(true);
      expect(
        wrapper.find(defaultMock.getSelectorWithDot(_defaultMock.primaryModifier)).exists(),
      ).toBe(true);
    });
  });

  describe('Slots', () => {
    it('logo: Should render logo slot if provided.', async () => {
      const wrapper = mount(Header, {
        slots: {
          logo: await HeaderSelectorTestData.getHeaderLogoSlotCustom(),
        },
      });

      expect(wrapper.find(defaultMock.getSelectorWithDot(defaultMock.headLogoEl)).exists()).toBe(
        true,
      );
      expect(wrapper.find(defaultMock.headLogoEl).element.innerHTML).toBe(
        (await HeaderSelectorTestData.getHeaderLogoSlotCustom()).trim(),
      );
    });

    it('title: Should render logo title if provided.', async () => {
      const wrapper = mount(Header, {
        slots: {
          title: await HeaderSelectorTestData.getHeaderTitleSlotCustom(),
        },
      });

      expect(wrapper.find(defaultMock.getSelectorWithDot(defaultMock.headTitleEl)).exists()).toBe(
        true,
      );
      expect(wrapper.find(defaultMock.headTitleEl).element.innerHTML).toBe(
        (await HeaderSelectorTestData.getHeaderTitleSlotCustom()).trim(),
      );
    });

    it('subtitle: Should render logo subtitle if provided.', async () => {
      const wrapper = mount(Header, {
        slots: {
          subtitle: await HeaderSelectorTestData.getHeaderSubtitleSlotCustom(),
        },
      });

      expect(
        wrapper.find(defaultMock.getSelectorWithDot(defaultMock.headSubtitleEl)).exists(),
      ).toBe(true);
      expect(wrapper.find(defaultMock.headSubtitleEl).element.innerHTML).toBe(
        (await HeaderSelectorTestData.getHeaderSubtitleSlotCustom()).trim(),
      );
    });

    it('default: Should render logo default if provided.', async () => {
      const wrapper = mount(Header, {
        slots: {
          default: await HeaderSelectorTestData.getHeaderDefaultSlotCustom(),
        },
      });

      expect(wrapper.find(defaultMock.getSelectorWithDot(defaultMock.contentEl)).exists()).toBe(
        true,
      );
      expect(wrapper.find(defaultMock.contentEl).element.innerHTML).toBe(
        (await HeaderSelectorTestData.getHeaderDefaultSlotCustom()).trim(),
      );
    });

    it('right: Should render logo right if provided.', async () => {
      const wrapper = mount(Header, {
        slots: {
          right: await HeaderSelectorTestData.getHeaderRightSlotCustom(),
        },
      });

      expect(wrapper.find(defaultMock.getSelectorWithDot(defaultMock.rightEl)).exists()).toBe(true);
      expect(wrapper.find(defaultMock.rightEl).element.innerHTML).toBe(
        (await HeaderSelectorTestData.getHeaderRightSlotCustom()).trim(),
      );
    });
  });

  describe('Emits', () => {
    it('scrolled: Should not emit "scrolled" when scrollThreshold prop is not provided.', async () => {
      const wrapper = mount(Header, {
        props: {},
      });

      (window as any).scrollY = 200;
      window.dispatchEvent(new Event('scroll'));
      await nextTick();

      expect(wrapper.emitted('scrolled')).toBeUndefined();
    });

    it('scrolled: Should emit "scrolled" with true on mount when scroll is already above threshold.', async () => {
      Object.defineProperty(window, 'scrollY', {
        value: defaultMock.scrollThresholdProp! + 50,
        writable: true,
        configurable: true,
      });

      const wrapper = mount(Header, {
        props: {
          scrollThreshold: defaultMock.scrollThresholdProp,
        },
      });

      await nextTick();

      const events = wrapper.emitted('scrolled');
      expect(events).toBeTruthy();
      expect(events![0]).toEqual([true]);
    });

    it('scrolled: Should not emit on mount when scroll is below threshold.', async () => {
      Object.defineProperty(window, 'scrollY', {
        value: 0,
        writable: true,
        configurable: true,
      });

      const wrapper = mount(Header, {
        props: {
          scrollThreshold: defaultMock.scrollThresholdProp,
        },
      });

      await nextTick();

      expect(wrapper.emitted('scrolled')).toBeUndefined();
    });

    it('scrolled: Should emit "scrolled" with true when crossing threshold upwards.', async () => {
      Object.defineProperty(window, 'scrollY', {
        value: 0,
        writable: true,
        configurable: true,
      });

      const wrapper = mount(Header, {
        props: {
          scrollThreshold: defaultMock.scrollThresholdProp,
        },
      });

      await nextTick();
      expect(wrapper.emitted('scrolled')).toBeUndefined();

      (window as any).scrollY = defaultMock.scrollThresholdProp! + 10;
      window.dispatchEvent(new Event('scroll'));
      await nextTick();

      const events = wrapper.emitted('scrolled');
      expect(events).toBeTruthy();
      expect(events!.length).toBe(1);
      expect(events![0]).toEqual([true]);
    });

    it('scrolled: Should emit "scrolled" with false when crossing threshold downwards.', async () => {
      Object.defineProperty(window, 'scrollY', {
        value: defaultMock.scrollThresholdProp! + 10,
        writable: true,
        configurable: true,
      });

      const wrapper = mount(Header, {
        props: {
          scrollThreshold: defaultMock.scrollThresholdProp,
        },
      });

      await nextTick();

      // На монтировании уже был emit(true)
      let events = wrapper.emitted('scrolled');
      expect(events).toBeTruthy();
      expect(events!.length).toBe(1);
      expect(events![0]).toEqual([true]);

      (window as any).scrollY = defaultMock.scrollThresholdProp! - 10;
      window.dispatchEvent(new Event('scroll'));
      await nextTick();

      events = wrapper.emitted('scrolled');
      expect(events!.length).toBe(2);
      expect(events![1]).toEqual([false]);
    });

    it('scrolled: Should not emit multiple times when staying below threshold.', async () => {
      Object.defineProperty(window, 'scrollY', {
        value: 0,
        writable: true,
        configurable: true,
      });

      const wrapper = mount(Header, {
        props: {
          scrollThreshold: defaultMock.scrollThresholdProp,
        },
      });

      await nextTick();
      expect(wrapper.emitted('scrolled')).toBeUndefined();

      (window as any).scrollY = defaultMock.scrollThresholdProp! - 30;
      window.dispatchEvent(new Event('scroll'));
      await nextTick();

      (window as any).scrollY = defaultMock.scrollThresholdProp! - 10;
      window.dispatchEvent(new Event('scroll'));
      await nextTick();

      expect(wrapper.emitted('scrolled')).toBeUndefined();
    });

    it('scrolled: Should not emit multiple times when staying above threshold.', async () => {
      Object.defineProperty(window, 'scrollY', {
        value: defaultMock.scrollThresholdProp! + 10,
        writable: true,
        configurable: true,
      });

      const wrapper = mount(Header, {
        props: {
          scrollThreshold: defaultMock.scrollThresholdProp,
        },
      });

      await nextTick();

      let events = wrapper.emitted('scrolled');
      expect(events).toBeTruthy();
      expect(events!.length).toBe(1);
      expect(events![0]).toEqual([true]);

      (window as any).scrollY = defaultMock.scrollThresholdProp! + 30;
      window.dispatchEvent(new Event('scroll'));
      await nextTick();

      (window as any).scrollY = defaultMock.scrollThresholdProp! + 60;
      window.dispatchEvent(new Event('scroll'));
      await nextTick();

      events = wrapper.emitted('scrolled');
      expect(events!.length).toBe(1);
    });
  });
});
