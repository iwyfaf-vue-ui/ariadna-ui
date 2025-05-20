import { describe, expect, it, vi } from 'vitest';
import { mount } from '@vue/test-utils';
import { PreviewerSelectorTestData } from '../test-data/Previewer.selector.test-data';
import Previewer from '../../Previewer.vue';
import { nextTick } from 'vue';

vi.mock('@/shared/client/copy-to-clipboard', () => ({
  default: vi.fn().mockResolvedValue(undefined),
}));

const defaultMock = new PreviewerSelectorTestData();

describe('Previewer.vue: Basic render.', () => {
  const wrapper = mount(Previewer, {
    props: {
      component: defaultMock.dummyComponent(),
    },
  });

  it('Should render component without errors.', () => {
    expect(wrapper.exists()).toBe(true);
  });

  it('Should apply default root CSS class.', () => {
    expect(wrapper.classes()).toContain(defaultMock.getSelectorWithoutDot(defaultMock.rootEl));
  });
});

describe('Previewer.vue: Props.', () => {
  it('component: Should render passed component.', () => {
    const wrapper = mount(Previewer, {
      props: {
        component: defaultMock.dummyComponent(),
      },
    });

    expect(wrapper.find('.dummy').exists()).toBe(true);
  });

  it('componentSource: Should not render code block if componentSource is not provided.', () => {
    const wrapper = mount(Previewer, {
      props: {
        component: defaultMock.dummyComponent(),
        showCode: true,
      },
    });

    expect(wrapper.find('pre').exists()).toBe(false);
  });

  it('componentSource: Should render code block with correct source when componentSource is provided and showCode is true.', async () => {
    const wrapper = mount(Previewer, {
      props: {
        component: defaultMock.dummyComponent(),
        componentSource: defaultMock.componentSourceProp,
        showCode: true,
      },
    });

    expect(wrapper.find('pre').text()).toBe(defaultMock.componentSourceProp);
  });

  it('showCode: Should render code block by default if showCode is true and showToggle is true.', async () => {
    const wrapper = mount(Previewer, {
      props: {
        component: defaultMock.dummyComponent(),
        componentSource: defaultMock.componentSourceProp,
        showCode: true,
        showToggle: true,
      },
    });

    expect(wrapper.find('pre').exists()).toBe(true);
  });

  it('showCodeToggle: Should not render showCode toggle button if showToggle is false.', () => {
    const wrapper = mount(Previewer, {
      props: {
        component: defaultMock.dummyComponent(),
        componentSource: defaultMock.componentSourceProp,
        showCodeToggle: false,
      },
    });

    expect(wrapper.find(defaultMock.getSelectorWithDot(defaultMock.actionToggleEl)).exists()).toBe(
      false,
    );
  });

  it('cssClass: Should apply custom root class and generate BEM child classes.', async () => {
    const _defaultMock = new PreviewerSelectorTestData(defaultMock.cssClassProp);
    const wrapper = mount(Previewer, {
      props: {
        component: defaultMock.dummyComponent(),
        componentSource: defaultMock.componentSourceProp,
        showCode: true,
        showToggle: true,
        cssClass: defaultMock.cssClassProp,
      },
      slots: {
        header: await PreviewerSelectorTestData.getPreviewerSlotHeaderCustom(),
        description: await PreviewerSelectorTestData.getPreviewerSlotDescriptionCustom(),
        showCodeToggle: await PreviewerSelectorTestData.getPreviewerSlotShowCodeToggleCustom(),
        copy: await PreviewerSelectorTestData.getPreviewerSlotCopyCustom(),
        source: await PreviewerSelectorTestData.getPreviewerSlotSourceCustom(),
      },
    });

    expect(wrapper.find(defaultMock.getSelectorWithDot(_defaultMock.rootEl)).exists()).toBe(true);
    expect(wrapper.find(defaultMock.getSelectorWithDot(_defaultMock.themeModifier)).exists()).toBe(
      true,
    );
    expect(wrapper.find(defaultMock.getSelectorWithDot(_defaultMock.headerEl)).exists()).toBe(true);
    expect(wrapper.find(defaultMock.getSelectorWithDot(_defaultMock.descriptionEl)).exists()).toBe(
      true,
    );
    expect(wrapper.find(defaultMock.getSelectorWithDot(_defaultMock.componentEl)).exists()).toBe(
      true,
    );
    expect(wrapper.find(defaultMock.getSelectorWithDot(_defaultMock.actionEl)).exists()).toBe(true);
    expect(wrapper.find(defaultMock.getSelectorWithDot(_defaultMock.actionToggleEl)).exists()).toBe(
      true,
    );
    expect(wrapper.find(defaultMock.getSelectorWithDot(_defaultMock.actionCopyEl)).exists()).toBe(
      true,
    );
    expect(wrapper.find(defaultMock.getSelectorWithDot(_defaultMock.codeEl)).exists()).toBe(true);
  });

  it('modifier: Should apply modifier class.', async () => {
    const wrapper = mount(Previewer, {
      props: {
        component: defaultMock.dummyComponent(),
        componentSource: defaultMock.componentSourceProp,
        modifier: defaultMock.modifierProp,
      },
    });

    expect(wrapper.find(defaultMock.rootEl).classes()).toContain(defaultMock.primaryModifier);
  });
});

describe('Previewer.vue: Slots.', () => {
  it('header: Should not render header slot if it not provided.', async () => {
    const wrapper = mount(Previewer, {
      props: {
        component: defaultMock.dummyComponent(),
        componentSource: defaultMock.componentSourceProp,
      },
    });

    expect(wrapper.find(defaultMock.getSelectorWithDot(defaultMock.headerEl)).exists()).toBe(false);
  });

  it('header: Should render custom header slot if provided.', async () => {
    const wrapper = mount(Previewer, {
      props: {
        component: defaultMock.dummyComponent(),
        componentSource: defaultMock.componentSourceProp,
      },
      slots: {
        header: await PreviewerSelectorTestData.getPreviewerSlotHeaderCustom(),
      },
    });

    expect(wrapper.find(defaultMock.getSelectorWithDot(defaultMock.headerEl)).exists()).toBe(true);
    expect(wrapper.find(defaultMock.headerEl).element.innerHTML).toBe(
      await PreviewerSelectorTestData.getPreviewerSlotHeaderCustom(),
    );
  });

  it('description: Should not render description slot if it not provided.', async () => {
    const wrapper = mount(Previewer, {
      props: {
        component: defaultMock.dummyComponent(),
        componentSource: defaultMock.componentSourceProp,
      },
    });

    expect(wrapper.find(defaultMock.getSelectorWithDot(defaultMock.descriptionEl)).exists()).toBe(
      false,
    );
  });

  it('description: Should render custom description slot if provided.', async () => {
    const wrapper = mount(Previewer, {
      props: {
        component: defaultMock.dummyComponent(),
        componentSource: defaultMock.componentSourceProp,
      },
      slots: {
        description: await PreviewerSelectorTestData.getPreviewerSlotDescriptionCustom(),
      },
    });

    expect(wrapper.find(defaultMock.getSelectorWithDot(defaultMock.descriptionEl)).exists()).toBe(
      true,
    );
    expect(wrapper.find(defaultMock.descriptionEl).element.innerHTML).toBe(
      await PreviewerSelectorTestData.getPreviewerSlotDescriptionCustom(),
    );
  });

  it('showCodeToggle: Should render default showCode button if slot is not provided.', async () => {
    const wrapper = mount(Previewer, {
      props: {
        component: defaultMock.dummyComponent(),
        componentSource: defaultMock.componentSourceProp,
      },
    });

    expect(wrapper.find(defaultMock.actionToggleEl).exists()).toBe(true);
    expect(wrapper.find(defaultMock.actionToggleEl).find('button').element.innerHTML).toBe(
      await PreviewerSelectorTestData.getPreviewerSlotShowCodeToggleDefault(),
    );
  });

  it('showCodeToggle: Should render custom showCode slot if provided.', async () => {
    const wrapper = mount(Previewer, {
      props: {
        component: defaultMock.dummyComponent(),
        componentSource: defaultMock.componentSourceProp,
      },
      slots: {
        showCodeToggle: await PreviewerSelectorTestData.getPreviewerSlotShowCodeToggleCustom(),
      },
    });

    expect(wrapper.find('.custom-toggle').exists()).toBe(true);
    expect(wrapper.find('.custom-toggle').element.innerHTML).toBe('Show');
  });

  it('copy: Should render default copy button if copy slot is not provided.', async () => {
    const wrapper = mount(Previewer, {
      props: {
        component: defaultMock.dummyComponent(),
        componentSource: defaultMock.componentSourceProp,
        showCode: true,
      },
    });

    expect(wrapper.find(defaultMock.actionCopyEl).find('button').text()).toMatch(
      await PreviewerSelectorTestData.getPreviewerSlotCopyDefault(),
    );
  });

  it('copy: Should render custom copy slot if provided.', async () => {
    const wrapper = mount(Previewer, {
      props: {
        component: defaultMock.dummyComponent(),
        componentSource: defaultMock.componentSourceProp,
        showCode: true,
      },
      slots: {
        copy: await PreviewerSelectorTestData.getPreviewerSlotCopyCustom(),
      },
    });

    expect(wrapper.find('.custom-copy').exists()).toBe(true);
    expect(wrapper.find('.custom-copy').element.innerHTML).toBe('Копировать');
  });

  it('source: Should render default code block if source slot is not provided.', async () => {
    const wrapper = mount(Previewer, {
      props: {
        component: defaultMock.dummyComponent(),
        componentSource: defaultMock.componentSourceProp,
        showCode: true,
      },
    });

    expect(wrapper.find('pre').exists()).toBe(true);
    expect(wrapper.find('pre').text()).toBe(defaultMock.componentSourceProp);
  });

  it('source: Should render custom source slot if provided.', async () => {
    const wrapper = mount(Previewer, {
      props: {
        component: defaultMock.dummyComponent(),
        componentSource: defaultMock.componentSourceProp,
        showCode: true,
      },
      slots: {
        source: await PreviewerSelectorTestData.getPreviewerSlotSourceCustom(),
      },
    });

    expect(wrapper.find('.custom-source').exists()).toBe(true);
    expect(wrapper.find('.custom-source').text()).toBe(defaultMock.componentSourceProp);
  });
});

describe('Previewer.vue: Accessibility.', () => {
  it('aria-pressed: Should set aria-pressed on showCode toggle button.', async () => {
    const wrapper = mount(Previewer, {
      props: {
        component: defaultMock.dummyComponent(),
        componentSource: defaultMock.componentSourceProp,
      },
    });

    const btn = wrapper.find('button');

    expect(btn.attributes('aria-pressed')).toBe('false');

    await btn.trigger('click');
    await nextTick();

    expect(btn.attributes('aria-pressed')).toBe('true');
  });

  it('aria-label and aria-live: Should set aria-label and aria-live on copy button when copied.', async () => {
    const wrapper = mount(Previewer, {
      props: {
        component: defaultMock.dummyComponent(),
        componentSource: defaultMock.componentSourceProp,
        showCode: true,
      },
    });

    const btn = wrapper.find(defaultMock.actionCopyEl).find('button');

    await btn.trigger('click');
    await nextTick();

    expect(btn.attributes('aria-live')).toBe('polite');
  });

  it('Should set tabindex="0" on code section.', async () => {
    const wrapper = mount(Previewer, {
      props: {
        component: defaultMock.dummyComponent(),
        componentSource: defaultMock.componentSourceProp,
        showCode: true,
      },
    });

    const codeSection = wrapper.find(defaultMock.codeEl);
    expect(codeSection.exists()).toBe(true);
    expect(codeSection.attributes('tabindex')).toBe('0');
  });
});
